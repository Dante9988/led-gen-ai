export type LeadStatus = 'New' | 'Contacted' | 'Interested' | 'Follow-up' | 'Closed'

export interface Lead {
  id: string
  full_name: string
  phone: string | null
  email: string | null
  source: string | null
  status: LeadStatus
  notes: string | null
  created_at: string
  updated_at: string
  owner_id: string
}

export type LeadInsert = Omit<Lead, 'id' | 'created_at' | 'updated_at'>
export type LeadUpdate = Partial<Omit<Lead, 'id' | 'created_at' | 'owner_id'>>

export interface DashboardStats {
  total: number
  by_status: Record<LeadStatus, number>
  recent: Lead[]
}

export type { Profile, ProfileInsert, ProfileUpdate } from './profile'

