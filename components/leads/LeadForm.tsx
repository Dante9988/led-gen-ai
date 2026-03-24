'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import type { Lead, LeadStatus } from '@/types'
import { STATUS_LABELS, LEAD_STATUSES } from '@/types'

const STATUS_OPTIONS = LEAD_STATUSES.map(status => ({
  value: status,
  label: STATUS_LABELS[status],
}))

const SOURCE_OPTIONS = [
  { value: '', label: 'Select source…' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'TikTok', label: 'TikTok' },
  { value: 'Referral', label: 'Referral' },
  { value: 'Direct', label: 'Direct' },
  { value: 'Other', label: 'Other' },
]

type ActionState = { error: string } | null | void

interface LeadFormProps {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>
  defaultValues?: Partial<Lead>
  submitLabel?: string
}

export function LeadForm({ action, defaultValues, submitLabel = 'Save Lead' }: LeadFormProps) {
  const [state, formAction, isPending] = useActionState(action, null)
  const errorMsg = state && typeof state === 'object' && 'error' in state ? state.error : null

  return (
    <form action={formAction} className="space-y-5">
      {errorMsg && (
        <div className="px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {errorMsg}
        </div>
      )}

      <Input
        id="full_name" name="full_name" label="Full Name *"
        placeholder="Jane Smith" defaultValue={defaultValues?.full_name} required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input id="email" name="email" type="email" label="Email" placeholder="jane@example.com" defaultValue={defaultValues?.email ?? ''} />
        <Input id="phone" name="phone" type="tel" label="Phone" placeholder="+1 555 000 0000" defaultValue={defaultValues?.phone ?? ''} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select id="source" name="source" label="Source" options={SOURCE_OPTIONS} defaultValue={defaultValues?.source ?? ''} />
        <Select id="status" name="status" label="Status" options={STATUS_OPTIONS} defaultValue={defaultValues?.status ?? 'new'} />
      </div>

      <Textarea
        id="notes" name="notes" label="Notes"
        placeholder="Add any notes about this lead…" defaultValue={defaultValues?.notes ?? ''}
      />

      <div className="flex justify-end pt-1">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
