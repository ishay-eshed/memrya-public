(() => {
'use strict';
if (!location.pathname.endsWith('/about.html')) return;
const root=document.querySelector('main');
if (!root) return;
const en=[
'ABOUT','Focus','Connected conversation memory','Platform','iPhone-first','Contact',
'What MEMRYA is',
'MEMRYA is an iPhone-first AI connected-memory app. Record or import a conversation and it becomes source material for an evolving memory of people, decisions, commitments, tasks, open loops and evidence you can return to later.',
'Conversations stay available as evidence, but the long-term product is the connected memory that grows across them.',
'What makes MEMRYA different',
'Most conversation tools stop at a transcript or summary. MEMRYA is designed to connect separate conversations into ongoing memory threads, let you ask across them, and preserve provenance back to the original moments.',
'Privacy and control',
"MEMRYA is designed with private storage tied to your account, service credentials kept on our servers and each account's data kept separate. See the Security and Privacy pages for details.",
'Get in touch','Questions about MEMRYA or this site can go to'
];
const dict={
ar:[
'حول MEMRYA','التركيز','ذاكرة مترابطة للمحادثات','المنصة','مصمم أولاً للآيفون','التواصل',
'ما هي MEMRYA',
'MEMRYA تطبيق للآيفون يستخدم الذكاء الاصطناعي لربط ذكريات المحادثات. سجّل محادثة أو استوردها لتصبح مصدراً لذاكرة تتطور مع الوقت، وتشمل الأشخاص والقرارات والالتزامات والمهام والأمور المعلقة والأدلة التي يمكنك الرجوع إليها.',
'تبقى المحادثات الأصلية متاحة كأدلة، لكن القيمة طويلة الأمد تكمن في الذاكرة المترابطة التي تنمو عبر المحادثات.',
'ما الذي يميز MEMRYA',
'تتوقف أدوات محادثات كثيرة عند التفريغ النصي أو الملخص. صُممت MEMRYA لربط المحادثات المنفصلة في موضوعات مستمرة، ولتتيح لك طرح الأسئلة عبرها مع الحفاظ على إمكانية الرجوع إلى المصدر الأصلي.',
'الخصوصية والتحكم',
'صُممت MEMRYA بتخزين خاص بكل صاحب حساب، ومفاتيح خدمات محفوظة على الخادم، وعزل للبيانات بين الحسابات. راجع صفحتي الأمان والخصوصية للتفاصيل.',
'تواصل معنا','يمكن إرسال الأسئلة عن MEMRYA أو هذا الموقع إلى'
],
es:[
'ACERCA DE MEMRYA','Enfoque','Memoria conectada de conversaciones','Plataforma','Diseñado primero para iPhone','Contacto',
'Qué es MEMRYA',
'MEMRYA es una aplicación de memoria conectada con IA diseñada primero para iPhone. Graba o importa una conversación para incorporarla a una memoria en evolución de personas, decisiones, compromisos, tareas, asuntos pendientes y fuentes que puedes consultar después.',
'Las conversaciones originales siguen disponibles como prueba, pero el valor a largo plazo está en la memoria conectada que crece entre ellas.',
'Qué distingue a MEMRYA',
'Muchas herramientas de conversaciones se quedan en la transcripción o el resumen. MEMRYA está diseñada para relacionar conversaciones en temas continuos, permitir preguntas sobre varias de ellas y conservar el vínculo con las fuentes originales.',
'Privacidad y control',
'MEMRYA está diseñada con almacenamiento privado por cuenta, credenciales protegidas en el servidor y aislamiento de datos entre cuentas. Consulta las páginas de Seguridad y Privacidad para más detalles.',
'Ponte en contacto','Puedes enviar tus preguntas sobre MEMRYA o este sitio a'
],
fr:[
'À PROPOS DE MEMRYA','Objectif','Mémoire connectée des conversations','Plateforme','Conçu d’abord pour iPhone','Contact',
'Qu’est-ce que MEMRYA ?',
'MEMRYA est une application de mémoire connectée utilisant l’IA, conçue d’abord pour iPhone. Enregistrez ou importez une conversation pour alimenter une mémoire évolutive des personnes, décisions, engagements, tâches, sujets en suspens et sources à retrouver plus tard.',
'Les conversations d’origine restent accessibles comme preuves, mais l’intérêt à long terme réside dans la mémoire qui se construit entre elles.',
'Ce qui distingue MEMRYA',
'De nombreux outils s’arrêtent à la transcription ou au résumé. MEMRYA est conçue pour relier les conversations en sujets suivis, permettre des questions sur plusieurs échanges et conserver le lien vers les sources originales.',
'Confidentialité et contrôle',
'MEMRYA est conçue avec un stockage privé par compte, des identifiants conservés côté serveur et une isolation des données entre comptes. Consultez les pages Sécurité et Confidentialité pour en savoir plus.',
'Nous contacter','Pour toute question sur MEMRYA ou ce site, écrivez à'
],
de:[
'ÜBER MEMRYA','Schwerpunkt','Vernetzte Gesprächserinnerungen','Plattform','Zuerst für iPhone entwickelt','Kontakt',
'Was ist MEMRYA?',
'MEMRYA ist eine KI-gestützte App für vernetzte Gesprächserinnerungen, die zuerst für das iPhone entwickelt wird. Zeichnen Sie ein Gespräch auf oder importieren Sie es, damit Personen, Entscheidungen, Zusagen, Aufgaben, offene Punkte und Belege später im Zusammenhang wiedergefunden werden können.',
'Die ursprünglichen Gespräche bleiben als Belege verfügbar. Langfristig entsteht der Nutzen durch die vernetzte Erinnerung, die mit jedem Gespräch wächst.',
'Was MEMRYA unterscheidet',
'Viele Gesprächswerkzeuge liefern nur Transkripte oder Zusammenfassungen. MEMRYA soll einzelne Gespräche zu fortlaufenden Themen verknüpfen, Fragen über mehrere Gespräche beantworten und auf die ursprünglichen Quellen verweisen.',
'Datenschutz und Kontrolle',
'MEMRYA ist mit privatem, kontogebundenem Speicher, serverseitig geschützten Zugangsdaten und Datentrennung zwischen Konten konzipiert. Einzelheiten finden Sie auf den Seiten Sicherheit und Datenschutz.',
'Kontakt aufnehmen','Fragen zu MEMRYA oder dieser Website senden Sie an'
],
pt:[
'SOBRE A MEMRYA','Foco','Memória ligada entre conversas','Plataforma','Concebida primeiro para iPhone','Contacto',
'O que é a MEMRYA',
'A MEMRYA é uma aplicação de memória ligada com IA, concebida primeiro para iPhone. Grave ou importe uma conversa para alimentar uma memória em evolução de pessoas, decisões, compromissos, tarefas, assuntos pendentes e fontes que pode consultar mais tarde.',
'As conversas originais continuam disponíveis como prova, mas o valor a longo prazo está na memória ligada que cresce entre elas.',
'O que distingue a MEMRYA',
'Muitas ferramentas ficam pela transcrição ou pelo resumo. A MEMRYA foi concebida para relacionar conversas em temas contínuos, permitir perguntas sobre várias delas e manter a ligação às fontes originais.',
'Privacidade e controlo',
'A MEMRYA foi concebida com armazenamento privado por conta, credenciais guardadas no servidor e isolamento de dados entre contas. Consulte as páginas Segurança e Privacidade para mais informações.',
'Entre em contacto','Pode enviar perguntas sobre a MEMRYA ou este site para'
],
it:[
'INFORMAZIONI SU MEMRYA','Obiettivo','Memoria connessa delle conversazioni','Piattaforma','Progettata prima per iPhone','Contatti',
'Che cos’è MEMRYA',
'MEMRYA è un’app di memoria connessa basata sull’IA, progettata prima per iPhone. Registra o importa una conversazione per alimentare una memoria in evoluzione di persone, decisioni, impegni, attività, questioni aperte e fonti da consultare in seguito.',
'Le conversazioni originali restano disponibili come prova, ma il valore nel tempo deriva dalla memoria connessa che cresce attraverso di esse.',
'Che cosa distingue MEMRYA',
'Molti strumenti si fermano alla trascrizione o al riepilogo. MEMRYA è progettata per collegare conversazioni in argomenti continuativi, permettere domande su più scambi e conservare il riferimento alle fonti originali.',
'Privacy e controllo',
'MEMRYA è progettata con archiviazione privata per account, credenziali custodite sul server e isolamento dei dati tra account. Consulta le pagine Sicurezza e Privacy per i dettagli.',
'Contattaci','Per domande su MEMRYA o su questo sito, scrivi a'
]
};
const nodes=[];
const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){
 const node=walker.currentNode;
 if(!node.nodeValue.trim()||node.parentElement?.closest('[data-i18n],script,style,svg'))continue;
 nodes.push({node,original:node.nodeValue});
}
const titles={en:'About MEMRYA',ar:'حول MEMRYA',es:'Acerca de MEMRYA',fr:'À propos de MEMRYA',de:'Über MEMRYA',pt:'Sobre a MEMRYA',it:'Informazioni su MEMRYA'};
const desc=document.querySelector('meta[name="description"]');
const originalDesc=desc?.content;
const descriptions={
ar:'تعرّف على MEMRYA، تطبيق الآيفون الذي يربط الأشخاص والقرارات والمهام والمصادر عبر المحادثات.',
es:'Conoce MEMRYA, una aplicación para iPhone que conecta personas, decisiones, tareas y fuentes entre conversaciones.',
fr:'Découvrez MEMRYA, une application iPhone qui relie personnes, décisions, tâches et sources entre conversations.',
de:'Erfahren Sie mehr über MEMRYA, die iPhone-App, die Personen, Entscheidungen, Aufgaben und Quellen aus Gesprächen verknüpft.',
pt:'Conheça a MEMRYA, uma aplicação para iPhone que liga pessoas, decisões, tarefas e fontes entre conversas.',
it:'Scopri MEMRYA, l’app per iPhone che collega persone, decisioni, attività e fonti tra conversazioni.'
};
function apply(){
 const locale=document.documentElement.lang||'en';
 const table=new Map(en.map((source,i)=>[source,(dict[locale]||[])[i]||source]));
 for(const {node,original} of nodes){
  const source=original.trim();
  if(!table.has(source))continue;
  node.nodeValue=original.replace(source,table.get(source));
 }
 document.title=titles[locale]||titles.en;
 if(desc)desc.content=descriptions[locale]||originalDesc;
}
document.addEventListener('memrya:locale-changed',apply);
apply();
window.MEMRYA_ABOUT_LOCALE_AUDIT=()=>({locale:document.documentElement.lang,covered:en.filter(x=>nodes.some(n=>n.original.trim()===x)).length,total:en.length,unmatched:en.filter(x=>!nodes.some(n=>n.original.trim()===x))});
})();