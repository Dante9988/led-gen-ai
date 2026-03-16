'use server'

import { revalidatePath } from 'next/cache'
import { upsertProfile } from '@/lib/profiles'

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/

export interface ProfileFormState {
  success?: boolean
  error?: string
}

export async function saveProfileAction(
  _: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const slug = (formData.get('slug') as string)?.trim().toLowerCase()
  const display_name = (formData.get('display_name') as string)?.trim()
  const headline = (formData.get('headline') as string)?.trim()
  const description = (formData.get('description') as string)?.trim()

  if (!slug) return { error: 'Slug is required.' }
  if (!SLUG_RE.test(slug)) {
    return { error: 'Slug must be 3–30 characters, lowercase letters, numbers, or hyphens.' }
  }
  if (!display_name) return { error: 'Display name is required.' }

  try {
    await upsertProfile({ slug, display_name, headline, description })
  } catch (e: unknown) {
    const msg = (e as { message?: string }).message ?? ''
    if (msg.includes('unique') || msg.includes('duplicate')) {
      return { error: 'That slug is already taken. Please choose another.' }
    }
    return { error: 'Failed to save profile. Please try again.' }
  }

  revalidatePath('/settings')
  return { success: true }
}
