export default function DocsOverview() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Introduction</h1>
      <p className="text-lg text-[#888] leading-relaxed mb-8">
        Welcome to the Closely AI documentation. Here you will find everything you need to set up, manage, and scale your personal network marketing pipeline.
      </p>

      <div className="h-px bg-white/[0.06] mb-8" />

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">What is Closely AI?</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Closely AI is an AI-native lead capture and CRM workspace built specifically for network marketing agents. Instead of managing chaotic spreadsheets and unstructured notes, Closely AI provides you with structured visual pipelines and intelligent communication tools to convert leads faster.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Who is it for?</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Whether you are promoting credit fixing solutions, travel packages, identity monitoring software, or wealth education, Closely AI acts as your personal command center. It operates alongside your primary MLM company, giving you complete ownership of your personal lead generation and follow-up activities.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Quick Links</h2>
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <a href="/docs/getting-started" className="block p-4 rounded-xl border border-white/10 bg-[#111] hover:bg-white/[0.03] transition-colors">
          <h3 className="font-medium text-white mb-1">Getting Started</h3>
          <p className="text-sm text-[#888]">Set up your account and workspace.</p>
        </a>
        <a href="/docs/lead-capture" className="block p-4 rounded-xl border border-white/10 bg-[#111] hover:bg-white/[0.03] transition-colors">
          <h3 className="font-medium text-white mb-1">Lead Capture</h3>
          <p className="text-sm text-[#888]">Build your capture pages and share links.</p>
        </a>
        <a href="/docs/crm" className="block p-4 rounded-xl border border-white/10 bg-[#111] hover:bg-white/[0.03] transition-colors">
          <h3 className="font-medium text-white mb-1">CRM Pipeline</h3>
          <p className="text-sm text-[#888]">Manage your visual lead board.</p>
        </a>
        <a href="/docs/ai-tools" className="block p-4 rounded-xl border border-white/10 bg-[#111] hover:bg-white/[0.03] transition-colors">
          <h3 className="font-medium text-white mb-1">AI Tools</h3>
          <p className="text-sm text-[#888]">Automate follow-ups and generate content.</p>
        </a>
      </div>
    </div>
  )
}
