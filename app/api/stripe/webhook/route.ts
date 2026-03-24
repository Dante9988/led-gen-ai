import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { upsertSubscription, cancelSubscription, planFromPriceId } from '@/lib/billing'
import type { Stripe } from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set.')
    return NextResponse.json({ error: 'Webhook secret not configured.' }, { status: 500 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Webhook signature invalid.' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode !== 'subscription') break

        const subscriptionId = session.subscription as string
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const userId = subscription.metadata.userId ?? session.metadata?.userId

        if (!userId) {
          console.error('No userId in subscription metadata', subscriptionId)
          break
        }

        const priceId = subscription.items.data[0]?.price.id
        await upsertSubscription({
          userId,
          stripeCustomerId: subscription.customer as string,
          stripeSubscriptionId: subscription.id,
          plan: planFromPriceId(priceId ?? ''),
          status: subscription.status as 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid',
          currentPeriodEnd: new Date((subscription.items.data[0]?.current_period_end || 0) * 1000),
        })
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata.userId
        if (!userId) {
          console.error('No userId in subscription metadata', subscription.id)
          break
        }

        const priceId = subscription.items.data[0]?.price.id
        await upsertSubscription({
          userId,
          stripeCustomerId: subscription.customer as string,
          stripeSubscriptionId: subscription.id,
          plan: planFromPriceId(priceId ?? ''),
          status: subscription.status as 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid',
          currentPeriodEnd: new Date((subscription.items.data[0]?.current_period_end || 0) * 1000),
        })
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await cancelSubscription(subscription.id)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        // Stripe v20: subscription is nested under parent.subscription_details
        const subRef = invoice.parent?.subscription_details?.subscription
        const subId = typeof subRef === 'string' ? subRef : subRef?.id ?? null
        if (subId) {
          const subscription = await stripe.subscriptions.retrieve(subId)
          const userId = subscription.metadata.userId
          if (userId) {
            const priceId = subscription.items.data[0]?.price.id
            await upsertSubscription({
              userId,
              stripeCustomerId: subscription.customer as string,
              stripeSubscriptionId: subscription.id,
              plan: planFromPriceId(priceId ?? ''),
              status: 'past_due',
              currentPeriodEnd: new Date((subscription.items.data[0]?.current_period_end || 0) * 1000),
            })
          }
          console.warn('Invoice payment failed:', { invoiceId: invoice.id, subscriptionId: subId })
        }
        break
      }

      default:
        // Unhandled event — acknowledge but do nothing
        break
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Webhook processing failed.' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
