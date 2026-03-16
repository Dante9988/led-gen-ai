'use client'

import { useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { Loader } from '@/components/ui/Loader'
import type { PostResponse, PostPlatform, PostGoal } from '@/types/ai'

const selectCls = 'w-full pl-3 pr-8 py-2.5 rounded-lg text-sm appearance-none cursor-pointer bg-[var(--elevated)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-colors'

function ResultCard({ title, content }: { title: string; content: string }) {
  return (
    <Card variant="inset" padding="md">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">{title}</span>
        <CopyButton text={content} />
      </div>
      <p className="text-sm text-[var(--text)] leading-relaxed whitespace-pre-wrap">{content}</p>
    </Card>
  )
}

export default function PostGeneratorPage() {
  const [niche, setNiche] = useState('')
  const [platform, setPlatform] = useState<PostPlatform>('facebook')
  const [goal, setGoal] = useState<PostGoal>('engagement')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PostResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!niche.trim()) return
    setLoading(true); setError(null); setResult(null)
    try {
      const res = await fetch('/api/ai/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: niche.trim(), platform, goal }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Something went wrong.'); return }
      setResult(data as PostResponse)
    } catch {
      setError('Network error. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <SectionHeader
        title="Post Generator"
        description="Generate on-brand posts, content ideas, and DM openers for your niche."
      />

      <Card padding="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="niche" className="block text-sm font-medium text-[var(--muted)] mb-1.5">Your niche</label>
            <input
              id="niche" type="text" value={niche}
              onChange={e => setNiche(e.target.value)}
              placeholder="e.g. health & wellness, skincare, financial education"
              className="w-full px-3 py-2.5 rounded-lg text-sm bg-[var(--elevated)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--subtle)] focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-colors"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-[var(--muted)] mb-1.5">Platform</label>
              <div className="relative">
                <select id="platform" value={platform} onChange={e => setPlatform(e.target.value as PostPlatform)} className={selectCls} disabled={loading}>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
                <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--subtle)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-[var(--muted)] mb-1.5">Goal</label>
              <div className="relative">
                <select id="goal" value={goal} onChange={e => setGoal(e.target.value as PostGoal)} className={selectCls} disabled={loading}>
                  <option value="engagement">Engagement</option>
                  <option value="lead_generation">Lead Generation</option>
                  <option value="referral">Referral</option>
                </select>
                <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--subtle)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !niche.trim()}
            className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-violet-700 hover:bg-violet-600 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none transition-all"
          >
            {loading ? 'Generating…' : 'Generate Content'}
          </button>
        </form>
      </Card>

      {loading && <Loader label="Generating content…" />}

      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {/* Post ideas */}
          <div>
            <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-3">Post ideas</p>
            <div className="space-y-2">
              {result.postIdeas.map((idea, i) => (
                <div key={i} className="flex gap-3 px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm">
                  <span className="text-xs font-bold text-[var(--subtle)] w-5 shrink-0 pt-0.5">{i + 1}.</span>
                  <span className="text-[var(--text)]">{idea}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ready content */}
          <div>
            <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-3">Ready-to-use content</p>
            <div className="space-y-3">
              <ResultCard title="Engagement Post" content={result.engagementPost} />
              <ResultCard title="Referral Post" content={result.referralPost} />
              <ResultCard title="DM Opener" content={result.dmOpener} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
