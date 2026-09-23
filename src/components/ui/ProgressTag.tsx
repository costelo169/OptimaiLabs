const SLOTS = 6

/**
 * Section marker: six slots that read as a progress track down the page. The
 * slot matching the current section expands into a labelled pill with a knob
 * riding at its trailing edge; the rest stay as dormant dots.
 */
export function ProgressTag({
  step,
  label,
  knob = 'end',
}: {
  /** Zero-based slot that is expanded for this section. */
  step: number
  label?: string
  /** Where the knob sits inside the pill — the first section catches it mid-travel. */
  knob?: 'start' | 'end'
}) {
  return (
    <div className="flex items-center gap-[42px]">
      {Array.from({ length: SLOTS }, (_, i) =>
        i === step ? (
          <ActivePill key={i} label={label} knob={knob} />
        ) : (
          <Dot key={i} />
        ),
      )}
    </div>
  )
}

function ActivePill({
  label,
  knob,
}: {
  label?: string
  knob: 'start' | 'end'
}) {
  const lit = Boolean(label)
  return (
    <div
      className={`relative flex h-[56px] w-[330px] shrink-0 items-center rounded-full border-2 ${
        lit ? 'border-accent' : 'border-transparent'
      }`}
      style={{
        background: 'linear-gradient(180deg, #161616 0%, #1d1d1d 100%)',
        boxShadow: lit ? '0 0 18px rgba(140,242,193,0.18)' : 'none',
      }}
    >
      {label ? (
        <span className="flex items-center gap-[10px] pl-[19px] font-display text-[20px] font-medium text-accent">
          <Arrow />
          {label}
        </span>
      ) : null}
      <Knob className={knob === 'end' ? 'right-[6px]' : 'left-[6px]'} />
    </div>
  )
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 12"
      className="h-[12px] w-[16px]"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M1 6h13m0 0-4.5-4.5M14 6l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Knob({ className = '' }: { className?: string }) {
  return (
    <span
      className={`absolute top-1/2 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full ${className}`}
      style={{
        background: 'radial-gradient(circle, #1d2a24 0%, #141a17 70%)',
        boxShadow:
          '0 0 0 2px rgba(140,242,193,0.85), 0 0 16px rgba(140,242,193,0.45)',
      }}
    >
      <span className="block h-[10px] w-[10px] rounded-full bg-accent" />
    </span>
  )
}

function Dot() {
  return (
    <span
      className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full"
      style={{
        background: 'radial-gradient(circle, #1b1b1b 0%, #161616 100%)',
      }}
    >
      <span className="block h-[10px] w-[10px] rounded-full bg-[#0d0d0d]" />
    </span>
  )
}
