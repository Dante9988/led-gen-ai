export default function LeadCaptureDocs() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Lead Capture</h1>
      <p className="text-lg text-[#888] leading-relaxed mb-8">
        Learn how to configure your shareable links and seamlessly intake prospects directly into your pipeline.
      </p>

      <div className="h-px bg-white/[0.06] mb-8" />

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">How Lead Capture Works</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        When you share your personal ProspectFlow link on social media or in DMs, prospects are directed to a beautifully designed, high-converting capture form. The form gathers essential contact information alongside specific intent (such as interest in credit fixing, travel packaging, or wealth education).
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Using Capture Links</h2>
      <p className="text-[#888] leading-relaxed mb-4">
        Every agent gets a unique <strong>Slug</strong> (e.g., <code>prospectflow.ai/apply/janesmith</code>).
      </p>

      {/* Mockup */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 my-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-sm mx-auto">
          <label className="block text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">Your Public Link</label>
          <div className="flex items-center gap-2 bg-[#0a0a0a] border border-white/10 rounded-lg p-1">
            <div className="flex-1 px-3 text-sm text-[#ededed] truncate font-mono">
              prospectflow.ai/apply/agent
            </div>
            <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Copy
            </button>
          </div>
          <p className="text-xs text-violet-400 mt-3 text-center">Share this link to instantly drop prospects into your pipeline.</p>
        </div>
      </div>

      <ul className="list-disc list-inside space-y-2 text-[#888] mb-6">
        <li>Place your capture link in your Instagram or TikTok bio.</li>
        <li>Send it directly via Messenger or WhatsApp to prospects requesting more information.</li>
        <li>Embed it within your personal marketing emails or newsletters.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Where Do Leads Appear?</h2>
      <p className="text-[#888] leading-relaxed">
        Once a prospect submits their details, they are instantly created as a new card in the <strong>New</strong> column of your CRM Pipeline. All contextual notes they provided during signup are immediately available so you can draft a tailored response.
      </p>
    </div>
  )
}
