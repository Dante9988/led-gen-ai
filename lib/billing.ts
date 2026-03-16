import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { stripe } from '@/lib/stripe'
import type { Subscription, Plan, SubscriptionStatus } from '@/types/billing'

// ─── Read subscription for the current authenticated user ─────────────────────
export async function getSubscription(): Promise<Subscription | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  return data ?? null
}

// ─── Read subscription for any user (from webhook / admin context) ─────────────
export async function getSubscriptionByUserId(userId: string): Promise<Subscription | null> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()
  return data ?? null
}

// ─── Get or create a Stripe customer for the current user ─────────────────────
export async function getOrCreateStripeCustomer(): Promise<string> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Check if already stored
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (sub?.stripe_customer_id) return sub.stripe_customer_id

  // Create Stripe customer
  const customer = await stripe.customers.create({
    email: user.email,
    metadata: { userId: user.id },
  })

  // Upsert subscription row with customer ID (plan stays free until checkout completes)
  const admin = createAdminClient()
  await admin.from('subscriptions').upsert({
    user_id: user.id,
    stripe_customer_id: customer.id,
    plan: 'free',
    status: 'active',
    updated_at: new Date().toISOString(),
  })

  return customer.id
}

// ─── Upsert subscription data (called by webhook handler) ────────────────────
export async function upsertSubscription(payload: {
  userId: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  plan: Plan
  status: SubscriptionStatus
  currentPeriodEnd: Date
}) {
  const admin = createAdminClient()
  const { error } = await admin.from('subscriptions').upsert({
    user_id: payload.userId,
    stripe_customer_id: payload.stripeCustomerId,
    stripe_subscription_id: payload.stripeSubscriptionId,
    plan: payload.plan,
    status: payload.status,
    current_period_end: payload.currentPeriodEnd.toISOString(),
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
}

// ─── Cancel → revert to free ─────────────────────────────────────────────────
export async function cancelSubscription(stripeSubscriptionId: string) {
  const admin = createAdminClient()
  await admin
    .from('subscriptions')
    .update({ plan: 'free', status: 'canceled', updated_at: new Date().toISOString() })
    .eq('stripe_subscription_id', stripeSubscriptionId)
}

// ─── Resolve plan from Stripe price ID ───────────────────────────────────────
export function planFromPriceId(priceId: string): Plan {
  if (priceId === process.env.STRIPE_PRICE_PRO_ID) return 'pro'
  if (priceId === process.env.STRIPE_PRICE_PRO_PLUS_ID) return 'pro_plus'
  return 'free'
}
