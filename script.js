(() => {
  const i18n = window.MEMRYA_I18N;
  const localeSelects = [
    ...document.querySelectorAll('.locale-switch select, .locale-switch-control'),
  ];

  const syncLocaleSelects = (code) => {
    localeSelects.forEach((select) => {
      select.value = code;
    });
  };

  if (i18n && localeSelects.length > 0) {
    for (const select of localeSelects) {
      select.replaceChildren(
        ...i18n.locales.map((locale) => {
          const option = document.createElement('option');
          option.value = locale.code;
          option.textContent = locale.name;
          return option;
        }),
      );
    }
    i18n.init();
    syncLocaleSelects(document.documentElement.lang || 'en');
    localeSelects.forEach((select) => {
      select.addEventListener('change', () => {
        i18n.apply(select.value);
        syncLocaleSelects(select.value);
      });
    });
  }
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');

  const closeNav = () => {
    if (!navToggle || !nav) return;
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) closeNav();
    });
  }
  document.addEventListener('memrya:locale-changed', (event) => {
    const code = event.detail?.locale;
    if (code) syncLocaleSelects(code);
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && document.body.classList.contains('home-page')) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => document.body.classList.add('hero-ready'));
    });
  } else {
    document.body.classList.add('hero-ready');
  }
})();

/* Accessible interactive MEMRYA homepage preview. No external requests. */
(() => {
  'use strict';
  const demo = document.querySelector('[data-mx-demo]');
  if (!demo) return;
  const buttons = [...demo.querySelectorAll('[data-mx-stage]')];
  const pause = demo.querySelector('[data-mx-pause]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let timer = null;
  const current = () => Number(demo.dataset.stage) || 1;
  function show(stage) {
    const next = stage >= 1 && stage <= 3 ? stage : 1;
    demo.dataset.stage = String(next);
    buttons.forEach((button) => {
      const selected = Number(button.dataset.mxStage) === next;
      button.setAttribute('aria-pressed', String(selected));
    });
  }
  function stop() {
    if (timer !== null) { clearInterval(timer); timer = null; }
  }
  function labelPause() {
    if (!pause) return;
    // Use the visible, localized label so screen readers hear the page language.
    const visible = pause.querySelector(paused ? '.mx-when-paused' : '.mx-when-playing');
    pause.setAttribute('aria-label', visible?.textContent.trim() || (paused ? 'Play' : 'Pause'));
  }
  function applyPause() {
    demo.dataset.paused = String(paused);
    if (pause) {
      pause.setAttribute('aria-pressed', String(paused));
      labelPause();
    }
    stop();
    if (!paused && !document.hidden) {
      timer = window.setInterval(() => show(current() % 3 + 1), 4900);
    }
  }
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      show(Number(button.dataset.mxStage));
      paused = true;
      applyPause();
    });
  });
  if (pause) pause.addEventListener('click', () => {
    paused = !paused;
    applyPause();
  });
  document.addEventListener('memrya:locale-changed', labelPause);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else applyPause();
  });
  reducedMotion.addEventListener?.('change', (event) => {
    paused = event.matches;
    applyPause();
  });
  show(1);
  applyPause();
})();
