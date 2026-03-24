import { Sidebar } from '@/components/layout/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <Sidebar />
      {/* pt-14 offsets the fixed mobile top bar; md:pt-0 removes it on desktop */}
      <main className="flex-1 overflow-auto pt-14 md:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
