import { Navbar } from '@/components/marketing/Navbar'
import { DocsSidebar } from '@/components/docs/DocsSidebar'
import { DocsNextLink } from '@/components/docs/DocsNextLink'
import { Footer } from '@/components/marketing/Footer'

export const metadata = {
  title: 'Documentation | Closely AI',
  description: 'Learn how to use Closely AI to manage your network marketing leads.',
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#ededed]">
      <Navbar />
      
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row pt-16">
        <DocsSidebar />
        
        <main className="flex-1 min-w-0 px-6 py-10 md:px-12 lg:px-20 overflow-y-auto">
          <article className="max-w-3xl pb-24 prose prose-invert prose-violet">
            {children}
            <DocsNextLink />
          </article>
        </main>
      </div>

      <Footer />
    </div>
  )
}
