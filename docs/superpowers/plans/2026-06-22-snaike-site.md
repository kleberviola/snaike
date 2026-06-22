# Snaike Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar site institucional fullscreen da Snaike com 5 seções snap, logo animado e Framer Motion.

**Architecture:** Vite + React SPA com 5 seções fullscreen. CSS scroll-snap controla o snap no desktop; Lenis provê smooth scroll. Um logo fixo anima entre tamanho hero (seção 1) e navbar (seções 2–5) via Framer Motion spring. No mobile, scroll snap é desativado e o layout empilha verticalmente.

**Tech Stack:** Vite 5, React 18, Framer Motion 11, Lenis 1.x

---

## Mapa de Arquivos

| Arquivo | Responsabilidade |
|---------|-----------------|
| `package.json` | Dependências e scripts |
| `vite.config.js` | Config Vite |
| `index.html` | Entrada HTML |
| `src/main.jsx` | Mount React + Lenis |
| `src/App.jsx` | Scroll container + composição das seções |
| `src/styles/global.css` | Tokens CSS, reset, scroll snap, @font-face |
| `src/hooks/useActiveSection.js` | IntersectionObserver → índice seção ativa |
| `src/components/Logo.jsx` | Logo animado hero ↔ navbar |
| `src/components/ContactButton.jsx` | Botão mailto fixo |
| `src/sections/Hero.jsx` | Seção 1 — Hero |
| `src/sections/Sobre.jsx` | Seção 2 — Sobre |
| `src/sections/Manifesto.jsx` | Seção 3 — Manifesto |
| `src/sections/AIStudio.jsx` | Seção 4 — AI Studio |
| `src/sections/Atacar.jsx` | Seção 5 — Atacar |
| `public/fonts/` | Fontes servidas estaticamente |
| `public/imagens/` | Imagens servidas estaticamente |
| `.env` | Email de contato |

---

## Task 1: Setup do Projeto

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `.env`
- Create: `.gitignore`

- [ ] **Step 1: Inicializar projeto Vite + React**

No diretório `Code Snaike/`:

```bash
npm create vite@latest . -- --template react
```

Quando perguntar se deseja sobrescrever, confirme com `y`.

- [ ] **Step 2: Instalar dependências**

```bash
npm install framer-motion lenis
```

- [ ] **Step 3: Verificar package.json gerado**

Confirme que `package.json` contém:
```json
{
  "dependencies": {
    "framer-motion": "^11.x.x",
    "lenis": "^1.x.x",
    "react": "^18.x.x",
    "react-dom": "^18.x.x"
  }
}
```

- [ ] **Step 4: Substituir index.html**

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Snaike — Natural Born Creatives. Agência de criatividade e IA." />
    <title>Snaike — Natural Born Creatives</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Criar .env**

```
VITE_CONTACT_EMAIL=contato@snaike.com
```

(Substituir pelo email real da Snaike antes do deploy.)

- [ ] **Step 6: Criar .gitignore**

```
node_modules
dist
.env
.DS_Store
```

- [ ] **Step 7: Testar que o servidor sobe**

```bash
npm run dev
```

Esperado: servidor rodando em `http://localhost:5173` sem erros no terminal.

- [ ] **Step 8: Commit**

```bash
git add package.json vite.config.js index.html .env.example .gitignore
git commit -m "feat: setup Vite + React + Framer Motion + Lenis"
```

---

## Task 2: Assets Públicos (Fontes e Imagens)

**Files:**
- Create: `public/fonts/Franie/` (copiar arquivos)
- Create: `public/imagens/` (copiar arquivos)

