import Stripe from 'stripe'

const secretKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_KEY || process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
if (!secretKey) {
  console.warn('Missing STRIPE_SECRET_KEY environment variable.')
}

export const stripe = new Stripe(secretKey || 'sk_dummy_key_for_build', {
  apiVersion: '2026-02-25.clover',
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
