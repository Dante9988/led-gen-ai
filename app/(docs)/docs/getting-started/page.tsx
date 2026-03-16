export default function GettingStarted() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Getting Started</h1>
      <p className="text-lg text-[#888] leading-relaxed mb-8">
        Learn how to configure your account, set up your workspace, and get ready to capture your first leads.
      </p>

      <div className="h-px bg-white/[0.06] mb-8" />

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">1. Create Your Account</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Getting started with ProspectFlow is fast and easy. Simply click <strong>Sign Up</strong> on our public homepage and provide an email. Your account gives you immediate access to your own personal Lead Capture link and the Pipeline Dashboard exactly as seen in our showcases.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">2. Configure Your Profile</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Once logged in, navigate to the <strong>Settings</strong> panel from the sidebar. Here, you can configure your agent profile. This data directly drives the personalized look and feel of your external facing lead capture forms.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">3. Explore the Dashboard</h2>
      <ul className="list-disc list-inside space-y-2 text-[#888] mb-6">
        <li><strong>Dashboard:</strong> Your main CRM visual pipeline where all incoming leads land.</li>
        <li><strong>Lead Capture:</strong> The section where you will find your shareable, public funnel URLs.</li>
        <li><strong>AI Tools:</strong> Navigate here to draft fast follow-ups or brainstorm compelling social media hooks focused on wealth education or credit health.</li>
      </ul>
      
      <p className="text-[#888] leading-relaxed">
        Proceed to the <a href="/docs/lead-capture" className="text-violet-400 hover:text-violet-300">Lead Capture</a> documentation to learn how to gather your first responses.
      </p>
    </div>
  )
}
