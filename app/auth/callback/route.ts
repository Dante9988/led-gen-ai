import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ensureProfile } from '@/lib/profiles'

/**
 * GET /auth/callback
 *
 * Handles the redirect back from:
 *   • Supabase email confirmation links
 *   • Google OAuth flow
 *
 * Exchanges the one-time `code` for a session, bootstraps the user's
 * profile row if it doesn't exist yet, then redirects to /dashboard.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Bootstrap profile on first ever login (safe no-op if already exists)
      try {
        await ensureProfile()
      } catch {
        // Non-fatal — profile can be created later on dashboard load
      }

      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  // Something went wrong — send user back to login with an error hint
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}
