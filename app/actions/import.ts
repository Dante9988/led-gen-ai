'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { CsvRow } from '@/lib/import/parseCSV'

export interface ImportResult {
  imported: number
  skipped: number
  error?: string
}

export async function importLeadsAction(rows: CsvRow[]): Promise<ImportResult> {
  if (!rows.length) return { imported: 0, skipped: 0, error: 'No rows to import.' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { imported: 0, skipped: 0, error: 'Unauthorized.' }

  const inserts = rows.map(row => ({
    owner_id: user.id,
    full_name: row.full_name,
    phone: row.phone,
    email: row.email,
    source: row.source ?? 'csv_import',
    status: row.status,
    notes: row.notes,
  }))

  const BATCH = 50
  let imported = 0

  for (let i = 0; i < inserts.length; i += BATCH) {
    const batch = inserts.slice(i, i + BATCH)
    const { error } = await supabase.from('leads').insert(batch)
    if (error) {
      console.error('CSV import batch error:', error)
      return { imported, skipped: rows.length - imported, error: `Import failed after ${imported} rows: ${error.message}` }
    }
    imported += batch.length
  }

  revalidatePath('/leads')
  revalidatePath('/dashboard')
  return { imported, skipped: 0 }
}
