import { Section, Inner, Layer } from '../ui/Section'

const CALLOUTS = [
  {
    left: 71,
    top: 385,
    side: 'left' as const,
    text: 'AI opportunity assessment across revenue, cost, speed, risk and customer experience.',
  },
  {
    left: 1009,
    top: 385,
    side: 'right' as const,
    text: 'Use case prioritization, solid business cases, and actionable implementation roadmaps',
  },
  {
    left: 71,
    top: 763,
    side: 'left' as const,
    text: 'Rapid design, validation, and delivery of production-ready proof of concepts',
  },
  {
    left: 1009,
    top: 763,
    side: 'right' as const,
    dim: true,
    text: 'Leadership workshops, team training, workflow redesign, and responsible use guidance',
  },
]

export function Engage() {
  return (
    <Section step={2} label="How We Engage" height={938}>
      <Inner className="pt-[53px]">
        <div className="grid grid-cols-[605px_48px_1fr] items-start">
          <div>
            <h2 className="m-0 font-display text-[47px] leading-[56px] font-bold text-white">
              AI Strategy&#8211;Adoption
            </h2>
            <p className="mt-[8px] mb-0 w-[470px] font-sans text-[18px] leading-[27px] text-[#cfcfcf]">
              Know what is worth building before you spend months building the
              wrong thing
            </p>
          </div>

          <SwapTile />

          <div className="pl-[129px] opacity-[0.55]">
            <h2 className="m-0 font-display text-[47px] leading-[56px] font-bold text-white">
              Custom AI Solutions
            </h2>
            <p className="mt-[8px] mb-0 w-[400px] font-sans text-[18px] leading-[27px] text-[#cfcfcf]">
              Software that fits your business, not the other way around
            </p>
          </div>
        </div>
      </Inner>

      <Layer>
        <img
          src="/art/s4-hex.png"
          alt=""
          aria-hidden="true"
          className="absolute top-[307px] left-[393px] h-[620px] w-[615px] max-w-none"
        />
      </Layer>

      <div className="absolute top-0 left-1/2 h-full w-[1400px] -translate-x-1/2">
        {CALLOUTS.map((c) => (
          <Callout key={c.text} {...c} />
        ))}
      </div>
    </Section>
  )
}

/** The engagement model swaps between the two tracks either side of it. */
function SwapTile() {
  return (
    <span className="mt-[41px] flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[10px] bg-[#3f3f3f]">
      <svg
        viewBox="0 0 24 24"
        className="h-[20px] w-[20px]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 9h13m0 0-3.5-3.5M17 9l-3.5 3.5M20 15H7m0 0 3.5-3.5M7 15l3.5 3.5"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function Callout({
  left,
  top,
  side,
  text,
  dim = false,
}: {
  left: number
  top: number
  side: 'left' | 'right'
  text: string
  /** The design shows the last card still waiting its turn. */
  dim?: boolean
}) {
  return (
    <div
      className={`absolute h-[114px] w-[322px] rounded-[12px] border border-dashed ${
        dim ? 'border-[#232323]' : 'border-[#333]'
      }`}
      style={{ left, top }}
    >
      <div
        className={`absolute inset-[5px] overflow-hidden rounded-[8px] ${dim ? 'bg-[#070707]' : 'bg-[#222]'}`}
        style={
          dim
            ? undefined
            : {
                backgroundImage: `radial-gradient(ellipse 60% 120% at ${side === 'left' ? '7%' : '93%'} 50%, rgba(255,255,255,0.12), transparent 70%)`,
              }
        }
      >
        <span
          className={`absolute top-1/2 h-[32px] w-[4px] -translate-y-1/2 ${dim ? 'bg-[#1f1f1f]' : 'bg-white'} ${
            side === 'left' ? 'left-[20px]' : 'right-[20px]'
          }`}
        />
        <p
          className={`m-0 font-sans text-[16px] leading-[24px] ${dim ? 'text-[#868686]' : 'text-[#d3d3d3]'} ${
            side === 'left' ? 'ml-[48px] mr-[29px]' : 'mr-[52px] ml-[21px]'
          } mt-[16px]`}
        >
          {text}
        </p>
      </div>
    </div>
  )
}
