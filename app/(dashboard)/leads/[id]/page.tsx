import { notFound } from 'next/navigation'
import { getLead } from '@/lib/leads'
import { StatusBadge } from '@/components/ui/Badge'
import { BackLink } from '@/components/ui/BackLink'
import { Card } from '@/components/ui/Card'
import { DeleteLeadButton } from '@/components/leads/DeleteLeadButton'
import { EditLeadSection } from '@/components/leads/EditLeadSection'
import { LeadStatusContextActions } from '@/components/leads/LeadStatusContextActions'
import { LeadTimeline } from '@/components/leads/LeadTimeline'

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs font-medium text-[var(--subtle)] uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm text-[var(--text)]">{value ?? '—'}</p>
    </div>
  )
}

function ContactAction({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-[var(--border)] bg-[var(--elevated)] hover:bg-[var(--surface)] hover:border-violet-500/50 transition-all group"
    >
      <div className="text-[var(--subtle)] group-hover:text-violet-400 mb-2 transition-colors">
        {icon}
      </div>
      <span className="text-xs font-medium text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">
        {label}
      </span>
    </a>
  )
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const lead = await getLead(id)
  if (!lead) notFound()

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex justify-between items-start">
        <BackLink href="/leads" label="Leads Pipeline" />
        <LeadStatusContextActions lead={lead} />
      </div>

      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-[var(--text)]">{lead.full_name}</h1>
        <StatusBadge status={lead.status} />
      </div>

      {/* Quick Actions Grid */}
      {(lead.phone || lead.email) && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {lead.phone && (
            <>
              <ContactAction
                href={`tel:${lead.phone}`}
                label="Call"
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
              />
              <ContactAction
                href={`sms:${lead.phone}`}
                label="Text"
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
              />
            </>
          )}
          {lead.email && (
            <ContactAction
              href={`mailto:${lead.email}`}
              label="Email"
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            />
          )}
        </div>
      )}

      <Card padding="lg">
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          <Field label="Email" value={lead.email} />
          <Field label="Phone" value={lead.phone} />
          <Field label="Source" value={lead.source} />
          <Field label="Added" value={new Date(lead.created_at).toLocaleDateString()} />
        </div>
        {lead.notes && (
          <div className="mt-5 pt-5 border-t border-[var(--border)]">
            <p className="text-xs font-medium text-[var(--subtle)] uppercase tracking-wider mb-2">Notes</p>
            <p className="text-sm text-[var(--muted)] whitespace-pre-wrap leading-relaxed">{lead.notes}</p>
          </div>
        )}
      </Card>

      <EditLeadSection lead={lead} />

      <LeadTimeline lead={lead} />

      <div className="flex justify-end pt-4">
        <DeleteLeadButton id={lead.id} />
      </div>
    </div>
  )
}
