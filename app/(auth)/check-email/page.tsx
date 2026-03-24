'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'
import Link from 'next/link'
import { resendConfirmation } from '@/app/actions/auth'
import { Button } from '@/components/ui/Button'

function CheckEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''

  const [state, formAction, isPending] = useActionState(resendConfirmation, null)

  return (
    <div className="flex items-center justify-center bg-[var(--bg)] w-full pb-20">
      <div className="w-full max-w-sm px-4">
        {/* Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-700/20 border border-violet-500/20 mb-5">
            <svg className="w-7 h-7 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-[var(--text)]">Check your email</h1>
          <p className="text-sm text-[var(--muted)] mt-1.5 leading-relaxed">
            We sent a confirmation link to
            {email && (
              <span className="block text-violet-400 font-medium mt-1">{email}</span>
            )}
          </p>
        </div>

        {/* Card */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 space-y-4">
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Click the link in the email to activate your account. If you don&apos;t see it, check your spam folder.
          </p>

          {/* Success / Error feedback */}
          {state?.success && (
            <div className="px-3 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400">
              Confirmation email resent! Check your inbox.
            </div>
          )}
          {state?.error && (
            <div className="px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {state.error}
            </div>
          )}

          {/* Resend form */}
          {email && (
            <form action={formAction}>
              <input type="hidden" name="email" value={email} />
              <Button
                type="submit"
                variant="secondary"
                className="w-full"
                size="lg"
                disabled={isPending}
              >
                {isPending ? 'Sending…' : 'Resend confirmation email'}
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-[var(--muted)] pt-2">
            <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              ← Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center bg-[var(--bg)] w-full pb-20">
        <div className="w-full max-w-sm px-4 text-center">
          <p className="text-sm text-[var(--muted)]">Loading…</p>
        </div>
      </div>
    }>
      <CheckEmailContent />
    </Suspense>
  )
}
