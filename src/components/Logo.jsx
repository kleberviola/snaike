import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'

const heroVariant = {
  fontSize: 'clamp(8rem, 14vw, 16rem)',
  top: '50%',
  left: '5vw',
  y: '-50%',
}

const navVariant = {
  fontSize: '1.6rem',
  top: '2rem',
  left: '2.5rem',
  y: '0%',
}

export function Logo({ isHero }) {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 80, damping: 20 }

  const shouldBeHero = isHero && !isMobile

  return (
    <motion.a
      href="#section-0"
      aria-label="Snaike — voltar ao início"
      animate={shouldBeHero ? heroVariant : navVariant}
      transition={transition}
      style={{
        position: 'fixed',
        fontFamily: 'var(--font-heading)',
        fontWeight: 900,
        color: 'var(--color-red)',
        lineHeight: 1,
        zIndex: 100,
        cursor: 'pointer',
        letterSpacing: '-0.02em',
      }}
    >
      Snaike
    </motion.a>
  )
}
