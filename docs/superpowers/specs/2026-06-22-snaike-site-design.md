# Design Spec — Site Snaike

**Data**: 2026-06-22  
**Status**: Aprovado

---

## Visão Geral

Site institucional fullscreen da Snaike ("Natural Born Creatives"), com navegação por scroll snap entre 5 seções. A identidade visual usa preto/azul escuro + vermelho (#FC0203), tipografia editorial grande e imagens de alto impacto.

---

## Stack

| Tecnologia | Função |
|-----------|--------|
| Vite + React | Base e build |
| Framer Motion | Todas as animações |
| Lenis | Smooth scroll |
| CSS Scroll Snap | Snap entre seções no desktop |

Sem roteamento. Site de página única (SPA estático), deploy em Vercel ou Netlify.

---

## Estrutura de Arquivos

```
Code Snaike/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── imagens/
│   │   ├── logo_snaike_red.svg
│   │   ├── s.svg
│   │   ├── snaike_hero.jpeg
│   │   ├── snaike_sobre.jpeg
│   │   ├── snaike_coracao.jpeg
│   │   ├── snaike_ai_studio.jpeg
│   │   └── snaike_atacar.jpeg
│   └── fonts/
│       ├── Franie/
│       └── PP Mori/
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   ├── Logo.jsx
    │   └── ContactButton.jsx
    ├── sections/
    │   ├── Hero.jsx
    │   ├── Sobre.jsx
    │   ├── Manifesto.jsx
    │   ├── AIStudio.jsx
    │   └── Atacar.jsx
    ├── hooks/
    │   └── useActiveSection.js
    └── styles/
        └── global.css
```

---

## Tokens de Design

### Cores
```css
--color-bg-dark:    #0a0a0a;
--color-bg-navy:    #0d1a2e;
--color-red:        #FC0203;
--color-white:      #ffffff;
```

### Tipografia
- **Franie** — headings principais (Snaike logo, títulos de seção)
- **PP Mori** — textos de suporte, subtítulos, botões

### Breakpoints
- Desktop: ≥ 1024px — scroll snap ativo, layout horizontal/fullscreen
- Mobile: < 1024px — scroll livre, layout empilhado verticalmente

---

## Componentes Globais

### `Logo.jsx`
Elemento único com dois estados animados via Framer Motion:

- **Estado hero** (seção 1 ativa): `font-size: clamp(12vw, 18vw, 20rem)`, posição no fluxo do hero
- **Estado navbar** (seções 2–5): `font-size: 1.8rem`, fixo no `top: 2rem; left: 2.5rem`
- Transição: `type: "spring", stiffness: 80, damping: 20` — suave e fluida
- Quando o usuário retorna à seção 1, o logo anima de volta ao estado hero

### `ContactButton.jsx`
- Presente em todas as 5 seções
- Posição: fixo no canto inferior direito (`bottom: 2rem; right: 2.5rem`)
- Ação: `mailto:` para o email da Snaike
- Na seção 5, adiciona animação de pulse em loop (`scale: 1 → 1.05`, `repeat: Infinity, duration: 1.2`)

---

## Seções

### Seção 1 — Hero
- **Fundo**: `#0a0a0a` (preto)
- **Imagem**: `snaike_hero.jpeg` (cobra), posicionada à direita, ocupa ~50% da tela
- **Conteúdo**:
  - Logo `Snaike` em Franie, vermelho, tamanho hero
  - Subtítulo `NATURAL BORN CREATIVES` em PP Mori, branco, abaixo do logo

**Animações de entrada** (ao montar/ao voltar para seção 1):
| Elemento | Animação |
|----------|----------|
| Logo | Sem entrada — já presente |
| Subtítulo | `opacity: 0→1`, `y: 20→0`, delay 0.4s, duration 0.6s |
| Imagem cobra | `opacity: 0→1`, `x: 40→0`, delay 0.3s, duration 0.8s |
| Botão contato | `opacity: 0→1`, delay 0.6s |

---

### Seção 2 — Sobre
- **Fundo**: `#0d1a2e` (azul escuro)
- **Imagens**: `s.svg` (esquerda, grande) + `snaike_sobre.jpeg` (direita ou fundo)
- **Conteúdo**: Bloco de texto com "HEARTING + ROOKER" e descrição da Snaike

**Animações de entrada**:
| Elemento | Animação |
|----------|----------|
| `S` SVG | `scale: 0.8→1`, `opacity: 0→1`, spring |
| Linhas de texto | Stagger `y: 30→0` + `opacity: 0→1`, delay 0.05s entre linhas |
| Imagem sobre | `x: -30→0`, `opacity: 0→1`, delay 0.4s |

---

### Seção 3 — Manifesto
- **Fundo**: `#FC0203` (vermelho)
- **Imagem**: `snaike_coracao.jpeg` (coração 3D), centralizado ou à direita
- **Conteúdo**: Título grande em duas linhas — `HUMANOS CRIAM A EXPECTATIVA` / `E A IA EXECUTA`

**Animações de entrada**:
| Elemento | Animação |
|----------|----------|
| Linha 1 do título | Clip-path reveal: `clipPath: "inset(100% 0 0 0)"→"inset(0% 0 0 0)"`, duration 0.7s |
| Linha 2 do título | Mesma animação, delay 0.2s |
| Imagem coração | `scale: 1.1→1`, `opacity: 0→1`, delay 0.4s |

---

### Seção 4 — AI Studio
- **Fundo**: `#0d1a2e` (azul escuro)
- **Imagem**: `snaike_ai_studio.jpeg` (retrato), à esquerda ou fundo com overlay
- **Conteúdo**: Título `AI STUDIO` em Franie, tamanho display; texto descritivo em PP Mori

**Animações de entrada**:
| Elemento | Animação |
|----------|----------|
| Imagem retrato | `x: -40→0`, `opacity: 0→1`, duration 0.8s |
| `AI STUDIO` | Stagger por caractere: `y: 60→0`, spring, delay escalonado |
| Texto descritivo | `opacity: 0→1`, delay 0.7s após título |

---

### Seção 5 — Pronto Para Atacar?
- **Fundo**: `#FC0203` (vermelho)
- **Imagem**: `snaike_atacar.jpeg` (cobra enrolada), à direita
- **Conteúdo**: Título `PRONTO PARA ATACAR?` em Franie; botão de contato é o CTA principal

**Animações de entrada**:
| Elemento | Animação |
|----------|----------|
| Imagem cobra | `x: 100→0`, `opacity: 0→1`, duration 0.9s |
| Título | `scale: 1.2→1`, `opacity: 0→1`, spring, delay 0.3s |
| Botão contato | Aparece com fade, depois entra em loop de pulse |

---

## Scroll e Snap

### Desktop (≥ 1024px)
```css
html, body { height: 100%; overflow: hidden; }

.scroll-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

.section {
  height: 100vh;
  scroll-snap-align: start;
}
```

Lenis é inicializado no `scroll-container` para suavizar o scroll mesmo com snap ativo.

### Mobile (< 1024px)
- Scroll snap desativado via media query
- Cada seção tem `min-height: 100svh` e layout empilhado
- Animações via `whileInView` do Framer Motion (sem dependência de seção ativa)

---

## Hook `useActiveSection`

Usa `IntersectionObserver` para detectar qual seção está visível (threshold: 0.6). Retorna o índice da seção atual (0–4). Usado pelo `Logo.jsx` para alternar entre estado hero e navbar.

---

## Animação Global do Logo

```jsx
// Logo.jsx — lógica central
const isHero = activeSection === 0

<motion.div
  animate={isHero ? heroState : navState}
  transition={{ type: "spring", stiffness: 80, damping: 20 }}
>
  Snaike
</motion.div>
```

Estados:
```js
const heroState = { fontSize: "clamp(10vw, 16vw, 18rem)", x: 0, y: 0 }
const navState  = { fontSize: "1.8rem", x: 0, y: 0 }
```

O posicionamento é controlado por duas instâncias CSS: no estado hero, o logo vive dentro do layout da Seção 1 (position: static, tamanho grande). No estado navbar, um segundo wrapper com `position: fixed` torna-se visível. Framer Motion anima apenas os valores de fonte e opacidade — o layout não é animado, evitando conflito com o scroll snap.

---

## Acessibilidade e Performance

- `prefers-reduced-motion`: todas as animações são desativadas via `useReducedMotion()` do Framer Motion
- Imagens com `loading="lazy"` exceto hero
- Fontes carregadas via `@font-face` no CSS global com `font-display: swap`
- Alt text descritivo em todas as imagens

---

## Contato

O email de contato será definido durante a implementação (variável `VITE_CONTACT_EMAIL` no `.env`).
