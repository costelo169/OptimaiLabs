import type { ReactNode } from 'react'

type Variant = 'accent' | 'outline' | 'white'

const base =
  'inline-flex items-center justify-center whitespace-nowrap font-sans font-semibold transition-colors duration-200 cursor-pointer no-underline'

const variants: Record<Variant, string> = {
  accent: 'bg-accent text-ink hover:bg-[#a6f6d1]',
  outline: 'bg-accent/10 text-white border border-accent/50 hover:bg-accent/20',
  white: 'bg-white text-ink hover:bg-white/90',
}

export function Button({
  variant = 'accent',
  className = '',
  children,
  href = '#',
}: {
  variant?: Variant
  className?: string
  children: ReactNode
  href?: string
}) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  )
}
