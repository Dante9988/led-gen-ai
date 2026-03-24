'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { logout } from '@/app/actions/auth'

const nav = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h5v7H3V5zm11-2h5a2 2 0 012 2v2h-7V3zM3 13h7v8H5a2 2 0 01-2-2v-6zm11 8v-8h7v6a2 2 0 01-2 2h-5z" />
      </svg>
    ),
  },
  {
    href: '/leads',
    label: 'Leads',
    exact: false,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const assistant = [
  {
    href: '/assistant/reply',
    label: 'Reply Assistant',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    href: '/assistant/post',
    label: 'Post Generator',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
]

const tools = [
  {
    href: '/leads/import',
    label: 'Import CSV',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    href: '/billing',
    label: 'Billing',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

function NavItem({ href, label, icon, active, onClick }: { href: string; label: string; icon: React.ReactNode; active: boolean; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5 px-3 py-2.5 md:py-2 rounded-md text-sm font-medium transition-all duration-100',
        active
          ? 'bg-white/8 text-[var(--text)]'
          : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/4'
      )}
    >
      {icon}
      {label}
    </Link>
  )
}

const LogoMark = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-6 h-6 rounded-md bg-violet-700 flex items-center justify-center shrink-0">
      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <span className="text-sm font-semibold tracking-tight text-[var(--text)]">Closely AI</span>
  </div>
)

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  // Close drawer whenever the route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const NavLinks = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {nav.map(item => (
        <NavItem key={item.href} {...item} active={isActive(item.href)} onClick={onItemClick} />
      ))}

      <div className="pt-4 pb-1 px-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--subtle)]">
          Assistant
        </p>
      </div>
      {assistant.map(item => (
        <NavItem key={item.href} {...item} active={isActive(item.href)} onClick={onItemClick} />
      ))}

      <div className="pt-4 pb-1 px-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--subtle)]">
          Tools
        </p>
      </div>
      {tools.map(item => (
        <NavItem key={item.href} {...item} active={isActive(item.href)} onClick={onItemClick} />
      ))}
    </>
  )

  const SignOutButton = () => (
    <div className="px-2 py-3 border-t border-[var(--border)]">
      <form action={logout}>
        <button
          type="submit"
          className="w-full flex items-center gap-2.5 px-3 py-2.5 md:py-2 rounded-md text-sm font-medium text-[var(--muted)] hover:text-red-400 hover:bg-white/4 transition-all duration-100"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </form>
    </div>
  )

  return (
    <>
      {/* ── Desktop sidebar (md+) ── */}
      <aside className="hidden md:flex w-56 shrink-0 flex-col min-h-screen bg-[var(--surface)] border-r border-[var(--border)]">
        <div className="px-4 py-4 border-b border-[var(--border)]">
          <LogoMark />
        </div>
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          <NavLinks />
        </nav>
        <SignOutButton />
      </aside>

      {/* ── Mobile top bar (< md) ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[var(--surface)] border-b border-[var(--border)] flex items-center justify-between px-4 shadow-sm">
        <LogoMark />
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/8 transition-colors"
          aria-label="Open navigation menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* ── Mobile drawer overlay (< md) ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer panel */}
          <div className="relative w-64 max-w-[80vw] bg-[var(--surface)] border-r border-[var(--border)] flex flex-col min-h-full z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            {/* Drawer header */}
            <div className="px-4 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <LogoMark />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/8 transition-colors"
                aria-label="Close navigation menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Drawer nav */}
            <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
              <NavLinks onItemClick={() => setMobileOpen(false)} />
            </nav>
            <SignOutButton />
          </div>
        </div>
      )}
    </>
  )
}
