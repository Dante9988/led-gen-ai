'use client'

import { useState, useRef } from 'react'
import { parseCSV, type CsvRow } from '@/lib/import/parseCSV'
import { importLeadsAction } from '@/app/actions/import'

type ImportState = { imported: number; skipped: number; error?: string } | null

export function CsvImporter() {
  const [rows, setRows] = useState<CsvRow[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [fileName, setFileName] = useState<string | null>(null)
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<ImportState>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    setResult(null)
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const parsed = parseCSV(text)
      setRows(parsed.rows)
      setErrors(parsed.errors)
    }
    reader.readAsText(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file?.name.endsWith('.csv')) handleFile(file)
  }

  async function handleImport() {
    setImporting(true)
    const res = await importLeadsAction(rows)
    setResult(res)
    if (!res.error) { setRows([]); setFileName(null) }
    setImporting(false)
  }

  return (
    <div className="space-y-5">
      {/* Drop zone */}
      {rows.length === 0 && !result && (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-[var(--border)] rounded-xl p-12 text-center cursor-pointer hover:border-violet-500/40 hover:bg-white/1 transition-all"
        >
          <svg className="w-10 h-10 text-[var(--subtle)] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm font-medium text-[var(--text)]">Drop your CSV here, or click to browse</p>
          <p className="text-xs text-[var(--muted)] mt-1">Required headers: full_name, phone — optional: email, source, status, notes</p>
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      )}

      {/* Parse errors */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((err, i) => (
            <p key={i} className="text-xs text-amber-400">{err}</p>
          ))}
        </div>
      )}

      {/* Preview */}
      {rows.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text)]">Preview — {rows.length} rows to import</p>
              <p className="text-xs text-[var(--muted)]">{fileName}</p>
            </div>
            <button
              onClick={() => { setRows([]); setFileName(null); setErrors([]) }}
              className="text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  {['Name', 'Phone', 'Email', 'Source', 'Status'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 font-medium text-[var(--subtle)] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {rows.slice(0, 8).map((row, i) => (
                  <tr key={i} className="text-[var(--muted)]">
                    <td className="px-4 py-2.5 text-[var(--text)]">{row.full_name}</td>
                    <td className="px-4 py-2.5">{row.phone ?? '—'}</td>
                    <td className="px-4 py-2.5">{row.email ?? '—'}</td>
                    <td className="px-4 py-2.5">{row.source ?? '—'}</td>
                    <td className="px-4 py-2.5">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length > 8 && (
              <p className="px-4 py-2.5 text-xs text-[var(--subtle)] border-t border-[var(--border)]">
                + {rows.length - 8} more rows not shown
              </p>
            )}
          </div>

          <button
            onClick={handleImport}
            disabled={importing}
            className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-violet-700 hover:bg-violet-600 disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-[0.99]"
          >
            {importing ? `Importing ${rows.length} leads…` : `Import ${rows.length} Leads`}
          </button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className={`px-4 py-4 rounded-lg border text-sm ${result.error ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <p className="font-medium">Import complete!</p>
              <p className="text-xs mt-1 opacity-80">{result.imported} leads imported successfully.</p>
            </>
          )}
          <button
            onClick={() => setResult(null)}
            className="text-xs mt-2 underline opacity-70 hover:opacity-100 transition-opacity"
          >
            Import another file
          </button>
        </div>
      )}
    </div>
  )
}
