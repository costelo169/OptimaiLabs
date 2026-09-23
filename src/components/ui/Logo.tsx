/**
 * The OptimAI mark: a tall chevron leg with a smaller peak nested in front of
 * it. Path coordinates are traced from the design at its native 38x31.
 */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 38 31"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 0 37 30h-7L15 4z" />
      <path d="M11.5 12 23.5 30H17l-5.7-8.5L6.5 30H0z" />
    </svg>
  )
}

export function Logo({
  markClass = 'h-[32px] w-[40px]',
  textClass = 'text-[25px]',
  gapClass = 'gap-[11px]',
}: {
  markClass?: string
  textClass?: string
  gapClass?: string
}) {
  return (
    <a
      href="/"
      className={`flex items-center ${gapClass} text-white no-underline`}
    >
      <LogoMark className={markClass} />
      <span className={`font-display leading-none ${textClass}`}>
        <span className="font-semibold">OptimAI</span>
        <span className="ml-[7px] font-light">Labs</span>
      </span>
    </a>
  )
}
