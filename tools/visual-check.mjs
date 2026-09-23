/**
 * Renders the landing page at the design's 1920px width and diffs it against
 * the Figma reference, reporting mismatch per 200px band so it is obvious
 * which section still needs work.
 *
 *   node tools/visual-check.mjs [--url http://localhost:4173] [--band 200]
 */
import { chromium } from '@playwright/test'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'
import fs from 'node:fs'
import path from 'node:path'

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? fallback : process.argv[i + 1]
}

const URL = arg('url', 'http://localhost:4173')
const BAND = Number(arg('band', 200))
const THRESHOLD = Number(arg('threshold', 0.12))
const OUT = 'design/out'
const REF = 'design/reference/landing-1920.png'

fs.mkdirSync(OUT, { recursive: true })

// Figma renders text with grayscale antialiasing; match it so the diff
// reflects design differences rather than a font-smoothing mode.
const browser = await chromium.launch({ args: ['--disable-lcd-text'] })
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
})

await page.goto(URL, { waitUntil: 'networkidle' })
// Settle webfonts and any entry transitions before capturing.
await page.evaluate(() => document.fonts.ready)
await page.addStyleTag({
  content: `*,*::before,*::after{animation:none!important;transition:none!important}
            [data-devtools],.tsqd-parent-container,
            [class*="tsd-"],[id*="devtools"]{display:none!important}`,
})
await page.waitForTimeout(400)

const shotPath = path.join(OUT, 'actual.png')
await page.screenshot({ path: shotPath, fullPage: true })
await browser.close()

const actual = PNG.sync.read(fs.readFileSync(shotPath))
const expected = PNG.sync.read(fs.readFileSync(REF))

const w = Math.min(actual.width, expected.width)
const h = Math.min(actual.height, expected.height)

console.log(
  `rendered ${actual.width}x${actual.height}   reference ${expected.width}x${expected.height}`,
)
if (actual.height !== expected.height) {
  const d = actual.height - expected.height
  console.log(`height delta ${d > 0 ? '+' : ''}${d}px`)
}

// Crop both to the shared area so pixelmatch can run on equal buffers.
const crop = (src) => {
  const out = new PNG({ width: w, height: h })
  for (let y = 0; y < h; y++) {
    src.data.copy(
      out.data,
      y * w * 4,
      y * src.width * 4,
      y * src.width * 4 + w * 4,
    )
  }
  return out
}
const a = crop(actual)
const b = crop(expected)
const diff = new PNG({ width: w, height: h })

const mismatched = pixelmatch(a.data, b.data, diff.data, w, h, {
  threshold: THRESHOLD,
  includeAA: false,
  diffMask: true,
})

fs.writeFileSync(path.join(OUT, 'diff.png'), PNG.sync.write(diff))

const total = w * h
console.log(
  `\nmismatch ${mismatched} / ${total} px  = ${((mismatched / total) * 100).toFixed(2)}%\n`,
)

// Per-band breakdown: where is the damage?
const bands = []
for (let y0 = 0; y0 < h; y0 += BAND) {
  const y1 = Math.min(y0 + BAND, h)
  let n = 0
  for (let y = y0; y < y1; y++) {
    for (let x = 0; x < w; x++) {
      if (diff.data[(y * w + x) * 4 + 3] !== 0) n++
    }
  }
  bands.push({ y0, y1, n, pct: (n / ((y1 - y0) * w)) * 100 })
}
bands.sort((p, q) => q.pct - p.pct)
console.log('worst bands:')
for (const s of bands.slice(0, 18)) {
  console.log(
    `  y ${String(s.y0).padStart(5)}..${String(s.y1).padStart(5)}  ${s.pct.toFixed(1).padStart(5)}%  (${s.n})`,
  )
}

fs.writeFileSync(
  path.join(OUT, 'report.json'),
  JSON.stringify(
    { mismatched, total, pct: (mismatched / total) * 100, bands },
    null,
    2,
  ),
)
