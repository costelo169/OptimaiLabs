import { Button } from '../ui/Button'
import { Frame } from '../ui/Frame'

/** One continuous marquee; the sphere sits over its middle. */
const TICKER = [
  'Enterprise Automation',
  'Intelligent Systems',
  'Autonomous Operations',
  'Intelligent Systems',
  'Custom Software',
  'Data Intelligence',
  'Adaptive Infrastructure',
  'Digital Transformation',
]

export function Hero() {
  return (
    <>
      <section className="h-[998px]">
        <Frame className="relative z-10">
          <div className="grid grid-cols-[792px_1fr] pt-[46px]">
            <h1 className="m-0 pl-[52px] font-display text-[72px] leading-[90px] font-bold text-white">
              We know what to
              <br />
              build. And how to
              <br />
              build it.
            </h1>

            <div className="pt-[33px]">
              <span className="inline-flex h-[28px] items-center rounded-full bg-accent/15 px-[12px] font-mono text-[12px] font-semibold text-accent">
                PRODUCTION-READY AI
              </span>

              <p className="mt-[33px] mb-0 w-[420px] font-sans text-[18px] leading-[29px] text-fg-dim">
                AI and custom software, guided by decades of real business
                leadership.
              </p>

              <div className="mt-[33px] flex gap-[16px]">
                <Button
                  variant="accent"
                  className="h-[52px] w-[200px] rounded-[8px] text-[16px]"
                >
                  Book Consultation
                </Button>
                <Button
                  variant="outline"
                  className="h-[52px] w-[202px] rounded-[8px] text-[16px]"
                >
                  See How We Work
                </Button>
              </div>
            </div>
          </div>
        </Frame>
      </section>

      {/* Decorative layer, pinned to the design's page coordinates: the
          orbiting core plus the label ticker that runs behind it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1220px]"
      >
        <img
          src="/art/hero-sphere.png"
          alt=""
          className="absolute top-[380px] left-1/2 ml-[-274px] h-[840px] w-[547px] max-w-none"
        />
        <ChipTicker />
      </div>
    </>
  )
}

/**
 * A label ticker clipped to the content measure. Each half fades as it nears
 * the core, so the two runs read as one track passing behind it.
 */
function ChipTicker() {
  return (
    <div className="absolute top-[762px] left-1/2 h-[48px] w-[1400px] -translate-x-1/2 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            'linear-gradient(to right, #000 0%, #000 18%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.3) 69%, #000 80%, #000 100%)',
        }}
      >
        <div className="absolute top-0 left-[-448px] flex h-full gap-[12px]">
          {TICKER.map((label, i) => (
            <Chip key={`${label}-${i}`} label={label} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <span className="flex h-[48px] shrink-0 items-center gap-[20px] rounded-[4px] bg-[rgba(217,217,217,0.1)] px-[20px] font-mono text-[16px] leading-[1.75] whitespace-nowrap text-white">
      <Bullet />
      {label}
      <Bullet />
    </span>
  )
}

function Bullet() {
  return (
    <span
      aria-hidden="true"
      className="block h-[4px] w-[4px] shrink-0 rounded-[0.5px] bg-black"
      style={{
        boxShadow:
          '0 0 0 1px rgba(255,255,255,0.05), 0 0 0 2px rgba(0,0,0,0.5)',
      }}
    />
  )
}
