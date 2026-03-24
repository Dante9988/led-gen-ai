import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getProfileBySlug } from '@/lib/profiles'
import type { LeadStatus } from '@/types'
import { LEAD_STATUSES } from '@/types'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const { agentSlug, full_name, phone, email, interest, notes, source, status } = body as Record<string, string | undefined>

  // Validate required fields
  if (!agentSlug) {
    return NextResponse.json({ error: 'agentSlug is required.' }, { status: 400 })
  }
  if (!full_name && !phone) {
    return NextResponse.json({ error: 'At least one of full_name or phone is required.' }, { status: 400 })
  }

  // Look up agent by slug
  const profile = await getProfileBySlug(agentSlug)
  if (!profile) {
    return NextResponse.json({ error: `No agent found for slug: ${agentSlug}` }, { status: 404 })
  }

  // Resolve status
  const resolvedStatus: LeadStatus =
    status && LEAD_STATUSES.includes(status as LeadStatus)
      ? (status as LeadStatus)
      : 'new'

  // Build notes with interest if present
  const combinedNotes = [
    interest ? `Interest: ${interest}` : null,
    notes ?? null,
  ].filter(Boolean).join('\n') || null

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('leads')
    .insert({
      owner_id: profile.id,
      full_name: full_name ?? phone!,
      phone: phone ?? null,
      email: email ?? null,
      source: source ?? 'webhook',
      status: resolvedStatus,
      notes: combinedNotes,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Webhook lead insert error:', error)
    return NextResponse.json({ error: 'Failed to create lead.' }, { status: 500 })
  }

  return NextResponse.json({ success: true, leadId: data.id }, { status: 201 })
}
