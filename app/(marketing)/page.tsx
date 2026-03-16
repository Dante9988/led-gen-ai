import Link from 'next/link'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export default function LandingPage() {
  return (
    <div className="text-[#ededed] bg-[#0a0a0a] min-h-screen overflow-hidden selection:bg-violet-500/30">


      {/* ── Hero / App Preview ─────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-36 pb-20 px-6 flex flex-col items-center justify-center text-center">
        {/* Background Gradients */}
        <div className="pointer-events-none absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-700/20 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1.5 mb-8 shadow-[0_0_15px_rgba(124,58,237,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Built for modern network marketing
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1] md:leading-[1.05]">
            Turn chaotic DMs into{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500">
              a closing pipeline.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#888] max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop losing people in your notes app. ProspectFlow gives you beautiful capture links, a real CRM, and AI replies for <span className="text-[#ededed] font-medium">credit fixing, travel packages, identity monitoring, and wealth education</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-24 w-full">
            <a
              href={`${APP_URL}/signup`}
              className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2 text-base group"
            >
              Sign Up
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a
              href={`${APP_URL}/login`}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 active:scale-95 text-white font-medium px-8 py-4 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2 text-base"
            >
              Login
            </a>
          </div>

          {/* Gamified App Mockup */}
          <div className="relative w-full max-w-5xl animate-float">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-violet-600/30 to-indigo-600/10 blur-xl opacity-50" />
            <div className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[300px] md:min-h-0">
              
              {/* Mockup Header */}
              <div className="h-12 border-b border-white/[0.05] bg-[#111] flex items-center px-4 gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="w-full max-w-xs mx-auto bg-black/40 border border-white/5 rounded-md h-6" />
                <div className="w-6 h-6 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-[10px] text-violet-300 ml-auto">
                  PF
                </div>
              </div>

              {/* Mockup Body: The CRM Board */}
              <div className="flex-1 bg-[#0a0a0a] p-3 sm:p-6 lg:p-8 flex gap-3 sm:gap-6 overflow-x-auto">
                {/* Animated Origin Nodes & SVG Flow Lines connecting to Pipeline */}
              <div className="absolute -left-12 top-0 bottom-0 w-12 hidden lg:flex flex-col justify-center gap-12 z-0">
                <div className="relative group/node">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 z-10 relative shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644-.07-4.85-.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </div>
                  <svg className="absolute top-1/2 left-8 w-[150px] h-[50px] overflow-visible pointer-events-none -z-10 text-blue-500/30" preserveAspectRatio="none">
                    <path d="M 0 0 C 75 0 75 50 150 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="[animation:flow-line_3s_linear_infinite]" />
                  </svg>
                </div>
                
                <div className="relative group/node">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 z-10 relative shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  </div>
                  <svg className="absolute top-1/2 left-8 w-[150px] h-[20px] overflow-visible pointer-events-none -z-10 text-violet-500/30" preserveAspectRatio="none">
                    <path d="M 0 0 C 75 0 75 -20 150 -20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="[animation:flow-line_3s_linear_infinite_1s]" />
                  </svg>
                </div>
              </div>

              {/* Column: New */}
              <div className="flex-1 min-w-[220px] sm:min-w-[250px] flex-shrink-0 bg-white/[0.02] rounded-xl border border-white/[0.05] p-4 flex flex-col gap-3 relative z-10">
                  <div className="text-xs font-semibold text-[#888] flex items-center gap-2 uppercase tracking-wider mb-2">
                    <div className="w-2 h-2 rounded-full bg-violet-400" /> New Leads (12)
                  </div>
                  
                  {/* Real-time incoming lead animation */}
                  <div className="bg-[#1a1a1a] rounded-lg p-3 border border-white/[0.08] relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm text-white">Alex Chen</div>
                      <div className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Instagram</div>
                    </div>
                    <div className="text-xs text-[#888]">"Interested in the wealth edu..."</div>
                  </div>

                  {/* Animated Lead moving from New to Contacted */}
                  <div className="bg-[#1a1a1a] rounded-lg p-3 border border-white/[0.08] animate-pipeline relative">
                    <div className="absolute -inset-1 rounded-lg bg-violet-500/20 blur animate-[pulse-ring_2s_ease-out_infinite_1s]" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm text-white">Sarah Jenks</div>
                        <div className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">Form</div>
                      </div>
                      <div className="text-xs text-[#888]">"Need help fixing credit..."</div>
                    </div>
                  </div>
                </div>

                {/* Column: Contacted */}
                <div className="flex-1 min-w-[220px] sm:min-w-[250px] flex-shrink-0 bg-white/[0.02] rounded-xl border border-white/[0.05] p-4 flex flex-col gap-3">
                  <div className="text-xs font-semibold text-[#888] flex items-center gap-2 uppercase tracking-wider mb-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" /> Contacted (8)
                  </div>
                  
                  <div className="bg-[#1a1a1a] rounded-lg p-3 border border-white/[0.08]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm text-white">Marcus T.</div>
                      <div className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">Import</div>
                    </div>
                    <div className="text-xs text-[#888]">Automated follow-up sent.</div>
                  </div>

                  {/* Another Animated Lead moving from Contacted to Qualified */}
                  <div className="bg-[#1a1a1a] rounded-lg p-3 border border-white/[0.08] animate-pipeline-2 relative top-2">
                    <div className="absolute -inset-1 rounded-lg bg-amber-500/20 blur animate-[pulse-ring_2s_ease-out_infinite_1.5s]" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm text-white">David L.</div>
                        <div className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Referral</div>
                      </div>
                      <div className="text-xs text-[#888]">"Interested in Cabo travel package."</div>
                    </div>
                  </div>

                  {/* Placeholder for the Sarah Jenks drop */}
                  <div className="border border-dashed border-white/10 rounded-lg h-[74px] bg-transparent mt-2" />
                </div>

                {/* Column: Qualified */}
                <div className="hidden lg:flex flex-1 min-w-[250px] bg-white/[0.02] rounded-xl border border-white/[0.05] p-4 flex-col gap-3">
                  <div className="text-xs font-semibold text-[#888] flex items-center gap-2 uppercase tracking-wider mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" /> Qualified (3)
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg p-3 border border-emerald-500/30 relative">
                    <div className="absolute -inset-px rounded-lg bg-emerald-500/10 blur animate-pulse" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm text-emerald-100">Jessica Wong</div>
                        <div className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Hot Lead</div>
                      </div>
                      <div className="text-xs text-emerald-200/70">Wants identity monitoring, sending link...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gamified AI Chat Mockup Popover */}
            <div className="absolute -bottom-8 -right-8 w-72 bg-[#111] rounded-2xl border border-white/10 shadow-2xl overflow-hidden hidden md:block">
              <div className="h-10 bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center px-4">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  AI Assistant
                </div>
              </div>
              <div className="p-4 bg-[#111]">
                <div className="text-[10px] text-[#888] mb-1">Generate a reply to Sarah Jenks</div>
                <div className="bg-[#1a1a1a] p-3 rounded-lg border border-white/5 relative overflow-hidden">
                  <div className="text-sm text-white relative z-10 font-mono line-clamp-3">
                    <span className="text-violet-400">Hey Sarah!</span> Thanks for reaching out. The credit fixing strategy you mentioned from my FB post is actually perfect for...
                    <span className="inline-block w-1.5 h-3.5 ml-1 bg-violet-400 animate-pulse align-middle" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Feature Showcase ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.05] bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              A smarter way to close.
            </h2>
            <p className="text-[#888] text-lg max-w-2xl mx-auto">
              Replace disorganized spreadsheets and messy DMs with a streamlined, visually stunning system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-[#111] to-[#0d0d0d] border border-white/[0.05] hover:border-violet-500/30 transition-colors p-8 rounded-2xl group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[50px] group-hover:bg-violet-500/20 transition-all" />
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 text-violet-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Capture Pages</h3>
              <p className="text-[#888] leading-relaxed">
                Send prospects your personal link. They enter their info on a beautiful page, and they instantly drop into your New Leads column.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-[#111] to-[#0d0d0d] border border-white/[0.05] hover:border-emerald-500/30 transition-colors p-8 rounded-2xl group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] group-hover:bg-emerald-500/20 transition-all" />
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 text-emerald-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Visual Pipeline</h3>
              <p className="text-[#888] leading-relaxed">
                See exactly where every lead is in the process. Drag, drop, add notes, and log follow-ups without leaving the page.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-[#111] to-[#0d0d0d] border border-white/[0.05] hover:border-amber-500/30 transition-colors p-8 rounded-2xl group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[50px] group-hover:bg-amber-500/20 transition-all" />
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 text-amber-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">AI Assistant</h3>
              <p className="text-[#888] leading-relaxed">
                Stuck on what to say? Let our AI write friendly, direct, or follow-up messages tailored specifically to the prospect's notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gamified Interactive Section ─────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.05] relative overflow-hidden bg-[#0a0a0a]">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                Instantly generate <br />
                <span className="text-violet-400">content & videos 24/7.</span>
              </h2>
              <p className="text-lg text-[#888] leading-relaxed">
                Run a fully automated social media machine. Our AI Generator crafts engaging text posts, direct messages, and complete video concepts in seconds. Build a 24/7 content platform that continuously generates leads while you sleep.
              </p>
              <ul className="space-y-4">
                {['Promote Wealth Education seamlessly', 'Sell Travel Packages with confidence', 'Match your unique voice and tone'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#ededed]">
                    <div className="w-5 h-5 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center border border-violet-500/30">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Generator Interactive Mockup */}
            <div className="flex-1 w-full relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50 animate-pulse-slow" />
              <div className="relative bg-white dark:bg-[#18191A] border border-black/5 dark:border-white/[0.05] rounded-2xl p-0 shadow-2xl overflow-hidden">
                {/* Header: AI Badge */}
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 flex items-center justify-between">
                  <span className="text-white text-xs font-medium flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Asset Generated
                  </span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] text-white font-medium uppercase tracking-wider backdrop-blur-sm">
                    Social Post
                  </span>
                </div>
                
                {/* Post Body (Facebook Style) */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-pink-500 shadow-inner flex items-center justify-center text-white font-bold opacity-90">
                      You
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-[#E4E6EB] text-sm flex items-center gap-1.5">
                        Your Name
                        <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                      </div>
                      <div className="text-gray-500 dark:text-[#B0B3B8] text-xs flex items-center gap-1">
                        Just now · <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" /></svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-gray-800 dark:text-[#E4E6EB] text-[15px] leading-relaxed relative mb-4">
                    <span className="text-violet-600 dark:text-violet-400 font-medium">"Is your family's financial future completely protected? 🛡️📈</span><br/><br/>
                    The UWE Protection Plan doesn't just monitor your identity—it helps restore your credit, build your financial foundation, and secure your assets for the long term. I'm taking 5 discovery calls this week to show you how..."
                    <span className="inline-block w-1.5 h-4 bg-violet-500 ml-1 animate-pulse align-middle" />
                  </div>
                  
                  {/* Generated Image/Video Mockup */}
                  <div className="rounded-xl overflow-hidden border border-black/5 dark:border-white/10 relative group bg-black aspect-video pointer-events-auto">
                    <iframe
                      src="https://player.vimeo.com/video/1089854056?loop=1&title=0&byline=0&portrait=0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      className="absolute top-0 left-0 w-full h-full border-0"
                      title="UWE Protection Plan Video"
                    />
                  </div>
                </div>
                
                {/* Fake Engagement Bar */}
                <div className="px-5 py-3 border-t border-black/5 dark:border-white/[0.05] flex items-center justify-between text-gray-500 dark:text-[#B0B3B8]">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 px-2 py-1 rounded transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg> Like</button>
                    <button className="flex items-center gap-1.5 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 px-2 py-1 rounded transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> Comment</button>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 px-2 py-1 rounded transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg> Share</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.05] bg-[#111] relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Simple, honest pricing.</h2>
            <p className="text-[#888] text-lg">Start for free. Upgrade when you need more power.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-3xl p-8 hover:border-white/20 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
              <div className="text-4xl font-black text-white mb-6">$0<span className="text-base font-normal text-[#888]">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['Basic Pipeline CRM', 'Personal Lead Capture Link', 'Up to 50 Leads', '5 AI requests/mo'].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#888]">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href={`${APP_URL}/signup`} className="block w-full py-3 text-center rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-colors">Get Started Free</a>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-b from-[#1a1333] to-[#0a0a0a] border border-violet-500/30 rounded-3xl p-8 relative hover:border-violet-500/50 transition-all shadow-[0_0_30px_rgba(124,58,237,0.1)]">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-t-3xl" />
              <div className="absolute top-4 right-4 bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Most Popular</div>
              
              <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
              <div className="text-4xl font-black text-white mb-6">$29<span className="text-base font-normal text-[#888]">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['Full CRM & Notes', 'Unlimited AI Replies', 'Unlimited AI Posts', 'Webhook Lead Intake', 'CSV Lead Import', 'Unlimited Leads'].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#ededed]">
                    <svg className="w-5 h-5 text-violet-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href={`${APP_URL}/signup`} className="block w-full py-3 text-center rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium shadow-[0_4px_14px_0_rgba(124,58,237,0.39)] transition-colors">Start Pro Trial</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 border-t border-white/[0.05] bg-[#0a0a0a] text-center">
        <div className="flex items-center justify-center gap-2 mb-6 text-white font-semibold">
          <div className="w-6 h-6 rounded-md bg-violet-700 flex items-center justify-center">
             <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          ProspectFlow
        </div>
        <p className="text-[#555] text-sm">© {new Date().getFullYear()} ProspectFlow. All rights reserved.</p>
      </footer>

    </div>
  )
}
