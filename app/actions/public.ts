'use server'

import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { getProfileBySlug } from '@/lib/profiles'

export interface PublicLeadFormState {
  success?: boolean
  error?: string
}

export async function submitPublicLeadAction(
  slug: string,
  _: PublicLeadFormState,
  formData: FormData
): Promise<PublicLeadFormState> {
  const full_name = (formData.get('full_name') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()
  const email = (formData.get('email') as string)?.trim() || null
  const interest = (formData.get('interest') as string)?.trim() || null
  const notes = (formData.get('notes') as string)?.trim() || null

  if (!full_name) return { error: 'Full name is required.' }
  if (!phone) return { error: 'Phone number is required.' }

  const profile = await getProfileBySlug(slug)
  if (!profile) return { error: 'Agent not found.' }

  const admin = createAdminClient()
  const { error } = await admin.from('leads').insert({
    owner_id: profile.id,
    full_name,
    phone,
    email,
    source: 'public_form',
    status: 'New',
    notes: [interest ? `Interest: ${interest}` : null, notes].filter(Boolean).join('\n') || null,
  })

  if (error) {
    console.error('Public lead insert error:', error)
    return { error: 'Something went wrong. Please try again.' }
  }

  return { success: true }
}
