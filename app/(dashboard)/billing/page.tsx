import { getSubscription } from '@/lib/billing'
import { getPlanAccess } from '@/lib/access'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { PLAN_LABELS } from '@/lib/stripe'
import { BillingActions } from '@/components/billing/BillingActions'

export default async function BillingPage() {
  const [sub, access] = await Promise.all([getSubscription(), getPlanAccess()])

  const plan = sub?.plan ?? 'free'
  const planLabel = PLAN_LABELS[plan]
  const isActive = !sub || sub.status === 'active' || sub.status === 'trialing'
  const periodEnd = sub?.current_period_end
    ? new Date(sub.current_period_end).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null

  return (
    <div className="max-w-2xl space-y-6">
      <SectionHeader
        title="Billing"
        description="Manage your subscription and plan."
      />

      {/* Current plan card */}
      <Card padding="lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-1">Current Plan</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-[var(--text)]">{planLabel}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {sub?.status ?? 'active'}
              </span>
            </div>
            {periodEnd && plan !== 'free' && (
              <p className="text-xs text-[var(--muted)] mt-1">
                {sub?.status === 'canceled' ? 'Access until' : 'Renews'} {periodEnd}
              </p>
            )}
          </div>

          {/* Plan feature summary */}
          <div className="text-right text-xs text-[var(--subtle)] space-y-1 shrink-0">
            <p>{access.maxLeads ? `Up to ${access.maxLeads} leads` : 'Unlimited leads'}</p>
            <p>{access.canUseAI ? '✓ AI tools' : '✗ AI tools'}</p>
            <p>{access.canImportCSV ? '✓ CSV import' : '✗ CSV import'}</p>
          </div>
        </div>

        <div className="mt-5 border-t border-[var(--border)] pt-5">
          <BillingActions plan={plan} hasCustomer={!!sub?.stripe_customer_id} />
        </div>
      </Card>

      {/* Plan comparison */}
      <Card variant="inset" padding="md">
        <p className="text-xs font-semibold text-[var(--text)] mb-3">Compare Plans</p>
        <div className="grid grid-cols-3 gap-3 text-xs">
          {(['free', 'pro', 'pro_plus'] as const).map(p => (
            <div
              key={p}
              className={`rounded-lg p-3 border ${p === plan
                ? 'border-violet-500/40 bg-violet-500/5'
                : 'border-[var(--border)] bg-[var(--elevated)]'
              }`}
            >
              <p className={`font-semibold mb-2 ${p === plan ? 'text-violet-400' : 'text-[var(--text)]'}`}>
                {PLAN_LABELS[p]} {p === plan && '(current)'}
              </p>
              <ul className="space-y-1 text-[var(--muted)]">
                <li>{p === 'free' ? 'Up to 25 leads' : 'Unlimited leads'}</li>
                <li>{p === 'free' ? '✗ AI tools' : '✓ AI tools'}</li>
                <li>{p === 'free' ? '✗ CSV import' : '✓ CSV import'}</li>
                <li>✓ Capture link</li>
                <li>✓ CRM access</li>
                {p === 'pro_plus' && <li>✓ Priority support</li>}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
