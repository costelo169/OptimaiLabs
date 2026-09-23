import { createFileRoute } from '@tanstack/react-router'
import { useCanvasScale } from '../hooks/useCanvasScale'
import { Nav } from '../components/sections/Nav'
import { Hero } from '../components/sections/Hero'
import { Rails } from '../components/ui/Frame'
import { Paradox } from '../components/sections/Paradox'
import { Principles } from '../components/sections/Principles'
import { Engage } from '../components/sections/Engage'
import { Delivery } from '../components/sections/Delivery'
import { Method } from '../components/sections/Method'
import { UseCases } from '../components/sections/UseCases'
import { Decisions } from '../components/sections/Decisions'
import { Closing } from '../components/sections/Closing'
import { Footer } from '../components/sections/Footer'

export const Route = createFileRoute('/')({ component: Landing })

function Landing() {
  useCanvasScale()

  return (
    <main className="canvas relative min-h-screen overflow-x-clip bg-ink">
      <Rails />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Paradox />
        <Principles />
        <Engage />
        <Delivery />
        <Method />
        <UseCases />
        <Decisions />
        <Closing />
        <Footer />
      </div>
    </main>
  )
}
