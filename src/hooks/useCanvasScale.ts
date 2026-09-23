import { useEffect } from 'react'

const DESIGN_WIDTH = 1920

/**
 * The page is laid out on the design's fixed 1920px canvas. Below that width
 * the canvas is scaled rather than cropped or reflowed, so the composition the
 * design specifies survives on smaller screens. At 1920 and wider the ratio is
 * 1 and the layout is untouched.
 */
export function useCanvasScale() {
  useEffect(() => {
    const apply = () => {
      const width = document.documentElement.clientWidth
      document.documentElement.style.setProperty(
        '--canvas-scale',
        String(Math.min(1, width / DESIGN_WIDTH)),
      )
    }
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])
}
