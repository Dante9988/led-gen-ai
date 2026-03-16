'use client'

import { useState } from 'react'
import { updateLeadAction } from '@/app/actions/leads'
import { LeadForm } from '@/components/leads/LeadForm'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { Lead } from '@/types'

export function EditLeadSection({ lead }: { lead: Lead }) {
  const [editing, setEditing] = useState(false)
  const action = updateLeadAction.bind(null, lead.id)

  return (
    <Card padding="lg">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text)]">Edit lead</h2>
          {!editing && (
            <p className="text-xs text-[var(--muted)] mt-0.5">Update this lead&apos;s details</p>
          )}
        </div>
        <Button variant="secondary" size="sm" onClick={() => setEditing(e => !e)}>
          {editing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      {editing
        ? <LeadForm action={action} defaultValues={lead} submitLabel="Save Changes" />
        : null
      }
    </Card>
  )
}
