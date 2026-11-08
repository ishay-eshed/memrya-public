/* Homepage title intro: one-shot typographic reveal of the localized H1, plus quiet header state while the intro fills the screen. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const startsAtIntro = !location.hash || location.hash === '#top';
  if (startsAtIntro) root.classList.add('mx-intro-at-top');
  if (startsAtIntro && !reducedMotion.matches) root.classList.add('mx-intro-pending');

  // Two beats: "Life happens" settles first, then "MEMRYA remembers" focuses in more slowly; the title is formed by ~2.4s.
  const BEATS = [{ start: 0, spread: 440 }, { start: 620, spread: 820 }];
  const TOTAL_MS = 620 + 820 + 1000;
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
    let count = 0;
    title.querySelectorAll('.mx-intro-line').forEach((line, lineIndex) => {
      const units = [];
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
      const beat = BEATS[Math.min(lineIndex, BEATS.length - 1)];
      const step = units.length > 1 ? beat.spread / (units.length - 1) : 0;
      units.forEach((unit, index) => unit.style.setProperty('--mx-intro-delay', `${Math.round(beat.start + index * step)}ms`));
      count += units.length;
    });
    return count;
  }

  function finish(title) {
    window.clearTimeout(finishTimer);
    title.classList.remove('is-revealing');
    root.classList.remove('mx-intro-pending', 'mx-intro-playing');
  }

  function reveal(title, animate) {
    window.clearTimeout(finishTimer);
    title.classList.remove('is-revealing');
    build(title);
    root.classList.remove('mx-intro-pending');
    if (!animate) return;
    root.classList.add('mx-intro-playing');
    void title.offsetWidth;
    title.classList.add('is-revealing');
    finishTimer = window.setTimeout(() => finish(title), TOTAL_MS + 150);
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

/* #discover story: the connected-memory diagram sits in normal page flow. When it first enters view it plays its ~1.85s choreography once; nothing is tied to scroll position after that. Threads are redrawn in real pixels so they leave exactly from the phrase anchors. Scroll is read only to keep the header navy over the dark band. Without JS, without IntersectionObserver or with reduced motion the phrases are simply shown. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (value) => Math.min(1, Math.max(0, value));

  function start() {
    const scene = document.querySelector('[data-mx-manifesto]');
    if (!scene) return;
    const darkBand = scene.closest('.mx-discover') || scene;
    const arrow = document.querySelector('.mx-intro-next');
    const root = document.documentElement;
    let frame = 0;
    let dark = null;
    let metrics = null;

    const svg = scene.querySelector('.mx-manifesto-svg');
    const threads = svg ? [...svg.querySelectorAll('.mx-thread')] : [];
    function drawThreads() {
      const box = svg.getBoundingClientRect();
      const w = Math.max(1, Math.round(box.width));
      const h = Math.max(1, Math.round(box.height));
      const mid = w / 2;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      [w / 6, mid, (w * 5) / 6].forEach((x, i) => {
        const thread = threads[i];
        if (!thread) return;
        thread.removeAttribute('vector-effect');
        thread.setAttribute('d', i === 1 ? `M${mid} 0L${mid} ${h}` : `M${x} 0C${x} ${h * 0.58} ${mid} ${h * 0.42} ${mid} ${h}`);
      });
    }
    if (svg && threads.length) {
      drawThreads();
      if ('ResizeObserver' in window) new ResizeObserver(drawThreads).observe(svg);
      else window.addEventListener('resize', drawThreads, { passive: true });
    }

    // Plays once on first entry. Already scrolled past (hash link, fast fling, restored position): settle without playing.
    const settle = () => scene.classList.add('is-in', 'is-done');
    if (!reducedMotion.matches && 'IntersectionObserver' in window) {
      scene.classList.add('is-armed');
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[entries.length - 1];
        if (entry.isIntersecting) {
          observer.disconnect();
          scene.classList.add('is-in');
        } else if (entry.boundingClientRect.bottom < 0) {
          observer.disconnect();
          settle();
        }
      }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
      observer.observe(scene);
    }
    reducedMotion.addEventListener?.('change', settle);

    function measure() {
      const y = window.scrollY;
      metrics = {
        top: scene.getBoundingClientRect().top + y,
        bottom: darkBand.getBoundingClientRect().bottom + y,
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
      if (arrow && !reducedMotion.matches) {
        const fade = clamp(1 - y / (metrics.vh * 0.28));
        arrow.style.opacity = fade < 1 ? fade.toFixed(3) : '';
        arrow.style.visibility = fade <= 0.01 ? 'hidden' : '';
      }
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(render); };
    const refresh = () => { metrics = null; request(); };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('load', refresh);
    document.addEventListener('memrya:locale-changed', refresh);
    document.fonts?.ready.then(refresh);
    refresh();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
