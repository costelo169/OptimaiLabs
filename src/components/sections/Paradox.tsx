import { Section, Inner } from '../ui/Section'

const CARDS = [
  {
    title: 'FOMO',
    body: 'The project starts with buzzwords instead of a business need, an operating problem or measurable business case.',
    icon: 'send',
  },
  {
    title: 'MVP Viability',
    body: 'The demo works, but real workflows expose gaps in architecture, permissions, data quality, and stability.',
    icon: 'gears',
  },
  {
    title: 'Adoption Failure',
    body: 'Teams never change how they work, so the system sits unused and the expected return never arrives.',
    icon: 'gears',
  },
] as const

export function Paradox() {
  return (
    <Section step={0} knob="start" height={938}>
      <Inner className="pt-[48px]">
        <div className="grid grid-cols-[793px_1fr]">
          <h2 className="m-0 font-display text-[55px] leading-[76px] font-bold text-white">
            AI made software easier
            <br />
            to demo. Not better.
          </h2>
          <p className="mt-[30px] mb-0 w-[430px] font-sans text-[18px] leading-[27px] text-[#cfcfcf]">
            Most companies do not fail at AI because of the Technology. They
            fail because the prototype never becomes a product, the product
            never fits the workflow, or the team never adopts it
          </p>
        </div>
      </Inner>

      {/* Issue carousel — card one is settled, the next is still arriving. */}
      <div className="absolute top-[400px] left-1/2 w-[1400px] -translate-x-1/2 overflow-hidden">
        <div className="flex gap-[28px]" style={{ paddingLeft: 480 }}>
          {CARDS.map((card, i) => (
            <article
              key={card.title}
              className="flex w-[520px] shrink-0 gap-[21px]"
              style={{ opacity: i === 0 ? 1 : 0.45 }}
            >
              <IconTile active={i === 0} kind={card.icon} />
              <div className="w-[356px]">
                <h3 className="m-0 font-sans text-[20px] leading-[30px] font-medium text-white">
                  {card.title}
                </h3>
                <p className="mt-[6px] mb-0 font-sans text-[16px] leading-[25px] text-[#d0d1d1]">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <img
        src="/art/s2-arc.png"
        alt=""
        aria-hidden="true"
        className="absolute top-[508px] left-1/2 h-[430px] w-[1396px] max-w-none -translate-x-1/2"
      />
    </Section>
  )
}

function IconTile({
  active,
  kind,
}: {
  active: boolean
  kind: 'send' | 'gears'
}) {
  return (
    <span
      className={`mt-[4px] flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] border ${
        active
          ? 'border-accent bg-accent/[0.13] text-accent'
          : 'border-white/10 bg-white/[0.06] text-[#8d8d8d]'
      }`}
    >
      {kind === 'send' ? <SendIcon /> : <GearsIcon />}
    </span>
  )
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[22px] w-[22px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GearsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[22px] w-[22px]"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <circle
        cx="16.5"
        cy="16"
        r="2.6"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 3.4v1.4M9 13.2v1.4M3.4 9h1.4M13.2 9h1.4M5 5l1 1M12 12l1 1M13 5l-1 1M6 12l-1 1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
