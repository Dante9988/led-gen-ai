export default function WebhooksDocs() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Webhooks</h1>
      <p className="text-lg text-[#888] leading-relaxed mb-8">
        Learn how to automate lead entry from external platforms into Closely AI.
      </p>

      <div className="h-px bg-white/[0.06] mb-8" />

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Webhook Lead Intake</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Webhooks allow other tools and platforms (like independent landing pages, specialized funnel software, or Zapier automations) to programmatically send incoming prospect data directly into your Closely AI CRM without manual entry.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">How It Works</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        By providing an external application with your specific Webhook Intake URL, that platform can seamlessly <code>POST</code> JSON payloads containing user data to your Closely AI account in real time. For example, if someone fills out a custom Typeform evaluating their credit score, the form leverages the webhook to immediately draft a new pipeline card for them inside Closely AI.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Example Integration</h2>
      <p className="text-[#888] leading-relaxed mb-4">
        Send a standard HTTP POST request to your webhook endpoint with the following payload structure:
      </p>
      <pre className="p-4 bg-[#111] border border-white/10 rounded-xl overflow-x-auto text-sm text-white mb-6">
{`{
  "name": "Alex Prospect",
  "email": "alex@example.com",
  "source": "Custom Funnel",
  "notes": "Interested in wealth education package."
}`}
      </pre>

      <p className="text-[#888] leading-relaxed">
        <em>Note: Webhook access is currently handled per account configuration. Please verify your billing tier supports automated API intake prior to deploying live integrations.</em>
      </p>
    </div>
  )
}
