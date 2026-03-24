-- Run this in your Supabase SQL Editor

-- Enable RLS
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references auth.users(id) on delete cascade,
  full_name   text not null,
  phone       text,
  email       text,
  source      text,
  status      text not null default 'new'
                check (status in ('new','contacted','qualified','closed','lost')),
  notes       text,
  last_contacted_at timestamptz,
  next_follow_up_at timestamptz,
  contact_attempts  int not null default 0,
  last_message      text,
  activity_log      jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Row-level security: each user sees only their own leads
alter table public.leads enable row level security;

drop policy if exists "Users manage own leads" on public.leads;
create policy "Users manage own leads"
  on public.leads
  for all
  using  (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_updated_at on public.leads;
create trigger leads_updated_at
  before update on public.leads
  for each row execute procedure public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────
-- MIGRATION: Add Follow-up Tracking to existing leads
-- Run this individually if adding to an existing table
-- ─────────────────────────────────────────────────────────────────
-- alter table public.leads
--   add column if not exists last_contacted_at timestamptz,
--   add column if not exists next_follow_up_at timestamptz,
--   add column if not exists contact_attempts int not null default 0,
--   add column if not exists activity_log jsonb not null default '[]'::jsonb;
-- ─────────────────────────────────────────────────────────────────

-- ─────────────────────────────────────────────────────────────────
-- PHASE 3: Agent profiles + public lead intake
-- Run this block in Supabase SQL Editor after the leads migration
-- ─────────────────────────────────────────────────────────────────

-- Agent profiles table (one row per auth user)
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  slug         text unique not null,
  display_name text not null default '',
  headline     text not null default '',
  description  text not null default '',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Agents manage their own profile
drop policy if exists "Users manage own profile" on public.profiles;
create policy "Users manage own profile"
  on public.profiles for all
  using  (auth.uid() = id)
  with check (auth.uid() = id);

-- Public can READ any profile (needed for /apply/[slug] page)
drop policy if exists "Public can read profiles" on public.profiles;
create policy "Public can read profiles"
  on public.profiles for select
  using (true);

-- Auto-update updated_at
create or replace function public.set_profile_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_profile_updated_at();

-- Allow public (unauthenticated) insert into leads
-- Required for: /apply/[slug] form and /api/webhooks/leads
-- owner_id is enforced by application logic (admin client sets it from slug lookup)
drop policy if exists "Public can insert leads" on public.leads;
create policy "Public can insert leads"
  on public.leads for insert
  with check (true);

