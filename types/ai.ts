// ─── Reply Assistant ───────────────────────────────────────────────────────────

export interface ReplyRequest {
  message: string
}

export type ReplyTone = 'friendly' | 'direct' | 'follow-up'

export interface ReplySuggestion {
  tone: ReplyTone
  label: string
  text: string
}

export interface ReplyResponse {
  suggestions: ReplySuggestion[]
}

// ─── Social Post Generator ─────────────────────────────────────────────────────

export type PostPlatform = 'facebook' | 'instagram' | 'linkedin'
export type PostGoal = 'lead_generation' | 'engagement' | 'referral'

export interface PostRequest {
  niche: string
  platform: PostPlatform
  goal: PostGoal
}

export interface PostResponse {
  postIdeas: string[]
  engagementPost: string
  referralPost: string
  dmOpener: string
}
