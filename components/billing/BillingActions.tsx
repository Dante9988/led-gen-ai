'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { Plan } from '@/types/billing'

interface BillingActionsProps {
  plan: Plan
  hasCustomer: boolean
}

export function BillingActions({ plan, hasCustomer }: BillingActionsProps) {
  const [loading, setLoading] = useState<string | null>(null)

  async function handleCheckout(targetPlan: 'pro' | 'pro_plus') {
    setLoading(targetPlan)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: targetPlan }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else setLoading(null)
  }

  async function handlePortal() {
    setLoading('portal')
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else setLoading(null)
  }

  if (plan === 'free') {
    return (
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={() => handleCheckout('pro')}
          disabled={loading !== null}
          size="sm"
        >
          {loading === 'pro' ? 'Redirecting…' : 'Upgrade to Pro'}
        </Button>
        <Button
          onClick={() => handleCheckout('pro_plus')}
          disabled={loading !== null}
          variant="secondary"
          size="sm"
        >
          {loading === 'pro_plus' ? 'Redirecting…' : 'Upgrade to Pro Plus'}
        </Button>
      </div>
    )
  }

  if (plan === 'pro') {
    return (
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={() => handleCheckout('pro_plus')}
          disabled={loading !== null}
          size="sm"
        >
          {loading === 'pro_plus' ? 'Redirecting…' : 'Upgrade to Pro Plus'}
        </Button>
        {hasCustomer && (
          <Button
            onClick={handlePortal}
            disabled={loading !== null}
            variant="secondary"
            size="sm"
          >
            {loading === 'portal' ? 'Redirecting…' : 'Manage Subscription'}
          </Button>
        )}
      </div>
    )
  }

  // Pro Plus — can only manage
  return hasCustomer ? (
    <Button
      onClick={handlePortal}
      disabled={loading !== null}
      variant="secondary"
      size="sm"
    >
      {loading === 'portal' ? 'Redirecting…' : 'Manage Subscription'}
    </Button>
  ) : null
}
