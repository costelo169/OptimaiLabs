/**
 * The band that separates every section: a hairline, an 78px dot field, then a
 * second hairline, with a cross mark where each rule meets the page rails.
 */
export function SectionRule({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative mx-auto w-full max-w-[1400px] ${className}`}
    >
      <Rule />
      <div
        className="h-[76px] w-full"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, var(--color-line) 0.75px, transparent 0.75px)',
          backgroundSize: '10px 10px',
          backgroundPosition: '0 2px',
        }}
      />
      <Rule />
    </div>
  )
}

function Rule() {
  return (
    <div className="relative h-[2px] w-full bg-hairline">
      <Cross className="left-0" />
      <Cross className="right-0" />
    </div>
  )
}

function Cross({ className = '' }: { className?: string }) {
  return (
    <span className={`absolute top-1/2 -translate-y-1/2 ${className}`}>
      <span className="absolute top-1/2 left-1/2 block h-[2px] w-[12px] -translate-x-1/2 -translate-y-1/2 bg-line" />
      <span className="absolute top-1/2 left-1/2 block h-[8px] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-line" />
    </span>
  )
}
