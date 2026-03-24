-- ─────────────────────────────────────────────────────────────────
-- Billing: Subscriptions table
-- Run this in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────

create table if not exists public.subscriptions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid unique not null references auth.users(id) on delete cascade,
  stripe_customer_id     text,
  stripe_subscription_id text,
  plan           text not null default 'free'
                   check (plan in ('free', 'pro', 'pro_plus')),
  status         text not null default 'active'
                   check (status in ('active', 'trialing', 'past_due', 'canceled', 'unpaid')),
  current_period_end timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- RLS: users can read their own subscription
alter table public.subscriptions enable row level security;

create policy "Users can read own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Service-role / admin writes are used by webhook handler (bypasses RLS)
-- No INSERT/UPDATE policy for anon — webhook uses admin client

-- Auto-update updated_at
create or replace function public.set_subscription_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute procedure public.set_subscription_updated_at();
