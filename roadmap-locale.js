/* MEMRYA local draft only. Roadmap descriptions are plans, not live integrations. */
(() => {
'use strict';
if (!location.pathname.endsWith('/roadmap.html')) return;
const root = document.querySelector('main');
if (!root) return;
const languages = ['ar','es','fr','de','pt','it'];
const rows = [
["This roadmap highlights product direction without promising dates.","توضح هذه الخطة اتجاه المنتج دون الالتزام بمواعيد محددة.","Esta hoja de ruta muestra la dirección del producto sin prometer fechas.","Cette feuille de route présente les orientations du produit sans promettre de dates.","Diese Roadmap zeigt die geplante Entwicklung ohne feste Terminzusagen.","Este roteiro apresenta a direção do produto sem prometer datas.","Questa roadmap illustra la direzione del prodotto senza promettere date."],
["Voice and identity","الصوت والهوية","Voz e identidad","Voix et identité","Stimme und Identität","Voz e identidade","Voce e identità"],
["Planned Voice Identity will use consent-based voice profiles, confidence checks and secure account-scoped storage to help recognize speakers across recordings.","من المخطط أن تستخدم هوية الصوت ملفات صوتية تُنشأ بموافقة صريحة، مع فحوص للثقة وتخزين آمن خاص بكل حساب للمساعدة في التعرف على المتحدثين عبر التسجيلات.","La función Voice Identity prevista utilizará perfiles de voz creados con consentimiento, comprobaciones de confianza y almacenamiento seguro por cuenta para ayudar a reconocer hablantes entre grabaciones.","La fonction Voice Identity prévue utilisera des profils vocaux créés avec consentement, des contrôles de fiabilité et un stockage sécurisé propre à chaque compte pour aider à reconnaître les locuteurs entre enregistrements.","Die geplante Voice-Identity-Funktion soll mit ausdrücklich genehmigten Stimmprofilen, Zuverlässigkeitsprüfungen und sicherer kontogebundener Speicherung Sprecher über mehrere Aufnahmen hinweg erkennen helfen.","O recurso Voice Identity planejado usará perfis de voz criados com consentimento, verificações de confiança e armazenamento seguro por conta para ajudar a reconhecer participantes entre gravações.","La funzione Voice Identity prevista userà profili vocali creati con consenso, controlli di affidabilità e archiviazione sicura per account per aiutare a riconoscere i parlanti tra registrazioni."],
["Conversation imports","استيراد المحادثات","Importación de conversaciones","Importation de conversations","Gespräche importieren","Importação de conversas","Importazione delle conversazioni"],
["Zoom cloud-recording import.","استيراد التسجيلات السحابية من Zoom.","Importación de grabaciones en la nube de Zoom.","Importation des enregistrements cloud de Zoom.","Import von Zoom-Cloudaufzeichnungen.","Importação de gravações na nuvem do Zoom.","Importazione delle registrazioni cloud di Zoom."],
["Google Meet import.","استيراد محادثات Google Meet.","Importación desde Google Meet.","Importation depuis Google Meet.","Import aus Google Meet.","Importação do Google Meet.","Importazione da Google Meet."],
["Microsoft Teams import.","استيراد محادثات Microsoft Teams.","Importación desde Microsoft Teams.","Importation depuis Microsoft Teams.","Import aus Microsoft Teams.","Importação do Microsoft Teams.","Importazione da Microsoft Teams."],
["Cross-conversation memory","ذاكرة تربط المحادثات","Memoria entre conversaciones","Mémoire entre conversations","Gesprächsübergreifendes Gedächtnis","Memória entre conversas","Memoria tra conversazioni"],
["MEMRYA is designed to make people, decisions, evidence and context more useful as conversation history grows.","صُممت MEMRYA لجعل الأشخاص والقرارات والأدلة والسياق أكثر فائدة مع تراكم المحادثات.","MEMRYA está diseñada para que las personas, decisiones, fuentes y el contexto resulten más útiles a medida que crece el historial de conversaciones.","MEMRYA est conçue pour rendre les personnes, décisions, sources et le contexte plus utiles à mesure que l'historique des conversations s'enrichit.","MEMRYA soll Personen, Entscheidungen, Belege und Zusammenhänge mit wachsendem Gesprächsverlauf besser nutzbar machen.","A MEMRYA foi concebida para tornar pessoas, decisões, provas e contexto mais úteis à medida que o histórico de conversas cresce.","MEMRYA è progettata per rendere persone, decisioni, fonti e contesto più utili man mano che cresce la cronologia delle conversazioni."],
["Product direction may evolve as MEMRYA learns from real-world use.","قد تتغير أولويات المنتج مع تعلّم MEMRYA من الاستخدام الفعلي.","La dirección del producto puede cambiar a medida que MEMRYA aprende del uso real.","Les orientations du produit peuvent évoluer à mesure que MEMRYA tire des enseignements des usages réels.","Die Produktplanung kann sich anhand der Erfahrungen aus der tatsächlichen Nutzung weiterentwickeln.","A direção do produto pode evoluir à medida que a MEMRYA aprende com a utilização real.","La direzione del prodotto può evolvere in base all'uso reale di MEMRYA."]
];
const lookup = new Map(rows.map(r => [r[0],r]));
const originals = [];
const walker = document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
 const node=walker.currentNode,source=node.nodeValue.trim();
 if (!source || node.parentElement?.closest('[data-i18n],script,style,svg')) continue;
 originals.push({node,source,original:node.nodeValue});
}
const titles={en:'MEMRYA | Roadmap',ar:'MEMRYA | خارطة الطريق',es:'MEMRYA | Hoja de ruta',fr:'MEMRYA | Feuille de route',de:'MEMRYA | Roadmap',pt:'MEMRYA | Roteiro',it:'MEMRYA | Roadmap'};
const descriptions={en:'Product direction for identity, conversation imports and cross-conversation memory in MEMRYA.',ar:'الخطط المستقبلية لهوية الصوت واستيراد المحادثات والذاكرة المترابطة في MEMRYA.',es:'Planes de MEMRYA para identidad de voz, importaciones y memoria entre conversaciones.',fr:'Projets de MEMRYA pour l’identité vocale, les imports et la mémoire entre conversations.',de:'MEMRYA-Pläne für Stimmerkennung, Gesprächsimporte und vernetzte Erinnerungen.',pt:'Planos da MEMRYA para identidade de voz, importação de conversas e memória ligada.',it:'I piani di MEMRYA per identità vocale, importazioni e memoria tra conversazioni.'};
const meta=document.querySelector('meta[name="description"]');
function apply() {
 const lang=document.documentElement.lang||'en',index=languages.indexOf(lang)+1;
 for(const {node,source,original} of originals) {
  const value=index>0?(lookup.get(source)?.[index]||source):source;
  node.nodeValue=original.replace(source,value);
 }
 document.title=titles[lang]||titles.en;
 if(meta)meta.content=descriptions[lang]||descriptions.en;
}
document.addEventListener('memrya:locale-changed',apply);
apply();
window.MEMRYA_ROADMAP_LOCALE_AUDIT=()=>({lang:document.documentElement.lang,translated:originals.filter(x=>lookup.has(x.source)).length,total:rows.length,missing:rows.filter(r=>!originals.some(x=>x.source===r[0])).map(r=>r[0])});
})();
