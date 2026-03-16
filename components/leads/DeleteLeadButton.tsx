'use client'

import { deleteLeadAction } from '@/app/actions/leads'
import { Button } from '@/components/ui/Button'

export function DeleteLeadButton({ id }: { id: string }) {
  const action = deleteLeadAction.bind(null, id)

  return (
    <form
      action={action}
      onSubmit={e => {
        if (!confirm('Delete this lead? This cannot be undone.')) e.preventDefault()
      }}
    >
      <Button type="submit" variant="danger" size="sm">
        Delete Lead
      </Button>
    </form>
  )
}
