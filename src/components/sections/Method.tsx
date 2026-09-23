import { Section, Inner, Layer } from '../ui/Section'

const TABS = ['Discovery', 'Execution', 'Operations & Value']

const STEPS = [
  {
    left: 58,
    title: 'Understand',
    body: 'Your problem, processes, systems and people',
  },
  {
    left: 380,
    title: 'Prioritize',
    body: 'The opportunities most likely to produce measurable value',
  },
  {
    left: 702,
    title: 'Build',
    body: 'Design, integrate, test and deploy in manageable stages',
  },
  {
    left: 1034,
    title: 'Adopt',
    body: 'Training, workflow transition and organizational readiness',
  },
  {
    left: 1356,
    title: 'Improve',
    body: 'Measure what works and refine what does not',
  },
]

/** Column rules continue past the illustration, behind the step captions. */
const SEPARATORS = [323, 654, 995, 1309]

export function Method() {
  return (
    <Section step={4} label="How we work" height={938}>
      <Inner className="pt-[48px]">
        <div className="grid grid-cols-[793px_1fr]">
          <h2 className="m-0 font-display text-[55px] leading-[76px] font-bold text-white">
            A clear path from business
            <br />
            problem to working system
          </h2>
          <p className="mt-[41px] mb-0 font-sans text-[18px] leading-[27px] text-[#cfcfcf]">
            Small enough to start, structured enough to scale.
          </p>
        </div>

        <div className="mt-[83px] flex justify-center gap-[13px]">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={`h-[48px] w-[200px] cursor-pointer rounded-[8px] font-sans text-[18px] font-medium ${
                i === 0
                  ? 'border border-[#6a6a6a] bg-[#151515] text-white'
                  : 'border border-transparent bg-[#1e1e1e] text-[#8f8f8f]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Inner>

      <Layer>
        <img
          src="/art/s6-timeline.png"
          alt=""
          aria-hidden="true"
          className="absolute top-[494px] left-[2px] h-[315px] w-[1396px] max-w-none"
        />
        {SEPARATORS.map((x) => (
          <span
            key={x}
            className="absolute top-[809px] h-[62px] w-0 border-l border-dashed border-[#2a2a2a]"
            style={{ left: x }}
          />
        ))}
      </Layer>

      <div className="absolute top-0 left-1/2 h-full w-[1400px] -translate-x-1/2 overflow-hidden">
        {STEPS.map((step) => (
          <div
            key={step.title}
            className="absolute top-[811px] w-[240px]"
            style={{ left: step.left }}
          >
            <h3 className="m-0 font-sans text-[18px] leading-[24px] font-medium text-white">
              {step.title}
            </h3>
            <p className="mt-[6px] mb-0 font-sans text-[15px] leading-[24px] text-[#cfcfcf]">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
