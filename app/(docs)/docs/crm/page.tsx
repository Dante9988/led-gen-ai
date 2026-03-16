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
        Your CRM is divided into logical stages reflecting standard network marketing cadences:
      </p>
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
