import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe, PLAN_PRICES } from '@/lib/stripe'
import { getOrCreateStripeCustomer } from '@/lib/billing'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let body: { plan?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const { plan } = body
  if (!plan || !['pro', 'pro_plus'].includes(plan)) {
    return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 })
  }

  const priceId = PLAN_PRICES[plan]
  if (!priceId) {
    return NextResponse.json(
      { error: `Price ID for "${plan}" is not configured. Set STRIPE_PRICE_${plan.toUpperCase()}_ID.` },
      { status: 500 }
    )
  }

  const customerId = await getOrCreateStripeCustomer()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/billing?success=1`,
    cancel_url: `${appUrl}/billing?canceled=1`,
    metadata: { userId: user.id },
    subscription_data: {
      metadata: { userId: user.id },
    },
  })

  return NextResponse.json({ url: session.url })
}
