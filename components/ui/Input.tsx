import { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--muted)]">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full px-3 py-2.5 rounded-lg text-sm',
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
