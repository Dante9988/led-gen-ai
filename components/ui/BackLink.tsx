import Link from 'next/link'

interface BackLinkProps {
  href: string
  label?: string
}

export function BackLink({ href, label = 'Back' }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors group"
    >
      <svg
        className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {label}
    </Link>
  )
}
