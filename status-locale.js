(() => {
  'use strict';
  if (!location.pathname.endsWith('/status.html')) return;
  const main = document.querySelector('main');
  const supportTitle = main?.querySelector('.utility-content h2');
  const incidentText = main?.querySelector('.utility-content .notice p')?.firstChild;
  const supportText = main?.querySelector('.utility-content > p')?.firstChild;
  if (!supportTitle || !incidentText || !supportText) return;
  const meta = document.querySelector('meta[name="description"]');
  const translations = {
    en: ['Support', 'For service questions or incident reports, contact ', 'For recording, processing, account, data or security issues, contact ', 'MEMRYA | Status', 'Service status and support information for MEMRYA.'],
    ar: ['الدعم', 'للاستفسارات عن الخدمة أو الإبلاغ عن مشكلة، تواصل عبر ', 'للمساعدة في التسجيل أو المعالجة أو الحساب أو البيانات أو الأمان، تواصل عبر ', 'MEMRYA | حالة الخدمة', 'معلومات حالة خدمة MEMRYA ووسائل التواصل مع الدعم.'],
    es: ['Asistencia', 'Para consultas sobre el servicio o informar de incidencias, escribe a ', 'Para problemas de grabación, procesamiento, cuenta, datos o seguridad, escribe a ', 'MEMRYA | Estado', 'Estado del servicio y opciones de asistencia de MEMRYA.'],
    fr: ['Assistance', 'Pour toute question sur le service ou signalement d’incident, écrivez à ', 'Pour des problèmes d’enregistrement, de traitement, de compte, de données ou de sécurité, écrivez à ', 'MEMRYA | État du service', 'État du service MEMRYA et coordonnées de l’assistance.'],
    de: ['Support', 'Bei Fragen zum Dienst oder zur Meldung einer Störung schreiben Sie an ', 'Bei Problemen mit Aufnahme, Verarbeitung, Konto, Daten oder Sicherheit schreiben Sie an ', 'MEMRYA | Dienststatus', 'Dienststatus und Supportinformationen für MEMRYA.'],
    pt: ['Apoio', 'Para dúvidas sobre o serviço ou para comunicar incidentes, contacte ', 'Para problemas com gravações, processamento, conta, dados ou segurança, contacte ', 'MEMRYA | Estado do serviço', 'Estado do serviço e informações de apoio da MEMRYA.'],
    it: ['Assistenza', 'Per domande sul servizio o segnalazioni di problemi, scrivi a ', 'Per problemi relativi a registrazioni, elaborazione, account, dati o sicurezza, scrivi a ', 'MEMRYA | Stato del servizio', 'Stato del servizio MEMRYA e informazioni sull’assistenza.']
  };
  function apply() {
    const locale = document.documentElement.lang || 'en';
    const t = translations[locale] || translations.en;
    supportTitle.textContent = t[0];
    incidentText.nodeValue = t[1];
    supportText.nodeValue = t[2];
    document.title = t[3];
    if (meta) meta.content = t[4];
  }
  document.addEventListener('memrya:locale-changed', apply);
  apply();
})();