- [ ] **Step 1: Criar estrutura de pastas em public/**

```bash
mkdir -p public/fonts/Franie
mkdir -p public/fonts/PPMori
mkdir -p public/imagens
```

- [ ] **Step 2: Copiar fontes Franie (WOFF2)**

Copiar apenas os pesos usados no projeto:

```bash
cp "Fonts/Franie/WOFF2/Franie-Bold.woff2"    public/fonts/Franie/
cp "Fonts/Franie/WOFF2/Franie-Regular.woff2"  public/fonts/Franie/
cp "Fonts/Franie/WOFF2/Franie-Black.woff2"    public/fonts/Franie/
```

- [ ] **Step 3: Copiar fontes PP Mori (OTF)**

PP Mori está disponível apenas em OTF — funciona bem no browser:

```bash
cp "Fonts/PP Mori /PPMori-Regular.otf"    public/fonts/PPMori/
cp "Fonts/PP Mori /PPMori-SemiBold.otf"   public/fonts/PPMori/
cp "Fonts/PP Mori /PPMori-Extralight.otf" public/fonts/PPMori/
```

- [ ] **Step 4: Copiar imagens**

```bash
cp imagens/logo_snaike_red.svg  public/imagens/
cp imagens/s.svg                public/imagens/
cp imagens/snaike_hero.jpeg     public/imagens/
cp imagens/snaike_sobre.jpeg    public/imagens/
cp imagens/snaike_coracao.jpeg  public/imagens/
cp imagens/snaike_ai_studio.jpeg public/imagens/
cp imagens/snaike_atacar.jpeg   public/imagens/
```

- [ ] **Step 5: Verificar que assets carregam**

Com `npm run dev` rodando, acesse no browser:
- `http://localhost:5173/fonts/Franie/Franie-Bold.woff2` → deve fazer download do arquivo
- `http://localhost:5173/imagens/snaike_hero.jpeg` → deve exibir a imagem

- [ ] **Step 6: Commit**

```bash
git add public/
git commit -m "feat: add fonts and images to public assets"
```

---

## Task 3: Global CSS

**Files:**
- Create: `src/styles/global.css`
- Modify: `src/main.jsx` (importar global.css)

- [ ] **Step 1: Criar src/styles/global.css**

```css
/* ── Fontes ─────────────────────────────────────────────── */
@font-face {
  font-family: 'Franie';
  src: url('/fonts/Franie/Franie-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Franie';
  src: url('/fonts/Franie/Franie-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Franie';
  src: url('/fonts/Franie/Franie-Black.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'PPMori';
  src: url('/fonts/PPMori/PPMori-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'PPMori';
  src: url('/fonts/PPMori/PPMori-SemiBold.otf') format('opentype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'PPMori';
  src: url('/fonts/PPMori/PPMori-Extralight.otf') format('opentype');
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}

/* ── Tokens ─────────────────────────────────────────────── */
:root {
  --color-bg-dark:  #0a0a0a;
  --color-bg-navy:  #0d1a2e;
  --color-red:      #FC0203;
  --color-white:    #ffffff;

  --font-heading: 'Franie', serif;
  --font-body:    'PPMori', sans-serif;
}

/* ── Reset ───────────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-body);
  color: var(--color-white);
  background: var(--color-bg-dark);
  -webkit-font-smoothing: antialiased;
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

/* ── Scroll Container (Desktop) ──────────────────────────── */
body {
  overflow: hidden;
}

.scroll-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  /* Lenis sobrescreve scroll-behavior */
}

/* ── Seção base ──────────────────────────────────────────── */
.section {
  position: relative;
  height: 100vh;
  scroll-snap-align: start;
  overflow: hidden;
  display: flex;
  align-items: center;
}

/* ── Mobile ──────────────────────────────────────────────── */
@media (max-width: 1023px) {
  body {
    overflow: auto;
  }

  .scroll-container {
    height: auto;
    overflow-y: visible;
    scroll-snap-type: none;
  }

  .section {
    height: auto;
    min-height: 100svh;
    scroll-snap-align: none;
  }
}
```

- [ ] **Step 2: Remover CSS padrão do Vite**

Deletar os arquivos gerados pelo template que não serão usados:

```bash
rm src/App.css src/index.css
```

- [ ] **Step 3: Importar global.css em main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 4: Verificar no browser**

Com `npm run dev` rodando, a página deve exibir fundo preto `#0a0a0a` sem erros no console.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css src/main.jsx
git commit -m "feat: add global CSS tokens, fonts, scroll snap"
```

---

## Task 4: Hook useActiveSection

**Files:**
- Create: `src/hooks/useActiveSection.js`

- [ ] **Step 1: Criar src/hooks/useActiveSection.js**

```js
import { useState, useEffect } from 'react'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const sections = document.querySelectorAll('.section')
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target)
            if (index !== -1) setActiveSection(index)
          }
        })
      },
      { threshold: 0.6 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return activeSection
}
```

- [ ] **Step 2: Verificar manualmente**

O hook será testado visualmente quando integrado ao App (Task 7). Por ora, apenas certifique que o arquivo não tem erros de sintaxe rodando `npm run dev` sem erros no console.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useActiveSection.js
git commit -m "feat: add useActiveSection hook"
```

