'use client'

import Link from 'next/link'
import { useState } from 'react'
import { PLAN_LABELS } from '@/lib/stripe'
import type { Plan } from '@/types/billing'

interface UpgradeBannerProps {
  feature: string
  requiredPlan?: Plan
}

export function UpgradeBanner({ feature, requiredPlan = 'pro' }: UpgradeBannerProps) {
  const planLabel = PLAN_LABELS[requiredPlan]
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: requiredPlan }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else setLoading(false)
  }

  return (
    <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-6 text-center space-y-3">
      <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto">
        <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-[var(--text)]">{feature} requires {planLabel}</p>
        <p className="text-xs text-[var(--muted)] mt-0.5">
          Upgrade your plan to unlock this feature.
        </p>
      </div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleUpgrade}
          disabled={loading}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-violet-700 hover:bg-violet-600 disabled:opacity-50 transition-all"
        >
          {loading ? 'Redirecting…' : `Upgrade to ${planLabel}`}
        </button>
        <Link
          href="/billing"
          className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--muted)] bg-[var(--elevated)] border border-[var(--border)] hover:border-[var(--border-md)] transition-all"
        >
          View Plans
        </Link>
      </div>
    </div>
  )
}
