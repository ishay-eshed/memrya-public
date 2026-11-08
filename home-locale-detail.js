(() => {
'use strict';
if (!document.body.classList.contains('home-page')) return;
const root = document.getElementById('main');
if (!root) return;
const en = [
  "EXPLORE MEMRYA",
  "A deeper look at what your memory can do.",
  "See the product, explore everyday situations, understand the import roadmap and review how your data is handled.",
  "01 / PRODUCT",
  "Connected Memory",
  "See how separate conversations become context you can use.",
  "Explore product →",
  "02 / USE CASES",
  "Beyond meetings",
  "Work, appointments, relationships and learning.",
  "Explore situations →",
  "03 / INTEGRATIONS",
  "Bring conversations in",
  "What works today, and what's planned next.",
  "See availability →",
  "04 / SECURITY",
  "Trust, with specifics",
  "Privacy architecture, limitations and practical controls.",
  "Explore trust →",
  "Decision captured · owner assigned",
  "3 follow-up points · source linked",
  "Person linked · memory kept",
  "Ask across your memory",
  "MEMRYA / Connected Ask",
  "MEET",
  "Planning call",
  "The venue is reserved for Saturday afternoon.",
  "CALL",
  "Venue confirmation",
  "Confirm the guest count by Friday so seating can be arranged.",
  "NOTE",
  "Send the invitations and check the supplies before Saturday.",
  "View plans and prices",
  "Pro / month · 900 processing minutes"
];
const dict = {};
dict.ar = ["استكشف MEMRYA","اكتشف كيف تساعدك ذاكرتك على رؤية الصورة كاملة.","تعرّف على المنتج واستخداماته اليومية، وخطط الاستيراد وكيفية التعامل مع بياناتك.","01 / المنتج","ذاكرة مترابطة","اكتشف كيف تتحول المحادثات المنفصلة إلى سياق مفيد.","استكشف المنتج ←","02 / حالات الاستخدام","أبعد من الاجتماعات","العمل والمواعيد والعلاقات والتعلّم.","استكشف الاستخدامات ←","03 / التكاملات","أضف محادثاتك","ما المتاح اليوم وما نخطط له لاحقًا.","اطّلع على التوافر ←","04 / الأمان","ثقة مبنية على تفاصيل واضحة","بنية الخصوصية والحدود والضوابط العملية.","تعرّف على الحماية ←","تم حفظ القرار وتحديد المسؤول","3 نقاط للمتابعة مرتبطة بالمصدر","شخص مرتبط وذكرى محفوظة","اسأل ذاكرتك","MEMRYA / أسئلة مترابطة","اجتماع","مكالمة التخطيط","تم حجز المكان ليوم السبت بعد الظهر.","اتصال","تأكيد المكان","تأكّد من عدد الحاضرين بحلول الجمعة لترتيب المقاعد.","ملاحظة","أرسل الدعوات وتحقّق من المستلزمات قبل السبت.","عرض الخطط والأسعار","Pro / شهر · 900 دقيقة معالجة"];
dict.es = ["EXPLORA MEMRYA","Descubre todo lo que tu memoria puede hacer.","Conoce el producto, explora situaciones cotidianas, consulta los planes de importación y descubre cómo se tratan tus datos.","01 / PRODUCTO","Memoria conectada","Descubre cómo las conversaciones separadas se convierten en contexto útil.","Explorar producto →","02 / CASOS DE USO","Más allá de las reuniones","Trabajo, citas, relaciones y aprendizaje.","Explorar situaciones →","03 / INTEGRACIONES","Incorpora conversaciones","Qué funciona hoy y qué está previsto para después.","Ver disponibilidad →","04 / SEGURIDAD","Confianza con información concreta","Arquitectura de privacidad, límites y controles prácticos.","Explorar seguridad →","Decisión guardada · responsable asignado","3 puntos de seguimiento · fuente vinculada","Persona vinculada · recuerdo guardado","Pregunta a tu memoria","MEMRYA / Preguntas conectadas","REUNIÓN","Llamada de planificación","El lugar está reservado para el sábado por la tarde.","LLAMADA","Confirmación del lugar","Confirma el número de asistentes antes del viernes para organizar los asientos.","NOTA","Envía las invitaciones y revisa los materiales antes del sábado.","Ver planes y precios","Pro / mes · 900 minutos de procesamiento"];
dict.fr = ["DÉCOUVRIR MEMRYA","Découvrez ce que votre mémoire peut vous apporter.","Explorez le produit, ses usages quotidiens, les intégrations prévues et la manière dont vos données sont traitées.","01 / PRODUIT","Mémoire connectée","Découvrez comment des conversations séparées deviennent un contexte utile.","Découvrir le produit →","02 / CAS D’USAGE","Au-delà des réunions","Travail, rendez-vous, relations et apprentissage.","Explorer les usages →","03 / INTÉGRATIONS","Importez vos conversations","Ce qui fonctionne aujourd’hui et ce qui est prévu ensuite.","Voir les disponibilités →","04 / SÉCURITÉ","La confiance repose sur des faits","Architecture de confidentialité, limites et contrôles concrets.","Découvrir la sécurité →","Décision enregistrée · responsable désigné","3 points de suivi · source associée","Personne associée · souvenir conservé","Interrogez votre mémoire","MEMRYA / Questions connectées","RÉUNION","Appel de préparation","Le lieu est réservé pour samedi après-midi.","APPEL","Confirmation du lieu","Confirmez le nombre d’invités avant vendredi pour organiser les places.","NOTE","Envoyez les invitations et vérifiez le matériel avant samedi.","Voir les offres et les tarifs","Pro / mois · 900 minutes de traitement"];
dict.de = ["MEMRYA ENTDECKEN","Entdecken Sie, was Ihr Gedächtnis leisten kann.","Lernen Sie das Produkt und seine Einsatzmöglichkeiten kennen, informieren Sie sich über geplante Importe und den Umgang mit Ihren Daten.","01 / PRODUKT","Vernetzte Erinnerungen","Erfahren Sie, wie einzelne Gespräche zu nutzbarem Kontext werden.","Produkt entdecken →","02 / ANWENDUNGSFÄLLE","Mehr als Meetings","Arbeit, Termine, Beziehungen und Lernen.","Anwendungen ansehen →","03 / INTEGRATIONEN","Gespräche importieren","Was heute funktioniert und was als Nächstes geplant ist.","Verfügbarkeit ansehen →","04 / SICHERHEIT","Vertrauen durch klare Angaben","Datenschutzarchitektur, Grenzen und praktische Kontrollen.","Sicherheit ansehen →","Entscheidung festgehalten · Zuständigkeit geklärt","3 offene Punkte · Quelle verknüpft","Person zugeordnet · Erinnerung gesichert","Fragen Sie Ihre Erinnerungen","MEMRYA / Vernetzte Fragen","MEETING","Planungsgespräch","Der Veranstaltungsort ist für Samstagnachmittag reserviert.","ANRUF","Bestätigung des Veranstaltungsorts","Die Gästezahl bis Freitag bestätigen, damit die Sitzplätze geplant werden können.","NOTIZ","Einladungen versenden und die Ausstattung vor Samstag prüfen.","Tarife und Preise ansehen","Pro / Monat · 900 Verarbeitungsminuten"];
dict.pt = ["EXPLORAR A MEMRYA","Descubra o que a sua memória pode fazer.","Conheça o produto, explore situações do dia a dia, consulte os planos de importação e saiba como os seus dados são tratados.","01 / PRODUTO","Memória ligada","Veja como conversas separadas se transformam em contexto útil.","Explorar o produto →","02 / CASOS DE USO","Para além das reuniões","Trabalho, consultas, relações e aprendizagem.","Explorar situações →","03 / INTEGRAÇÕES","Importe as suas conversas","O que já funciona e o que está previsto para depois.","Ver disponibilidade →","04 / SEGURANÇA","Confiança com informação concreta","Arquitetura de privacidade, limitações e controlos práticos.","Explorar segurança →","Decisão registada · responsável atribuído","3 pontos de acompanhamento · fonte associada","Pessoa associada · memória guardada","Pergunte à sua memória","MEMRYA / Perguntas ligadas","REUNIÃO","Chamada de planeamento","O espaço está reservado para sábado à tarde.","CHAMADA","Confirmação do local","Confirme o número de convidados até sexta-feira para organizar os lugares.","NOTA","Envie os convites e verifique os materiais antes de sábado.","Ver planos e preços","Pro / mês · 900 minutos de processamento"];
dict.it = ["SCOPRI MEMRYA","Scopri che cosa può fare la tua memoria.","Conosci il prodotto, esplora le situazioni quotidiane, consulta i piani di importazione e scopri come vengono trattati i tuoi dati.","01 / PRODOTTO","Memoria connessa","Scopri come conversazioni separate diventano un contesto utile.","Esplora il prodotto →","02 / CASI D’USO","Oltre le riunioni","Lavoro, appuntamenti, relazioni e apprendimento.","Esplora le situazioni →","03 / INTEGRAZIONI","Importa le conversazioni","Che cosa funziona oggi e che cosa è previsto in futuro.","Verifica la disponibilità →","04 / SICUREZZA","Fiducia basata su fatti concreti","Architettura della privacy, limiti e controlli pratici.","Scopri la sicurezza →","Decisione salvata · responsabile assegnato","3 punti da seguire · fonte collegata","Persona collegata · ricordo conservato","Interroga la tua memoria","MEMRYA / Domande connesse","RIUNIONE","Chiamata organizzativa","La sede è prenotata per sabato pomeriggio.","CHIAMATA","Conferma della sede","Conferma il numero di invitati entro venerdì per organizzare i posti.","NOTA","Invia gli inviti e verifica i materiali prima di sabato.","Vedi piani e prezzi","Pro / mese · 900 minuti di elaborazione"];
const altEn = ["Two professionals talking across a table","Doctor speaking with a patient during an appointment","Two people having a personal conversation at a cafe","Multiple conversations becoming one connected memory in MEMRYA","Product capabilities","Two people talking across a table","Illustration of a conversation becoming a connected memory"];
const alt = {
ar:["شخصان يتحدثان على طاولة عمل","طبيب يتحدث مع مريض خلال موعد طبي","شخصان يتحدثان في مقهى","محادثات متعددة تصبح ذاكرة مترابطة في MEMRYA","إمكانات المنتج","شخصان يتحاوران حول طاولة","رسم توضيحي يبيّن كيف تتحول المحادثة إلى ذاكرة مترابطة"],
es:["Dos profesionales conversan frente a una mesa","Un médico habla con un paciente durante una consulta","Dos personas conversan en una cafetería","Varias conversaciones se convierten en una memoria conectada en MEMRYA","Funciones del producto","Dos personas conversan alrededor de una mesa","Ilustración de una conversación que se convierte en memoria conectada"],
fr:["Deux professionnels discutent autour d’une table","Un médecin échange avec un patient en consultation","Deux personnes discutent dans un café","Plusieurs conversations forment une mémoire connectée dans MEMRYA","Fonctionnalités du produit","Deux personnes discutent autour d’une table","Illustration d’une conversation qui devient une mémoire connectée"],
de:["Zwei Fachleute sprechen an einem Tisch","Ein Arzt spricht bei einem Termin mit einem Patienten","Zwei Personen unterhalten sich in einem Café","Mehrere Gespräche werden in MEMRYA zu einer vernetzten Erinnerung","Produktfunktionen","Zwei Personen unterhalten sich an einem Tisch","Illustration eines Gesprächs, das zu einer vernetzten Erinnerung wird"],
pt:["Dois profissionais conversam à mesa","Um médico fala com um paciente durante uma consulta","Duas pessoas conversam num café","Várias conversas formam uma memória ligada na MEMRYA","Funcionalidades do produto","Duas pessoas conversam à mesa","Ilustração de uma conversa que se transforma numa memória ligada"],
it:["Due professionisti parlano a un tavolo","Un medico parla con un paziente durante una visita","Due persone conversano in un bar","Più conversazioni diventano una memoria connessa in MEMRYA","Funzionalità del prodotto","Due persone conversano a un tavolo","Illustrazione di una conversazione che diventa una memoria connessa"]
};
const originals = new Map();
const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
let node;
while ((node = walker.nextNode())) {
  if (!node.nodeValue.trim() || node.parentElement?.closest('[data-i18n],script,style,svg')) continue;
  originals.set(node, node.nodeValue);
}
const attributes = [];
root.querySelectorAll('[alt],[aria-label]').forEach(el => {
  for (const name of ['alt','aria-label']) {
    const original = el.getAttribute(name);
    if (original && altEn.includes(original)) attributes.push({el,name,original});
  }
});
function apply() {
  const locale = document.documentElement.lang || 'en';
  const table = new Map(en.map((source, index) => [source, (dict[locale] || [])[index] || source]));
  const altTable = new Map(altEn.map((source, index) => [source, (alt[locale] || [])[index] || source]));
  for (const [textNode, original] of originals) {
    const translated = table.get(original.trim());
    if (!translated) continue;
    textNode.nodeValue = (original.match(/^\s*/) || [''])[0] + translated + (original.match(/\s*$/) || [''])[0];
  }
  for (const {el,name,original} of attributes) el.setAttribute(name, altTable.get(original) || original);
}
document.addEventListener('memrya:locale-changed', apply);
apply();
window.MEMRYA_HOME_DETAIL_AUDIT = () => ({
  locale: document.documentElement.lang,
  translated: [...originals.values()].filter(v => en.includes(v.trim())).length,
  missing: en.filter(v => ![...originals.values()].some(o => o.trim() === v)),
  attributes: attributes.length
});
})();
