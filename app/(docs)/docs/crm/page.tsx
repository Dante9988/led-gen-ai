export default function CRMDocs() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">CRM Pipeline</h1>
      <p className="text-lg text-[#888] leading-relaxed mb-8">
        Organize, track, and close your leads using the dynamic Kanban-style CRM pipeline with built-in urgency tracking and AI-assisted outreach.
      </p>

      <div className="h-px bg-white/[0.06] mb-8" />

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Pipeline Stages</h2>
      <p className="text-[#888] leading-relaxed mb-4">
        Your CRM is divided into logical stages reflecting standard network marketing cadences. Here's a preview of what your board looks like:
      </p>

      {/* Kanban Mockup */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 my-8 overflow-x-auto relative">
        <div className="flex gap-4 min-w-[600px]">
          {/* Column 1 */}
          <div className="flex-1 bg-[#0a0a0a] rounded-lg border border-white/5 p-3">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-0.5" />
                New Leads
              </span>
              <span className="text-xs text-[#888] bg-white/5 px-2 py-0.5 rounded-full">2</span>
            </div>
            <div className="space-y-2">
               <div className="bg-[#1a1a1a] border border-white/5 p-3 rounded-md shadow-sm">
                 <div className="text-sm font-medium text-white mb-1">Sarah Jenkins</div>
                 <div className="text-xs text-[#888]">Wants info on Wealth Education</div>
                 <div className="mt-2 flex items-center gap-1.5">
                   <span className="text-[8px] bg-violet-500/20 text-violet-400 border border-violet-500/30 px-1.5 py-0.5 rounded-full font-bold">PUBLIC_FORM</span>
                   <span className="text-[8px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded-full font-bold animate-pulse">NEEDS FOLLOW-UP</span>
                 </div>
               </div>
               <div className="bg-[#1a1a1a] border border-white/5 p-3 rounded-md shadow-sm">
                 <div className="text-sm font-medium text-white mb-1">Mike Ross</div>
                 <div className="text-xs text-[#888]">Travel agency package</div>
               </div>
            </div>
          </div>
          
          {/* Column 2 */}
          <div className="flex-1 bg-[#0a0a0a] rounded-lg border border-white/5 p-3 opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-sm font-semibold text-amber-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-0.5" />
                Contacted
              </span>
            </div>
            <div className="space-y-2">
               <div className="bg-[#1a1a1a] border border-white/5 p-3 rounded-md shadow-sm">
                 <div className="text-sm font-medium text-white mb-1">Alex Kumar</div>
                 <div className="text-xs text-[#888] flex items-center gap-1">
                   <span className="text-[9px]">🤖</span> AI follow-up sent · <span className="text-[10px] text-blue-400">2x contacted</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex-1 bg-[#0a0a0a] rounded-lg border border-white/5 p-3 opacity-50 hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-sm font-semibold text-violet-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400 mt-0.5" />
                Closed
              </span>
            </div>
          </div>
        </div>
      </div>

      <ul className="list-disc list-inside space-y-2 text-[#888] mb-6">
        <li><strong>New:</strong> Fresh uncontacted leads generated via your capture link or webhooks.</li>
        <li><strong>Contacted:</strong> Leads you have actively reached out to. Status updates automatically when you send an AI‑generated message.</li>
        <li><strong>Qualified:</strong> Prospects who have confirmed interest and are ready to review your primary business presentation.</li>
        <li><strong>Closed:</strong> Onboarded affiliates or successfully referred customers.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Active Follow-Up Tracking</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Every lead card in the pipeline displays intelligent real-time urgency indicators: 
      </p>
      <ul className="list-disc list-inside space-y-2 text-[#888] mb-6 pl-2">
        <li><span className="text-red-400 font-semibold">Follow up Today!</span> — A scheduled follow-up has arrived</li>
        <li><span className="text-amber-400 font-semibold">Follow up Tomorrow</span> — Reminder is upcoming</li>
        <li><span className="text-orange-400 font-semibold">Needs Follow-up</span> — No contact in over 24 hours (auto-detected)</li>
        <li><strong className="text-white">Contact attempt counter</strong> — Shows how many times you've reached out (e.g., "2x")</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Activity Timeline</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Inside each lead's detail page, a chronological <strong className="text-white">Activity Timeline</strong> records every event: when the lead entered the system, each status change, every outreach attempt (including the exact message sent), and scheduled follow-up reminders. This gives you a complete historical view of your relationship with every prospect.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Scheduling Follow-Ups</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        From any lead's detail page, you can schedule future follow-ups with one click: <strong className="text-white">"Follow up in 24h"</strong> or <strong className="text-white">"Follow up in 2 Days"</strong>. Scheduled dates automatically generate urgency badges on your Kanban board so no opportunity is ever missed.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Keeping Organized</h2>
      <p className="text-[#888] leading-relaxed">
        Closely AI prevents any lead from falling through the cracks. The visual board guarantees you immediately see who needs follow-up and who is ready to be closed. AI follow-up suggestions are specifically tailored to the notes and history you've kept within a prospect's file.
      </p>
    </div>
  )
}
