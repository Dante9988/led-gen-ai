import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — LedGen AI',
  description: 'Simple pricing for MLM agents. Start free, upgrade when ready.',
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

// Attach Stripe price IDs here when ready
const plans = [
  {
    name: 'Free',
    price: 0,
    desc: 'Get started at no cost. No credit card required.',
    stripePriceId: null, // e.g. 'price_xxxx'
    highlight: false,
    badge: null,
    cta: 'Get Started Free',
    ctaHref: `${APP_URL}/signup`,
    features: [
      { text: 'Basic CRM', included: true },
      { text: 'Lead capture link (1)', included: true },
      { text: 'AI replies & posts (5 / month)', included: true },
      { text: 'Up to 50 leads', included: true },
      { text: 'CSV import', included: false },
      { text: 'Webhook lead intake', included: false },
      { text: 'Unlimited AI usage', included: false },
      { text: 'Telegram AI assistant', included: false },
    ],
  },
  {
    name: 'Pro',
    price: 29,
    desc: 'Full access for agents who are serious about growth.',
    stripePriceId: null, // e.g. 'price_xxxx'
    highlight: true,
    badge: 'Most Popular',
    cta: 'Start Pro — 7 days free',
    ctaHref: `${APP_URL}/signup?plan=pro`,
    features: [
      { text: 'Full CRM, unlimited leads', included: true },
      { text: 'Multiple lead capture links', included: true },
      { text: 'Unlimited AI replies & posts', included: true },
      { text: 'CSV import', included: true },
      { text: 'Webhook lead intake', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Telegram AI assistant', included: false },
      { text: 'Early feature access', included: false },
    ],
  },
  {
    name: 'Pro Plus',
    price: 59,
    desc: 'For power users, teams, and what is coming next.',
    stripePriceId: null, // e.g. 'price_xxxx'
    highlight: false,
    badge: null,
    cta: 'Start Pro Plus',
    ctaHref: `${APP_URL}/signup?plan=pro_plus`,
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Telegram AI assistant (coming soon)', included: true },
      { text: 'Early feature access', included: true },
      { text: 'Priority support', included: true },
      { text: 'Team seats (coming soon)', included: true },
      { text: 'Advanced analytics (coming soon)', included: true },
      { text: 'Custom integrations (coming soon)', included: true },
      { text: 'Dedicated onboarding', included: true },
    ],
  },
]

const faq = [
  {
    q: 'Can I change plans later?',
    a: 'Yes. You can upgrade or downgrade at any time from your billing settings. Upgrades take effect immediately.',
  },
  {
    q: 'Is there a free trial on paid plans?',
    a: 'Pro includes a 7-day free trial. No credit card required to start.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards via Stripe. All payments are processed securely.',
  },
  {
    q: 'Do customers pay through LedGen AI?',
    a: 'No. LedGen AI is a subscription tool for you as an agent. Your customers sign up through your company\'s referral links — not through LedGen AI.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from your billing page at any time. Your plan stays active through the end of the billing period.',
  },
]

function CheckIcon({ on }: { on: boolean }) {
  if (on) {
    return (
      <svg className="text-violet-400 shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg className="text-[#444] shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PricingPage() {
  return (
    <div className="text-[#ededed]">

      {/* Header */}
      <section className="text-center px-6 pt-20 pb-16 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[300px] rounded-full bg-violet-700/10 blur-[100px]" />
        </div>
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-4">Pricing</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Simple, honest pricing
          </h1>
          <p className="text-[#888] text-base max-w-md mx-auto">
            Start free. Upgrade when you are ready. No contracts, no hidden fees.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={[
                'relative rounded-2xl p-7 flex flex-col gap-6 border transition-all',
                plan.highlight
                  ? 'bg-violet-700/10 border-violet-500/30 shadow-[0_0_60px_-15px_rgba(124,58,237,0.3)]'
                  : 'bg-[#111] border-white/[0.06]',
              ].join(' ')}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div>
                <p className="text-white font-semibold text-base mb-1">{plan.name}</p>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  {plan.price > 0 && <span className="text-[#888] text-sm mb-1">/month</span>}
                </div>
                <p className="text-[#888] text-sm leading-relaxed">{plan.desc}</p>
              </div>

              <a
                href={plan.ctaHref}
                className={[
                  'w-full inline-flex items-center justify-center text-sm font-medium py-2.5 px-4 rounded-lg transition-all active:scale-[0.98]',
                  plan.highlight
                    ? 'bg-violet-700 hover:bg-violet-600 text-white'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[#ededed]',
                ].join(' ')}
              >
                {plan.cta}
              </a>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-sm">
                    <CheckIcon on={f.included} />
                    <span className={f.included ? 'text-[#ccc]' : 'text-[#555]'}>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.06] bg-[#0d0d0d] py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-4">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Questions about pricing</h2>
          </div>
          <div className="divide-y divide-white/[0.06]">
            {faq.map((item) => (
              <div key={item.q} className="py-6">
                <p className="text-white font-medium text-sm mb-2">{item.q}</p>
                <p className="text-[#888] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/[0.06] py-20 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Start for free today
        </h2>
        <p className="text-[#888] text-base mb-8 max-w-md mx-auto">
          No credit card required. Upgrade only when you need to.
        </p>
        <a
          href={`${APP_URL}/signup`}
          className="inline-flex items-center gap-2 bg-violet-700 hover:bg-violet-600 active:scale-[0.98] text-white font-medium text-sm px-7 py-3.5 rounded-lg transition-all"
        >
          Get Started Free
        </a>
      </section>

    </div>
  )
}
