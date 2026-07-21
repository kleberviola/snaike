// ── Overlay de contato ────────────────────────────────────
// Compartilhado entre a home (index.html) e a página de projetos.
// Precisa do GSAP carregado antes.
(function () {
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
})();
