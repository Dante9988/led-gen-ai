'use client'

import { useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { Loader } from '@/components/ui/Loader'
import type { ReplyResponse, ReplySuggestion } from '@/types/ai'

const TONE_CONFIG: Record<string, { label: string; accent: string; dot: string }> = {
  friendly:   { label: 'Friendly',   accent: 'border-l-emerald-500', dot: 'bg-emerald-400' },
  direct:     { label: 'Direct',     accent: 'border-l-blue-500',    dot: 'bg-blue-400' },
  qualified:  { label: 'Follow-up',  accent: 'border-l-violet-500',  dot: 'bg-violet-400' },
}

function ReplyCard({ suggestion }: { suggestion: ReplySuggestion }) {
  const config = TONE_CONFIG[suggestion.tone]

  return (
    <div className={`bg-[var(--surface)] border border-[var(--border)] rounded-lg p-5 border-l-2 ${config?.accent ?? 'border-l-[var(--border)]'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {config && <span className={`w-2 h-2 rounded-full ${config.dot}`} />}
          <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
            {suggestion.label}
          </span>
        </div>
        <CopyButton text={suggestion.text} />
      </div>
      <p className="text-sm text-[var(--text)] leading-relaxed whitespace-pre-wrap">{suggestion.text}</p>
    </div>
  )
}

export default function ReplyAssistantPage() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ReplyResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    setLoading(true); setError(null); setResult(null)
    try {
      const res = await fetch('/api/ai/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Something went wrong.'); return }
      setResult(data as ReplyResponse)
    } catch {
      setError('Network error. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <SectionHeader
        title="Reply Assistant"
        description="Paste a prospect's message and get 3 tailored reply suggestions."
      />

      <Card padding="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[var(--muted)] mb-1.5">
              Prospect message or conversation snippet
            </label>
            <textarea
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={6}
              maxLength={2000}
              placeholder="Paste the message or conversation here…"
              disabled={loading}
              className="w-full px-3 py-2.5 rounded-lg text-sm resize-none bg-[var(--elevated)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--subtle)] focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-colors disabled:opacity-50"
            />
            <p className="text-xs text-[var(--subtle)] text-right mt-1">{message.length} / 2000</p>
          </div>

          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-violet-700 hover:bg-violet-600 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none transition-all"
          >
            {loading ? 'Generating…' : 'Generate Replies'}
          </button>
        </form>
      </Card>

      {loading && <Loader label="Generating reply suggestions…" />}

      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Suggested replies</p>
          {result.suggestions.map(s => <ReplyCard key={s.tone} suggestion={s} />)}
        </div>
      )}
    </div>
  )
}
