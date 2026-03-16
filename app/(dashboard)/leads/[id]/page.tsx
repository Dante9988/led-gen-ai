import { notFound } from 'next/navigation'
import { getLead } from '@/lib/leads'
import { StatusBadge } from '@/components/ui/Badge'
import { BackLink } from '@/components/ui/BackLink'
import { Card } from '@/components/ui/Card'
import { DeleteLeadButton } from '@/components/leads/DeleteLeadButton'
import { EditLeadSection } from '@/components/leads/EditLeadSection'

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs font-medium text-[var(--subtle)] uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm text-[var(--text)]">{value ?? '—'}</p>
    </div>
  )
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const lead = await getLead(id)
  if (!lead) notFound()

  return (
    <div className="max-w-2xl space-y-6">
      <BackLink href="/leads" label="Leads" />

      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-[var(--text)]">{lead.full_name}</h1>
        <StatusBadge status={lead.status} />
      </div>

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

      <div className="flex justify-end">
        <DeleteLeadButton id={lead.id} />
      </div>
    </div>
  )
}
