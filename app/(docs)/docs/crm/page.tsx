export default function CRMDocs() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">CRM Pipeline</h1>
      <p className="text-lg text-[#888] leading-relaxed mb-8">
        Organize, track, and close your leads using the dynamic Kanban-style CRM pipeline.
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
                 <div className="text-xs text-[#888] flex items-center gap-1"><svg className="w-3 h-3 text-violet-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" /></svg> AI follow-up sent</div>
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
        <li><strong>Contacted:</strong> Leads you have actively reached out to regarding their travel or identity monitoring interests.</li>
        <li><strong>Qualified:</strong> Prospects who have confirmed interest and are ready to review your primary business presentation.</li>
        <li><strong>Closed:</strong> Onboarded affiliates or successfully referred customers.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Updating Statuses</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Clicking on any prospect card opens their detailed profile. You can update their pipeline stage here or log custom notes, ensuring that every touchpoint—from an initial intro to sending an education link—is archived. 
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Keeping Organized</h2>
      <p className="text-[#888] leading-relaxed">
        ProspectFlow prevents any lead from falling through the cracks. The visual board guarantees you immediately see who needs follow-up and who is ready to be closed. AI follow-up suggestions are specifically tailored to the notes you've kept within a prospect's file.
      </p>
    </div>
  )
}
