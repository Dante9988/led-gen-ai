import Link from 'next/link'
import { getLeads } from '@/lib/leads'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { LeadsTable } from '@/components/leads/LeadsTable'

export default async function LeadsPage() {
  const leads = await getLeads()

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Leads"
        description={`${leads.length} total prospect${leads.length !== 1 ? 's' : ''}`}
        action={
          <Link href="/leads/new">
            <Button size="sm">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Lead
            </Button>
          </Link>
        }
      />
      <LeadsTable leads={leads} />
    </div>
  )
}
