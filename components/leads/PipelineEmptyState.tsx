'use client'

import { useState } from 'react'
import type { LeadStatus } from '@/types'

export function PipelineEmptyState({ status, captureUrl }: { status: LeadStatus, captureUrl: string | null }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!captureUrl) return
    navigator.clipboard.writeText(captureUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (status === 'new') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-5 text-center bg-[var(--surface)] rounded-lg mx-3 my-2 border border-dashed border-[var(--border)]">
        <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center mb-3">
          <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        </div>
        <p className="text-sm font-semibold text-[var(--text)] mb-1.5">No new leads</p>
        <p className="text-xs text-[var(--muted)] mb-5 leading-relaxed">Share your capture link across social channels to get prospects directly into your pipeline.</p>
        
        {captureUrl && (
          <div className="space-y-2.5 w-full">
            <button 
              onClick={handleCopy}
              className="w-full py-2.5 px-3 bg-[var(--elevated)] hover:bg-[var(--bg)] border border-[var(--border)] hover:border-violet-500/50 rounded-lg text-xs font-semibold text-[var(--text)] transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
              {copied ? 'Copied to Clipboard!' : 'Copy Capture Link'}
            </button>
            <a 
              href={captureUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-violet-600 hover:bg-violet-500 rounded-lg text-xs font-semibold text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
            >
              Open Public Page
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        )}
      </div>
    )
  }

  // Generic empty state for other columns
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 text-center">
      <div className="w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center mb-2 shadow-sm">
        <svg className="w-4 h-4 text-[var(--subtle)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
      </div>
      <p className="text-[11px] text-[var(--subtle)] font-medium italic w-full">
        Move leads here to track them as {status}.
      </p>
    </div>
  )
}
