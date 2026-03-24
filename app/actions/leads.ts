'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createLead, updateLead, deleteLead, getLead } from '@/lib/leads'
import type { LeadStatus } from '@/types'
import { LEAD_STATUSES } from '@/types'

export async function createLeadAction(
  _: unknown,
  formData: FormData
): Promise<{ error: string } | void> {
  const lead = {
    full_name: formData.get('full_name') as string,
    phone: (formData.get('phone') as string) || null,
    email: (formData.get('email') as string) || null,
    source: (formData.get('source') as string) || null,
    status: (formData.get('status') as LeadStatus) || 'new',
    notes: (formData.get('notes') as string) || null,
    contact_attempts: 0,
    activity_log: [],
    last_contacted_at: null,
    next_follow_up_at: null,
    last_message: null,
  }

  try {
    await createLead(lead)
  } catch (e) {
    return { error: (e as Error).message }
  }

  revalidatePath('/leads')
  redirect('/leads')
}

export async function updateLeadAction(
  id: string,
  _: unknown,
  formData: FormData
): Promise<{ error: string } | void> {
  const updates = {
    full_name: formData.get('full_name') as string,
    phone: (formData.get('phone') as string) || null,
    email: (formData.get('email') as string) || null,
    source: (formData.get('source') as string) || null,
    status: formData.get('status') as LeadStatus,
    notes: (formData.get('notes') as string) || null,
  }

  try {
    await updateLead(id, updates)
  } catch (e) {
    return { error: (e as Error).message }
  }

  revalidatePath('/leads')
  revalidatePath(`/leads/${id}`)
  redirect(`/leads/${id}`)
}

export async function updateLeadStatusAction(
  id: string,
  newStatus: LeadStatus
): Promise<{ error: string } | void> {
  if (!LEAD_STATUSES.includes(newStatus)) {
    return { error: `Invalid status: ${newStatus}` }
  }

  try {
    const lead = await getLead(id)
    const logs = lead?.activity_log || []
    const newLog = {
      id: crypto.randomUUID(),
      type: 'status_change' as const,
      title: `Changed status to ${newStatus}`,
      date: new Date().toISOString()
    }
    
    await updateLead(id, { 
      status: newStatus,
      activity_log: [...logs, newLog]
    })
  } catch (e) {
    return { error: (e as Error).message }
  }

  revalidatePath('/leads')
  revalidatePath(`/leads/${id}`)
  revalidatePath('/dashboard')
}

export async function logContactAction(id: string, channel: string, messageText?: string): Promise<void> {
  const lead = await getLead(id)
  if (!lead) return

  const newLog = {
    id: crypto.randomUUID(),
    type: 'contact_attempt' as const,
    title: `Contact outreach via ${channel}`,
    date: new Date().toISOString(),
    detail: messageText || undefined
  }

  const updates: any = {
    contact_attempts: (lead.contact_attempts || 0) + 1,
    last_contacted_at: new Date().toISOString(),
    activity_log: [...(lead.activity_log || []), newLog]
  }

  if (messageText) {
    updates.last_message = messageText
  }

  if (lead.status === 'new') {
    updates.status = 'contacted'
    updates.activity_log.push({
      id: crypto.randomUUID(),
      type: 'status_change' as const,
      title: 'Automated status upgrade to contacted',
      date: new Date().toISOString()
    })
  }

  await updateLead(id, updates)
  revalidatePath('/leads')
  revalidatePath(`/leads/${id}`)
  revalidatePath('/dashboard')
}

export async function scheduleFollowUpAction(id: string, dateIso: string, label: string): Promise<void> {
  const lead = await getLead(id)
  if (!lead) return

  const newLog = {
    id: crypto.randomUUID(),
    type: 'system' as const,
    title: `Scheduled follow-up for ${label}`,
    date: new Date().toISOString()
  }

  await updateLead(id, {
    next_follow_up_at: dateIso,
    activity_log: [...(lead.activity_log || []), newLog]
  })
  
  revalidatePath('/leads')
  revalidatePath(`/leads/${id}`)
}

export async function deleteLeadAction(id: string): Promise<void> {
  await deleteLead(id)
  revalidatePath('/leads')
  redirect('/leads')
}
