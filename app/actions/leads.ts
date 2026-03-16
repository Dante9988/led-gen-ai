'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createLead, updateLead, deleteLead } from '@/lib/leads'
import type { LeadStatus } from '@/types'

export async function createLeadAction(
  _: unknown,
  formData: FormData
): Promise<{ error: string } | void> {
  const lead = {
    full_name: formData.get('full_name') as string,
    phone: (formData.get('phone') as string) || null,
    email: (formData.get('email') as string) || null,
    source: (formData.get('source') as string) || null,
    status: (formData.get('status') as LeadStatus) || 'New',
    notes: (formData.get('notes') as string) || null,
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

export async function deleteLeadAction(id: string): Promise<void> {
  await deleteLead(id)
  revalidatePath('/leads')
  redirect('/leads')
}
