// Portfolio Interactions & Navigation Tracking
(function () {
  'use strict';

  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  // Smooth scroll active state tracking via IntersectionObserver
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navItems.forEach(function (link) {
            if (link.getAttribute('href') === '#' + currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(function (sec) {
      sectionObserver.observe(sec);
    });
  }

  // Respect prefers-reduced-motion for SVG animations
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const runningSvg = document.querySelector('.running-scene');
    if (runningSvg && typeof runningSvg.pauseAnimations === 'function') {
      runningSvg.pauseAnimations();
    }
  }
})();
