/* Public release notes: no internal QA milestones or unreleased build logs. */
(() => {
'use strict';
if (!location.pathname.endsWith('/changelog.html')) return;
const root=document.querySelector('main');
if (!root) return;
const original=["Release notes will appear here as new versions of MEMRYA become available.","Getting ready for launch","MEMRYA is preparing for its first iPhone release. Once available, this page will share new features and important changes that affect your experience.","Until then,","explore the product","or","contact the team"];
const translations={"ar":["ستظهر هنا ملاحظات الإصدارات عند توفر نسخ جديدة من MEMRYA.","الاستعداد للإطلاق","تستعد MEMRYA لإصدارها الأول على iPhone. وبعد الإطلاق سننشر هنا الميزات الجديدة والتغييرات المهمة لتجربتك.","حتى ذلك الحين،","استكشف المنتج","أو","تواصل مع الفريق"],"es":["Aquí publicaremos las novedades cuando estén disponibles nuevas versiones de MEMRYA.","Preparándonos para el lanzamiento","MEMRYA se está preparando para su primera versión para iPhone. Cuando esté disponible, compartiremos aquí las nuevas funciones y los cambios relevantes para tu experiencia.","Mientras tanto,","explora el producto","o","contacta con el equipo"],"fr":["Les notes de version paraîtront ici lorsque de nouvelles versions de MEMRYA seront disponibles.","Préparation du lancement","MEMRYA prépare sa première version iPhone. Une fois disponible, cette page présentera les nouvelles fonctionnalités et les changements importants pour vous.","En attendant,","découvrez le produit","ou","contactez l’équipe"],"de":["Hier erscheinen Versionshinweise, sobald neue MEMRYA-Versionen verfügbar sind.","Vorbereitung des Starts","MEMRYA bereitet die erste iPhone-Version vor. Nach der Veröffentlichung finden Sie hier neue Funktionen und wichtige Änderungen für Ihre Nutzung.","Bis dahin können Sie","das Produkt kennenlernen","oder","Kontakt mit dem Team aufnehmen"],"pt":["As notas de versão aparecerão aqui quando estiverem disponíveis novas versões da MEMRYA.","Preparação do lançamento","A MEMRYA está a preparar a primeira versão para iPhone. Após o lançamento, esta página apresentará novas funcionalidades e alterações importantes para a sua experiência.","Entretanto,","conheça o produto","ou","contacte a equipa"],"it":["Qui compariranno le note di rilascio quando saranno disponibili nuove versioni di MEMRYA.","Preparazione al lancio","MEMRYA sta preparando la sua prima versione per iPhone. Dopo il lancio, questa pagina presenterà nuove funzioni e modifiche importanti per la tua esperienza.","Nel frattempo,","scopri il prodotto","oppure","contatta il team"]};
const titles={"en":"MEMRYA | Release notes","ar":"MEMRYA | ملاحظات الإصدارات","es":"MEMRYA | Novedades","fr":"MEMRYA | Notes de version","de":"MEMRYA | Versionshinweise","pt":"MEMRYA | Notas de versão","it":"MEMRYA | Note di rilascio"};
const descriptions={"en":"New MEMRYA features and release notes when versions become available.","ar":"الميزات الجديدة وملاحظات الإصدارات عند توفر نسخ MEMRYA.","es":"Nuevas funciones y notas de versión de MEMRYA cuando estén disponibles.","fr":"Nouvelles fonctionnalités et notes de version de MEMRYA après publication.","de":"Neue MEMRYA-Funktionen und Versionshinweise nach Veröffentlichung.","pt":"Novas funcionalidades e notas de versão da MEMRYA quando disponíveis.","it":"Nuove funzioni e note di rilascio di MEMRYA dopo la pubblicazione."};
const nodes=[], walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){
 const node=walker.currentNode,source=node.nodeValue.trim();
 if(source&&!node.parentElement?.closest('[data-i18n],script,style,svg'))nodes.push({node,source,raw:node.nodeValue});
}
const meta=document.querySelector('meta[name="description"]');
function apply(){
 const locale=document.documentElement.lang||'en';
 const values=translations[locale]||original;
 for(const item of nodes){
  const index=original.indexOf(item.source);
  if(index>=0)item.node.nodeValue=item.raw.replace(item.source,values[index]);
 }
 document.title=titles[locale]||titles.en;
 if(meta)meta.content=descriptions[locale]||descriptions.en;
}
document.addEventListener('memrya:locale-changed',apply);
apply();
window.MEMRYA_CHANGELOG_LOCALE_AUDIT=()=>({total:original.length,found:original.filter(s=>nodes.some(n=>n.source===s)).length});
})();
