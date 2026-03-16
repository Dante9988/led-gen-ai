'use client'

import { useActionState } from 'react'
import { saveProfileAction, type ProfileFormState } from '@/app/actions/profile'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { Profile } from '@/types'

const textareaBase = [
  'w-full px-3 py-2.5 rounded-lg text-sm resize-none',
  'bg-[var(--elevated)] border border-[var(--border)]',
  'text-[var(--text)] placeholder:text-[var(--subtle)]',
  'focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40',
  'transition-colors duration-150',
].join(' ')

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, formAction, isPending] = useActionState<ProfileFormState, FormData>(saveProfileAction, {})

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="px-3 py-2.5 rounded-lg text-sm bg-red-500/10 border border-red-500/20 text-red-400">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="px-3 py-2.5 rounded-lg text-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          Profile saved!
        </div>
      )}

      <Input
        id="display_name"
        name="display_name"
        label="Display Name"
        placeholder="Jane Smith"
        defaultValue={profile.display_name}
        required
      />

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-[var(--muted)] mb-1.5">
          Your slug <span className="text-[var(--subtle)] font-normal">(URL-friendly, e.g. jane-smith)</span>
        </label>
        <div className="flex items-center rounded-lg overflow-hidden border border-[var(--border)] focus-within:border-violet-500/60 focus-within:ring-1 focus-within:ring-violet-500/40 transition-all">
          <span className="px-3 py-2.5 text-sm text-[var(--subtle)] bg-[var(--bg)] border-r border-[var(--border)] shrink-0 select-none">
            /apply/
          </span>
          <input
            id="slug"
            name="slug"
            type="text"
            defaultValue={profile.slug}
            placeholder="jane-smith"
            pattern="[a-z0-9][a-z0-9\-]{1,28}[a-z0-9]"
            required
            className="flex-1 px-3 py-2.5 text-sm bg-[var(--elevated)] text-[var(--text)] placeholder:text-[var(--subtle)] focus:outline-none"
          />
        </div>
        <p className="text-xs text-[var(--subtle)] mt-1">Lowercase letters, numbers, hyphens only. 3–30 characters.</p>
      </div>

      <Input
        id="headline"
        name="headline"
        label="Headline"
        placeholder="Join my team"
        defaultValue={profile.headline}
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-[var(--muted)] mb-1.5">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Short description shown on your public page…"
          defaultValue={profile.description}
          className={textareaBase}
        />
      </div>

      <div className="flex justify-end pt-1">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving…' : 'Save Profile'}
        </Button>
      </div>
    </form>
  )
}
