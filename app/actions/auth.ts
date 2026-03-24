'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

/* ─── Helpers ──────────────────────────────────────────────────────── */

async function getOrigin(): Promise<string> {
  const hdrs = await headers()
  const host = hdrs.get('host') ?? 'localhost:3000'
  const proto = host.startsWith('localhost') ? 'http' : 'https'
  return `${proto}://${host}`
}

/* ─── Email / Password Login ──────────────────────────────────────── */

export async function login(
  _: unknown,
  formData: FormData
): Promise<{ error: string } | void> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    // If user hasn't confirmed email yet, nudge them to check-email page
    if (error.message.toLowerCase().includes('email not confirmed')) {
      const email = formData.get('email') as string
      redirect(`/check-email?email=${encodeURIComponent(email)}`)
    }
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

/* ─── Email / Password Signup ─────────────────────────────────────── */

export async function signup(
  _: unknown,
  formData: FormData
): Promise<{ error: string } | void> {
  const supabase = await createClient()
  const origin = await getOrigin()
  const email = formData.get('email') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password: formData.get('password') as string,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) return { error: error.message }

  // Supabase returns identities = [] when email already exists but is unconfirmed,
  // or when the user needs to confirm. Check if confirmation is needed.
  const needsConfirmation =
    !data.session ||
    data.user?.identities?.length === 0 ||
    data.user?.email_confirmed_at == null

  if (needsConfirmation) {
    redirect(`/check-email?email=${encodeURIComponent(email)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

/* ─── Google OAuth ────────────────────────────────────────────────── */

export async function signInWithGoogle(): Promise<{ url?: string; error?: string }> {
  const supabase = await createClient()
  const origin = await getOrigin()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) return { error: error.message }
  if (data.url) return { url: data.url }

  return { error: 'No redirect URL returned from Google.' }
}

/* ─── Resend Confirmation Email ───────────────────────────────────── */

export async function resendConfirmation(
  _: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient()
  const origin = await getOrigin()
  const email = formData.get('email') as string

  if (!email) return { error: 'Email is required.' }

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) return { error: error.message }
  return { success: true }
}

/* ─── Logout ──────────────────────────────────────────────────────── */

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
