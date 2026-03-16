import { NextRequest, NextResponse } from 'next/server'
import { generatePosts } from '@/lib/ai/postGenerator'
import type { PostRequest } from '@/types/ai'

const VALID_PLATFORMS = ['facebook', 'instagram', 'linkedin'] as const
const VALID_GOALS = ['lead_generation', 'engagement', 'referral'] as const

export async function POST(req: NextRequest) {
  let body: PostRequest

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { niche, platform, goal } = body ?? {}

  if (!niche?.trim()) {
    return NextResponse.json({ error: 'niche is required' }, { status: 400 })
  }

  if (!VALID_PLATFORMS.includes(platform)) {
    return NextResponse.json(
      { error: `platform must be one of: ${VALID_PLATFORMS.join(', ')}` },
      { status: 400 }
    )
  }

  if (!VALID_GOALS.includes(goal)) {
    return NextResponse.json(
      { error: `goal must be one of: ${VALID_GOALS.join(', ')}` },
      { status: 400 }
    )
  }

  try {
    const result = await generatePosts({ niche: niche.trim(), platform, goal })
    return NextResponse.json(result)
  } catch (err) {
    console.error('[/api/ai/post]', err)
    return NextResponse.json(
      { error: 'Failed to generate posts. Please try again.' },
      { status: 500 }
    )
  }
}
