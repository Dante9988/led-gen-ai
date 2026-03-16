import { NextRequest, NextResponse } from 'next/server'
import { generateReplies } from '@/lib/ai/replyGenerator'
import type { ReplyRequest } from '@/types/ai'

export async function POST(req: NextRequest) {
  let body: ReplyRequest

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const message = body?.message?.trim()
  if (!message) {
    return NextResponse.json({ error: 'message is required' }, { status: 400 })
  }

  if (message.length > 2000) {
    return NextResponse.json(
      { error: 'message must be 2000 characters or fewer' },
      { status: 400 }
    )
  }

  try {
    const result = await generateReplies({ message })
    return NextResponse.json(result)
  } catch (err) {
    console.error('[/api/ai/reply]', err)
    return NextResponse.json(
      { error: 'Failed to generate replies. Please try again.' },
      { status: 500 }
    )
  }
}
