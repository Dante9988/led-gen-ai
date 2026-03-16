import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const variants = {
  primary:
    'bg-violet-700 text-white hover:bg-violet-600 active:scale-[0.98] shadow-sm',
  secondary:
    'bg-white/5 text-[var(--text)] border border-[var(--border-md)] hover:bg-white/8 hover:border-white/20',
  danger:
    'bg-red-600/90 text-white hover:bg-red-500 active:scale-[0.98]',
  ghost:
    'text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150',
        'disabled:opacity-40 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
