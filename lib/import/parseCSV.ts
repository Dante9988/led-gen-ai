import type { LeadStatus } from '@/types'
import { LEAD_STATUSES, STATUS_LABELS } from '@/types'

export interface CsvRow {
  full_name: string
  phone: string | null
  email: string | null
  source: string | null
  status: LeadStatus
  notes: string | null
}

export interface ParseResult {
  rows: CsvRow[]
  skipped: number
  errors: string[]
}

/**
 * Parse a CSV string into validated lead rows.
 * Expected headers (case-insensitive): full_name, phone, email, source, status, notes
 */
export function parseCSV(csvText: string): ParseResult {
  const lines = csvText.trim().split(/\r?\n/)
  if (lines.length < 2) {
    return { rows: [], skipped: 0, errors: ['CSV file is empty or missing headers.'] }
  }

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/^"|"$/g, ''))
  const rows: CsvRow[] = []
  const errors: string[] = []
  let skipped = 0

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    // Simple CSV split — handles quoted fields
    const fields = splitCSVLine(line)
    const get = (key: string) => {
      const idx = headers.indexOf(key)
      return idx >= 0 ? (fields[idx] ?? '').trim().replace(/^"|"$/g, '') : ''
    }

    const full_name = get('full_name')
    const phone = get('phone') || null
    const email = get('email') || null
    const source = get('source') || 'csv_import'
    const rawStatus = get('status')
    const notes = get('notes') || null

    if (!full_name && !phone) {
      errors.push(`Row ${i + 1}: skipped — full_name and phone both missing.`)
      skipped++
      continue
    }

    const matchedStatus = Object.entries(STATUS_LABELS).find(
      ([_, label]) => label.toLowerCase() === rawStatus.toLowerCase()
    )?.[0] as LeadStatus | undefined
    
    const status: LeadStatus = matchedStatus && LEAD_STATUSES.includes(matchedStatus)
      ? matchedStatus
      : 'new'

    rows.push({ full_name: full_name || phone!, phone, email, source, status, notes })
  }

  return { rows, skipped, errors }
}

function splitCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}
