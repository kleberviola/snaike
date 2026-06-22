import { motion, useReducedMotion } from 'framer-motion'

const snakeVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: 'easeOut' } },
}

const titleVariant = {
  hidden: { opacity: 0, scale: 1.15 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 18, delay: 0.3 },
  },
}

export function Atacar() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: false, amount: 0.6 }}
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--color-red)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5vw',
        gap: '5vw',
        overflow: 'hidden',
      }}
    >
      {/* Título */}
      <motion.h2
        variants={titleVariant}
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          fontSize: 'clamp(3rem, 7vw, 8.5rem)',
          color: 'var(--color-white)',
          lineHeight: 1,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          flex: 1,
        }}
      >
        Pronto<br />para<br />atacar?
      </motion.h2>

      {/* Cobra */}
      <motion.div
        variants={snakeVariant}
        style={{ flex: '0 0 42%', height: '75vh' }}
      >
        <img
          src="/imagens/snaike_atacar.jpeg"
          alt="Cobra enrolada — pronta para atacar"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </motion.div>
    </motion.div>
  )
}
