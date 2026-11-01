// Portfolio Interactions & Navigation Tracking
(function () {
  'use strict';

  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');
  const revealItems = document.querySelectorAll('[data-reveal]');
  const terminalCommands = document.querySelectorAll('[data-terminal-text]');
  const wordHoverItems = document.querySelectorAll('[data-word-hover]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroGreeting = document.querySelector('.intro-stage .hero-entrance-greeting [data-terminal-text]');
  let introReady = prefersReducedMotion;
  let introScrollFrameRequested = false;
  let introProgress = 0;
  const startedTerminalCommands = new WeakSet();
  let heroTerminalStarted = false;
  document.body.classList.add('initial-intro-active');
  document.body.classList.add('typing-active');

  function prepareWordHover(element) {
    const originalText = element.textContent;
    const words = originalText.replace(/\s+/g, ' ').trim().split(' ');
    const fragment = document.createDocumentFragment();

    words.forEach(function (word, index) {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      wordSpan.textContent = word;
      wordSpan.setAttribute('aria-hidden', 'true');
      fragment.appendChild(wordSpan);

      if (index < words.length - 1) {
        fragment.appendChild(document.createTextNode(' '));
      }
    });

    element.replaceChildren(fragment);
    element.setAttribute('aria-label', originalText.replace(/\s+/g, ' ').trim());
  }

  wordHoverItems.forEach(prepareWordHover);

  function setupCustomCursor() {
    const supportsCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReducedMotion || !supportsCustomCursor) {
      return;
    }

    const cursor = document.createElement('span');
    cursor.className = 'custom-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);
    document.body.classList.add('custom-cursor-active');

    let frameRequested = false;
    let pointerX = 0;
    let pointerY = 0;

    function renderCursor() {
      cursor.style.transform = 'translate3d(' + pointerX + 'px, ' + pointerY + 'px, 0)';
      cursor.classList.add('is-visible');
      frameRequested = false;
    }

    document.addEventListener('pointermove', function (event) {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!frameRequested) {
        window.requestAnimationFrame(renderCursor);
        frameRequested = true;
      }
    });
  }

  setupCustomCursor();

  function updateIntroReveal() {
    if (!introReady || prefersReducedMotion) {
      return;
    }

    const viewportHeight = Math.max(window.innerHeight, 1);
    const progress = Math.min(window.scrollY / viewportHeight, 1);
    const body = document.body;

    if (progress > 0) {
      body.classList.add('intro-scroll-started');
      introProgress = Math.max(introProgress, progress);
    }

    body.style.setProperty('--intro-progress', introProgress.toFixed(3));
    body.style.setProperty('--intro-motion-progress', Math.min(introProgress / 0.55, 1).toFixed(3));
    const contentProgress = Math.max((introProgress - 0.55) / 0.45, 0);
    body.style.setProperty('--intro-content-progress', Math.min(contentProgress, 1).toFixed(3));
    body.style.setProperty('--intro-content-lift', ((1 - Math.min(contentProgress, 1)) * 10).toFixed(2) + 'px');
    body.style.setProperty('--intro-lift', (Math.min(introProgress / 0.55, 1) * viewportHeight * 0.4).toFixed(2) + 'px');
    if (contentProgress > 0 && !heroTerminalStarted) {
      heroTerminalStarted = true;
      startTerminalCommandsWithin(document.querySelector('.hero-entrance-terminal'));
    }
    if (introProgress >= 1) {
      body.classList.add('intro-finished');
    }
  }

  function requestIntroRevealUpdate() {
    if (!introScrollFrameRequested) {
      window.requestAnimationFrame(function () {
        updateIntroReveal();
        introScrollFrameRequested = false;
      });
      introScrollFrameRequested = true;
    }
  }

  window.addEventListener('scroll', requestIntroRevealUpdate, { passive: true });
  window.addEventListener('resize', requestIntroRevealUpdate);

  function showTerminalCommand(command) {
    command.textContent = command.getAttribute('data-terminal-text') || '';
    command.style.width = '';
  }

  function typeTerminalCommand(command, delay, onComplete) {
    const fullText = command.getAttribute('data-terminal-text') || '';

    if (prefersReducedMotion) {
      showTerminalCommand(command);
      if (onComplete) {
        onComplete();
      }
      return;
    }

    command.style.width = '';
    command.textContent = '';
    const commandContainer = command.closest('.terminal-command, .terminal-command-line');

    window.setTimeout(function () {
      if (commandContainer) {
        commandContainer.classList.add('terminal-command-typing');
      }
      let characterIndex = 0;
      const typingTimer = window.setInterval(function () {
        command.textContent = fullText.slice(0, characterIndex + 1);
        characterIndex += 1;

        if (characterIndex === fullText.length) {
          window.clearInterval(typingTimer);
          if (commandContainer) {
            commandContainer.classList.remove('terminal-command-typing');
            commandContainer.classList.add('terminal-command-complete');
          }
          if (onComplete) {
            onComplete();
          }
        }
      }, 42);
    }, delay);
  }

  function startTerminalCommand(command) {
    if (!command || startedTerminalCommands.has(command)) {
      return;
    }

    startedTerminalCommands.add(command);
    typeTerminalCommand(command, 0);
  }

  function startTerminalCommandsWithin(element) {
    if (element.matches('[data-terminal-text]')) {
      startTerminalCommand(element);
    }

    element.querySelectorAll('[data-terminal-text]').forEach(startTerminalCommand);
  }

  function startTerminalTyping() {
    terminalCommands.forEach(function (command, index) {
      const isHeroGreeting = command === heroGreeting;
      const isSidebarCommand = command.closest('.sidebar-command');
      if (prefersReducedMotion) {
        startedTerminalCommands.add(command);
        typeTerminalCommand(command, 0, function () {
          const commandContainer = command.closest('.terminal-command, .terminal-command-line');
          if (commandContainer) {
            commandContainer.classList.add('terminal-command-complete');
          }
          if (isHeroGreeting) {
            introReady = true;
            document.body.classList.remove('initial-intro-active');
          }
        });
        return;
      }

      if (!isHeroGreeting && !isSidebarCommand) {
        command.textContent = '';
        return;
      }

      startedTerminalCommands.add(command);
      typeTerminalCommand(command, 0, function () {
        if (isHeroGreeting) {
          introReady = true;
          if (prefersReducedMotion) {
            document.body.classList.remove('initial-intro-active');
          } else {
            updateIntroReveal();
          }
        }

        if (prefersReducedMotion) {
          const commandContainer = command.closest('.terminal-command, .terminal-command-line');
          if (commandContainer) {
            commandContainer.classList.add('terminal-command-complete');
          }
        }
      });
    });

    const heroStatusCursor = document.querySelector('.hero-status-cursor');
    const heroCommand = document.querySelector('.terminal-command-line [data-terminal-text]');
    if (heroStatusCursor && heroCommand) {
      const heroTextLength = (heroCommand.getAttribute('data-terminal-text') || '').length;
      const heroTypingDuration = prefersReducedMotion ? 0 : heroTextLength * 42 + 120;
      const soccerSceneDuration = prefersReducedMotion ? 0 : 700;

      window.setTimeout(function () {
        heroStatusCursor.classList.add('is-ready');
      }, heroTypingDuration + soccerSceneDuration);
    }
  }

  startTerminalTyping();

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

  // Reveal marked content once it first enters the viewport.
  document.body.classList.add('reveal-ready');
  if (prefersReducedMotion) {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  } else if ('IntersectionObserver' in window && revealItems.length > 0) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && document.body.classList.contains('intro-scroll-started')) {
          entry.target.classList.add('is-visible');
          startTerminalCommandsWithin(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.12
    });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  // Respect prefers-reduced-motion for SVG animations
  if (prefersReducedMotion) {
    const runningSvg = document.querySelector('.running-scene');
    if (runningSvg && typeof runningSvg.pauseAnimations === 'function') {
      runningSvg.pauseAnimations();
    }
  }
})();
