'use client'

import { useState, useOptimistic, startTransition } from 'react'
import { LeadCard } from '@/components/leads/LeadCard'
import { PipelineEmptyState } from '@/components/leads/PipelineEmptyState'
import { AIAssistantModal } from '@/components/leads/AIAssistantModal'
import type { Lead, LeadStatus } from '@/types'
import { LEAD_STATUSES, STATUS_LABELS } from '@/types'
import { cn } from '@/lib/utils'

const COLUMN_COLORS: Record<LeadStatus, string> = {
  new: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
  contacted: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
  qualified: 'border-violet-500/30 bg-violet-500/5 text-violet-400',
  closed: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
  lost: 'border-rose-500/30 bg-rose-500/5 text-rose-400',
}

const MOBILE_TAB_ACTIVE: Record<LeadStatus, string> = {
  new: 'bg-blue-500/20 border border-blue-500/40 text-blue-400',
  contacted: 'bg-amber-500/20 border border-amber-500/40 text-amber-400',
  qualified: 'bg-violet-500/20 border border-violet-500/40 text-violet-400',
  closed: 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400',
  lost: 'bg-rose-500/20 border border-rose-500/40 text-rose-400',
}

export function LeadsPipeline({ initialLeads, captureUrl }: { initialLeads: Lead[], captureUrl: string | null }) {
  const [query, setQuery] = useState('')
  const [activeAILead, setActiveAILead] = useState<Lead | null>(null)
  const [activeMobileTab, setActiveMobileTab] = useState<LeadStatus>('new')

  const [optimisticLeads, setOptimisticLead] = useOptimistic(
    initialLeads,
    (state, { id, newStatus }: { id: string, newStatus: LeadStatus }) =>
      state.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead)
  )

  const handleOptimisticUpdate = (id: string, newStatus: LeadStatus) => {
    startTransition(() => {
      setOptimisticLead({ id, newStatus })
    })
  }

  const filtered = query.trim()
    ? optimisticLeads.filter(l =>
        l.full_name.toLowerCase().includes(query.toLowerCase()) ||
        (l.email ?? '').toLowerCase().includes(query.toLowerCase()) ||
        (l.phone ?? '').toLowerCase().includes(query.toLowerCase())
      )
    : optimisticLeads

  return (
    <div className="flex flex-col gap-4">
      {/* Search bar — full width on mobile, constrained on desktop */}
      <div className="relative shrink-0 md:max-w-sm">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--subtle)] pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input
          type="search"
          placeholder="Filter pipeline leads…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-10 pr-3 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] shadow-sm placeholder:text-[var(--subtle)] focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition-all"
        />
      </div>

      {/* ── Mobile view: status tabs + single-column list ── */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Scrollable status pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-0">
          {LEAD_STATUSES.map(status => {
            const count = filtered.filter(l => l.status === status).length
            return (
              <button
                key={status}
                onClick={() => setActiveMobileTab(status)}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 min-h-[40px]',
                  activeMobileTab === status
                    ? MOBILE_TAB_ACTIVE[status]
                    : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]'
                )}
              >
                {STATUS_LABELS[status]}
                <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px] font-bold">{count}</span>
              </button>
            )
          })}
        </div>

        {/* Active column header */}
        <div className={cn('px-4 py-3 rounded-xl border flex items-center justify-between', COLUMN_COLORS[activeMobileTab])}>
          <h3 className="font-bold text-[13px] uppercase tracking-wider">{STATUS_LABELS[activeMobileTab]}</h3>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/20 text-inherit">
            {filtered.filter(l => l.status === activeMobileTab).length}
          </span>
        </div>

        {/* Lead cards for active tab */}
        <div className="space-y-3 pb-6">
          {filtered.filter(l => l.status === activeMobileTab).length > 0 ? (
            filtered.filter(l => l.status === activeMobileTab).map(lead => (
              <LeadCard
                key={lead.id}
                lead={lead}
                optimisticUpdate={handleOptimisticUpdate}
                onOpenAI={setActiveAILead}
              />
            ))
          ) : (
            <PipelineEmptyState status={activeMobileTab} captureUrl={captureUrl} />
          )}
        </div>
      </div>

      {/* ── Desktop view: horizontal kanban columns ── */}
      <div className="hidden md:flex gap-4 overflow-x-auto pb-6 h-[calc(100vh-20rem)] min-h-[420px] snap-x pt-2">
        {LEAD_STATUSES.map(status => {
          const columnLeads = filtered.filter(l => l.status === status)

          return (
            <div
              key={status}
              className="flex flex-col min-w-[300px] w-[300px] max-w-[300px] snap-start bg-[var(--bg)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm hover:border-[var(--border-md)] transition-colors"
            >
              <div className={`px-4 py-3.5 border-b flex items-center justify-between shadow-sm ${COLUMN_COLORS[status]}`}>
                <h3 className="font-bold text-[13px] uppercase tracking-wider">{STATUS_LABELS[status]}</h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/20 text-inherit">{columnLeads.length}</span>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gradient-to-b from-[var(--surface)] to-[var(--bg)] custom-scrollbar">
                {columnLeads.length > 0 ? (
                  columnLeads.map(lead => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      optimisticUpdate={handleOptimisticUpdate}
                      onOpenAI={setActiveAILead}
                    />
                  ))
                ) : (
                  <PipelineEmptyState status={status} captureUrl={captureUrl} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {activeAILead && (
        <AIAssistantModal
          lead={activeAILead}
          onClose={() => setActiveAILead(null)}
        />
      )}
    </div>
  )
}
