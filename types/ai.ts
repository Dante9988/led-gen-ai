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

// ─── Follow-Up Assistant ───────────────────────────────────────────────────────

export type FollowUpType = 'First Reply' | 'Follow-Up' | 'Qualify Lead' | 'Handle Objection'
export type FollowUpTone = 'friendly' | 'professional' | 'direct' | 'warm'
export type FollowUpChannel = 'sms' | 'email' | 'dm'
export type FollowUpLength = 'short' | 'medium'

export interface FollowUpRequest {
  leadId: string
  messageType: FollowUpType
  tone: FollowUpTone
  channel: FollowUpChannel
  length: FollowUpLength
}

export interface FollowUpResponse {
  message: string
  nextAction: string
  reasoningSummary: string
}
