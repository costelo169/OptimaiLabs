import { Section, Inner, Layer } from '../ui/Section'

export function UseCases() {
  return (
    <Section step={5} label="Use Cases" height={938}>
      <Inner className="pt-[48px]">
        <div className="grid grid-cols-[742px_1fr]">
          <h2 className="m-0 font-display text-[55px] leading-[76px] font-bold text-white">
            Use cases go here when
            <br />
            the proof is ready
          </h2>
          <p className="mt-[14px] mb-0 w-[460px] font-sans text-[18px] leading-[27px] text-[#cfcfcf]">
            These placeholders let the website launch with the right structure
            while the team finalizes approved proof points. No invented metrics,
            no benchmark theater
          </p>
        </div>
      </Inner>

      <Layer>
        <img
          src="/art/s7-mid.png"
          alt=""
          aria-hidden="true"
          className="absolute top-[546px] left-[540px] h-[392px] w-[306px] max-w-none"
        />
        <img
          src="/art/s7-card2.png"
          alt="Advanced robotics: a surgical arm working from volumetric scan data"
          className="absolute top-[646px] left-[846px] h-[292px] w-[552px] max-w-none"
        />
      </Layer>

      <div className="absolute top-[381px] left-1/2 ml-[-630px] h-[451px] w-[448px] overflow-hidden rounded-[14px] border border-dashed border-[#3a4a42]">
        <img
          src="/art/s7-card1.png"
          alt="Computer vision: a camera reading a vehicle number plate and returning a confidence score"
          className="absolute top-[1px] left-[1px] h-[320px] w-[446px] max-w-none"
        />
        <h3 className="absolute top-[336px] left-[30px] m-0 font-sans text-[20px] leading-[26px] font-medium text-white">
          Vehicle and license plate recognition
        </h3>
        <p className="absolute top-[370px] left-[31px] m-0 w-[350px] font-sans text-[16px] leading-[22px] text-[#969797]">
          Placeholder for client context, technical scope, deployment
          environment, integration path and measurable result
        </p>
      </div>
    </Section>
  )
}
