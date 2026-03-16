import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LedGen AI — AI Lead Workspace for Network Marketing Agents',
  description: 'Capture leads, manage your pipeline, and follow up faster with AI. Built for MLM and network marketing agents.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
