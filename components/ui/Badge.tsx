import { cn } from '@/lib/utils'
import type { LeadStatus } from '@/types'

const statusColors: Record<LeadStatus, string> = {
  New:          'bg-blue-500/15   text-blue-300   ring-1 ring-blue-500/25',
  Contacted:    'bg-amber-500/15  text-amber-300  ring-1 ring-amber-500/25',
  Interested:   'bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/25',
  'Follow-up':  'bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/25',
  Closed:       'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/25',
}

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
      statusColors[status]
    )}>
      {status}
    </span>
  )
}
