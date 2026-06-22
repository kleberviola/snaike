import { motion, useReducedMotion } from 'framer-motion'

const revealLine = (delay = 0) => ({
  hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    opacity: 1,
    transition: { duration: 0.7, delay, ease: [0.76, 0, 0.24, 1] },
  },
})

const heartVariant = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, delay: 0.4, ease: 'easeOut' },
  },
}

export function Manifesto() {
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
      {/* Bloco de texto */}
      <div style={{ flex: 1 }}>
        <motion.h2
          variants={revealLine(0)}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 6vw, 7rem)',
            color: 'var(--color-white)',
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
          }}
        >
          Humanos criam
        </motion.h2>

        <motion.h2
          variants={revealLine(0.2)}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 6vw, 7rem)',
            color: 'var(--color-white)',
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
          }}
        >
          a expectativa
        </motion.h2>

        <motion.h2
          variants={revealLine(0.4)}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 200,
            fontSize: 'clamp(2.5rem, 6vw, 7rem)',
            color: 'var(--color-white)',
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            opacity: 0.85,
          }}
        >
          e a IA executa
        </motion.h2>
      </div>

      {/* Imagem coração */}
      <motion.div
        variants={heartVariant}
        style={{ flex: '0 0 35%', height: '65vh' }}
      >
        <img
          src="/imagens/snaike_coracao.jpeg"
          alt="Coração — símbolo da criatividade Snaike"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
    </motion.div>
  )
}
