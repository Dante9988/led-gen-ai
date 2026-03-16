import { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--muted)]">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={4}
        className={cn(
          'w-full px-3 py-2.5 rounded-lg text-sm resize-none',
          'bg-[var(--elevated)] border border-[var(--border)]',
          'text-[var(--text)] placeholder:text-[var(--subtle)]',
          'focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40',
          'transition-colors duration-150',
          error && 'border-red-500/60 focus:ring-red-500/30',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
