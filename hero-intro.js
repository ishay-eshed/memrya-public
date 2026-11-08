/* Homepage title intro: one-shot typographic reveal of the localized H1, plus quiet header state while the intro fills the screen. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const startsAtIntro = !location.hash || location.hash === '#top';
  if (startsAtIntro) root.classList.add('mx-intro-at-top');
  if (startsAtIntro && !reducedMotion.matches) root.classList.add('mx-intro-pending');

  const SPREAD_MS = 460;
  const MAX_STEP_MS = 34;
  const segmenter = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;
  const graphemes = (word) => (segmenter ? [...segmenter.segment(word)].map((part) => part.segment) : Array.from(word));
  let played = false;
  let finishTimer = null;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function lineText(line) {
    return line.dataset.introText != null && line.querySelector('.mx-intro-glyphs') ? line.dataset.introText : line.textContent.trim();
  }

  // Each line keeps one plain copy for assistive tech; the animated copy is hidden from it.
  // Arabic and other cursive scripts reveal by word so letter shaping stays intact.
  function build(title) {
    const byWord = /^(ar|fa|ur|he)\b/.test(root.lang) || root.dir === 'rtl';
    const units = [];
    title.querySelectorAll('.mx-intro-line').forEach((line) => {
      const text = lineText(line);
      line.dataset.introText = text;
      const visual = element('span', 'mx-intro-glyphs');
      visual.setAttribute('aria-hidden', 'true');
      text.split(/\s+/).filter(Boolean).forEach((word, index) => {
        if (index) visual.append(' ');
        const wordNode = element('span', 'mx-intro-word');
        if (byWord) {
          wordNode.classList.add('mx-intro-unit');
          wordNode.textContent = word;
          units.push(wordNode);
        } else {
          graphemes(word).forEach((glyph) => {
            const glyphNode = element('span', 'mx-intro-unit', glyph);
            wordNode.append(glyphNode);
            units.push(glyphNode);
          });
        }
        visual.append(wordNode);
      });
      line.replaceChildren(element('span', 'sr-only', text), visual);
    });
    const step = units.length > 1 ? Math.min(MAX_STEP_MS, SPREAD_MS / (units.length - 1)) : 0;
    units.forEach((unit, index) => unit.style.setProperty('--mx-intro-delay', `${Math.round(index * step)}ms`));
    return units.length;
  }

  function finish(title) {
    window.clearTimeout(finishTimer);
    title.classList.remove('is-revealing');
    root.classList.remove('mx-intro-pending');
  }

  function reveal(title, animate) {
    window.clearTimeout(finishTimer);
    title.classList.remove('is-revealing');
    build(title);
    root.classList.remove('mx-intro-pending');
    if (!animate) return;
    void title.offsetWidth;
    title.classList.add('is-revealing');
    finishTimer = window.setTimeout(() => finish(title), SPREAD_MS + 900);
  }

  function introInView(intro) {
    const box = intro.getBoundingClientRect();
    return box.bottom > window.innerHeight * 0.35 && box.top < window.innerHeight;
  }

  function start() {
    const intro = document.querySelector('.mx-intro');
    const title = intro?.querySelector('.mx-intro-title');
    if (!intro || !title) {
      root.classList.remove('mx-intro-pending', 'mx-intro-at-top');
      return;
    }

    const play = () => {
      if (played) return;
      played = true;
      reveal(title, !reducedMotion.matches && introInView(intro));
    };
    if (document.hidden) {
      build(title);
      document.addEventListener('visibilitychange', function onVisible() {
        if (document.hidden) return;
        document.removeEventListener('visibilitychange', onVisible);
        play();
      });
    } else {
      play();
    }

    // i18n replaces the line text on every locale change; rebuild from the new text without replaying.
    document.addEventListener('memrya:locale-changed', () => {
      finish(title);
      build(title);
    });
    reducedMotion.addEventListener?.('change', () => finish(title));

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        root.classList.toggle('mx-intro-at-top', entry.isIntersecting);
      }, { threshold: 0, rootMargin: '0px 0px -55% 0px' }).observe(intro);
    } else {
      root.classList.remove('mx-intro-at-top');
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
