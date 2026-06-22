import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useActiveSection } from './hooks/useActiveSection'
import { Logo } from './components/Logo'
import { ContactButton } from './components/ContactButton'
import { Hero } from './sections/Hero'
import { Sobre } from './sections/Sobre'
import { Manifesto } from './sections/Manifesto'
import { AIStudio } from './sections/AIStudio'
import { Atacar } from './sections/Atacar'

export default function App() {
  const containerRef = useRef(null)
  const activeSection = useActiveSection()
  const isHero = activeSection === 0
  const isLastSection = activeSection === 4

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current,
      smoothWheel: true,
      duration: 1.2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Logo isHero={isHero} />
      <ContactButton pulse={isLastSection} />

      <div ref={containerRef} className="scroll-container">
        <section id="section-0" className="section">
          <Hero />
        </section>
        <section id="section-1" className="section">
          <Sobre />
        </section>
        <section id="section-2" className="section">
          <Manifesto />
        </section>
        <section id="section-3" className="section">
          <AIStudio />
        </section>
        <section id="section-4" className="section">
          <Atacar />
        </section>
      </div>
    </>
  )
}
