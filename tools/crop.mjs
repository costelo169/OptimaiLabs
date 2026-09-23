/** Crops a window of the reference (or any PNG) for inspection. */
import { PNG } from 'pngjs'
import fs from 'node:fs'
const [, , L, T, W, H, OUT, SRC = 'design/reference/landing-1920.png'] =
  process.argv
const p = PNG.sync.read(fs.readFileSync(SRC))
const [l, t, w, h] = [L, T, W, H].map(Number)
const out = new PNG({ width: w, height: h })
for (let y = 0; y < h; y++) {
  const from = ((t + y) * p.width + l) * 4
  p.data.copy(out.data, y * w * 4, from, from + w * 4)
}
fs.writeFileSync(OUT, PNG.sync.write(out))
console.log(`${OUT}  ${w}x${h} from (${l},${t})`)
