document.addEventListener('DOMContentLoaded', () => {
  const animatedEls = document.querySelectorAll('[data-animate]');
  if (!animatedEls.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    animatedEls.forEach((el) => { el.style.opacity = '1'; });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = el.dataset.animateDelay;
      if (delay) el.style.animationDelay = delay;
      el.classList.add('animate__animated', `animate__${el.dataset.animate}`);
      obs.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  animatedEls.forEach((el) => observer.observe(el));
});
