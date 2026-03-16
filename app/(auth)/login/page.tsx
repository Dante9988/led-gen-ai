'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { login } from '@/app/actions/auth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null)

  return (
    <div className="flex items-center justify-center bg-[var(--bg)] w-full pb-20">
      <div className="w-full max-w-sm px-4">
        {/* Logo mark */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-700 mb-4">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-[var(--text)]">ProspectFlow</h1>
          <p className="text-sm text-[var(--muted)] mt-0.5">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
          {state?.error && (
            <div className="mb-4 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <Input id="email" name="email" type="email" label="Email" placeholder="you@example.com" required autoComplete="email" />
            <Input id="password" name="password" type="password" label="Password" placeholder="••••••••" required autoComplete="current-password" />
            <Button type="submit" disabled={isPending} className="w-full" size="lg">
              {isPending ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <p className="text-center text-sm text-[var(--muted)] mt-5">
            No account?{' '}
            <Link href="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
