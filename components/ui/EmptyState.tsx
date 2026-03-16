import Link from 'next/link'

interface EmptyStateProps {
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  icon?: React.ReactNode
}

const defaultIcon = (
  <svg className="w-8 h-8 text-[var(--subtle)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
)

export function EmptyState({ title, description, ctaLabel, ctaHref, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-xl bg-[var(--elevated)] border border-[var(--border)] flex items-center justify-center mb-4">
        {icon ?? defaultIcon}
      </div>
      <p className="text-sm font-medium text-[var(--text)] mb-1">{title}</p>
      {description && (
        <p className="text-sm text-[var(--muted)] max-w-xs mb-4">{description}</p>
      )}
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
        >
          {ctaLabel} →
        </Link>
      )}
    </div>
  )
}