---

## Task 5: Componente Logo

**Files:**
- Create: `src/components/Logo.jsx`

O logo é um único elemento `fixed` que anima entre dois estados:
- **Estado hero** (seção 0): fonte grande, posição no canto esquerdo-centro da viewport
- **Estado nav** (seções 1–4): fonte pequena, topo-esquerdo

- [ ] **Step 1: Criar src/components/Logo.jsx**

```jsx
import { motion, useReducedMotion } from 'framer-motion'

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

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 80, damping: 20 }

  return (
    <motion.a
      href="#section-0"
      aria-label="Snaike — voltar ao início"
      animate={isHero ? heroVariant : navVariant}
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
```

- [ ] **Step 2: Verificar integração (após Task 7)**

Ao scrollar da seção 1 para a 2, o "Snaike" deve diminuir suavemente e mover-se para o topo-esquerdo. Ao voltar para seção 1, volta ao tamanho grande. Se a animação parecer brusca, ajuste `stiffness` (menor = mais lento) e `damping` (maior = menos oscilação).

- [ ] **Step 3: Commit**

```bash
git add src/components/Logo.jsx
git commit -m "feat: add animated Logo component"
```

---

## Task 6: Componente ContactButton

**Files:**
- Create: `src/components/ContactButton.jsx`

- [ ] **Step 1: Criar src/components/ContactButton.jsx**

```jsx
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
      }}
      whileHover={{ backgroundColor: 'var(--color-white)', color: 'var(--color-bg-dark)' }}
      transition={{ duration: 0.2 }}
    >
      Contato
    </motion.a>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactButton.jsx
git commit -m "feat: add ContactButton component with pulse animation"
```

---

## Task 7: App.jsx — Scroll Container + Lenis

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Escrever src/App.jsx**

```jsx
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
```

- [ ] **Step 2: Criar stubs das seções para testar o App**

Crie cada arquivo de seção com um placeholder para testar a navegação. Execute no terminal:

```bash
mkdir -p src/sections

cat > src/sections/Hero.jsx << 'EOF'
export function Hero() {
  return <div style={{ padding: '5vw', fontFamily: 'var(--font-heading)', fontSize: '4rem', color: 'var(--color-red)' }}>Hero</div>
}
EOF

cat > src/sections/Sobre.jsx << 'EOF'
export function Sobre() {
  return <div style={{ padding: '5vw', background: 'var(--color-bg-navy)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', fontSize: '3rem' }}>Sobre</div>
}
EOF

cat > src/sections/Manifesto.jsx << 'EOF'
export function Manifesto() {
  return <div style={{ padding: '5vw', background: 'var(--color-red)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', fontSize: '3rem' }}>Manifesto</div>
}
EOF

cat > src/sections/AIStudio.jsx << 'EOF'
export function AIStudio() {
  return <div style={{ padding: '5vw', background: 'var(--color-bg-navy)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', fontSize: '3rem' }}>AI Studio</div>
}
EOF

cat > src/sections/Atacar.jsx << 'EOF'
export function Atacar() {
  return <div style={{ padding: '5vw', background: 'var(--color-red)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', fontSize: '3rem' }}>Atacar</div>
}
EOF
```

