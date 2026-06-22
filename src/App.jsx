import { useRef } from 'react'
import { useActiveSection } from './hooks/useActiveSection'
import { Logo } from './components/Logo'
import { ContactButton } from './components/ContactButton'
import { Hero } from './sections/Hero'
import { Sobre } from './sections/Sobre'
import { Manifesto } from './sections/Manifesto'
import { AIStudio } from './sections/AIStudio'
import { Atacar } from './sections/Atacar'

const SECTION_COUNT = 5

export default function App() {
  const containerRef = useRef(null)
  const activeSection = useActiveSection()
  const isHero = activeSection === 0
  const isLastSection = activeSection === SECTION_COUNT - 1

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
