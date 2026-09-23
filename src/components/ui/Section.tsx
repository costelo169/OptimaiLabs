import type { ReactNode } from 'react'
import { SectionRule } from './SectionRule'
import { ProgressTag } from './ProgressTag'

/**
 * Every content section shares the same shell: the dotted rule that closes the
 * previous one, then the progress marker, then the section's own content.
 */
export function Section({
  step,
  label,
  knob,
  height,
  children,
  className = '',
}: {
  /** Omit for sections the design leaves unmarked. */
  step?: number
  label?: string
  knob?: 'start' | 'end'
  /** Design height of the section body, measured between its rules. */
  height: number
  children: ReactNode
  className?: string
}) {
  return (
    <>
      <SectionRule />
      <section className={`relative ${className}`} style={{ height }}>
        {step === undefined ? null : (
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[70px] pt-[48px]">
            <ProgressTag step={step} label={label} knob={knob} />
          </div>
        )}
        {children}
      </section>
    </>
  )
}

/** Content measure inside a section, without the section's own top padding. */
export function Inner({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative z-10 mx-auto w-full max-w-[1400px] px-[70px] ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * An absolutely positioned 1400px layer inside a section. Children use `left`
 * offsets measured from the content measure, matching the design's geometry.
 */
export function Layer({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-[1400px] -translate-x-1/2">
      {children}
    </div>
  )
}
