import { openai } from './aiClient'
import type { FollowUpRequest, FollowUpResponse } from '@/types/ai'
import type { Lead, Profile } from '@/types'

const SYSTEM_PROMPT = `You are an elite, highly effective sales and communication assistant for network marketers and closers.
Your job is to write a single outreach message tailored perfectly to the context provided.

GUIDELINES:
- Be authentic and human, not robotic or overly formal.
- Never make unrealistic income guarantees, health claims, or compliance-risky promises.
- Tailor the wording specifically to the requested channel (e.g. SMS should be punchy and short, Email can be slightly longer and structured).
- Reference the lead's "source", "status", and "notes" directly to build rapport — do not hallucinate details.
- Avoid sounding spammy. Focus on value, permission, and relationship building.
- Obey the requested length strictly. Ensure it feels natural to read aloud.

[KNOWLEDGE BASE INJECTION]
(Future RAG documents and canned scripts will be injected here)
[/KNOWLEDGE BASE INJECTION]

You will receive the Lead context, Agent Profile context, and the Output Preferences.
Return EXACTLY one valid JSON object with the following schema:
{
  "message": "The written outreach message ready to be sent.",
  "nextAction": "A 3-5 word suggested next action or pipeline status.",
  "reasoningSummary": "A 1-2 sentence explanation of why this message works based on the context."
}
No backticks, no markdown, just raw parseable JSON object.`

export async function generateFollowUp(
  params: FollowUpRequest,
  lead: Lead,
  profile: Profile
): Promise<FollowUpResponse> {
  const userPrompt = `
=== AGENT PROFILE CONTEXT ===
Name: ${profile.display_name || 'Agent'}
Headline: ${profile.headline || 'N/A'}
Description: ${profile.description || 'N/A'}

=== LEAD CONTEXT ===
Name: ${lead.full_name}
Status: ${lead.status}
Source: ${lead.source || 'N/A'}
Notes: ${lead.notes || 'None provided'}
Added on: ${new Date(lead.created_at).toLocaleDateString()}

=== OUTPUT PREFERENCES ===
Message Type: ${params.messageType}
Tone: ${params.tone}
Channel: ${params.channel}
Length: ${params.length}

Draft the perfect message.`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
    max_tokens: 800,
  })

  const raw = completion.choices[0]?.message?.content
  if (!raw) throw new Error('No response from AI')

  const parsed = JSON.parse(raw) as FollowUpResponse

  if (!parsed.message || !parsed.nextAction || !parsed.reasoningSummary) {
    throw new Error('Unexpected AI response format')
  }

  return parsed
}
