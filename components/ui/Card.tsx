import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'inset'
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

const variants = {
  default: 'bg-[var(--surface)] border border-[var(--border)] rounded-lg',
  flat:    'border border-[var(--border)] rounded-lg',
  inset:   'bg-[var(--elevated)] border border-[var(--border)] rounded-lg',
}

const paddings = {
  none: '',
  sm:   'p-4',
  md:   'p-5',
  lg:   'p-6',
}

export function Card({
  variant = 'default',
  padding = 'md',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </div>
  )
}
