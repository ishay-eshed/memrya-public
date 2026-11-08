/* Meet MEMRYA product film (v3, 32 s): explicit click-to-play, portrait cut on phones,
   play/pause toggle, sound toggle, replay, native captions and controls, pause when scrolled away,
   metadata preloaded only when the film nears the viewport, localized labels.
   No autoplay. Sound (English narration and music) starts only from the visitor's own click,
   and the visitor's mute choice is kept for the rest of the visit. No external requests. */
(() => {
  'use strict';
  const player = document.querySelector('[data-film]');
  if (!player) return;
  const video = player.querySelector('video');
  const play = player.querySelector('[data-film-play]');
  const toggle = document.querySelector('[data-film-toggle]');
  const toggleLabel = toggle && toggle.querySelector('[data-film-toggle-label]');
  const sound = document.querySelector('[data-film-sound]');
  const soundLabel = sound && sound.querySelector('[data-film-sound-label]');
  const controls = toggle && toggle.closest('.mf-controls');
  const section = document.getElementById('film');
  const phone = window.matchMedia('(max-width: 680px)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const COPY = {
    en: {
      eyebrow: 'Meet MEMRYA', title: 'See what MEMRYA remembers',
      lede: 'A work meeting, the people in your life and a family day trip, from the moment they are recorded to the memories worth keeping',
      watch: 'Watch MEMRYA in action', play: 'Play the film', replay: 'Watch again', meta: '0:32 · English narration', pause: 'Pause', resume: 'Play',
      videoLabel: 'MEMRYA product film, 32 seconds, with English narration and music',
      disclaimer: 'Illustrative sample. All people, conversations and details are fictional, and the portraits are original illustrations.',
      cast: 'Fictional cast: Lena, Maya, Noah, Leah, Marcus and Sam.',
      summary: 'Read the film as text',
      s1: 'Life happens in conversations.',
      s2: 'Capture: a work meeting is recorded on iPhone. MEMRYA saves as you record, then writes the transcript, including the line where you promise to send Leah the updated budget by Thursday.',
      s3: 'Memory: conversations sort into life categories: Family, Work, Personal, Health, Friends and Study.',
      s4: 'People: the people closest to you come first. Lena (spouse), Maya and Noah (children), then Leah and Marcus (colleagues) and Sam (a friend).',
      s5: 'Core memories: three important things rise to the top, each with its source. Maya needs the allergy-safe snacks for Saturday. Send the updated budget to Leah by Thursday. The kids want to visit the lighthouse again.',
      s6: 'Day trip: opening the source shows the moment in the car on the way home, when Noah and Maya ask to visit the lighthouse again. The memory is kept in Family.',
      s7: 'Not everything needs remembering. The important things do.',
      mute: 'Mute', unmute: 'Unmute',
      narration: 'English narration: Life happens in conversations. A decision. A promise. Moments find their place. And so do the people who matter. MEMRYA remembers what matters. From the workday, to a day by the sea. Not everything needs remembering. The important things do.',
    },
    es: {
      eyebrow: 'Conoce MEMRYA', title: 'Mira lo que MEMRYA recuerda',
      lede: 'Una reunión de trabajo, las personas de tu vida y una excursión familiar, desde el momento en que se graban hasta los recuerdos que vale la pena guardar',
      watch: 'Mira MEMRYA en acción', play: 'Reproducir el vídeo', replay: 'Ver de nuevo', meta: '0:32 · Narración en inglés', pause: 'Pausa', resume: 'Reproducir',
      videoLabel: 'Vídeo del producto MEMRYA, 32 segundos, con narración en inglés y música',
      disclaimer: 'Ejemplo ilustrativo. Todas las personas, conversaciones y detalles son ficticios, y los retratos son ilustraciones originales.',
      cast: 'Personajes ficticios: Lena, Maya, Noah, Leah, Marcus y Sam.',
      summary: 'Leer el vídeo como texto',
      s1: 'La vida sucede en las conversaciones.',
      s2: 'Capturar: se graba una reunión de trabajo en el iPhone. MEMRYA guarda mientras grabas y luego escribe la transcripción, incluida la frase en la que prometes enviar a Leah el presupuesto actualizado antes del jueves.',
      s3: 'Memoria: las conversaciones se ordenan en categorías de vida: Familia, Trabajo, Personal, Salud, Amigos y Estudios.',
      s4: 'Personas: primero las más cercanas. Lena (pareja), Maya y Noah (hijos), después Leah y Marcus (colegas) y Sam (un amigo).',
      s5: 'Recuerdos clave: tres cosas importantes suben al primer lugar, cada una con su fuente. Maya necesita los snacks sin alérgenos para el sábado. Enviar a Leah el presupuesto actualizado antes del jueves. Los niños quieren volver al faro.',
      s6: 'Excursión: al abrir la fuente aparece el momento en el coche de vuelta a casa, cuando Noah y Maya piden volver al faro. El recuerdo se guarda en Familia.',
      s7: 'No todo necesita recordarse. Lo importante, sí.',
      mute: 'Silenciar', unmute: 'Activar sonido',
      narration: 'Narración en inglés (traducción): La vida sucede en las conversaciones. Una decisión. Una promesa. Los momentos encuentran su lugar. Y también las personas que importan. MEMRYA recuerda lo que importa. Del trabajo a un día junto al mar. No todo necesita recordarse. Lo importante, sí.',
    },
    fr: {
      eyebrow: 'Découvrez MEMRYA', title: 'Voyez ce dont MEMRYA se souvient',
      lede: "Une réunion de travail, les personnes de votre vie et une sortie en famille, de l'enregistrement jusqu'aux souvenirs qui comptent",
      watch: 'Voir MEMRYA en action', play: 'Lancer le film', replay: 'Revoir', meta: '0:32 · Narration en anglais', pause: 'Pause', resume: 'Lecture',
      videoLabel: 'Film produit MEMRYA, 32 secondes, avec narration en anglais et musique',
      disclaimer: 'Exemple illustratif. Toutes les personnes, conversations et informations sont fictives, et les portraits sont des illustrations originales.',
      cast: 'Personnages fictifs : Lena, Maya, Noah, Leah, Marcus et Sam.',
      summary: 'Lire le film en texte',
      s1: 'La vie se passe dans les conversations.',
      s2: "Capturer : une réunion de travail est enregistrée sur iPhone. MEMRYA sauvegarde pendant l'enregistrement, puis rédige la transcription, y compris la phrase où vous promettez d'envoyer le budget mis à jour à Leah d'ici jeudi.",
      s3: 'Mémoire : les conversations se rangent dans des catégories de vie : Famille, Travail, Personnel, Santé, Amis et Études.',
      s4: "Personnes : les plus proches d'abord. Lena (conjointe), Maya et Noah (enfants), puis Leah et Marcus (collègues) et Sam (un ami).",
      s5: "Souvenirs essentiels : trois choses importantes passent en tête, chacune avec sa source. Maya a besoin des en-cas sans allergènes pour samedi. Envoyer le budget mis à jour à Leah d'ici jeudi. Les enfants veulent retourner au phare.",
      s6: 'Sortie : ouvrir la source montre le moment dans la voiture au retour, quand Noah et Maya demandent à revoir le phare. Le souvenir est rangé dans Famille.',
      s7: "Tout n'a pas besoin d'être retenu. L'essentiel, si.",
      mute: 'Couper le son', unmute: 'Activer le son',
      narration: "Narration en anglais (traduction) : La vie se passe dans les conversations. Une décision. Une promesse. Chaque moment trouve sa place. Tout comme les personnes qui comptent. MEMRYA se souvient de ce qui compte. De la journée de travail à une journée au bord de la mer. Tout n'a pas besoin d'être retenu. L'essentiel, si.",
    },
    de: {
      eyebrow: 'MEMRYA kennenlernen', title: 'Sieh, was MEMRYA sich merkt',
      lede: 'Ein Arbeitsmeeting, die Menschen in deinem Leben und ein Familienausflug, von der Aufnahme bis zu den Erinnerungen, die bleiben sollen',
      watch: 'MEMRYA in Aktion sehen', play: 'Film abspielen', replay: 'Noch einmal ansehen', meta: '0:32 · Englische Sprecherstimme', pause: 'Pause', resume: 'Abspielen',
      videoLabel: 'MEMRYA Produktfilm, 32 Sekunden, mit englischer Sprecherstimme und Musik',
      disclaimer: 'Illustratives Beispiel. Alle Personen, Gespräche und Details sind fiktiv, die Porträts sind eigene Illustrationen.',
      cast: 'Fiktive Personen: Lena, Maya, Noah, Leah, Marcus und Sam.',
      summary: 'Film als Text lesen',
      s1: 'Das Leben passiert in Gesprächen.',
      s2: 'Aufnehmen: Ein Arbeitsmeeting wird auf dem iPhone aufgenommen. MEMRYA speichert während der Aufnahme und erstellt danach das Transkript, samt dem Satz, in dem du versprichst, Leah das aktualisierte Budget bis Donnerstag zu schicken.',
      s3: 'Erinnerung: Gespräche landen in Lebensbereichen: Familie, Arbeit, Persönlich, Gesundheit, Freunde und Studium.',
      s4: 'Menschen: Die Nächsten stehen oben. Lena (Ehepartnerin), Maya und Noah (Kinder), dann Leah und Marcus (Kollegen) und Sam (ein Freund).',
      s5: 'Kernerinnerungen: Drei wichtige Dinge stehen ganz oben, jeweils mit Quelle. Maya braucht die allergiefreien Snacks für Samstag. Das aktualisierte Budget bis Donnerstag an Leah schicken. Die Kinder wollen wieder zum Leuchtturm.',
      s6: 'Ausflug: Die Quelle zeigt den Moment im Auto auf dem Heimweg, als Noah und Maya fragen, ob sie wieder zum Leuchtturm fahren. Die Erinnerung landet in Familie.',
      s7: 'Nicht alles muss man sich merken. Das Wichtige schon.',
      mute: 'Ton aus', unmute: 'Ton an',
      narration: 'Englische Sprecherstimme (übersetzt): Das Leben passiert in Gesprächen. Eine Entscheidung. Ein Versprechen. Momente finden ihren Platz. Genau wie die Menschen, die zählen. MEMRYA merkt sich, was zählt. Vom Arbeitstag zu einem Tag am Meer. Nicht alles muss man sich merken. Das Wichtige schon.',
    },
    pt: {
      eyebrow: 'Conheça o MEMRYA', title: 'Veja o que o MEMRYA lembra',
      lede: 'Uma reunião de trabalho, as pessoas da sua vida e um passeio em família, desde a gravação até as memórias que valem a pena guardar',
      watch: 'Veja o MEMRYA em ação', play: 'Reproduzir o filme', replay: 'Ver de novo', meta: '0:32 · Narração em inglês', pause: 'Pausar', resume: 'Reproduzir',
      videoLabel: 'Filme do produto MEMRYA, 32 segundos, com narração em inglês e música',
      disclaimer: 'Exemplo ilustrativo. Todas as pessoas, conversas e detalhes são fictícios, e os retratos são ilustrações originais.',
      cast: 'Elenco fictício: Lena, Maya, Noah, Leah, Marcus e Sam.',
      summary: 'Ler o filme como texto',
      s1: 'A vida acontece nas conversas.',
      s2: 'Capturar: uma reunião de trabalho é gravada no iPhone. O MEMRYA salva enquanto você grava e depois escreve a transcrição, incluindo a frase em que você promete enviar o orçamento atualizado para a Leah até quinta.',
      s3: 'Memória: as conversas se organizam em categorias da vida: Família, Trabalho, Pessoal, Saúde, Amigos e Estudos.',
      s4: 'Pessoas: as mais próximas vêm primeiro. Lena (cônjuge), Maya e Noah (filhos), depois Leah e Marcus (colegas) e Sam (um amigo).',
      s5: 'Memórias essenciais: três coisas importantes sobem ao topo, cada uma com a sua fonte. Maya precisa dos lanches sem alérgenos para sábado. Enviar o orçamento atualizado para a Leah até quinta. As crianças querem voltar ao farol.',
      s6: 'Passeio: abrir a fonte mostra o momento no carro, na volta para casa, quando Noah e Maya pedem para voltar ao farol. A memória fica guardada em Família.',
      s7: 'Nem tudo precisa ser lembrado. O importante, sim.',
      mute: 'Silenciar', unmute: 'Ativar som',
      narration: 'Narração em inglês (tradução): A vida acontece nas conversas. Uma decisão. Uma promessa. Os momentos encontram o seu lugar. E também as pessoas que importam. O MEMRYA lembra o que importa. Do dia de trabalho a um dia à beira-mar. Nem tudo precisa ser lembrado. O importante, sim.',
    },
    it: {
      eyebrow: 'Scopri MEMRYA', title: 'Guarda cosa ricorda MEMRYA',
      lede: 'Una riunione di lavoro, le persone della tua vita e una gita in famiglia, dalla registrazione fino ai ricordi che vale la pena conservare',
      watch: 'Guarda MEMRYA in azione', play: 'Riproduci il filmato', replay: 'Guarda di nuovo', meta: '0:32 · Narrazione in inglese', pause: 'Pausa', resume: 'Riproduci',
      videoLabel: 'Filmato del prodotto MEMRYA, 32 secondi, con narrazione in inglese e musica',
      disclaimer: 'Esempio illustrativo. Tutte le persone, le conversazioni e i dettagli sono di fantasia e i ritratti sono illustrazioni originali.',
      cast: 'Personaggi di fantasia: Lena, Maya, Noah, Leah, Marcus e Sam.',
      summary: 'Leggi il filmato come testo',
      s1: 'La vita accade nelle conversazioni.',
      s2: 'Registrare: una riunione di lavoro viene registrata su iPhone. MEMRYA salva mentre registri e poi scrive la trascrizione, compresa la frase in cui prometti di inviare a Leah il budget aggiornato entro giovedì.',
      s3: 'Memoria: le conversazioni si dividono in categorie di vita: Famiglia, Lavoro, Personale, Salute, Amici e Studio.',
      s4: 'Persone: prima le più vicine. Lena (coniuge), Maya e Noah (figli), poi Leah e Marcus (colleghi) e Sam (un amico).',
      s5: 'Ricordi chiave: tre cose importanti salgono in cima, ognuna con la sua fonte. Maya ha bisogno degli snack senza allergeni per sabato. Inviare a Leah il budget aggiornato entro giovedì. I bambini vogliono tornare al faro.',
      s6: 'Gita: aprendo la fonte appare il momento in auto sulla via di casa, quando Noah e Maya chiedono di tornare al faro. Il ricordo resta in Famiglia.',
      s7: 'Non tutto va ricordato. Le cose importanti sì.',
      mute: 'Disattiva audio', unmute: 'Attiva audio',
      narration: 'Narrazione in inglese (traduzione): La vita accade nelle conversazioni. Una decisione. Una promessa. I momenti trovano il loro posto. E così le persone che contano. MEMRYA ricorda ciò che conta. Dalla giornata di lavoro a una giornata al mare. Non tutto va ricordato. Le cose importanti sì.',
    },
    ar: {
      eyebrow: 'تعرّف على MEMRYA', title: 'شاهد ما يتذكره MEMRYA',
      lede: 'اجتماع عمل، والأشخاص في حياتك، ورحلة عائلية ليوم واحد، من لحظة التسجيل حتى الذكريات التي تستحق الاحتفاظ بها',
      watch: 'شاهد MEMRYA وهو يعمل', play: 'تشغيل الفيلم', replay: 'شاهده مرة أخرى', meta: '0:32 · تعليق صوتي بالإنجليزية', pause: 'إيقاف مؤقت', resume: 'تشغيل',
      videoLabel: 'فيلم منتج MEMRYA، مدته 32 ثانية، مع تعليق صوتي بالإنجليزية وموسيقى',
      disclaimer: 'مثال توضيحي. جميع الأشخاص والمحادثات والتفاصيل خيالية، والصور الشخصية رسوم أصلية.',
      cast: 'شخصيات خيالية: لينا ومايا ونوح وليا وماركوس وسام.',
      summary: 'اقرأ الفيلم كنص',
      s1: 'الحياة تحدث في المحادثات.',
      s2: 'التسجيل: يُسجَّل اجتماع عمل على iPhone. يحفظ MEMRYA أثناء التسجيل ثم يكتب النص المفرغ، بما في ذلك الجملة التي تعد فيها بإرسال الميزانية المحدَّثة إلى ليا بحلول الخميس.',
      s3: 'الذاكرة: تُرتَّب المحادثات في فئات الحياة: العائلة والعمل والشخصي والصحة والأصدقاء والدراسة.',
      s4: 'الأشخاص: الأقرب إليك أولًا. لينا (الزوجة)، ومايا ونوح (الأبناء)، ثم ليا وماركوس (زميلان) وسام (صديق).',
      s5: 'الذكريات الأساسية: ثلاثة أمور مهمة تتصدر، ولكل منها مصدره. مايا تحتاج الوجبات الخفيفة الخالية من مسببات الحساسية ليوم السبت. أرسل الميزانية المحدَّثة إلى ليا بحلول الخميس. الأطفال يريدون زيارة المنارة مرة أخرى.',
      s6: 'الرحلة: فتح المصدر يعرض اللحظة في السيارة في طريق العودة، حين يطلب نوح ومايا زيارة المنارة مجددًا. تُحفظ الذكرى في فئة العائلة.',
      s7: 'ليس كل شيء يستحق التذكّر. لكن الأمور المهمة تستحق.',
      mute: 'كتم الصوت', unmute: 'تشغيل الصوت',
      narration: 'التعليق الصوتي بالإنجليزية (مترجم): الحياة تحدث في المحادثات. قرار. ووعد. كل لحظة تجد مكانها. وكذلك الأشخاص المهمون. MEMRYA يتذكر ما يهم. من يوم العمل إلى يوم على البحر. ليس كل شيء يستحق التذكّر. لكن الأمور المهمة تستحق.',
    },
  };
  const text = (key) => {
    const table = COPY[document.documentElement.lang] || COPY.en;
    return table[key] ?? COPY.en[key];
  };
  function syncToggle() {
    if (!toggle) return;
    toggle.hidden = !player.classList.contains('is-started');
    if (controls) controls.hidden = toggle.hidden;
    toggle.classList.toggle('is-paused', video.paused);
    if (toggleLabel) toggleLabel.textContent = text(video.paused ? 'resume' : 'pause');
    if (!sound) return;
    sound.hidden = toggle.hidden;
    sound.classList.toggle('is-muted', video.muted);
    if (soundLabel) soundLabel.textContent = text(video.muted ? 'unmute' : 'mute');
  }
  function localize() {
    document.querySelectorAll('[data-film-i18n]').forEach((node) => {
      const value = text(node.dataset.filmI18n);
      if (value) node.textContent = value;
    });
    video.setAttribute('aria-label', text('videoLabel'));
    play.setAttribute('aria-label', text(player.classList.contains('is-ended') ? 'replay' : 'play') + (document.documentElement.lang === 'ar' ? '، ' : ', ') + text('meta'));
    syncToggle();
  }

  let started = false;
  let primed = false;
  /* Phones get the dedicated 4:5 cut, chosen before anything loads. */
  function chooseCut() {
    if (started || primed) return;
    const portrait = phone.matches;
    player.classList.toggle('is-portrait', portrait);
    video.poster = portrait ? video.dataset.posterPortrait : video.dataset.posterLandscape;
    video.setAttribute('width', portrait ? '1080' : '1920');
    video.setAttribute('height', portrait ? '1350' : '1080');
  }
  function prepareSources() {
    if (primed) return;
    primed = true;
    if (player.classList.contains('is-portrait')) {
      video.querySelectorAll('source[data-portrait]').forEach((source) => { source.src = source.dataset.portrait; });
    }
    /* Reselect the source while preload is still none (fetches nothing), then allow metadata,
       so a phone never starts on the 16:9 file that was selected while the page parsed. */
    video.load();
    video.preload = 'metadata';
  }
  /* Sound follows the visitor: on by default once they click play, off once they mute. */
  let wantSound = true;
  function start() {
    prepareSources();
    started = true;
    player.classList.add('is-started');
    player.classList.remove('is-ended');
    video.controls = true;
    if (video.ended) video.currentTime = 0;
    video.muted = !wantSound;
    const attempt = video.play();
    if (attempt && attempt.catch) attempt.catch((error) => {
      /* A browser that refuses audible playback even after a click still gets the film, muted, with the toggle offered. */
      if (error && error.name === 'NotAllowedError' && !video.muted) {
        video.muted = true;
        video.play().catch(() => { player.classList.remove('is-started'); syncToggle(); });
      } else { player.classList.remove('is-started'); }
      syncToggle();
    });
    localize();
  }

  video.muted = false;
  video.controls = false;
  video.dataset.posterLandscape = video.getAttribute('poster');
  chooseCut();
  phone.addEventListener?.('change', chooseCut);
  play.addEventListener('click', start);
  video.addEventListener('click', () => { if (!player.classList.contains('is-started')) start(); });
  toggle?.addEventListener('click', () => { if (video.paused) start(); else video.pause(); });
  sound?.addEventListener('click', () => {
    wantSound = video.muted;
    video.muted = !wantSound;
    if (wantSound && video.volume === 0) video.volume = 1;
    syncToggle();
  });
  /* Native controls can mute too; keep our toggle and the remembered choice in step. */
  video.addEventListener('volumechange', () => {
    if (player.classList.contains('is-started')) wantSound = !video.muted && video.volume > 0;
    syncToggle();
  });
  video.addEventListener('ended', () => {
    player.classList.add('is-ended');
    const label = play.querySelector('[data-film-i18n="play"], [data-film-i18n="replay"]');
    if (label) label.dataset.filmI18n = 'replay';
    localize();
  });
  video.addEventListener('play', () => {
    const label = play.querySelector('[data-film-i18n="replay"]');
    if (label) label.dataset.filmI18n = 'play';
    syncToggle();
  });
  video.addEventListener('pause', syncToggle);

  if ('IntersectionObserver' in window) {
    /* Load only the metadata of the right cut once the film is about to be seen. */
    const near = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { near.disconnect(); prepareSources(); }
    }, { rootMargin: '400px 0px' });
    near.observe(player);
    /* Pause when the film scrolls out of view; never resume on its own. */
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (!entry.isIntersecting && !video.paused) video.pause(); });
    }, { threshold: 0.15 }).observe(player);
  }

  /* Hero link: scroll to the film and start it, since this click is an explicit request. */
  document.querySelectorAll('[data-film-watch]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      section.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
      start();
      play.blur();
      video.focus({ preventScroll: true });
    });
  });

  document.addEventListener('memrya:locale-changed', localize);
  localize();
})();
