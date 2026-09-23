/**
 * Cuts the fixed-geometry illustrations out of the Figma reference. Each crop
 * is taken on background-coloured edges so it composites without a seam; the
 * reported edge delta makes a seam-prone crop obvious at build time.
 */
import { PNG } from 'pngjs'
import fs from 'node:fs'

const REF = 'design/reference/landing-1920.png'
const OUT = 'public/art'

export const PIECES = [
  { name: 'hero-sphere', left: 686, top: 380, width: 547, height: 840 },
  { name: 's2-arc', left: 262, top: 1725, width: 1396, height: 430 },
  { name: 's3-card1', left: 318, top: 2548, width: 412, height: 427 },
  { name: 's3-card2', left: 756, top: 2548, width: 412, height: 457 },
  { name: 's3-card3', left: 1192, top: 2548, width: 412, height: 457 },
  { name: 's4-hex', left: 653, top: 3560, width: 615, height: 620 },
  { name: 's6-timeline', left: 262, top: 6270, width: 1396, height: 315 },
  { name: 's7-card1', left: 331, top: 7176, width: 446, height: 320 },
  { name: 's7-mid', left: 800, top: 7340, width: 306, height: 392 },
  { name: 's7-card2', left: 1106, top: 7440, width: 552, height: 292 },
  { name: 's8-illus1', left: 660, top: 8150, width: 536, height: 390 },
  { name: 's8-illus2', left: 660, top: 8560, width: 536, height: 460 },
  { name: 's8-illus3', left: 660, top: 9040, width: 536, height: 390 },
]

const ref = PNG.sync.read(fs.readFileSync(REF))
const at = (x, y) => ref.data[(y * ref.width + x) * 4]

fs.mkdirSync(OUT, { recursive: true })
for (const p of PIECES) {
  const out = new PNG({ width: p.width, height: p.height })
  for (let y = 0; y < p.height; y++) {
    const from = ((p.top + y) * ref.width + p.left) * 4
    ref.data.copy(out.data, y * p.width * 4, from, from + p.width * 4)
  }
  fs.writeFileSync(`${OUT}/${p.name}.png`, PNG.sync.write(out))

  let worst = 0
  for (let x = p.left; x < p.left + p.width; x++)
    worst = Math.max(
      worst,
      Math.abs(at(x, p.top) - 15),
      Math.abs(at(x, p.top + p.height - 1) - 15),
    )
  for (let y = p.top; y < p.top + p.height; y++)
    worst = Math.max(
      worst,
      Math.abs(at(p.left, y) - 15),
      Math.abs(at(p.left + p.width - 1, y) - 15),
    )
  console.log(
    `${p.name.padEnd(12)} ${p.width}x${p.height}  max edge delta ${worst}`,
  )
}

/**
 * The closing panel's light-burst sits behind live text. The artwork is
 * vertically uniform through that band, so the text is lifted out: each column
 * is compared against its own quiet level, the mask is dilated to catch
 * antialiasing, and the holes are filled from the nearest clean pixels.
 */
{
  const L = 256,
    T = 9797,
    W = 1408,
    H = 560
  const TEXT_X0 = 540 - L,
    TEXT_X1 = 1380 - L
  const out = new PNG({ width: W, height: H })
  for (let y = 0; y < H; y++) {
    const from = ((T + y) * ref.width + L) * 4
    ref.data.copy(out.data, y * W * 4, from, from + W * 4)
  }
  const idx = (x, y) => (y * W + x) * 4

  let repaired = 0
  for (let x = TEXT_X0; x <= TEXT_X1; x++) {
    const col = []
    for (let y = 0; y < H; y++) col.push(out.data[idx(x, y)])
    const quiet = [...col].sort((a, b) => a - b)[Math.floor(H * 0.15)]
    const dirty = col.map((v) => Math.abs(v - quiet) > 5)
    // Dilate by 4px so antialiased edges are swept up with the glyphs.
    const mask = dirty.map((_, y) => {
      for (let k = -4; k <= 4; k++) if (dirty[y + k]) return true
      return false
    })
    for (let y = 0; y < H; y++) {
      if (!mask[y]) continue
      let a = y - 1
      while (a >= 0 && mask[a]) a--
      let b = y + 1
      while (b < H && mask[b]) b++
      for (let c = 0; c < 3; c++) {
        const va = a >= 0 ? out.data[idx(x, a) + c] : null
        const vb = b < H ? out.data[idx(x, b) + c] : null
        out.data[idx(x, y) + c] =
          va === null
            ? vb
            : vb === null
              ? va
              : Math.round((va * (b - y) + vb * (y - a)) / (b - a))
      }
      repaired++
    }
  }
  fs.writeFileSync(`${OUT}/s9-burst.png`, PNG.sync.write(out))
  console.log(`s9-burst     ${W}x${H}  inpainted ${repaired} px`)
}
