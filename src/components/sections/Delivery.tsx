import { Section, Inner } from '../ui/Section'
import { LogoMark } from '../ui/Logo'

const WORDS = [
  { text: 'Integration', opacity: 0.66 },
  { text: 'Security', opacity: 1 },
  { text: 'Testing', opacity: 1 },
  { text: 'Adoption', opacity: 1 },
  { text: 'The Rest Of The Way', opacity: 0.37 },
]

const CHIPS = [
  ['POC in one week', 'Weekly working releases'],
  ['Single point of contact', 'Your cloud or ours', 'Owned by you'],
]

const CARDS = [
  {
    left: 633,
    top: 25,
    titleTop: 208,
    title: 'Strong Choice',
    body: 'We identify where AI or custom software can create real business value, then define the strongest place to start — and prove it with a working POC in one week.',
    dim: false,
  },
  {
    left: 1006,
    top: 0,
    titleTop: 208,
    title: 'Production Built',
    body: 'We build secure, scalable systems tailored to your workflows. Every project ships with code review, automated testing, CI/CD, tiered environments, and monitoring across AWS, GCP, Azure, or on-premise.',
    dim: true,
  },
]

export function Delivery() {
  return (
    <Section step={3} label="Enterprise Delivery" height={1425}>
      <Inner className="pt-[48px]">
        <h2 className="relative m-0 font-display text-[55px] leading-[76px] font-bold text-white">
          Anyone can demo an Idea
          <Bracket />
        </h2>
      </Inner>

      {/* The promise cycles through everything that follows a demo. */}
      <div className="absolute top-0 left-1/2 h-full w-[1400px] -translate-x-1/2">
        <div className="absolute top-[372px] left-[236px] flex items-center gap-[18px]">
          <LogoMark className="h-[40px] w-[48px] text-white" />
          <span className="font-display text-[55px] leading-[76px] font-bold text-white">
            can take
          </span>
        </div>

        <ul
          className="absolute top-[288px] left-[548px] m-0 list-none p-0"
          style={{
            maskImage: 'linear-gradient(to bottom, #000 74%, transparent 96%)',
          }}
        >
          {WORDS.map((w) => (
            <li
              key={w.text}
              className="h-[84px] font-display text-[55px] leading-[84px] font-bold whitespace-nowrap text-white"
              style={{ opacity: w.opacity }}
            >
              {w.text}
            </li>
          ))}
        </ul>

        <p className="absolute top-[723px] left-[548px] m-0 w-[460px] font-sans text-[18px] leading-[27px] text-[#cfcfcf]">
          We prove value fast with a working proof of concept in one week, then
          build toward production in weekly, reviewable releases with a single
          point of contact throughout.
        </p>

        <Panel />
      </div>
    </Section>
  )
}

/** The rule that loops from the headline back to the list beneath it. */
function Bracket() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute top-[19px] left-[693px] h-[238px] w-[264px] overflow-visible"
      viewBox="0 0 264 238"
      fill="none"
    >
      <path d="M0 1h262v233H113" stroke="#fff" strokeWidth="2" />
      <path d="M121 226l-9 8 9 8" stroke="#fff" strokeWidth="2" fill="none" />
    </svg>
  )
}

function Panel() {
  return (
    <div className="absolute top-[908px] left-[70px] h-[440px] w-[1260px] overflow-hidden rounded-[14px] border border-dashed border-[#565656] bg-[#0d0d0d]">
      <p className="absolute top-[24px] left-[20px] m-0 w-[520px] font-sans text-[15.7px] leading-[24px] font-medium text-white">
        AI-accelerated, human-verified. We build with AI — AI-assisted
        development and automated test generation let us move faster than
        traditional teams. But nothing ships on autopilot: every release is
        reviewed and verified by senior engineers before it reaches you. AI
        speed, human accountability.
      </p>

      <a
        href="#"
        className="absolute top-[164px] left-[20px] flex h-[44px] w-[258px] items-center justify-center rounded-[8px] border border-accent/50 bg-accent/10 font-sans text-[16px] font-semibold text-white no-underline"
      >
        See the full Delivery Process
      </a>

      <div className="absolute top-[299px] left-[28px] flex w-[580px] flex-wrap gap-x-[12px] gap-y-[13px]">
        {CHIPS.flat().map((chip) => (
          <span
            key={chip}
            className="flex h-[50px] items-center rounded-[8px] bg-[#1d201e] px-[18px] font-sans text-[16px] whitespace-nowrap text-white"
          >
            {chip}
          </span>
        ))}
      </div>

      {CARDS.map((card) => (
        <div
          key={card.title}
          className="absolute h-[415px] w-[350px] rounded-[12px]"
          style={{
            left: card.left,
            top: card.top,
            background: card.dim
              ? 'linear-gradient(180deg, #121413 0%, #141719 100%)'
              : 'linear-gradient(180deg, #181919 0%, #191c1d 100%)',
          }}
        >
          <span className="absolute top-[24px] left-[24px] flex h-[44px] w-[44px] items-center justify-center rounded-[10px] border border-accent/60 bg-accent/[0.13] text-accent">
            <svg
              viewBox="0 0 24 24"
              className="h-[20px] w-[20px]"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 3v7m0 0-4 4m4-4 4 4M6 21h12"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h3
            className="absolute left-[23px] m-0 font-sans text-[20px] leading-[26px] font-medium text-white"
            style={{ top: card.titleTop }}
          >
            {card.title}
          </h3>
          <p
            className="absolute left-[23px] m-0 w-[300px] font-sans text-[16px] leading-[24px] text-[#d1d1d1]"
            style={{ top: card.titleTop + 35 }}
          >
            {card.body}
          </p>
        </div>
      ))}
    </div>
  )
}
