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

/* #discover story: scroll position alone decides which phrase holds the stage, so scrolling back reverses it. Each phrase rises a few pixels and settles as it fades in, then drifts up as the next one arrives. Without JS or with reduced motion the four phrases are simply shown. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Per phrase, in section progress: fade-in start, fully in, fade-out start, fully out.
  const WINDOWS = [[-0.12, 0.05, 0.3, 0.38], [0.33, 0.41, 0.5, 0.57], [0.53, 0.6, 0.7, 0.76], [0.73, 0.82, 2, 2]];
  const RISE_PX = 16;
  const DRIFT_PX = 12;
  const clamp = (value) => Math.min(1, Math.max(0, value));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function start() {
    const scene = document.querySelector('[data-mx-manifesto]');
    const stage = scene?.querySelector('.mx-manifesto-stage');
    if (!scene || !stage) return;
    const darkBand = scene.closest('.mx-discover') || scene;
    const lines = [...scene.querySelectorAll('.mx-manifesto-line')];
    const arrow = document.querySelector('.mx-intro-next');
    const root = document.documentElement;
    let frame = 0;
    let dark = null;
    let last = null;
    let metrics = null;

    // Layout is read only after resize, load or locale change; scrolling itself reads scrollY alone.
    function measure() {
      const box = scene.getBoundingClientRect();
      metrics = {
        top: box.top + window.scrollY,
        bottom: darkBand.getBoundingClientRect().bottom + window.scrollY,
        hold: Math.max(1, box.height - stage.offsetHeight),
        header: parseFloat(getComputedStyle(scene).getPropertyValue('--mx-header-h')) || 0,
        vh: window.innerHeight,
      };
    }

    function render() {
      frame = 0;
      if (!metrics) measure();
      const y = window.scrollY;
      // Keep the header navy across the story and its demo, then restore the regular theme after the band.
      const edge = y + metrics.header;
      const overStory = edge > metrics.top + 1 && edge < metrics.bottom - 1;
      if (overStory !== dark) { dark = overStory; root.classList.toggle('mx-story-active', overStory); }
      if (!scene.classList.contains('is-kinetic')) return;
      if (arrow) {
        const fade = clamp(1 - y / (metrics.vh * 0.28));
        arrow.style.opacity = fade < 1 ? fade.toFixed(3) : '';
        arrow.style.visibility = fade <= 0.01 ? 'hidden' : '';
      }
      const progress = (y + metrics.header - metrics.top) / metrics.hold;
      if (last !== null && Math.abs(progress - last) < 0.0004) return;
      if (last !== null && (progress < -0.6 || progress > 1.4) && (last < -0.6 || last > 1.4)) return;
      last = progress;
      lines.forEach((line, index) => {
        const [a, b, c, d] = WINDOWS[index];
        const enter = easeOut(clamp((progress - a) / (b - a)));
        const exit = clamp((progress - c) / (d - c));
        const offset = RISE_PX * (1 - enter) - DRIFT_PX * exit * exit;
        line.style.opacity = (enter * (1 - exit)).toFixed(3);
        line.style.transform = 'translate3d(0,' + offset.toFixed(2) + 'px,0) scale(' + (0.98 + 0.02 * enter).toFixed(4) + ')';
      });
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(render); };
    const refresh = () => { metrics = null; last = null; request(); };

    function setMode() {
      const kinetic = !reducedMotion.matches;
      scene.classList.toggle('is-kinetic', kinetic);
      metrics = null;
      last = null;
      render();
      if (kinetic) return;
      lines.forEach((line) => { line.style.transform = ''; line.style.opacity = ''; });
      if (arrow) { arrow.style.opacity = ''; arrow.style.visibility = ''; }
    }
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('load', refresh);
    document.addEventListener('memrya:locale-changed', refresh);
    reducedMotion.addEventListener?.('change', setMode);
    setMode();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
