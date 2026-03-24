'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns'
import { updateLeadStatusAction, logContactAction } from '@/app/actions/leads'
import type { Lead, LeadStatus } from '@/types'
import { cn } from '@/lib/utils'

const getNextStatus = (current: LeadStatus): LeadStatus | null => {
  switch (current) {
    case 'new': return 'contacted'
    case 'contacted': return 'qualified'
    case 'qualified': return 'closed'
    default: return null
  }
}

const getNextActionLabel = (current: LeadStatus): string | null => {
  switch (current) {
    case 'new': return 'Mark as Contacted'
    case 'contacted': return 'Mark as Qualified'
    case 'qualified': return 'Mark as Closed'
    default: return null
  }
}

const getStatusHint = (current: LeadStatus): string | null => {
  switch (current) {
    case 'new': return 'Contact this lead'
    case 'contacted': return 'Follow up soon'
    case 'qualified': return 'Close this lead'
    default: return null
  }
}

const SOURCE_COLORS: Record<string, string> = {
  instagram: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white border-0',
  facebook: 'bg-blue-600 text-white border-0',
  tiktok: 'bg-black text-white border border-gray-700',
  referral: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  public_form: 'bg-violet-500/20 text-violet-400 border border-violet-500/30',
}

function SourceBadge({ source }: { source: string | null }) {
  if (!source) return null
  const key = source.toLowerCase().replace(/\s+/g, '_')
  const style = SOURCE_COLORS[key] || 'bg-[var(--elevated)] text-[var(--muted)] border border-[var(--border)]'
  
  return (
    <span className={cn('px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm', style)}>
      {source}
    </span>
  )
}

const getAILabel = (current: LeadStatus): string => {
  switch (current) {
    case 'new': return 'Generate First Message'
    case 'contacted': return 'Generate Follow-up'
    case 'qualified': return 'Generate Closing Message'
    default: return 'AI Follow-up'
  }
}

