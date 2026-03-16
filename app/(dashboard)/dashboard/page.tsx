import Link from 'next/link'
import { headers } from 'next/headers'
import { getDashboardStats } from '@/lib/leads'
import { getProfile } from '@/lib/profiles'
import { StatusBadge } from '@/components/ui/Badge'
import { StatCard } from '@/components/ui/StatCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import type { LeadStatus } from '@/types'

const STATUS_DOTS: Record<LeadStatus, string> = {
  New:         'bg-blue-400',
  Contacted:   'bg-amber-400',
  Interested:  'bg-violet-400',
  'Follow-up': 'bg-orange-400',
  Closed:      'bg-emerald-400',
}

export default async function DashboardPage() {
  const [stats, profile] = await Promise.all([
    getDashboardStats(),
    getProfile(),
  ])

  const headersList = await headers()
  const host = headersList.get('host') ?? 'localhost:3000'
  const proto = host.startsWith('localhost') ? 'http' : 'https'
  const captureUrl = profile ? `${proto}://${host}/apply/${profile.slug}` : null

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Dashboard"
        description="Overview of your lead pipeline"
        action={
          <Link href="/leads/new">
            <Button size="sm">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Lead
            </Button>
          </Link>
        }
      />

      {/* Capture link quick card */}
      {captureUrl && (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-0.5">Your Capture Link</p>
            <p className="text-sm text-violet-400 font-mono truncate">{captureUrl}</p>
            <p className="text-xs text-[var(--subtle)] mt-0.5">Share in your bio, posts, and DMs to collect leads.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link href="/settings">
              <Button variant="secondary" size="sm">Manage</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="Total" value={stats.total} accent="bg-[var(--muted)]" />
        {(['New', 'Contacted', 'Interested', 'Follow-up', 'Closed'] as LeadStatus[]).map(s => (
          <StatCard key={s} label={s} value={stats.by_status[s] ?? 0} accent={STATUS_DOTS[s]} />
        ))}
      </div>

      {/* Recent leads */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-[var(--muted)]">Recent leads</h2>
          <Link href="/leads" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
            View all →
          </Link>
        </div>

        {stats.recent.length === 0 ? (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg">
            <EmptyState
              title="No leads yet"
              description="Add your first lead or share your capture link."
              ctaLabel="Add lead"
              ctaHref="/leads/new"
            />
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
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {stats.recent.map(lead => (
                  <tr key={lead.id} className="group hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5">
                      <Link href={`/leads/${lead.id}`} className="font-medium text-[var(--text)] group-hover:text-violet-400 transition-colors">
                        {lead.full_name}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-[var(--muted)]">{lead.email ?? lead.phone ?? '—'}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-[var(--subtle)] font-mono">{lead.source ?? '—'}</span>
                    </td>
                    <td className="px-5 py-3.5"><StatusBadge status={lead.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