- [ ] **Step 3: Verificar scroll snap e logo animado**

Com `npm run dev` rodando:
1. A página deve mostrar a seção Hero com "Snaike" grande em vermelho
2. Ao scrollar, deve snapar para cada seção com fundo correto
3. Ao entrar na seção 2, o "Snaike" deve mover-se suavemente para o topo-esquerdo
4. Ao scrollar de volta para a seção 1, "Snaike" volta ao tamanho hero
5. Na seção 5, o botão "Contato" deve pulsar

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/sections/
git commit -m "feat: App with scroll snap, Lenis, animated logo, contact button"
```

---

## Task 8: Seção Hero

**Files:**
- Modify: `src/sections/Hero.jsx`

- [ ] **Step 1: Escrever src/sections/Hero.jsx**

```jsx
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
      {/* Espaço reservado para o logo fixo no estado hero */}
      <div style={{ flex: '0 0 auto' }}>
        {/* Logo animado é renderizado em App.jsx como elemento fixed.
            Este div garante que o conteúdo não sobreponha o logo. */}
        <div style={{ height: 'clamp(8rem, 14vw, 16rem)', width: 'clamp(18rem, 40vw, 50rem)' }} />

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
```

- [ ] **Step 2: Substituir copy temporário**

Os textos de descrição nas seções Sobre e AI Studio são placeholders. Antes do deploy, substituir pelo copy real da Snaike. Procure pelos comentários `/* copy */` ou simplesmente revise os `<p>` de cada seção.

- [ ] **Step 3: Verificar no browser**

A seção Hero deve mostrar:
- Fundo preto com a cobra à direita
- "Snaike" grande em vermelho (vindo do Logo fixo)
- "NATURAL BORN CREATIVES" com fade in abaixo do espaço do logo
- Cobra com fade in da direita

- [ ] **Step 3: Commit**

```bash
git add src/sections/Hero.jsx
git commit -m "feat: Hero section with animations"
```

---

## Task 9: Seção Sobre

**Files:**
- Modify: `src/sections/Sobre.jsx`

- [ ] **Step 1: Escrever src/sections/Sobre.jsx**

```jsx
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
  const animateOn = prefersReducedMotion ? 'visible' : undefined

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
```

- [ ] **Step 2: Verificar no browser**

Ao scrollar para a seção 2:
- Fundo azul escuro
- "S" SVG aparece com scale
- Texto entra linha por linha com stagger
- Imagem entra da esquerda

- [ ] **Step 3: Commit**

```bash
git add src/sections/Sobre.jsx
git commit -m "feat: Sobre section with staggered animations"
```

---

## Task 10: Seção Manifesto

**Files:**
- Modify: `src/sections/Manifesto.jsx`

- [ ] **Step 1: Escrever src/sections/Manifesto.jsx**

```jsx
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
```

- [ ] **Step 2: Verificar no browser**

Ao scrollar para a seção 3:
- Fundo vermelho
- Cada linha do título emerge de baixo via clip-path, em sequência
- A terceira linha tem peso leve (ExtraLight) para contraste
- Coração aparece com zoom out suave

- [ ] **Step 3: Commit**

```bash
git add src/sections/Manifesto.jsx
git commit -m "feat: Manifesto section with clip-path text reveal"
```

---

## Task 11: Seção AI Studio

**Files:**
- Modify: `src/sections/AIStudio.jsx`

- [ ] **Step 1: Escrever src/sections/AIStudio.jsx**

```jsx
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
```

- [ ] **Step 2: Verificar no browser**

Ao scrollar para a seção 4:
- Fundo azul escuro
- Retrato entra da esquerda
- "AI STUDIO" anima letra por letra com spring
- Descrição aparece com fade após as letras

- [ ] **Step 3: Commit**

```bash
git add src/sections/AIStudio.jsx
git commit -m "feat: AI Studio section with letter-by-letter spring animation"
```

---

## Task 12: Seção Atacar

**Files:**
- Modify: `src/sections/Atacar.jsx`

- [ ] **Step 1: Escrever src/sections/Atacar.jsx**

```jsx
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
```

- [ ] **Step 2: Verificar no browser**

Ao scrollar para a seção 5:
- Fundo vermelho
- Cobra entra da direita com slide
- Título aparece com scale de 1.15 → 1 (impacto)
- Botão "Contato" no canto inferior direito pulsando

- [ ] **Step 3: Commit**

```bash
git add src/sections/Atacar.jsx
git commit -m "feat: Atacar section with impactful entrance animations"
```

---

## Task 13: Ajustes Mobile

**Files:**
- Modify: `src/styles/global.css`
- Modify: cada seção (adicionar estilos responsivos inline ou via CSS)

- [ ] **Step 1: Adicionar media queries no global.css**

Adicionar ao final de `src/styles/global.css`:

```css
/* ── Mobile: layout de seções ────────────────────────────── */
@media (max-width: 1023px) {
  /* Logo: sempre pequeno no mobile */
  .logo-hero-spacer {
    display: none;
  }
}
```

- [ ] **Step 2: Atualizar Logo.jsx para mobile**

No componente `Logo.jsx`, adicionar lógica para detectar mobile e manter sempre no estado nav:

```jsx
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
```

- [ ] **Step 3: Verificar no browser em viewport mobile**

No Chrome DevTools, simular iPhone 14 (390px) e verificar:
1. Scroll snap desativado — o scroll deve ser livre e contínuo
2. Logo "Snaike" fica sempre pequeno no topo-esquerdo
3. Cada seção empilha verticalmente com `min-height: 100svh`
4. Imagens não transbordam
5. Tipografia está legível (não maior que a tela)

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/components/Logo.jsx
git commit -m "feat: mobile responsive layout and logo behavior"
```

