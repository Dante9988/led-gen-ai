import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Profile, ProfileInsert, ProfileUpdate } from '@/types'

// ─── Public slug lookup ───────────────────────────────────────────────────────
// Uses admin client so it works even before the user runs the SQL migration
// (admin bypasses RLS which requires the table to exist with proper policies)

export async function getProfileBySlug(slug: string): Promise<Profile | null> {
  try {
    const admin = createAdminClient()
    const { data } = await admin
      .from('profiles')
      .select('*')
      .eq('slug', slug)
      .single()
    return data ?? null
  } catch {
    return null
  }
}

// ─── Authenticated profile access ─────────────────────────────────────────────

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return data ?? null
}

export async function upsertProfile(updates: ProfileUpdate): Promise<Profile> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: user.id, ...updates, updated_at: new Date().toISOString() })
    .select()
    .single()

  if (error) throw error
  return data
}

// ─── Auto-create profile on first dashboard load ──────────────────────────────

export async function ensureProfile(): Promise<Profile> {
  const existing = await getProfile()
  if (existing) return existing

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Generate slug from email prefix, sanitised
  const emailPrefix = user.email?.split('@')[0] ?? 'agent'
  const baseSlug = emailPrefix
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')  // trim leading/trailing hyphens
    .slice(0, 24)

  // Check slug uniqueness using the regular server client (no admin needed for reads)
  let slug = baseSlug
  const { data: conflict } = await supabase
    .from('profiles')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (conflict) {
    slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`
  }

  const insert: ProfileInsert = {
    id: user.id,
    slug,
    display_name: user.email?.split('@')[0] ?? 'Agent',
    headline: 'Join my team',
    description: 'Fill out the form and I will be in touch.',
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert(insert)
    .select()
    .single()

  if (error) throw error
  return data
}
