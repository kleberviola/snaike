import { motion, useReducedMotion } from 'framer-motion'

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 1.4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

export function ContactButton({ pulse = false }) {
  const prefersReducedMotion = useReducedMotion()
  const email = import.meta.env.VITE_CONTACT_EMAIL

  return (
    <motion.a
      href={`mailto:${email}`}
      aria-label="Entrar em contato"
      animate={pulse && !prefersReducedMotion ? pulseAnimation : {}}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2.5rem',
        zIndex: 100,
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: '0.9rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-white)',
        border: '1.5px solid var(--color-white)',
        padding: '0.75rem 1.5rem',
        cursor: 'pointer',
        display: 'inline-block',
      }}
      whileHover={{ backgroundColor: 'var(--color-white)', color: 'var(--color-bg-dark)' }}
      transition={{ duration: 0.2 }}
    >
      Contato
    </motion.a>
  )
}
