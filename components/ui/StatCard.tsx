interface StatCardProps {
  label: string
  value: number | string
  accent?: string  // tailwind color class for the accent dot, e.g. 'bg-blue-400'
}

export function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-5">
      <div className="flex items-center gap-2 mb-3">
        {accent && <span className={`w-2 h-2 rounded-full flex-shrink-0 ${accent}`} />}
        <span className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-3xl font-semibold text-[var(--text)] leading-none">{value}</p>
    </div>
  )
}