---

## Task 14: Build e Verificação Final

**Files:**
- Nenhum arquivo novo

- [ ] **Step 1: Rodar build de produção**

```bash
npm run build
```

Esperado: pasta `dist/` criada sem erros. Avisos de tamanho de chunk são aceitáveis.

- [ ] **Step 2: Verificar preview de produção**

```bash
npm run preview
```

Acesse `http://localhost:4173` e verifique o fluxo completo:
1. Seção 1: logo hero grande, cobra, subtítulo
2. Scroll → seção 2: logo migra para navbar, seção Sobre anima
3. Scroll → seção 3: Manifesto com reveal de texto
4. Scroll → seção 4: AI Studio com letras animadas
5. Scroll → seção 5: Atacar com cobra + título + botão pulsando
6. Scroll de volta → seção 1: logo volta ao tamanho hero
7. Redimensionar para < 1024px: scroll livre, logo sempre pequeno

- [ ] **Step 3: Commit final**

```bash
git add .
git commit -m "feat: Snaike site complete — 5 sections, animated logo, Framer Motion"
```

---

## Checklist de Spec Coverage

- [x] Stack Vite + React + Framer Motion + Lenis → Tasks 1, 7
- [x] Fontes Franie e PP Mori → Tasks 2, 3
- [x] Tokens de design (cores, fontes) → Task 3
- [x] Logo animado hero ↔ navbar → Tasks 5, 7, 13
- [x] Botão contato (mailto) em todas as telas → Task 6
- [x] Pulse na última seção → Task 6
- [x] Scroll snap desktop → Task 3, 7
- [x] Scroll livre mobile → Task 13
- [x] Hero section → Task 8
- [x] Sobre section → Task 9
- [x] Manifesto section → Task 10
- [x] AI Studio section → Task 11
- [x] Atacar section → Task 12
- [x] prefers-reduced-motion → Tasks 5, 6, 8, 9, 10, 11, 12
- [x] Build de produção → Task 14
