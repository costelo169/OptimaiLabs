/**
 * Identifies a typeface by rasterising candidates and pixel-comparing them
 * against a region of the Figma reference. Size is fitted per candidate so the
 * ink width matches, then the glyph shapes decide the winner.
 *
 *   node tools/font-match.mjs "<text>" <inkX0> <inkY0> <inkX1> <inkY1>
 */
import { chromium } from '@playwright/test'
import { PNG } from 'pngjs'
import fs from 'node:fs'

const [, , TEXT, ...nums] = process.argv
const [IX0, IY0, IX1, IY1] = nums.slice(0, 4).map(Number)
const COLOR = nums[4] || '#ffffff'
const TARGET_W = IX1 - IX0 + 1

const FAMS = (
  process.env.FAMS ||
  'Geist,Inter,Manrope,DM Sans,Figtree,Plus Jakarta Sans,Outfit,Sora,Urbanist'
).split(',')
const WEIGHTS = [400, 500, 600, 700]

const PAD = 10
const X0 = IX0 - PAD
const Y0 = IY0 - PAD
const W = TARGET_W + PAD * 2
const H = IY1 - IY0 + 1 + PAD * 2

const ref = PNG.sync.read(fs.readFileSync('design/reference/landing-1920.png'))
const refPatch = new Uint8Array(W * H)
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++)
    refPatch[y * W + x] = ref.data[((Y0 + y) * ref.width + X0 + x) * 4]

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
})
await page.setContent(
  `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${FAMS.map((f) => `family=${f.replace(/ /g, '+')}:wght@400;500;600;700`).join('&')}&display=swap">
   <body style="margin:0;background:#0f0f0f;overflow:hidden">
   <div id="t" style="position:absolute;color:${COLOR};white-space:nowrap;-webkit-font-smoothing:antialiased"></div></body>`,
)
await page.evaluate(async (f) => {
  await Promise.all(
    f.flatMap((fam) =>
      [400, 500, 600, 700].map((w) =>
        document.fonts.load(`${w} 60px "${fam}"`),
      ),
    ),
  )
}, FAMS)

const results = []
for (const fam of FAMS) {
  for (const weight of WEIGHTS) {
    const placed = await page.evaluate(
      ({ fam, weight, TEXT, TARGET_W, PAD }) => {
        const c = document.createElement('canvas').getContext('2d')
        let lo = 6,
          hi = 160
        for (let i = 0; i < 44; i++) {
          const mid = (lo + hi) / 2
          c.font = `${weight} ${mid}px "${fam}"`
          const m = c.measureText(TEXT)
          if (m.actualBoundingBoxRight + m.actualBoundingBoxLeft < TARGET_W)
            lo = mid
          else hi = mid
        }
        const size = (lo + hi) / 2
        c.font = `${weight} ${size}px "${fam}"`
        const m = c.measureText(TEXT)
        const el = document.getElementById('t')
        el.style.font = `${weight} ${size}px "${fam}"`
        el.style.lineHeight = 'normal'
        el.textContent = TEXT
        // Place so the ink box lands at (PAD, PAD).
        el.style.left = `${PAD + m.actualBoundingBoxLeft}px`
        el.style.top = `${PAD - (m.fontBoundingBoxAscent - m.actualBoundingBoxAscent)}px`
        return {
          size: +size.toFixed(2),
          inkH: +(
            m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
          ).toFixed(1),
        }
      },
      { fam, weight, TEXT, TARGET_W, PAD },
    )
    const shot = PNG.sync.read(await page.screenshot())
    let err = 0
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++)
        err += Math.abs(
          shot.data[(y * shot.width + x) * 4] - refPatch[y * W + x],
        )
    results.push({ fam, weight, ...placed, err: +(err / (W * H)).toFixed(1) })
  }
}
results.sort((a, b) => a.err - b.err)
console.log(`"${TEXT}"  target ink ${TARGET_W}x${IY1 - IY0 + 1}\n`)
for (const r of results.slice(0, 10))
  console.log(
    `${r.fam.padEnd(18)} ${r.weight}  ${String(r.size).padStart(6)}px  inkH ${String(r.inkH).padStart(4)}  err ${r.err}`,
  )
await browser.close()
