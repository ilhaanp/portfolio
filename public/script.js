// Developer Workspace Interactions
(function () {
  'use strict';

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.workspace-section');
  const mainContent = document.querySelector('.main-content');

  // 1. Mobile Menu Toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      const isExpanded = document.body.classList.toggle('mobile-menu-open');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (document.body.classList.contains('mobile-menu-open')) {
        document.body.classList.remove('mobile-menu-open');
        if (mobileMenuBtn) {
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // 2. Active Section Highlighting via IntersectionObserver
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: window.innerWidth >= 860 ? mainContent : null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            if (link.getAttribute('data-section') === currentId) {
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
})();
