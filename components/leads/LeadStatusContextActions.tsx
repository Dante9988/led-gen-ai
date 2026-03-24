'use client'

import { useState, useTransition } from 'react'
import { updateLeadStatusAction } from '@/app/actions/leads'
import { Button } from '@/components/ui/Button'
import type { Lead, LeadStatus } from '@/types'
import { STATUS_LABELS, LEAD_STATUSES } from '@/types'
import { cn } from '@/lib/utils'

export function LeadStatusContextActions({ lead }: { lead: Lead }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleStatusUpdate = (status: LeadStatus) => {
    setIsOpen(false)
    startTransition(async () => {
      await updateLeadStatusAction(lead.id, status)
    })
  }

  return (
    <div className="relative">
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
      >
        {isPending ? 'Updating...' : 'Update Status'}
        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1 w-40 py-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-xl z-50">
            {LEAD_STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusUpdate(status)}
                disabled={status === lead.status}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm transition-colors",
                  status === lead.status 
                    ? "text-[var(--subtle)] bg-white/5 cursor-default flex justify-between items-center" 
                    : "text-[var(--text)] hover:bg-[var(--elevated)] hover:text-violet-400"
                )}
              >
                {STATUS_LABELS[status]}
                {status === lead.status && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
