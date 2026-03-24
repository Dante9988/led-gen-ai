export default function BillingDocs() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Billing & Plans</h1>
      <p className="text-lg text-[#888] leading-relaxed mb-8">
        Manage your subscription to unlock powerful new capabilities within Closely AI.
      </p>

      <div className="h-px bg-white/[0.06] mb-8" />

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Overview</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Closely AI utilizes Stripe to seamlessly manage your billing and subscriptions. You can view your current plan, upgrade, or manage payment methods at any time directly through the <strong>Settings &gt; Billing</strong> panel in your dashboard.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">The Free Plan</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Every agent begins on the Free Plan. This gives you immediate use of a personal Lead Capture link, access to the primary CRM pipeline to manage up to 50 active leads, and strict usage limits for the AI Reply capabilities (capped at 5 requests per month). It's a perfect ground floor to learn the interface before committing to scaling.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Upgrading to Pro</h2>
      <p className="text-[#888] leading-relaxed mb-6">
        Upgrading to a paid Pro tier unlocks unlimited capabilities designed to scale serious follow-ups. You immediately lift the 50 prospect cap on the CRM and receive unlimited access to both the AI Reply generation and the AI Social Post Generator. Additionally, upgrading allows you to utilize mass data intake utilities such as CSV Imports and Webhooks.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">Managing Your Subscription</h2>
      <p className="text-[#888] leading-relaxed">
        Clicking "Manage Subscription" inside your dashboard will reroute you to the dedicated Stripe Customer Portal. From there, you immediately have full granular control over upgrading, downgrading, pausing, or canceling your subscription cycle alongside adjusting your active payment methods and invoices.
      </p>
    </div>
  )
}
