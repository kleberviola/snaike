import { motion, useReducedMotion } from 'framer-motion'

const imgVariant = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const titleLetters = 'AI STUDIO'.split('')

const letterVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14, delay: i * 0.05 },
  }),
}

const descVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay: 0.7 } },
}

export function AIStudio() {
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
      {/* Retrato */}
      <motion.div
        variants={imgVariant}
        style={{ flex: '0 0 38%', height: '75vh' }}
      >
        <img
          src="/imagens/snaike_ai_studio.jpeg"
          alt="Criatividade com Inteligência Artificial"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      </motion.div>

      {/* Título + descrição */}
      <div style={{ flex: 1 }}>
        <h2
          aria-label="AI Studio"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(3.5rem, 8vw, 10rem)',
            color: 'var(--color-red)',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {titleLetters.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={prefersReducedMotion ? {} : letterVariant}
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </h2>

        <motion.p
          variants={descVariant}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)',
            color: 'var(--color-white)',
            opacity: 0.7,
            maxWidth: '38ch',
            lineHeight: 1.6,
            marginTop: '2rem',
          }}
        >
          Ferramentas de IA integradas ao processo criativo. Da geração de conceitos
          à execução final, potencializamos cada etapa com inteligência.
        </motion.p>
      </div>
    </motion.div>
  )
}
