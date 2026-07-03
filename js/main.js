// Troca o vídeo do hero (mobile/desktop) via JS — <source media> não
// reavalia de forma confiável em mudanças de viewport.
(function () {
  const video  = document.querySelector('.hero-video');
  const source = video.querySelector('source');
  const mq     = window.matchMedia('(max-width: 640px)');

  function updateSrc() {
    const desired = mq.matches ? 'videos/cobra_vertical.mp4' : 'videos/cobra_ok_baixa.mp4';
    if (source.getAttribute('src') !== desired) {
      source.setAttribute('src', desired);
      video.load();
      video.play().catch(() => {});
    }
  }

  updateSrc();
  mq.addEventListener('change', updateSrc);
})();

// Troca o vídeo da seção "Reel" (mobile/desktop) — mesmo esquema do hero.
(function () {
  const video  = document.querySelector('.reel-video');
  const source = video.querySelector('source');
  const mq     = window.matchMedia('(max-width: 640px)');

  function updateSrc() {
    const desired = mq.matches ? 'videos/snaike_reel_(9x16)_baixa.mp4' : 'videos/snaike_reel_baixa.mp4?v=2';
    if (source.getAttribute('src') !== desired) {
      source.setAttribute('src', desired);
      video.load(); // recarrega mostrando a capa (poster) — sem autoplay
    }
  }

  updateSrc();
  mq.addEventListener('change', updateSrc);
})();

// Vídeo da seção "Reel" — poster + botão de play; toca com áudio,
// pausa se clicar no vídeo enquanto ele roda.
const reelVideo = document.querySelector('.reel-video');
const reelPlayBtn = document.querySelector('.reel-play');

function playReelVideo() {
  reelVideo.muted = false;
  reelVideo.play().catch(() => {
    reelVideo.muted = true;
    reelVideo.play();
  });
  reelPlayBtn.classList.add('is-hidden');
}

function stopReelVideo() {
  reelVideo.pause();
  reelVideo.muted = true;
  reelVideo.load(); // recarrega o elemento para a capa (poster) voltar a aparecer
  reelPlayBtn.classList.remove('is-hidden');
}

reelPlayBtn.addEventListener('click', playReelVideo);
reelVideo.addEventListener('click', () => {
  if (!reelVideo.paused) {
    reelVideo.pause();
    reelPlayBtn.classList.remove('is-hidden');
  }
});

// ── Overlay de contato ────────────────────────────────────
const overlay       = document.getElementById('contact-overlay');
const overlayLinks  = document.querySelectorAll('.overlay-link');
const overlayCloseIcon = document.querySelector('.overlay-close img');
let overlayAnimating = false;

function openOverlay() {
  if (overlayAnimating) return;
  overlayAnimating = true;
  overlay.classList.add('is-open');
  const h = overlay.offsetHeight;
  gsap.set(overlayLinks, { opacity: 0, y: 30 });
  gsap.set(overlay, { y: -h });
  gsap.set(overlayCloseIcon, { rotate: 0 });
  gsap.to(overlay, { y: 0, duration: 0.6, ease: 'power3.out' });
  gsap.to(overlayCloseIcon, { rotate: 45, duration: 0.6, ease: 'power3.out' });
  gsap.to(overlayLinks, {
    opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out', delay: 0.25,
    onComplete: () => { overlayAnimating = false; },
  });
}

function closeOverlay() {
  if (overlayAnimating) return;
  overlayAnimating = true;
  const h = overlay.offsetHeight;
  gsap.to(overlay, {
    y: -h, duration: 0.5, ease: 'power3.in',
    onComplete: () => {
      overlay.classList.remove('is-open');
      overlayAnimating = false;
    },
  });
  gsap.to(overlayCloseIcon, { rotate: 0, duration: 0.4, ease: 'power3.in' });
}

document.getElementById('nav-open-overlay').addEventListener('click', openOverlay);
document.getElementById('overlay-close').addEventListener('click', closeOverlay);

const fp      = document.getElementById('fullpage');
const sections = Array.from(document.querySelectorAll('.section'));
const dots     = document.querySelectorAll('.dot');

let current   = 0;
let animating = false;

const FADE_DUR = 0.65;

function getEls(section) {
  return [
    section.querySelector('.section-content'),
    section.querySelector('.section-footer'),
  ].filter(Boolean);
}

// Retorna os elementos a revelar em cada seção (filhos diretos do content,
// ou um nível mais fundo quando há apenas um wrapper com múltiplos filhos)
function getRevealEls(section) {
  const content = section.querySelector('.section-content');
  if (!content) return [];
  const children = Array.from(content.children);
  if (children.length === 1 && children[0].children.length > 1) {
    return Array.from(children[0].children);
  }
  return children;
}

