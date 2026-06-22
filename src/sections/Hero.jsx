import { motion, useReducedMotion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

const fadeRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay: 0.3, ease: 'easeOut' },
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const noAnim = prefersReducedMotion

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
      {/* Espaço reservado para o logo fixo hero + subtítulo */}
      <div style={{ flex: '0 0 auto' }}>
        {/* O Logo animado vive em App.jsx como fixed.
            Este div reserva espaço para que o conteúdo não sobreponha o logo. */}
        <div style={{
          height: 'clamp(8rem, 14vw, 16rem)',
          width: 'clamp(18rem, 40vw, 50rem)',
        }} />

        <motion.p
          {...(noAnim ? {} : fadeUp(0.4))}
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

      {/* Imagem da cobra */}
      <motion.div
        {...(noAnim ? {} : fadeRight)}
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
