(() => {
'use strict';
if (!document.body.classList.contains('home-page')) return;
const root = document.getElementById('main');
if (!root) return;
const en = ["Bring conversations in","MEET","Planning call","CALL","Venue confirmation","NOTE"];
const dict = {};
dict.ar = ["أضف محادثاتك","اجتماع","مكالمة التخطيط","اتصال","تأكيد المكان","ملاحظة"];
dict.es = ["Incorpora conversaciones","REUNIÓN","Llamada de planificación","LLAMADA","Confirmación del lugar","NOTA"];
dict.fr = ["Importez vos conversations","RÉUNION","Appel de préparation","APPEL","Confirmation du lieu","NOTE"];
dict.de = ["Gespräche importieren","MEETING","Planungsgespräch","ANRUF","Bestätigung des Veranstaltungsorts","NOTIZ"];
dict.pt = ["Importe as suas conversas","REUNIÃO","Chamada de planeamento","CHAMADA","Confirmação do local","NOTA"];
dict.it = ["Importa le conversazioni","RIUNIONE","Chiamata organizzativa","CHIAMATA","Conferma della sede","NOTA"];
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
