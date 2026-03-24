'use client'

import { useTransition } from 'react'
import type { Lead, LeadActivity } from '@/types'
import { scheduleFollowUpAction } from '@/app/actions/leads'
import { formatDistanceToNow } from 'date-fns'

export function LeadTimeline({ lead }: { lead: Lead }) {
  const [isPending, startTransition] = useTransition()

  const handleSchedule = (days: number, label: string) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    startTransition(() => {
      scheduleFollowUpAction(lead.id, date.toISOString(), label)
    })
  }

  // Merge created_at artificially into activity_log for a complete visual timeline
  const logs: LeadActivity[] = [
    { id: 'created', type: 'system' as const, title: 'Lead entered system', date: lead.created_at, detail: undefined },
    ...(lead.activity_log || [])
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-[var(--text)] flex items-center gap-2">
            <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Activity Timeline
          </h3>
          <p className="text-[11px] text-[var(--muted)] mt-1">Track contact attempts and schedule future follow-ups.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            disabled={isPending}
            onClick={() => handleSchedule(1, 'Tomorrow')}
            className="text-[11px] uppercase tracking-wider font-bold bg-amber-500/10 text-amber-500 hover:bg-amber-500 text-amber-400 hover:text-white border border-amber-500/20 px-3 py-1.5 rounded-lg transition-all"
          >
            Follow up in 24h
          </button>
          <button 
            disabled={isPending}
            onClick={() => handleSchedule(2, 'in 48 hours')}
            className="text-[11px] uppercase tracking-wider font-bold bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500/20 px-3 py-1.5 rounded-lg transition-all"
          >
            Follow up in 2 Days
          </button>
        </div>
      </div>

      {lead.next_follow_up_at && (
        <div className="mb-6 mx-2 p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-sm flex items-center justify-between shadow-inner">
          <span className="text-blue-400 font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Scheduled Follow-up
          </span>
          <span className="text-blue-300/80 text-xs font-medium">{new Date(lead.next_follow_up_at).toLocaleString()}</span>
        </div>
      )}

      <div className="relative border-l border-[var(--border)] ml-3 space-y-6 pt-2 pb-2">
        {logs.map((log, i) => {
          const isLatest = i === 0;
          return (
            <div key={log.id} className="relative pl-6 group">
              <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 ${isLatest ? 'bg-violet-500 border-violet-500/30' : 'bg-[var(--elevated)] border-[var(--border)] group-hover:border-violet-500/50'} transition-colors`} />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4">
                <div>
                  <p className={`text-sm font-medium ${isLatest ? 'text-violet-400' : 'text-[var(--text)]'}`}>{log.title}</p>
                  {log.detail && <p className="text-xs text-[var(--muted)] mt-0.5">{log.detail}</p>}
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--subtle)] mt-1 block opacity-70">
                    {log.type.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-[10px] text-[var(--subtle)] whitespace-nowrap" title={new Date(log.date).toLocaleString()}>
                  {formatDistanceToNow(new Date(log.date), { addSuffix: true })}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
