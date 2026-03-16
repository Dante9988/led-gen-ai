export default function AIToolsDocs() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">AI Tools</h1>
      <p className="text-lg text-[#888] leading-relaxed mb-8">
        Leverage our integrated AI suite to effortlessly draft personalized outreach and craft engaging content.
      </p>

      <div className="h-px bg-white/[0.06] mb-8" />

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Generating Posts</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Use the <strong>Post Generator</strong> to effortlessly write social media content or direct messages. Simply input the topic—such as the massive value of identity monitoring or the financial freedom of wealth education—select your desired tone (Direct, Enthusiastic, Professional), and let the AI draft compelling, algorithmic-friendly hooks immediately.
      </p>

      {/* AI Mockup */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 my-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[50px] pointer-events-none" />
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center border border-violet-500/30 shadow-[0_0_10px_rgba(124,58,237,0.2)]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-sm font-medium text-white">AI Assistant</span>
          </div>
          
          <div className="space-y-3">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-3 text-sm text-[#888] flex items-center gap-2">
              <span className="text-violet-400 font-mono text-xs">Prompt</span>
              Write a Facebook post about credit repair for home buying.
            </div>
            <div className="bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 rounded-lg p-4 relative">
              <p className="text-sm text-[#ededed] leading-relaxed">
                "Dreaming of a new home but worried about your credit score? 🏠✨ Don't let past financial mistakes keep you renting forever. Our credit restoration program has helped hundreds of families..."
                <span className="inline-block w-1.5 h-3.5 bg-violet-400 ml-1 animate-pulse align-middle" />
              </p>
            </div>
            <div className="flex gap-2 justify-end pt-2">
               <button className="text-xs font-medium bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded transition-colors border border-white/5">Regenerate</button>
               <button className="text-xs font-medium bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded transition-colors shadow-sm">Copy</button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Smart Replies</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Inside any prospect's CRM card, the AI reads your logged notes and the prospect's original query to suggest highly contextualized responses. You can choose whether to send a friendly intro, a direct question, or a structured follow-up. 
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">You are in Control</h2>
      <p className="text-[#888] leading-relaxed">
        ProspectFlow's AI operates as an assistant, never as an unmonitored autobot. You review, approve, edit, and send every piece of text it drafts. This ensures that you maintain your personal affiliate branding without risking robotic formatting or inaccurate promises.
      </p>
    </div>
  )
}
