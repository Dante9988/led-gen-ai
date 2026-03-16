'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const NAV_LINKS = [
  {
    title: 'Overview',
    links: [
      { href: '/docs', label: 'Introduction' },
      { href: '/docs/getting-started', label: 'Getting Started' },
    ]
  },
  {
    title: 'Core Features',
    links: [
      { href: '/docs/lead-capture', label: 'Lead Capture' },
      { href: '/docs/crm', label: 'CRM Pipeline' },
      { href: '/docs/ai-tools', label: 'AI Tools' },
    ]
  },
  {
    title: 'Advanced',
    links: [
      { href: '/docs/imports', label: 'CSV Imports' },
      { href: '/docs/webhooks', label: 'Webhooks' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { href: '/docs/billing', label: 'Billing & Plans' },
      { href: '/docs/faq', label: 'FAQ' },
    ]
  }
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-6">
      {NAV_LINKS.map((section) => (
        <div key={section.title}>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
            {section.title}
          </h4>
          <ul className="flex flex-col gap-1.5">
            {section.links.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className={cn(
                      "block px-3 py-1.5 text-sm rounded-md transition-colors",
                      isActive
                        ? "bg-violet-500/10 text-violet-400 font-medium"
                        : "text-[#888] hover:text-[#ededed] hover:bg-white/[0.02]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export function DocsSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const currentPage = NAV_LINKS.flatMap(s => s.links).find(l => l.href === pathname)

  return (
    <>
      {/* Mobile collapsible nav */}
      <div className="md:hidden w-full border-b border-white/[0.06] bg-[#0d0d0d]">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-6 py-4 text-sm hover:bg-white/[0.02] transition-colors"
        >
          <span className="text-white font-medium">{currentPage?.label ?? 'Docs Navigation'}</span>
          <svg
            className={cn("w-4 h-4 text-[#888] transition-transform", open && "rotate-180")}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="px-6 pb-6 border-t border-white/[0.06] pt-4">
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
        )}
      </div>

      {/* Desktop sticky sidebar */}
      <aside className="w-64 shrink-0 hidden md:block border-r border-white/[0.06] bg-[#0a0a0a] min-h-[calc(100vh-4rem)] pt-6 pb-20 sticky top-16 overflow-y-auto">
        <div className="px-6">
          <NavLinks />
        </div>
      </aside>
    </>
  )
}
