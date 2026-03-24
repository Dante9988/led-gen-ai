import { notFound } from 'next/navigation'
import { getProfileBySlug } from '@/lib/profiles'
import { PublicLeadForm } from './PublicLeadForm'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const profile = await getProfileBySlug(slug)
  return {
    title: profile ? `Connect with ${profile.display_name}` : 'Not Found',
  }
}

export default async function ApplyPage({ params }: Props) {
  const { slug } = await params
  const profile = await getProfileBySlug(slug)
  if (!profile) notFound()

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Agent card */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-violet-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-200">
            <span className="text-2xl font-bold text-white">
              {profile.display_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{profile.display_name}</h1>
          {profile.headline && (
            <p className="text-violet-700 font-medium mt-1">{profile.headline}</p>
          )}
          {profile.description && (
            <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">{profile.description}</p>
          )}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Get in touch</h2>
          <p className="text-sm text-gray-500 mb-6">Fill out the form and I'll reach out to you directly.</p>
          <PublicLeadForm profile={profile} />
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Powered by Closely AI
        </p>
      </div>
    </div>
  )
}
