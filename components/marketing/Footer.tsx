import Link from 'next/link'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-10">
        <div className="max-w-xs">
          <div className="text-white font-semibold text-base tracking-tight mb-2">
            LedGen <span className="text-violet-500">AI</span>
          </div>
          <p className="text-[#888] text-sm leading-relaxed">
            AI-powered lead workspace for network marketing agents.
          </p>
        </div>

        <div className="flex flex-wrap gap-12 text-sm">
          <div className="flex flex-col gap-3">
            <span className="text-[#ededed] font-medium text-xs uppercase tracking-widest">Product</span>
            <Link href="/#features" className="text-[#888] hover:text-white transition-colors">Features</Link>
            <Link href="/pricing" className="text-[#888] hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[#ededed] font-medium text-xs uppercase tracking-widest">Account</span>
            <a href={`${APP_URL}/login`} className="text-[#888] hover:text-white transition-colors">Login</a>
            <a href={`${APP_URL}/signup`} className="text-[#888] hover:text-white transition-colors">Sign Up</a>
            <a href={APP_URL} className="text-[#888] hover:text-white transition-colors">Open App</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <p className="text-[#888] text-xs">
            © {new Date().getFullYear()} LedGen AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
