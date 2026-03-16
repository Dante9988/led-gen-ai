import { openai } from './aiClient'
import type { PostRequest, PostResponse } from '@/types/ai'

const SYSTEM_PROMPT = `You are a social media content strategist for network marketers.
Your job is to generate authentic, engaging content that:
- Educates and adds value to the audience
- Builds trust and credibility, never hypes or misleads
- Avoids guaranteed income claims or unrealistic promises
- Uses engagement-focused, conversational language
- Feels human and relatable, not salesy or corporate`

export async function generatePosts(req: PostRequest): Promise<PostResponse> {
  const platformLabel =
    req.platform.charAt(0).toUpperCase() + req.platform.slice(1)
  const goalLabel = req.goal.replace('_', ' ')

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Generate social media content for a network marketer with these details:
- Niche: ${req.niche}
- Platform: ${platformLabel}
- Goal: ${goalLabel}

Return a valid JSON object with exactly this shape:
{
  "postIdeas": ["idea 1", "idea 2", "idea 3"],
  "engagementPost": "full post text optimized for engagement",
  "referralPost": "full post text optimized for referrals",
  "dmOpener": "a short, friendly DM opening message"
}

Guidelines:
- postIdeas: 3 short content idea descriptions (1-2 sentences each)
- engagementPost: a complete ready-to-publish post (with line breaks if needed)
- referralPost: a complete ready-to-publish post that subtly invites referrals
- dmOpener: a brief, non-pushy opening message for a cold or warm DM

Only return the JSON. No extra text.`,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.75,
    max_tokens: 1000,
  })

  const raw = completion.choices[0]?.message?.content
  if (!raw) throw new Error('No response from AI')

  const parsed = JSON.parse(raw) as PostResponse

  if (
    !Array.isArray(parsed.postIdeas) ||
    parsed.postIdeas.length < 3 ||
    !parsed.engagementPost ||
    !parsed.referralPost ||
    !parsed.dmOpener
  ) {
    throw new Error('Unexpected AI response format')
  }

  return parsed
}
