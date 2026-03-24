import { createClient } from '@/lib/supabase/server'
import type { Lead, LeadInsert, LeadUpdate, DashboardStats, LeadStatus } from '@/types'
import { LEAD_STATUSES } from '@/types'

export async function getLeads(): Promise<Lead[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getLead(id: string): Promise<Lead | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function createLead(lead: Omit<LeadInsert, 'owner_id'>): Promise<Lead> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('leads')
    .insert({ ...lead, owner_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateLead(id: string, updates: LeadUpdate): Promise<Lead> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteLead(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('leads').delete().eq('id', id)
  if (error) throw error
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const leads = await getLeads()

  const by_status = LEAD_STATUSES.reduce((acc, status) => {
    acc[status] = leads.filter(l => l.status === status).length
    return acc
  }, {} as Record<LeadStatus, number>)

  return {
    total: leads.length,
    by_status,
    recent: leads.slice(0, 5),
  }
}
