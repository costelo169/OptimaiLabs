import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'
import { Frame } from '../ui/Frame'

const LINKS = ['AI Agents', 'Data', 'Solutions', 'Research', 'Product']

export function Nav() {
  return (
    <div className="relative">
      {/* A hairline runs the full bleed through the bar's centre line. */}
      <span
        aria-hidden="true"
        className="absolute top-[99px] left-0 h-[2px] w-full bg-hairline"
      />
      <Frame className="relative z-20 pt-[59px]">
        <nav className="flex h-[80px] items-center rounded-[10px] border-2 border-[#363636] bg-surface pr-[23px] pl-[22px]">
          <Logo
            markClass="h-[31px] w-[37px]"
            textClass="text-[25px]"
            gapClass="gap-[8px]"
          />

          <ul className="m-0 flex flex-1 list-none justify-center p-0">
            {LINKS.map((link) => (
              <li key={link} className="w-[110px] text-center">
                <a
                  href="#"
                  className="font-sans text-[17px] text-fg-muted no-underline transition-colors hover:text-white"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <Button
            variant="white"
            className="h-[40px] w-[210px] rounded-[6px] text-[15px]"
          >
            Contact Us
          </Button>
        </nav>
      </Frame>
    </div>
  )
}
