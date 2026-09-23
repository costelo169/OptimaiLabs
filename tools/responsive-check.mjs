/** Reports horizontal overflow at common viewport widths. */
import { chromium } from '@playwright/test'

const URL = process.argv[2] || 'http://localhost:4173'
const browser = await chromium.launch({ args: ['--disable-lcd-text'] })
for (const width of [1920, 1600, 1440, 1280, 1024, 768, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const m = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    scrollH: document.documentElement.scrollHeight,
  }))
  const overflow = m.scrollW - m.clientW
  console.log(
    `${String(width).padStart(5)}px  scrollWidth ${String(m.scrollW).padStart(5)}  ` +
      `height ${String(m.scrollH).padStart(6)}  h-overflow ${overflow > 0 ? `${overflow}px` : 'none'}`,
  )
  await page.close()
}
await browser.close()
