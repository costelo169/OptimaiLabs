/**
 * Side-by-side structural comparison of our render and the Figma reference.
 * Prints the vertical bands of content in a window, and the horizontal runs
 * inside each, for both images — so a drift reads as a plain pixel delta.
 *
 *   node tools/probe.mjs <y0> <y1> [x0] [x1] [vGap] [hGap]
 *   THR=60 node tools/probe.mjs 1360 1560 300 1060
 */
import { PNG } from 'pngjs'
import fs from 'node:fs'

const [, , Y0, Y1, X0 = 0, X1 = 1920, VGAP = 6, HGAP = 16] = process.argv
const y0 = +Y0,
  y1 = +Y1,
  x0 = +X0,
  x1 = +X1,
  vgap = +VGAP,
  hgap = +HGAP
const THR = Number(process.env.THR || 3)
const RAILS = new Set([260, 261, 1658, 1659])

const load = (p) => PNG.sync.read(fs.readFileSync(p))
const imgs = {
  ours: load('design/out/actual.png'),
  figma: load('design/reference/landing-1920.png'),
}

const ink = (p, x, y) => {
  if (RAILS.has(x) || y >= p.height || x >= p.width) return false
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

function outline(p) {
  const rows = []
  for (let y = y0; y < y1; y++) {
    let v = 0
    for (let x = x0; x < x1; x++)
      if (ink(p, x, y)) {
        v = 1
        break
      }
    rows.push(v)
  }
  return group(rows, y0, vgap).map(([a, b]) => {
    const cols = []
    for (let x = x0; x < x1; x++) {
      let v = 0
      for (let y = a; y <= b; y++)
        if (ink(p, x, y)) {
          v = 1
          break
        }
      cols.push(v)
    }
    return {
      band: `y ${a}..${b} (h ${b - a + 1})`,
      runs: group(cols, x0, hgap)
        .map(([c, d]) => `${c}..${d}(${d - c + 1})`)
        .join('  '),
    }
  })
}

const a = outline(imgs.ours)
const b = outline(imgs.figma)
const n = Math.max(a.length, b.length)
console.log(`window y ${y0}..${y1}  x ${x0}..${x1}  THR=${THR}\n`)
for (let i = 0; i < n; i++) {
  const A = a[i],
    B = b[i]
  const same = A && B && A.band === B.band && A.runs === B.runs
  console.log(
    same
      ? `MATCH  ${A.band}\n       ${A.runs}`
      : `ours : ${A ? A.band : '—'}\n       ${A ? A.runs : ''}\nfigma: ${B ? B.band : '—'}\n       ${B ? B.runs : ''}`,
  )
  console.log()
}
