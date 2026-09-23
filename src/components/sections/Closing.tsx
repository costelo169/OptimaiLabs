import { Section, Layer } from '../ui/Section'

export function Closing() {
  return (
    <Section height={560}>
      <Layer>
        <img
          src="/art/s9-burst.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-[-4px] h-[560px] w-[1408px] max-w-none"
        />
      </Layer>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[70px] text-center">
        <h2 className="m-0 pt-[123px] font-display text-[55px] leading-[76px] font-bold text-white">
          Because the Future of
          <br />
          Industry is Already Being Built
        </h2>
        <p className="mx-auto mt-[19px] mb-0 w-[600px] font-sans text-[18px] leading-[27px] text-[#cfcfcf]">
          We are currently selecting a limited number of institutional partners
          to pilot our next generation of modular intelligence
        </p>
        <a
          href="#"
          className="mt-[52px] inline-flex h-[44px] w-[524px] items-center justify-center rounded-[8px] bg-white font-sans text-[16px] font-semibold text-ink no-underline"
        >
          Contact Us
        </a>
      </div>
    </Section>
  )
}
