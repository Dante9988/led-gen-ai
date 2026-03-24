import { cn } from '@/lib/utils'
import type { LeadStatus } from '@/types'

const statusColors: Record<LeadStatus, string> = {
  new: 'bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/25',
  contacted: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/25',
  qualified: 'bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/25',
  closed: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/25',
  lost: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/25',
}

const statusLabels: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  closed: 'Closed',
  lost: 'Lost',
}

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
      statusColors[status]
    )}>
      {statusLabels[status]}
    </span>
  )
}
