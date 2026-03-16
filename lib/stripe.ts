import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable.')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
})

// ─── Plan price IDs ────────────────────────────────────────────────────────────
// Set these in your .env.local after creating products in the Stripe dashboard
export const PLAN_PRICES: Record<string, string | undefined> = {
  pro:      process.env.STRIPE_PRICE_PRO_ID,
  pro_plus: process.env.STRIPE_PRICE_PRO_PLUS_ID,
}

// ─── Plan labels ──────────────────────────────────────────────────────────────
export const PLAN_LABELS: Record<string, string> = {
  free:     'Free',
  pro:      'Pro',
  pro_plus: 'Pro Plus',
}
