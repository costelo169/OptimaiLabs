/**
 * Dumps the structure of a slice of the reference: vertical bands of content,
 * and the horizontal runs inside each band. Used to lift exact geometry out of
 * the Figma render while building a section.
 *
 *   node tools/outline.mjs <y0> <y1> [vGap] [hGap] [image]
 */
import { PNG } from 'pngjs'
import fs from 'node:fs'

const [
  ,
  ,
  Y0,
  Y1,
  VGAP = 6,
  HGAP = 14,
  X0 = 0,
  X1 = 1920,
  IMG = 'design/reference/landing-1920.png',
] = process.argv
const y0 = Number(Y0),
  y1 = Number(Y1),
  vgap = Number(VGAP),
  hgap = Number(HGAP)
const x0 = Number(X0),
  x1 = Number(X1)
const THR = Number(process.env.THR || 3)
const p = PNG.sync.read(fs.readFileSync(IMG))

const RAILS = new Set([260, 261, 1658, 1659])
const ink = (x, y) => {
  if (RAILS.has(x)) return false
  const i = (y * p.width + x) * 4
  return (
    Math.abs(p.data[i] - 15) > THR ||
    Math.abs(p.data[i + 1] - 15) > THR ||
    Math.abs(p.data[i + 2] - 15) > THR
  )
}

const group = (flags, from, gap) => {
  const out = []
  let s = null,
    last = null
  for (let k = 0; k <= flags.length; k++) {
    if (flags[k]) {
      if (s === null) s = k
      last = k
      continue
    }
    if (s !== null && k - last > gap) {
      out.push([from + s, from + last])
      s = null
    }
  }
  if (s !== null) out.push([from + s, from + last])
  return out
}

const rowFlags = []
for (let y = y0; y < y1; y++) {
  let v = 0
  for (let x = x0; x < x1; x++)
    if (ink(x, y)) {
      v = 1
      break
    }
  rowFlags.push(v)
}

for (const [a, b] of group(rowFlags, y0, vgap)) {
  const colFlags = []
  for (let x = x0; x < x1; x++) {
    let v = 0
    for (let y = a; y <= b; y++)
      if (ink(x, y)) {
        v = 1
        break
      }
    colFlags.push(v)
  }
  const cols = group(colFlags, x0, hgap)
  console.log(`y ${a}..${b} (h ${b - a + 1})`)
  console.log(
    `   ${cols.map(([c, d]) => `${c}..${d}(${d - c + 1})`).join('  ')}`,
  )
}
