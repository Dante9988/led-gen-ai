import Link from 'next/link'
import { headers } from 'next/headers'
import { getLeads } from '@/lib/leads'
import { getProfile } from '@/lib/profiles'
import { Button } from '@/components/ui/Button'
import { LeadsPipeline } from '@/components/leads/LeadsPipeline'

export default async function LeadsPage() {
  const [leads, profile] = await Promise.all([
    getLeads(),
    getProfile()
  ])

  const headersList = await headers()
  const host = headersList.get('host') ?? 'localhost:3000'
  const proto = host.startsWith('localhost') ? 'http' : 'https'
  const captureUrl = profile ? `${proto}://${host}/apply/${profile.slug}` : null

  // Calculate Metrics
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const newToday = leads.filter(l => new Date(l.created_at) >= today).length
  const needsFollowUp = leads.filter(l => l.status === 'contacted' || l.status === 'qualified').length

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">Leads Pipeline</h1>
          <p className="text-sm text-[var(--muted)] mt-1.5 font-medium">Manage and track your prospects seamlessly.</p>
        </div>
        <Link href="/leads/new">
          <Button size="sm" className="shadow-lg shadow-violet-500/20 hover:scale-105 transition-transform active:scale-95">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Lead
          </Button>
        </Link>
      </div>

      {/* Top Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] border border-[var(--border)] rounded-2xl p-5 flex items-center justify-between shadow-sm hover:border-[var(--border-md)] hover:-translate-y-0.5 transition-all">
          <div>
            <p className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider mb-1.5">Total Leads</p>
            <p className="text-3xl font-extrabold text-[var(--text)]">{leads.length}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-inner">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] border border-[var(--border)] rounded-2xl p-5 flex items-center justify-between shadow-sm hover:border-violet-500/30 hover:shadow-[0_8px_30px_rgb(124,58,237,0.12)] hover:-translate-y-0.5 transition-all group">
          <div>
            <p className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider mb-1.5 group-hover:text-violet-400/80 transition-colors">Needs Follow-up</p>
            <p className="text-3xl font-extrabold text-violet-400">{needsFollowUp}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 shadow-inner">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] border border-[var(--border)] rounded-2xl p-5 flex items-center justify-between shadow-sm hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all group">
          <div>
            <p className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider mb-1.5 group-hover:text-emerald-400/80 transition-colors">New Today</p>
            <p className="text-3xl font-extrabold text-emerald-400">{newToday}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shadow-inner">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
        </div>
      </div>

      <LeadsPipeline initialLeads={leads} captureUrl={captureUrl} />
    </div>
  )
}
