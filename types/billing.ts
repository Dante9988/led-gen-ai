export type Plan = 'free' | 'pro' | 'pro_plus'
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid'

export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  plan: Plan
  status: SubscriptionStatus
  current_period_end: string | null
  created_at: string
  updated_at: string
}

export interface PlanAccess {
  plan: Plan
  canUseAI: boolean
  canImportCSV: boolean
  maxLeads: number | null  // null = unlimited
}
