/**
 * Çelebi Tur — Scroll Animations
 * Progressive enhancement: content stays visible if JS is slow/blocked.
 */

document.addEventListener('DOMContentLoaded', () => {
  const elements = Array.from(document.querySelectorAll('.animate-on-scroll'));
  if (!elements.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const markVisibleIfInView = () => {
    const viewportBottom = window.innerHeight * 0.95;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportBottom && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  };

  // Reveal above-the-fold content before enabling hide styles
  markVisibleIfInView();
  document.documentElement.classList.add('js-anim');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '80px 0px 80px 0px' }
  );

  elements.forEach((el) => {
    if (!el.classList.contains('visible')) {
      observer.observe(el);
    }
  });

  // Safety net: never leave content invisible
  window.setTimeout(() => {
    elements.forEach((el) => el.classList.add('visible'));
  }, 2500);
});
