export default function AIToolsDocs() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">AI Tools</h1>
      <p className="text-lg text-[#888] leading-relaxed mb-8">
        Leverage Closely AI's integrated AI suite to draft personalized outreach, generate follow-ups, and send messages—all without leaving your pipeline.
      </p>

      <div className="h-px bg-white/[0.06] mb-8" />

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">AI Follow-Up Assistant</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Every lead card in your Kanban pipeline features a dynamic <strong>🤖 Generate Follow-up</strong> button. The label adapts to the lead's current status:
      </p>
      <ul className="list-disc list-inside text-[#888] space-y-2 mb-6 pl-2">
        <li><strong className="text-white">New leads:</strong> "Generate First Message"</li>
        <li><strong className="text-white">Contacted leads:</strong> "Generate Follow-up"</li>
        <li><strong className="text-white">Qualified leads:</strong> "Generate Closing Message"</li>
      </ul>

      <p className="text-[#888] leading-relaxed mb-6">
        Clicking the button opens a glass-morphic modal where you can fine-tune four parameters:
      </p>
      <ul className="list-disc list-inside text-[#888] space-y-2 mb-6 pl-2">
        <li><strong className="text-white">Goal:</strong> First Reply, Follow-Up, Qualify Lead, or Handle Objection</li>
        <li><strong className="text-white">Channel:</strong> SMS, DM, or Email</li>
        <li><strong className="text-white">Tone:</strong> Friendly, Warm, Professional, or Direct</li>
        <li><strong className="text-white">Length:</strong> Short or Medium</li>
      </ul>

      {/* AI Mockup */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 my-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[50px] pointer-events-none" />
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center border border-violet-500/30 shadow-[0_0_10px_rgba(124,58,237,0.2)]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-sm font-medium text-white">AI Follow-Up Assistant</span>
          </div>
          
          <div className="space-y-3">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-3 text-sm text-[#888] flex items-center gap-2">
              <span className="text-violet-400 font-mono text-xs">Goal</span>
              Follow-Up · SMS · Friendly · Short
            </div>
            <div className="bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 rounded-lg p-4 relative">
              <p className="text-sm text-[#ededed] leading-relaxed">
                "Hey John! Just wanted to check in — I know credit repair can feel overwhelming, but I'd love to walk you through some quick wins. Want to hop on a call this week?"
                <span className="inline-block w-1.5 h-3.5 bg-violet-400 ml-1 animate-pulse align-middle" />
              </p>
            </div>
            <div className="flex gap-2 justify-end pt-2">
               <button className="text-xs font-medium bg-green-500/10 text-green-400 px-3 py-1.5 rounded transition-colors border border-green-500/20">Send SMS</button>
               <button className="text-xs font-medium bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded transition-colors border border-blue-500/20">Send Email</button>
               <button className="text-xs font-medium bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded transition-colors shadow-sm">Copy</button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Instant Send Flow</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        After generating a message, you can <strong className="text-white">edit</strong> the text directly in the modal, then send it immediately via:
      </p>
      <ul className="list-disc list-inside text-[#888] space-y-2 mb-6 pl-2">
        <li><strong className="text-green-400">Send SMS</strong> — Opens your native messaging app pre-filled with the AI message</li>
        <li><strong className="text-blue-400">Send Email</strong> — Opens your mail client with the subject and body pre-filled</li>
        <li><strong className="text-white">Copy</strong> — Copies the text for pasting into Instagram DMs, WhatsApp, or any other app</li>
      </ul>
      <p className="text-[#888] leading-relaxed mb-6">
        When you send a message, the system automatically logs the contact attempt, increments the attempt counter, saves the message text, and moves <code className="text-violet-400">new</code> leads to <code className="text-violet-400">contacted</code> status.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Follow-Up Engine</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Closely AI actively prevents leads from going cold. Each lead card displays dynamic urgency badges:
      </p>
      <ul className="list-disc list-inside text-[#888] space-y-2 mb-6 pl-2">
        <li><span className="text-red-400 font-semibold">Follow up Today!</span> — A scheduled follow-up is due now</li>
        <li><span className="text-amber-400 font-semibold">Follow up Tomorrow</span> — A reminder is coming up</li>
        <li><span className="text-orange-400 font-semibold">Needs Follow-up</span> — No contact in over 24 hours</li>
      </ul>
      <p className="text-[#888] leading-relaxed mb-6">
        Inside any lead's detail page, you can schedule follow-ups with one click: <strong className="text-white">"Follow up in 24h"</strong> or <strong className="text-white">"Follow up in 2 Days"</strong>. Every action is logged to the <strong className="text-white">Activity Timeline</strong>, giving you a chronological record of every interaction.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">You Are in Control</h2>
      <p className="text-[#888] leading-relaxed">
        Closely AI's AI operates as an assistant, never as an unmonitored autobot. You review, approve, edit, and send every piece of text it drafts. This ensures that you maintain your personal affiliate branding without risking robotic formatting or inaccurate promises.
      </p>
    </div>
  )
}