function goTo(index, dir = 1) {
  if (index < 0 || index >= sections.length || animating) return;
  animating = true;

  const prev = current;
  current = index;

  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  sections[prev].classList.remove('is-active');
  sections[index].classList.add('is-active');

  if (sections[prev].id === 'reel') stopReelVideo();

  const tl = gsap.timeline({
    onComplete: () => { animating = false; }
  });

  // ── SAÍDA ────────────────────────────────────────────────
  if (prev === 0 && dir > 0) {
    // Hero EXIT: wordmark voa para o nav
    document.body.classList.remove('is-hero');

    const wordmark  = sections[0].querySelector('.hero-wordmark');
    const tagline   = sections[0].querySelector('.hero-tagline');
    const navLogoEl = document.querySelector('.nav-logo');
    const navImg    = document.querySelector('.nav-logo img');

    const wRect = wordmark.getBoundingClientRect();
    const nRect = navImg.getBoundingClientRect();
    const scale = nRect.height / wRect.height;
    const dx    = nRect.left - wRect.left;
    const dy    = nRect.top  - wRect.top;

    gsap.set(navLogoEl, { opacity: 0 });

    const clone = wordmark.cloneNode(true);
    Object.assign(clone.style, {
      position: 'fixed', left: `${wRect.left}px`, top: `${wRect.top}px`,
      width: `${wRect.width}px`, height: `${wRect.height}px`,
      zIndex: '200', pointerEvents: 'none', margin: '0',
    });
    document.body.appendChild(clone);
    gsap.set(wordmark, { opacity: 0 });

    const revealEls = getRevealEls(sections[index]);
    gsap.set(revealEls, { opacity: 0, y: 28 });
    gsap.set(sections[index], { zIndex: 2 });

    tl.to(tagline, { opacity: 0, y: 8, duration: 0.2, ease: 'power2.in' });
    tl.to(clone, {
      x: dx, y: dy, scale,
      transformOrigin: 'top left',
      duration: 0.65, ease: 'power2.inOut',
      onComplete: () => {
        clone.remove();
        gsap.to(navLogoEl, { opacity: 1, duration: 0.15, clearProps: 'opacity' });
      },
    }, 0);

    // Crossfade seções
    tl.to(sections[prev], { opacity: 0, duration: FADE_DUR, ease: 'power2.inOut' }, 0.25);
    tl.fromTo(sections[index], { opacity: 0 }, { opacity: 1, duration: FADE_DUR, ease: 'power2.inOut' }, 0.25);
    // Reveal do conteúdo enquanto a seção aparece
    tl.to(revealEls, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.5);
    tl.call(() => { gsap.set(sections[index], { clearProps: 'zIndex' }); });

  } else {
    if (index !== 0) {
      document.body.classList.toggle('is-hero', false);
    }

    // Prepara reveal para seções não-hero
    let revealEls = [];
    if (index !== 0) {
      revealEls = getRevealEls(sections[index]);
      gsap.set(revealEls, { opacity: 0, y: 28 });
    }

    // Seção entrante aparece por cima — sem dupla transparência
    gsap.set(sections[index], { zIndex: 2 });
    tl.fromTo(sections[index], { opacity: 0 }, { opacity: 1, duration: FADE_DUR, ease: 'power2.inOut' });

    if (revealEls.length) {
      tl.to(revealEls, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.25);
    }

    tl.call(() => {
      gsap.set(sections[prev], { opacity: 0 });
      gsap.set(sections[index], { clearProps: 'zIndex' });
    });
  }

  // ── RETORNO AO HERO ───────────────────────────────────────
  if (index === 0 && dir < 0) {
    const wordmark  = sections[0].querySelector('.hero-wordmark');
    const tagline   = sections[0].querySelector('.hero-tagline');
    const navLogoEl = document.querySelector('.nav-logo');
    const navImg    = document.querySelector('.nav-logo img');

    gsap.set([wordmark, tagline], { opacity: 0 });

    tl.call(() => {
      const wRect      = wordmark.getBoundingClientRect();
      const nRect      = navImg.getBoundingClientRect();
      const startScale = nRect.height / wRect.height;
      const startX     = nRect.left - wRect.left;
      const startY     = nRect.top  - wRect.top;

      gsap.set(navLogoEl, { opacity: 0 });
      gsap.set(wordmark, { opacity: 1 });
      gsap.fromTo(wordmark,
        { scale: startScale, x: startX, y: startY, transformOrigin: 'top left' },
        {
          scale: 1, x: 0, y: 0,
          duration: 0.65, ease: 'power2.inOut',
          clearProps: 'all',
          onComplete: () => {
            document.body.classList.add('is-hero');
            gsap.set(navLogoEl, { clearProps: 'opacity' });
            gsap.fromTo(tagline,
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
          },
        }
      );
    });
  }
}

// ── Wheel ────────────────────────────────────────────────
let lastWheel = 0;
fp.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (animating) return;
  const now = Date.now();
  if (now - lastWheel < 900) return;
  lastWheel = now;
  goTo(current + (e.deltaY > 0 ? 1 : -1), e.deltaY > 0 ? 1 : -1);
}, { passive: false });

// ── Touch ────────────────────────────────────────────────
let touchY = 0;
fp.addEventListener('touchstart',  (e) => { touchY = e.touches[0].clientY; }, { passive: true });
fp.addEventListener('touchmove',   (e) => e.preventDefault(), { passive: false });
fp.addEventListener('touchend', (e) => {
  const delta = touchY - e.changedTouches[0].clientY;
  if (Math.abs(delta) > 50) goTo(current + (delta > 0 ? 1 : -1), delta > 0 ? 1 : -1);
}, { passive: true });

// ── Teclado ───────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (['ArrowDown', 'PageDown'].includes(e.key)) goTo(current + 1,  1);
  if (['ArrowUp',   'PageUp'  ].includes(e.key)) goTo(current - 1, -1);
});

// ── Dots ──────────────────────────────────────────────────
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => goTo(i, i > current ? 1 : -1));
});

// ── Nav logo / âncoras ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    const idx = sections.indexOf(target);
    if (idx !== -1) goTo(idx, idx > current ? 1 : -1);
  });
});

// ── Init ──────────────────────────────────────────────────
sections[0].classList.add('is-active');
document.body.classList.add('is-hero');
gsap.set(sections.slice(1), { opacity: 0 });
gsap.fromTo(
  getEls(sections[0]),
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.3 }
);
