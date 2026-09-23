import { Section, Layer } from '../ui/Section'

const SUBS = [
  'The one nobody else could read',
  "The one that couldn't fail",
  "The one that wasn't about the tech",
]

const BEATS = [
  {
    top: 365,
    subsShown: 1,
    art: '/art/s8-illus1.png',
    artTop: 338,
    artHeight: 390,
    alt: 'Handwritten Burmese documents being read by a trained model',
    paras: [
      {
        top: 391,
        text: "A client's documents were handwritten in Burmese. Off-the-shelf models struggle with the printed language, let alone handwriting.",
      },
      {
        top: 487,
        text: 'Our engineers trained a system that reads it — alongside Thai and Vietnamese — and it runs in production today. We did not win that work with a deck. We won it because we were willing to take on the problem others would not.',
      },
    ],
  },
  {
    top: 843,
    subsShown: 2,
    art: '/art/s8-illus2.png',
    artTop: 748,
    artHeight: 460,
    alt: 'Emergency ward communications moved onto secure mobile infrastructure',
    paras: [
      {
        top: 869,
        text: 'A provincial health system in Canada was running critical emergency communications on aging pager infrastructure.',
      },
      {
        top: 965,
        text: 'We moved it onto secure mobile infrastructure, in an environment where a missed message could have serious consequences. Reliability was not something added at the end — it shaped the architecture from the beginning.',
      },
    ],
  },
  {
    top: 1320,
    subsShown: 3,
    art: '/art/s8-illus3.png',
    artTop: 1228,
    artHeight: 390,
    alt: 'A supplier-discovery platform built as a lead-generation engine',
    paras: [
      {
        top: 1314,
        text: 'When a leading event-management platform wanted more qualified leads, we did not pitch them a feature. We designed a business: HeySupplier — one of the largest supplier-discovery platforms in North America, with thousands of verified event suppliers — built as a standing lead-generation engine for their core product.',
      },
      {
        top: 1506,
        text: 'Then we handed over the keys. It runs today without us. The innovation was not only technical: it was knowing which system would move their revenue, and building exactly that.',
      },
    ],
  },
]

const CODA = [
  {
    left: 70,
    width: 360,
    lead: 'Three decisions',
    text: ', backed by decades of work across Southeast Asia, Japan, Australia, Europe and North America',
  },
  {
    left: 525,
    width: 350,
    text: 'With Expertise in consumer goods and healthcare, e-commerce and retail, telecom and media, financial services and technology, logistics, industrial and automotive',
  },
  {
    left: 979,
    width: 352,
    text: "Some of that record, in government and insurance, stays confidential — the same way your work with us would. Ask for the decisions from your industry, and we'll bring them.",
  },
]

export function Decisions() {
  return (
    <Section height={1905}>
      {/* A soft field of light sits behind the whole passage. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 46% 38% at 52% 48%, rgba(130,235,205,0.085), rgba(130,235,205,0) 72%), radial-gradient(ellipse 82% 66% at 52% 48%, rgba(130,235,205,0.045), rgba(130,235,205,0) 78%)',
        }}
      />

      <Layer>
        {BEATS.map((b) => (
          <img
            key={b.art}
            src={b.art}
            alt={b.alt}
            className="absolute left-[400px] w-[536px] max-w-none"
            style={{ top: b.artTop, height: b.artHeight }}
          />
        ))}
      </Layer>

      <div className="absolute top-0 left-1/2 h-full w-[1400px] -translate-x-1/2">
        {/* Opening claim */}
        <ul className="absolute top-[69px] left-[70px] m-0 w-[480px] list-none p-0">
          <li className="relative mb-[23px] pl-[24px] font-sans text-[15.7px] leading-[24px] text-[#888888]">
            <Marker />
            With Experienced in{' '}
            <strong className="font-semibold text-white">
              Google, LINE, DKSH and OnPoint
            </strong>
          </li>
          <li className="relative mb-[23px] pl-[24px] font-sans text-[15.7px] leading-[24px] text-[#888888]">
            <Marker />
            And businesses across Southeast Asia and North America
          </li>
          <li className="relative pl-[24px] font-sans text-[18px] leading-[27px] text-[#e4e4e4]">
            <span className="absolute top-[54px] left-[1px] block h-[4px] w-[4px] bg-[#9aa39a]" />
            We&apos;ve sat on your side of the table. Instead of another
            capability list, here are three decisions we&apos;ve made and
            facilitated&#8212;they show how we&apos;ll handle your business far
            better than a list ever could.
          </li>
        </ul>

        <span
          aria-hidden="true"
          className="absolute top-[236px] left-[600px] h-[1px] w-[200px] bg-[#5c6560]"
        />
        <Headline className="absolute top-[204px] left-[854px]" />

        {BEATS.map((beat) => (
          <div key={beat.top}>
            <Headline
              className="absolute left-[74px]"
              style={{ top: beat.top }}
            />
            {SUBS.slice(0, beat.subsShown).map((sub, i) => (
              <p
                key={sub}
                className={`absolute left-[72px] m-0 font-sans text-[18px] leading-[24px] ${
                  i === beat.subsShown - 1
                    ? 'font-medium text-white'
                    : 'text-[#8d8d8d]'
                }`}
                style={{ top: beat.top + 118 + i * 42 }}
              >
                {sub}
              </p>
            ))}
            {beat.paras.map((para) => (
              <p
                key={para.top}
                className="absolute left-[940px] m-0 w-[392px] font-sans text-[15.4px] leading-[24px] text-[#8b8d8e]"
                style={{ top: para.top }}
              >
                {para.text}
              </p>
            ))}
          </div>
        ))}

        {/* Closing record */}
        {CODA.map((c) => (
          <p
            key={c.left}
            className="absolute top-[1725px] m-0 font-sans text-[16px] leading-[24px] text-[#888888]"
            style={{ left: c.left, width: c.width }}
          >
            {c.lead ? (
              <strong className="font-semibold text-white">{c.lead}</strong>
            ) : null}
            {c.text}
          </p>
        ))}
        <span
          aria-hidden="true"
          className="absolute top-[1755px] left-[401px] h-[1px] w-[18px] bg-[#6a706a]"
        />
        <span
          aria-hidden="true"
          className="absolute top-[1755px] left-[979px] h-[1px] w-[20px] bg-[#6a706a]"
        />
      </div>
    </Section>
  )
}

function Marker() {
  return (
    <span className="absolute top-[10px] left-[1px] block h-[4px] w-[4px] bg-[#9aa39a]" />
  )
}

function Headline({
  className = '',
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <p
      className={`m-0 font-display text-[55px] leading-[66px] font-bold text-white ${className}`}
      style={style}
    >
      3 decisions.
    </p>
  )
}
