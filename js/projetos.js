// Comportamento da página de projetos:
// smooth scroll, reveal no scroll, cursor customizado e lightbox.
// Usa GSAP/ScrollTrigger para manter a mesma linguagem de animação da home.
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer  = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  gsap.registerPlugin(ScrollTrigger);

  let lenis = null;

  // ── Smooth scroll ───────────────────────────────────────
  // Lenis assume a rolagem; o ScrollTrigger precisa ser avisado a cada
  // frame, senão os gatilhos ficam defasados do scroll suavizado.
  if (!reduceMotion) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const items = document.querySelectorAll('.proj-item');

  // ── Reveal ──────────────────────────────────────────────
  // O estado inicial é aplicado por JS (não por CSS) para que, se o script
  // falhar, as imagens continuem visíveis em vez de sumirem.
  if (!reduceMotion && items.length) {
    gsap.set(items, { opacity: 0, y: 28 });

    // batch agrupa o que entra na tela junto (a linha inteira),
    // gerando o stagger natural de 3 e depois 2 imagens.
    ScrollTrigger.batch(items, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      },
    });

    const heroTitle = document.querySelector('.proj-hero-title');
    if (heroTitle) {
      gsap.from(heroTitle, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power2.out',
        delay: 0.3,
      });
    }
  }

  // ── Cursor customizado (+) ──────────────────────────────
  // Só em dispositivos com ponteiro fino: em touch não existe cursor.
  if (finePointer && items.length) {
    const cursor = document.createElement('div');
    cursor.className = 'proj-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML =
      '<span class="proj-cursor-inner"><img src="imagens/cursor_mais.svg" alt=""></span>';
    document.body.appendChild(cursor);

    // A classe entra só aqui: sem JS o cursor nativo nunca é escondido.
    document.body.classList.add('has-proj-cursor');

    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });

    items.forEach((item) => {
      item.addEventListener('mouseenter', () => cursor.classList.add('is-visible'));
      item.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
    });
  }

  // ── Lightbox ────────────────────────────────────────────
  const lightbox = document.getElementById('proj-lightbox');
  if (!lightbox || !items.length) return;

  // :scope > filtra só os filhos diretos: o botão de fechar também tem um
  // <img> dentro dele, então um seletor genérico pegaria o ícone errado.
  const lightboxImg      = lightbox.querySelector(':scope > img');
  const lightboxVideo    = lightbox.querySelector(':scope > video');
  const lightboxCloseBtn = document.getElementById('proj-lightbox-close');
  let lastFocused = null;

  function lockScroll() {
    // O <html>, não o <body>, é quem tem overflow-y:auto nesta página
    // (ver projetos.css) — por isso a barra precisa ser travada nos dois,
    // senão sobra uma fresta do fundo na lateral do lightbox.
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }

  function unlockScroll() {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  function openLightbox(item) {
    const media = item.querySelector('img, video');
    if (!media) return;

    const ehVideo = media.tagName === 'VIDEO';
    lastFocused = item;

    lightboxImg.hidden   = ehVideo;
    lightboxVideo.hidden = !ehVideo;

    if (ehVideo) {
      lightboxVideo.src = media.currentSrc || media.src;
      // tenta com áudio; se o navegador bloquear o autoplay, cai para mudo
      lightboxVideo.muted = false;
      lightboxVideo.play().catch(() => {
        lightboxVideo.muted = true;
        lightboxVideo.play().catch(() => {});
      });
    } else {
      lightboxImg.src = media.currentSrc || media.src;
      lightboxImg.alt = item.getAttribute('aria-label') || '';
    }

    lightbox.hidden = false;
    // força um reflow para a transição de opacidade rodar a partir do 0
    void lightbox.offsetWidth;
    lightbox.classList.add('is-open');

    lockScroll();
    lightbox.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    unlockScroll();

    // para o vídeo e solta o arquivo para não seguir baixando em segundo plano
    lightboxVideo.pause();
    lightboxVideo.removeAttribute('src');
    lightboxVideo.load();

    const finish = () => {
      lightbox.hidden = true;
      lightbox.removeEventListener('transitionend', finish);
    };
    lightbox.addEventListener('transitionend', finish);

    if (lastFocused) lastFocused.focus();
  }

  items.forEach((item) => {
    item.addEventListener('click', () => openLightbox(item));
  });

  // Clicar na imagem (ou em qualquer ponto do overlay) fecha
  lightbox.addEventListener('click', closeLightbox);

  // stopPropagation evita que o clique no X dispare o closeLightbox duas
  // vezes (uma aqui, outra pelo bubbling até o listener do overlay acima)
  lightboxCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
})();
