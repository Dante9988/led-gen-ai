import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CsvImporter } from '@/components/import/CsvImporter'
import { BackLink } from '@/components/ui/BackLink'

export default function ImportPage() {
  return (
    <div className="max-w-2xl space-y-5">
      <BackLink href="/leads" label="Leads" />
      <SectionHeader
        title="Import Leads"
        description="Upload a CSV file to bulk import leads into your CRM."
      />

      <Card padding="lg">
        <div className="mb-5 pb-5 border-b border-[var(--border)]">
          <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2">Required CSV format</p>
          <div className="flex gap-2 flex-wrap">
            {['full_name', 'phone', 'email', 'source', 'status', 'notes'].map(h => (
              <code key={h} className="text-xs px-2 py-1 rounded bg-[var(--elevated)] border border-[var(--border)] text-[var(--muted)]">
                {h}
              </code>
            ))}
          </div>
          <p className="text-xs text-[var(--subtle)] mt-2">Headers must match exactly. <code className="text-violet-400">full_name</code> or <code className="text-violet-400">phone</code> required. Missing source defaults to <code>csv_import</code>, missing status defaults to <code>New</code>.</p>
        </div>

        <CsvImporter />
      </Card>
    </div>
  )
}
