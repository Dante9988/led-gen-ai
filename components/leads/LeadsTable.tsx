'use client'

import Link from 'next/link'
import { useState } from 'react'
import { StatusBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Lead } from '@/types'

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? leads.filter(l =>
        l.full_name.toLowerCase().includes(query.toLowerCase()) ||
        (l.email ?? '').toLowerCase().includes(query.toLowerCase()) ||
        (l.phone ?? '').toLowerCase().includes(query.toLowerCase())
      )
    : leads

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--subtle)] pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input
          type="search"
          placeholder="Search leads…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm bg-[var(--elevated)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--subtle)] focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-colors"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg">
          {query ? (
            <EmptyState
              title="No results"
              description={`No leads matching "${query}"`}
            />
          ) : (
            <EmptyState
              title="No leads yet"
              description="Add your first lead to start tracking prospects."
              ctaLabel="Add lead"
              ctaHref="/leads/new"
            />
          )}
        </div>
      ) : (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--subtle)] uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--subtle)] uppercase tracking-wider">Contact</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--subtle)] uppercase tracking-wider">Source</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--subtle)] uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--subtle)] uppercase tracking-wider">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(lead => (
                <tr key={lead.id} className="group hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/leads/${lead.id}`}
                      className="font-medium text-[var(--text)] group-hover:text-violet-400 transition-colors"
                    >
                      {lead.full_name}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-[var(--muted)]">{lead.email ?? lead.phone ?? '—'}</td>
                  <td className="px-5 py-3.5 text-[var(--muted)]">{lead.source ?? '—'}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={lead.status} /></td>
                  <td className="px-5 py-3.5 text-[var(--subtle)]">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
