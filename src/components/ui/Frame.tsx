import type { ReactNode } from 'react'

/**
 * The design draws the 1400px measure as two hairlines running the full page
 * height, with small crosses wherever a section rule meets them. `Rails`
 * paints the lines once, behind everything.
 */
export function Rails() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-[1400px] -translate-x-1/2"
    >
      <span className="rail left-0" />
      <span className="rail right-0" />
    </div>
  )
}

/** 1400px measure with the 70px inner gutter every section shares. */
export function Frame({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-[70px] ${className}`}>
      {children}
    </div>
  )
}
