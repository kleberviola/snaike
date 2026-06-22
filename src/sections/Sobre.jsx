import { motion, useReducedMotion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const lineVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const sVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 18 } },
}

const imgVariant = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4, ease: 'easeOut' } },
}

export function Sobre() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: false, amount: 0.6 }}
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--color-bg-navy)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5vw',
        gap: '6vw',
        overflow: 'hidden',
      }}
    >
      {/* S mark */}
      <motion.div variants={sVariant} style={{ flex: '0 0 auto' }}>
        <img
          src="/imagens/s.svg"
          alt=""
          aria-hidden="true"
          style={{ width: 'clamp(6rem, 12vw, 14rem)', height: 'auto' }}
        />
      </motion.div>

      {/* Imagem sobre */}
      <motion.div variants={imgVariant} style={{ flex: '0 0 30%', height: '60vh' }}>
        <img
          src="/imagens/snaike_sobre.jpeg"
          alt="Equipe Snaike"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>

      {/* Bloco de texto */}
      <motion.div
        variants={containerVariants}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <motion.h2
          variants={lineVariant}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
            color: 'var(--color-white)',
            lineHeight: 1.1,
          }}
        >
          Hearting + Rooker
        </motion.h2>

        <motion.p
          variants={lineVariant}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)',
            color: 'var(--color-white)',
            opacity: 0.7,
            maxWidth: '40ch',
            lineHeight: 1.6,
          }}
        >
          A Snaike nasce da fusão entre criatividade humana e inteligência artificial.
          Criamos experiências que capturam a expectativa e a executam com precisão.
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
