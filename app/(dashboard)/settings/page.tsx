import { headers } from 'next/headers'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ShareableLink } from '@/components/ui/ShareableLink'
import { ProfileForm } from '@/components/profile/ProfileForm'
import { ensureProfile } from '@/lib/profiles'

export default async function SettingsPage() {
  let profile
  let setupError: string | null = null

  try {
    profile = await ensureProfile()
  } catch (e: unknown) {
    const msg = (e as { message?: string }).message ?? 'Unknown error'
    // Most likely cause: profiles table not created yet or missing SUPABASE_SERVICE_ROLE_KEY
    console.error('ensureProfile error:', msg)
    setupError = msg
  }

  const headersList = await headers()
  const host = headersList.get('host') ?? 'localhost:3000'
  const proto = host.startsWith('localhost') || host.startsWith('127') ? 'http' : 'https'
  const captureUrl = profile ? `${proto}://${host}/apply/${profile.slug}` : null

  return (
    <div className="max-w-2xl space-y-6">
      <SectionHeader
        title="Settings"
        description="Manage your public profile and lead capture link."
      />

      {/* Setup required banner */}
      {setupError && (
        <Card variant="inset" padding="md">
          <div className="flex gap-3">
            <svg className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-400">Setup required</p>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                Run the Phase 3 SQL migration in Supabase and ensure{' '}
                <code className="text-violet-400">SUPABASE_SERVICE_ROLE_KEY</code> is in your{' '}
                <code className="text-violet-400">.env.local</code>, then restart the dev server.
              </p>
              <p className="text-xs text-[var(--subtle)] mt-1 font-mono">{setupError}</p>
            </div>
          </div>
        </Card>
      )}

      {captureUrl && (
        <Card padding="lg">
          <h2 className="text-sm font-semibold text-[var(--text)] mb-1">Your Lead Capture Link</h2>
          <p className="text-xs text-[var(--muted)] mb-4">
            Share this link in your bio, posts, DMs, and stories to collect leads automatically.
          </p>
          <ShareableLink url={captureUrl} />
        </Card>
      )}

      {profile && (
        <Card padding="lg">
          <h2 className="text-sm font-semibold text-[var(--text)] mb-1">Public Profile</h2>
          <p className="text-xs text-[var(--muted)] mb-5">
            This information is shown on your public lead capture page.
          </p>
          <ProfileForm profile={profile} />
        </Card>
      )}

      {/* Webhook info */}
      <Card variant="inset" padding="md">
        <div className="flex items-start gap-3">
          <svg className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div>
            <p className="text-xs font-semibold text-[var(--text)]">Webhook Endpoint</p>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Connect Tally, Typeform, Zapier, or custom forms to:
            </p>
            <code className="text-xs text-violet-400 block mt-1">
              {proto}://{host}/api/webhooks/leads
            </code>
            <p className="text-xs text-[var(--subtle)] mt-1">
              Required: <code className="text-[var(--muted)]">agentSlug</code> +{' '}
              <code className="text-[var(--muted)]">full_name</code> or{' '}
              <code className="text-[var(--muted)]">phone</code>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
