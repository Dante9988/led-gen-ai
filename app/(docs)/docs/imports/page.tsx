export default function ImportsDocs() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Imports</h1>
      <p className="text-lg text-[#888] leading-relaxed mb-8">
        Learn how to onboard existing leads by importing CSV datasets seamlessly into ProspectFlow.
      </p>

      <div className="h-px bg-white/[0.06] mb-8" />

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">CSV Import Basics</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Transitioning to ProspectFlow from an outdated spreadsheet layout or contact book doesn't have to be arduous. Using our built-in importer, you can upload robust client lists directly to your New leads column.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Supported Workflow</h2>
      <p className="text-[#888] leading-relaxed mb-4">
        To ensure a clean import process, structure your spreadsheet with clear sequential headers.
      </p>
      <ul className="list-disc list-inside space-y-2 text-[#888] mb-6">
        <li><strong>Name:</strong> The prospect's full name.</li>
        <li><strong>Email:</strong> Their contact email.</li>
        <li><strong>Phone (Optional):</strong> Their contact number.</li>
        <li><strong>Notes:</strong> Prior interaction history or specific interests such as travel or credit repair.</li>
      </ul>

      <p className="text-[#888] leading-relaxed mb-6">
        Navigate to the <strong>Leads</strong> page and click <strong>Import Leads</strong>. Review the column mapping step to ensure data syncs to the proper CRM attributes before finalizing. Once mapped, your leads will populate within seconds.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Access Considerations</h2>
      <p className="text-[#888] leading-relaxed">
        CSV Imports are available exclusively to active Pro tier users to prevent spam generation and ensure processing viability. If you are on a free tier, you must handle intakes individually until upgraded.
      </p>
    </div>
  )
}
