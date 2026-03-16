import Link from 'next/link'
import { createLeadAction } from '@/app/actions/leads'
import { BackLink } from '@/components/ui/BackLink'
import { Card } from '@/components/ui/Card'
import { LeadForm } from '@/components/leads/LeadForm'

export default function NewLeadPage() {
  return (
    <div className="max-w-2xl space-y-5">
      <BackLink href="/leads" label="Leads" />
      <h1 className="text-xl font-semibold text-[var(--text)]">Add Lead</h1>
      <Card padding="lg">
        <LeadForm action={createLeadAction} submitLabel="Add Lead" />
      </Card>
    </div>
  )
}
