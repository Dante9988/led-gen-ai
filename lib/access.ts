import { getSubscription } from '@/lib/billing'
import type { PlanAccess, Plan } from '@/types/billing'

const ACCESS_MAP: Record<Plan, PlanAccess> = {
  free: {
    plan: 'free',
    canUseAI: false,
    canImportCSV: false,
    maxLeads: 25,
  },
  pro: {
    plan: 'pro',
    canUseAI: true,
    canImportCSV: true,
    maxLeads: null, // unlimited
  },
  pro_plus: {
    plan: 'pro_plus',
    canUseAI: true,
    canImportCSV: true,
    maxLeads: null, // unlimited
  },
}

/**
 * Returns access permissions for the currently authenticated user.
 * Falls back to 'free' if no subscription row exists.
 */
export async function getPlanAccess(): Promise<PlanAccess> {
  const sub = await getSubscription()
  const plan = sub?.plan ?? 'free'
  return ACCESS_MAP[plan]
}

/**
 * Returns access map for a known plan (used on marketing/pricing pages without auth)
 */
export function getPlanAccessForPlan(plan: Plan): PlanAccess {
  return ACCESS_MAP[plan]
}
