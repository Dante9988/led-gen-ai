export interface Profile {
  id: string          // matches auth.users.id
  slug: string
  display_name: string
  headline: string
  description: string
  created_at: string
  updated_at: string
}

export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'>
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at'>>
