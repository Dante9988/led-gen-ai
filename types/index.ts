export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed' | 'lost'

export const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'closed', 'lost']

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  closed: 'Closed',
  lost: 'Lost',
}

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
  last_contacted_at: string | null
  next_follow_up_at: string | null
  contact_attempts: number
  last_message: string | null
  activity_log: LeadActivity[]
  owner_id: string
}

export interface LeadActivity {
  id: string
  type: 'status_change' | 'contact_attempt' | 'note' | 'system'
  title: string
  detail?: string
  date: string
}

export type LeadInsert = Omit<Lead, 'id' | 'created_at' | 'updated_at'>
export type LeadUpdate = Partial<Omit<Lead, 'id' | 'created_at' | 'owner_id'>>

export interface DashboardStats {
  total: number
  by_status: Record<LeadStatus, number>
  recent: Lead[]
}

export type { Profile, ProfileInsert, ProfileUpdate } from './profile'
