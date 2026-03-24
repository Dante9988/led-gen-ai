import { createClient } from '@/lib/supabase/server'
import type { Profile, ProfileInsert, ProfileUpdate } from '@/types'

// ─── Public slug lookup ───────────────────────────────────────────────────────
// Uses admin client so it works even before the user runs the SQL migration
// (admin bypasses RLS which requires the table to exist with proper policies)

export async function getProfileBySlug(slug: string): Promise<Profile | null> {
  try {
    // Uses the regular server client — the RLS policy "Public can read profiles"
    // allows anonymous SELECT, so no admin/service-role key is needed.
    const supabase = await createClient()
    const { data } = await supabase
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

  // 1. Get best available name (Google full_name > email prefix)
  const meta = user.user_metadata || {}
  const rawName = meta.full_name || meta.name || user.email?.split('@')[0] || 'agent'
  
  // Format for display (Title Case fallback)
  const displayName = meta.full_name || meta.name 
    ? rawName 
    : rawName.charAt(0).toUpperCase() + rawName.slice(1)

  // 2. Generate slug
  const baseSlug = rawName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')  // trim leading/trailing hyphens
    .slice(0, 24)

  // 3. Check slug uniqueness
  let slug = baseSlug
  let conflict = true
  let attempts = 0

  while (conflict && attempts < 5) {
    const { data } = await supabase
      .from('profiles')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

    if (data) {
      slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`
      attempts++
    } else {
      conflict = false
    }
  }

  const insert: ProfileInsert = {
    id: user.id,
    slug,
    display_name: displayName,
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
