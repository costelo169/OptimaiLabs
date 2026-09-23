/** Bounding box of non-background pixels in a window of the reference. */
import { PNG } from 'pngjs'
import fs from 'node:fs'
const [, , X0, Y0, X1, Y1, THR = 2, IMG = 'design/reference/landing-1920.png'] =
  process.argv
const p = PNG.sync.read(fs.readFileSync(IMG))
const thr = Number(THR)
const RAILS = new Set([260, 261, 1658, 1659])
let minx = 1e9,
  maxx = -1,
  miny = 1e9,
  maxy = -1
for (let y = Number(Y0); y < Number(Y1); y++)
  for (let x = Number(X0); x < Number(X1); x++) {
    if (RAILS.has(x)) continue
    const i = (y * p.width + x) * 4
    if (
      Math.abs(p.data[i] - 15) > thr ||
      Math.abs(p.data[i + 1] - 15) > thr ||
      Math.abs(p.data[i + 2] - 15) > thr
    ) {
      if (x < minx) minx = x
      if (x > maxx) maxx = x
      if (y < miny) miny = y
      if (y > maxy) maxy = y
    }
  }
console.log(
  `x ${minx}..${maxx} (w ${maxx - minx + 1})   y ${miny}..${maxy} (h ${maxy - miny + 1})`,
)
