'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FLAT_DOC_LINKS } from '@/lib/docs-nav'

export function DocsNextLink() {
  const pathname = usePathname()
  const currentIndex = FLAT_DOC_LINKS.findIndex((link) => link.href === pathname)
  const nextDoc = currentIndex >= 0 && currentIndex < FLAT_DOC_LINKS.length - 1
    ? FLAT_DOC_LINKS[currentIndex + 1]
    : null

  if (!nextDoc) return null

  return (
    <div className="mt-12 pt-8 border-t border-white/[0.06]">
      <Link
        href={nextDoc.href}
        className="group inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors"
      >
        Next: {nextDoc.label}
        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
