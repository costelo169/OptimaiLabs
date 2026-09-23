import { Section, Inner, Layer } from '../ui/Section'

const CARDS = [
  {
    art: '/art/s3-card1.png',
    artHeight: 427,
    left: 58,
    textLeft: 70,
    textTop: 750,
    title: 'Business First',
    body: 'We start with commercial value, operational fit and leadership priorities before choosing the technical path',
    dim: false,
  },
  {
    art: '/art/s3-card2.png',
    artHeight: 457,
    left: 496,
    textLeft: 507,
    textTop: 786,
    title: 'True Enterprise',
    body: 'We build toward real products with architecture, integration, security, stability and maintainability considered from the start',
    dim: true,
  },
  {
    art: '/art/s3-card3.png',
    artHeight: 457,
    left: 932,
    textLeft: 944,
    textTop: 786,
    title: 'Foundational',
    body: 'We carries technical depth from its broader engineering roots while standing clearly as the enterprise AI and software delivery brand',
    dim: true,
  },
]

export function Principles() {
  return (
    <Section step={1} label="What We Do" height={938}>
      <Inner className="pt-[56px]">
        <div className="grid grid-cols-[793px_1fr]">
          <h2 className="m-0 font-display text-[55px] leading-[76px] font-bold text-white">
            Business &amp; Technology
          </h2>
          <p className="mt-[8px] mb-0 w-[450px] font-sans text-[18px] leading-[27px] text-[#cfcfcf]">
            OptimAI Labs helps leadership teams decide what is worth building,
            then delivers production grade AI and custom software that can scale
            inside the business.
          </p>
        </div>
      </Inner>

      <Layer>
        {CARDS.map((card) => (
          <img
            key={card.art}
            src={card.art}
            alt=""
            aria-hidden="true"
            className="absolute top-[313px] w-[412px] max-w-none"
            style={{ left: card.left, height: card.artHeight }}
          />
        ))}
      </Layer>

      <div className="absolute top-0 left-1/2 h-full w-[1400px] -translate-x-1/2">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="absolute w-[350px]"
            style={{
              left: card.textLeft,
              top: card.textTop,
              opacity: card.dim ? 0.55 : 1,
            }}
          >
            <h3 className="m-0 font-sans text-[20px] leading-[26px] font-medium text-white">
              {card.title}
            </h3>
            <p className="mt-[7px] mb-0 font-sans text-[16px] leading-[24px] text-[#cfcfcf]">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
