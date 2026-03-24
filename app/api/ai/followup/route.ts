import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateFollowUp } from '@/lib/ai/followupGenerator'
import { getProfile } from '@/lib/profiles'

// We recreate the type loosely for validation since the request body could be anything
interface RequestBody {
  leadId?: string
  messageType?: string
  tone?: string
  channel?: string
  length?: string
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  // 1. Authenticate user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Parse request
  let body: RequestBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { leadId, messageType, tone, channel, length } = body

  if (!leadId || !messageType || !tone || !channel || !length) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  // 3. Fetch Lead (and enforce ownership via RLS or explicit check)
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single()

  if (leadError || !lead) {
    return NextResponse.json({ error: 'Lead not found or unauthorized' }, { status: 404 })
  }

  // Ensure owner check in case RLS is somehow bypassed
  if (lead.owner_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized lead access' }, { status: 403 })
  }

  // 4. Fetch Agent Profile
  const profile = await getProfile()
  if (!profile) {
    return NextResponse.json({ error: 'Agent profile not found' }, { status: 404 })
  }

  // 5. Generate AI Follow-up
  try {
    const result = await generateFollowUp(
      {
        leadId,
        messageType: messageType as any,
        tone: tone as any,
        channel: channel as any,
        length: length as any,
      },
      lead,
      profile
    )

    return NextResponse.json(result)
  } catch (err) {
    console.error('[/api/ai/followup]', err)
    return NextResponse.json(
      { error: 'Failed to generate follow-up. Please try again.' },
      { status: 500 }
    )
  }
}
