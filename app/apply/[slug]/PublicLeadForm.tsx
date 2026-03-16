'use client'

import { useActionState } from 'react'
import { submitPublicLeadAction, type PublicLeadFormState } from '@/app/actions/public'
import type { Profile } from '@/types'

const inputCls = 'w-full px-4 py-3 rounded-xl text-sm border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all'
const labelCls = 'block text-sm font-medium text-gray-700 mb-1.5'

export function PublicLeadForm({ profile }: { profile: Profile }) {
  const action = submitPublicLeadAction.bind(null, profile.slug)
  const [state, formAction, isPending] = useActionState<PublicLeadFormState, FormData>(action, {})

  if (state.success) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">You're on the list! 🎉</h3>
        <p className="text-gray-500">Thanks for reaching out. {profile.display_name} will be in touch soon.</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="px-4 py-3 rounded-xl text-sm bg-red-50 border border-red-200 text-red-600">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="pf-name" className={labelCls}>Full Name <span className="text-red-500">*</span></label>
        <input id="pf-name" name="full_name" type="text" required placeholder="Jane Smith" className={inputCls} disabled={isPending} />
      </div>

      <div>
        <label htmlFor="pf-phone" className={labelCls}>Phone Number <span className="text-red-500">*</span></label>
        <input id="pf-phone" name="phone" type="tel" required placeholder="+1 555 000 0000" className={inputCls} disabled={isPending} />
      </div>

      <div>
        <label htmlFor="pf-email" className={labelCls}>Email <span className="text-gray-400 font-normal">(optional)</span></label>
        <input id="pf-email" name="email" type="email" placeholder="jane@example.com" className={inputCls} disabled={isPending} />
      </div>

      <div>
        <label htmlFor="pf-interest" className={labelCls}>What are you interested in? <span className="text-gray-400 font-normal">(optional)</span></label>
        <input id="pf-interest" name="interest" type="text" placeholder="e.g. extra income, health products…" className={inputCls} disabled={isPending} />
      </div>

      <div>
        <label htmlFor="pf-notes" className={labelCls}>Anything else? <span className="text-gray-400 font-normal">(optional)</span></label>
        <textarea id="pf-notes" name="notes" rows={3} placeholder="Any questions or notes for me…" className={`${inputCls} resize-none`} disabled={isPending} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 px-6 rounded-xl text-base font-semibold text-white bg-violet-700 hover:bg-violet-600 active:scale-[0.99] disabled:opacity-50 transition-all duration-150 shadow-lg shadow-violet-200"
      >
        {isPending ? 'Submitting…' : 'Get Started →'}
      </button>

      <p className="text-center text-xs text-gray-400 mt-2">
        Your information is private and secure.
      </p>
    </form>
  )
}
