import { openai } from './aiClient'
import type { ReplyRequest, ReplyResponse, ReplySuggestion } from '@/types/ai'

const SYSTEM_PROMPT = `You are a helpful communication coach for network marketers.
Your job is to suggest reply messages that are:
- Warm, conversational, and genuine
- Educational and value-focused
- Trust-building, never pushy or manipulative
- Honest — never make income guarantees or exaggerated claims
- Respectful of the prospect's time and boundaries

You will receive a message or conversation snippet from a prospect and return exactly 3 response suggestions.`

export async function generateReplies(req: ReplyRequest): Promise<ReplyResponse> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Here is the prospect's message or conversation snippet:\n\n"${req.message}"\n\nGenerate exactly 3 reply suggestions. Return a valid JSON object with this shape:
{
  "suggestions": [
    { "tone": "friendly", "label": "Friendly / Soft", "text": "..." },
    { "tone": "direct", "label": "Direct", "text": "..." },
    { "tone": "follow-up", "label": "Follow-Up Oriented", "text": "..." }
  ]
}

Only return the JSON. No extra text.`,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
    max_tokens: 800,
  })

  const raw = completion.choices[0]?.message?.content
  if (!raw) throw new Error('No response from AI')

  const parsed = JSON.parse(raw) as { suggestions: ReplySuggestion[] }

  if (!Array.isArray(parsed.suggestions) || parsed.suggestions.length !== 3) {
    throw new Error('Unexpected AI response format')
  }

  return parsed
}
