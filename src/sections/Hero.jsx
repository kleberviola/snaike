import { motion, useReducedMotion } from 'framer-motion'

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--color-bg-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 5vw',
      overflow: 'hidden',
    }}>
      <div style={{ flex: '0 0 auto' }}>
        <div style={{
          height: 'clamp(8rem, 14vw, 16rem)',
          width: 'clamp(18rem, 40vw, 50rem)',
        }} />

        <motion.p
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 200,
            fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-white)',
            opacity: 0.7,
            marginTop: '1rem',
          }}
        >
          Natural Born Creatives
        </motion.p>
      </div>

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        style={{
          flex: '0 0 45%',
          height: '80vh',
          position: 'relative',
        }}
      >
        <img
          src="/imagens/snaike_hero.jpeg"
          alt="Cobra — símbolo da Snaike"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </motion.div>
    </div>
  )
}