export function LeadCard({ lead, optimisticUpdate, onOpenAI }: { lead: Lead, optimisticUpdate: (id: string, newStatus: LeadStatus) => void, onOpenAI?: (lead: Lead) => void }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPending, startTransition] = useTransition()
  
  const nextStatus = getNextStatus(lead.status)
  const actionLabel = getNextActionLabel(lead.status)
  const hint = getStatusHint(lead.status)
  const aiLabel = getAILabel(lead.status)

  const handleStatusUpdate = (e: React.MouseEvent, status: LeadStatus) => {
    e.preventDefault()
    e.stopPropagation()
    
    optimisticUpdate(lead.id, status)
    
    startTransition(async () => {
      await updateLeadStatusAction(lead.id, status)
    })
  }

  const today = new Date()
  let urgencyPill = null
  if (lead.next_follow_up_at) {
    const followUpDate = new Date(lead.next_follow_up_at)
    if (isPast(followUpDate) || isToday(followUpDate)) {
      urgencyPill = { label: 'Follow up Today!', color: 'bg-red-500/10 text-red-500 border-red-500/20 font-bold' }
    } else if (isTomorrow(followUpDate)) {
      urgencyPill = { label: 'Follow up Tomorrow', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20 font-bold' }
    } else {
      urgencyPill = { label: `Follow up in ${formatDistanceToNow(followUpDate)}`, color: 'bg-blue-500/10 text-blue-500 border-blue-500/20 font-medium' }
    }
  } else if (lead.last_contacted_at && !['closed', 'lost'].includes(lead.status)) {
    const diffHours = (today.getTime() - new Date(lead.last_contacted_at).getTime()) / (1000 * 60 * 60)
    if (diffHours > 24) {
      urgencyPill = { label: 'Needs Follow-up', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20 font-bold animate-pulse' }
    }
  }

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className="group bg-[var(--surface)] hover:bg-[var(--elevated)] border border-[var(--border)] rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(124,58,237,0.15)] hover:border-violet-500/40 cursor-pointer relative flex flex-col gap-3"
    >
      {/* Header: Hint, Source, and Time */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col gap-1 items-start">
          <div className="flex items-center gap-1.5 flex-wrap">
            <SourceBadge source={lead.source} />
            {urgencyPill && (
              <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider shadow-sm border ${urgencyPill.color}`}>
                {urgencyPill.label}
              </span>
            )}
            {lead.contact_attempts > 0 && (
              <span className="flex items-center gap-0.5 text-[9px] font-bold text-[var(--subtle)] bg-black/20 border border-[var(--border)] px-1.5 py-0.5 rounded shadow-sm" title={`${lead.contact_attempts} contact attempts`}>
                <svg className="w-2.5 h-2.5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                {lead.contact_attempts}
              </span>
            )}
          </div>
          {hint && (
            <span className="text-[9px] font-bold text-violet-400/90 uppercase tracking-widest mt-0.5">
              {hint}
            </span>
          )}
        </div>
        <span className="text-[10px] text-[var(--subtle)] whitespace-nowrap" title={new Date(lead.created_at).toLocaleString()}>
          {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
        </span>
      </div>

      {/* Main Info */}
      <div>
        <h4 className="font-bold text-[var(--text)] text-base group-hover:text-violet-400 transition-colors truncate">
          {lead.full_name}
        </h4>
        <div className="space-y-0.5 mt-1 text-[11px] text-[var(--muted)]">
          {lead.email && <div className="truncate">{lead.email}</div>}
          {lead.phone && <div className="truncate">{lead.phone}</div>}
          {!lead.email && !lead.phone && <span className="text-[var(--subtle)] italic">No contact info</span>}
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-1 pt-3 border-t border-[var(--border)] text-sm animate-in fade-in slide-in-from-top-2 duration-200" onClick={e => e.stopPropagation()}>
          {lead.notes ? (
            <div className="mb-3">
              <p className="text-[10px] uppercase tracking-wider text-[var(--subtle)] mb-1 font-semibold">Notes</p>
              <div className="text-[12px] text-[var(--muted)] bg-black/20 rounded-lg p-2.5 max-h-32 overflow-y-auto whitespace-pre-wrap border border-[var(--border)]">
                {lead.notes}
              </div>
            </div>
          ) : (
             <p className="text-[11px] text-[var(--subtle)] italic mb-3">No notes provided.</p>
          )}
          
          <Link 
            href={`/leads/${lead.id}`} 
            className="inline-flex text-[11px] font-medium text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 px-2.5 py-1.5 rounded-md transition-colors items-center gap-1"
          >
            View full profile
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-auto pt-3 flex flex-col gap-2.5 border-t border-[var(--border)]" onClick={e => e.stopPropagation()}>
        
        {/* Top Row: Comm Icons & AI Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-1.5">
            {lead.phone && (
              <>
                <a 
                  href={`tel:${lead.phone}`} 
                  onClick={() => startTransition(() => { logContactAction(lead.id, 'phone') })}
                  title="Call Prospect" 
                  className="p-1.5 text-[var(--subtle)] hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all hover:scale-110 active:scale-95 bg-[var(--bg)] border border-[var(--border)] hover:border-blue-400/30 shadow-sm"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </a>
                <a 
                  href={`sms:${lead.phone}`} 
                  onClick={() => startTransition(() => { logContactAction(lead.id, 'sms') })}
                  title="Text Prospect" 
                  className="p-1.5 text-[var(--subtle)] hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-all hover:scale-110 active:scale-95 bg-[var(--bg)] border border-[var(--border)] hover:border-green-400/30 shadow-sm"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                </a>
              </>
            )}
            {lead.email && (
              <a 
                href={`mailto:${lead.email}`} 
                onClick={() => startTransition(() => { logContactAction(lead.id, 'email') })}
                title="Email Prospect" 
                className="p-1.5 text-[var(--subtle)] hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all hover:scale-110 active:scale-95 bg-[var(--bg)] border border-[var(--border)] hover:border-rose-400/30 shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            )}
          </div>
          
          {onOpenAI && (
            <button
              onClick={(e) => { e.stopPropagation(); onOpenAI(lead) }}
              title="Generate an AI message for this lead"
              className="px-2.5 py-1.5 text-[10px] font-bold tracking-wide text-violet-400 hover:text-white hover:bg-violet-600 bg-violet-500/10 border border-violet-500/30 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-[0_2px_10px_rgb(124,58,237,0.1)] flex items-center justify-center gap-1.5"
            >
              <span className="text-[12px] leading-none -mt-0.5">🤖</span>
              {aiLabel}
            </button>
          )}
        </div>

        {/* Primary Action Button */}
        {nextStatus && actionLabel && (
          <button
            disabled={isPending}
            onClick={(e) => handleStatusUpdate(e, nextStatus)}
            className="w-full text-[10px] font-bold tracking-wide uppercase px-3 py-2 rounded-lg bg-[var(--elevated)] border border-[var(--border)] hover:bg-[var(--surface)] hover:text-[var(--text)] text-[var(--muted)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 hover:shadow-md"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}
