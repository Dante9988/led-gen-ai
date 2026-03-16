'use client'
import Link from 'next/link'
import { useState } from 'react'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white font-semibold text-lg tracking-tight shrink-0">
          LedGen <span className="text-violet-500">AI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#888]">
          <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={`${APP_URL}/login`}
            className="text-sm text-[#888] hover:text-white transition-colors px-4 py-2 rounded-lg"
          >
            Login
          </a>
          <a
            href={`${APP_URL}/signup`}
            className="text-sm font-medium bg-violet-700 hover:bg-violet-600 active:scale-[0.98] text-white px-4 py-2 rounded-lg transition-all shadow-sm"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#888] hover:text-white p-2 rounded-lg transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0a0a0a] px-6 py-5 flex flex-col gap-4 text-sm">
          <Link href="/#features" onClick={() => setOpen(false)} className="text-[#888] hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" onClick={() => setOpen(false)} className="text-[#888] hover:text-white transition-colors">Pricing</Link>
          <Link href="/docs" onClick={() => setOpen(false)} className="text-[#888] hover:text-white transition-colors">Docs</Link>
          <div className="h-px bg-white/[0.06]" />
          <a href={`${APP_URL}/login`} className="text-[#888] hover:text-white transition-colors">Login</a>
          <a href={`${APP_URL}/signup`} className="font-medium text-violet-400 hover:text-violet-300 transition-colors">
            Sign Up →
          </a>
        </div>
      )}
    </header>
  )
}
