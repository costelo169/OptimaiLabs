import { LogoMark } from '../ui/Logo'
import { SectionRule } from '../ui/SectionRule'

const COLUMNS = [
  { left: 737, title: 'Product', links: ['OptimAI Search', 'OptimAI X Agent'] },
  {
    left: 989,
    title: 'Company',
    links: ['Contact Us', 'About', 'Missions & Value'],
  },
  { left: 1240, title: 'Legal', links: ['Terms', 'Privacy Policy', 'Trust'] },
]

const SOCIALS = [
  {
    name: 'Telegram',
    path: 'M21.5 3.5 2.8 10.8c-1.1.4-1.1 1.1-.2 1.4l4.7 1.5 1.8 5.5c.2.6.4.8.8.8.4 0 .6-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.2-.5-1.8-1.3-1.4Z',
  },
  {
    name: 'X',
    path: 'M17.5 3h3l-6.6 7.5L21.8 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.5 3h6.2l4.2 5.6L17.5 3Zm-1 16.2h1.6L7.6 4.7H5.9l10.6 14.5Z',
  },
  {
    name: 'GitHub',
    path: 'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .3.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10 10 0 0 0 12 2Z',
  },
  {
    name: 'Discord',
    path: 'M19.3 5.6A16 16 0 0 0 15.4 4.4l-.2.4a15 15 0 0 0-6.4 0l-.2-.4a16 16 0 0 0-4 1.2C2.2 9.3 1.5 12.9 1.8 16.4a16 16 0 0 0 4.9 2.5l1-1.6a10 10 0 0 1-1.6-.8l.4-.3a11 11 0 0 0 9.4 0l.4.3c-.5.3-1 .6-1.6.8l1 1.6a16 16 0 0 0 4.9-2.5c.4-4-.7-7.6-3.3-10.8ZM8.4 14.3c-1 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9c1 0 1.8.9 1.7 1.9 0 1-.8 1.9-1.7 1.9Zm7.2 0c-1 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9c1 0 1.8.9 1.7 1.9 0 1-.7 1.9-1.7 1.9Z',
  },
  {
    name: 'LinkedIn',
    path: 'M6.9 21H3.3V9.3h3.6V21ZM5.1 7.7a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM21 21h-3.6v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21H9.7V9.3h3.4V11h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5V21Z',
  },
  {
    name: 'Facebook',
    path: 'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z',
  },
]

export function Footer() {
  return (
    <>
      <SectionRule />
      <footer className="relative h-[391px] w-full">
        <span
          aria-hidden="true"
          className="absolute top-[-2px] left-0 h-[2px] w-full bg-hairline"
        />
        <span
          aria-hidden="true"
          className="absolute top-[245px] left-0 h-[2px] w-full bg-hairline"
        />

        <div className="absolute top-0 left-1/2 h-full w-[1400px] -translate-x-1/2">
          <a
            href="/"
            className="absolute top-[48px] left-[-1px] flex items-center gap-[19px] text-white no-underline"
          >
            <LogoMark className="h-[57px] w-[69px]" />
            <span className="font-display text-[50px] leading-none">
              <span className="font-semibold">OptimAI</span>
              <span className="ml-[14px] font-light">Labs</span>
            </span>
          </a>
          <p className="absolute top-[142px] left-[2px] m-0 w-[520px] font-sans text-[15.5px] leading-[24px] text-[#878787]">
            Optimai Labs designs, tests, and deploys intelligent systems across
            search, agents, and data&#8212;turning research into real-world
            applications
          </p>

          {COLUMNS.map((col) => (
            <div
              key={col.title}
              className="absolute top-[52px]"
              style={{ left: col.left }}
            >
              <h2 className="m-0 font-sans text-[18px] leading-[24px] font-semibold text-white">
                {col.title}
              </h2>
              <ul className="m-0 mt-[27px] list-none p-0">
                {col.links.map((link) => (
                  <li key={link} className="mb-[12px] last:mb-0">
                    <a
                      href="#"
                      className="font-sans text-[16px] leading-[24px] text-white no-underline hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <ul className="absolute top-[295px] left-[-3px] m-0 flex list-none gap-[11px] p-0">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a
                  href="#"
                  aria-label={s.name}
                  className="flex h-[48px] w-[141px] items-center justify-center rounded-[8px] bg-[#1b1b1b] text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[20px] w-[20px]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <address className="absolute top-[296px] left-[973px] m-0 not-italic">
            <p className="m-0 font-sans text-[18px] leading-[24px] font-semibold text-white">
              OPTIMAI LABS PTE. LTD.
            </p>
            <p className="m-0 font-sans text-[13.5px] leading-[27px] text-[#878787]">
              FRASER STREET, DUO TOWER, #04-23A, Singapore 189352
            </p>
          </address>
        </div>
      </footer>
    </>
  )
}
