export default function FaqDocs() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Frequently Asked Questions</h1>
      <p className="text-lg text-[#888] leading-relaxed mb-12">
        Find answers to the most common questions about using ProspectFlow in your network marketing business.
      </p>

      <div className="space-y-8">
        <div className="border border-white/10 bg-[#111] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Do my customers pay through ProspectFlow?</h3>
          <p className="text-[#888] leading-relaxed">
            No. ProspectFlow is solely a productivity and CRM tool for you as an agent. Your customers sign up through your own MLM company's referral link or portal. ProspectFlow never touches that transactional layer.
          </p>
        </div>

        <div className="border border-white/10 bg-[#111] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Does this replace my MLM company website?</h3>
          <p className="text-[#888] leading-relaxed">
            No—it works alongside it. ProspectFlow handles your lead capture, CRM pipeline, and advanced AI follow-up workflows. Your company still handles compensation, product fulfillment, and official recruiting details. 
          </p>
        </div>

        <div className="border border-white/10 bg-[#111] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Can I use my own referral links?</h3>
          <p className="text-[#888] leading-relaxed">
            Yes, always. ProspectFlow does not aggressively override or generate mandatory referral links for your overarching company. You use your own links wherever you choose to share them in the AI generated follow-up messages.
          </p>
        </div>

        <div className="border border-white/10 bg-[#111] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Is Telegram included yet?</h3>
          <p className="text-[#888] leading-relaxed">
            A Telegram AI assistant is specifically marked as <strong>Coming Soon</strong>. Current available features successfully cover the core visual CRM, standardized lead capture links, the AI reply assistant, and the AI post generator.
          </p>
        </div>

        <div className="border border-white/10 bg-[#111] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Is SMS included yet?</h3>
          <p className="text-[#888] leading-relaxed">
            SMS functionality is not currently implemented or included within ProspectFlow natively. Expanding communication modules directly onto phone hardware is planned for a future phase iteration.
          </p>
        </div>

        <div className="border border-white/10 bg-[#111] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">What happens if I stay on the free plan?</h3>
          <p className="text-[#888] leading-relaxed">
            The Free plan exists to demonstrate genuine value without demanding a credit card. It includes basic CRM management limitations (capped at 50 prospects), your operational lead capture link, and heavily gated AI generation requests. You can remain on it indefinitely if that matches your current workflow scale.
          </p>
        </div>
      </div>
    </div>
  )
}
