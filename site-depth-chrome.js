(() => {
'use strict';
// Localized labels for the two depth pages. The full body copy is managed separately.
const copy = {
  ar: {
    'Skip to content':'انتقل إلى المحتوى','MEMRYA home':'الصفحة الرئيسية لـ MEMRYA','Primary navigation':'التنقل الرئيسي','Language':'اللغة','Open menu':'افتح القائمة',
    'Explore':'استكشف','Product':'المنتج','Use cases':'حالات الاستخدام','Integrations':'التكاملات','Resources':'الموارد','Help & support':'المساعدة والدعم','Pricing':'الأسعار','About':'حول MEMRYA','Trust':'الثقة','Security':'الأمان','Privacy':'الخصوصية','Delete account':'حذف الحساب','Terms':'الشروط','Contact':'تواصل معنا',
    'Professionals discussing work':'أشخاص يناقشون العمل','Professional consultation':'استشارة مهنية','Two people talking at a cafe':'شخصان يتحدثان في مقهى'
  },
  es: {
    'Skip to content':'Ir al contenido','MEMRYA home':'Inicio de MEMRYA','Primary navigation':'Navegación principal','Language':'Idioma','Open menu':'Abrir menú',
    'Explore':'Explorar','Product':'Producto','Use cases':'Casos de uso','Integrations':'Integraciones','Resources':'Recursos','Help & support':'Ayuda y asistencia','Pricing':'Precios','About':'Acerca de','Trust':'Confianza','Security':'Seguridad','Privacy':'Privacidad','Delete account':'Eliminar cuenta','Terms':'Términos','Contact':'Contacto',
    'Professionals discussing work':'Profesionales conversando sobre trabajo','Professional consultation':'Consulta profesional','Two people talking at a cafe':'Dos personas conversando en una cafetería'
  },
  fr: {
    'Skip to content':'Aller au contenu','MEMRYA home':'Accueil de MEMRYA','Primary navigation':'Navigation principale','Language':'Langue','Open menu':'Ouvrir le menu',
    'Explore':'Découvrir','Product':'Produit','Use cases':'Cas d’usage','Integrations':'Intégrations','Resources':'Ressources','Help & support':'Aide et assistance','Pricing':'Tarifs','About':'À propos','Trust':'Confiance','Security':'Sécurité','Privacy':'Confidentialité','Delete account':'Supprimer le compte','Terms':'Conditions','Contact':'Contact',
    'Professionals discussing work':'Professionnels échangeant sur un projet','Professional consultation':'Consultation professionnelle','Two people talking at a cafe':'Deux personnes discutant dans un café'
  },
  de: {
    'Skip to content':'Zum Inhalt springen','MEMRYA home':'MEMRYA Startseite','Primary navigation':'Hauptnavigation','Language':'Sprache','Open menu':'Menü öffnen',
    'Explore':'Entdecken','Product':'Produkt','Use cases':'Anwendungsfälle','Integrations':'Integrationen','Resources':'Ressourcen','Help & support':'Hilfe und Support','Pricing':'Preise','About':'Über uns','Trust':'Vertrauen','Security':'Sicherheit','Privacy':'Datenschutz','Delete account':'Konto löschen','Terms':'Nutzungsbedingungen','Contact':'Kontakt',
    'Professionals discussing work':'Fachleute besprechen ein Projekt','Professional consultation':'Beratungsgespräch','Two people talking at a cafe':'Zwei Personen unterhalten sich in einem Café'
  },
  pt: {
    'Skip to content':'Ir para o conteúdo','MEMRYA home':'Página inicial da MEMRYA','Primary navigation':'Navegação principal','Language':'Idioma','Open menu':'Abrir menu',
    'Explore':'Explorar','Product':'Produto','Use cases':'Casos de uso','Integrations':'Integrações','Resources':'Recursos','Help & support':'Ajuda e apoio','Pricing':'Preços','About':'Sobre nós','Trust':'Confiança','Security':'Segurança','Privacy':'Privacidade','Delete account':'Eliminar conta','Terms':'Termos','Contact':'Contacto',
    'Professionals discussing work':'Profissionais a conversar sobre trabalho','Professional consultation':'Consulta profissional','Two people talking at a cafe':'Duas pessoas a conversar num café'
  },
  it: {
    'Skip to content':'Vai al contenuto','MEMRYA home':'Pagina iniziale di MEMRYA','Primary navigation':'Navigazione principale','Language':'Lingua','Open menu':'Apri menu',
    'Explore':'Esplora','Product':'Prodotto','Use cases':'Casi d’uso','Integrations':'Integrazioni','Resources':'Risorse','Help & support':'Aiuto e assistenza','Pricing':'Prezzi','About':'Chi siamo','Trust':'Affidabilità','Security':'Sicurezza','Privacy':'Privacy','Delete account':'Elimina account','Terms':'Termini','Contact':'Contatti',
    'Professionals discussing work':'Professionisti che parlano di lavoro','Professional consultation':'Consulenza professionale','Two people talking at a cafe':'Due persone che parlano in un bar'
  }
};
const pages={
 'product.html':{
 en:['Connected memory | MEMRYA',"Explore MEMRYA's record, remember, search and act experience."],
 ar:['الذاكرة المترابطة | MEMRYA','اكتشف كيف تساعدك MEMRYA على تسجيل المحادثات وتذكّرها والبحث فيها ومتابعة المهام.'],
 es:['Memoria conectada | MEMRYA','Descubre cómo MEMRYA registra, recuerda y conecta conversaciones para ayudarte a actuar.'],
 fr:['Mémoire connectée | MEMRYA','Découvrez comment MEMRYA enregistre, relie et retrouve les conversations pour faciliter le suivi.'],
 de:['Vernetztes Gedächtnis | MEMRYA','Erfahren Sie, wie MEMRYA Gespräche aufzeichnet, verknüpft und für weitere Schritte nutzbar macht.'],
 pt:['Memória ligada | MEMRYA','Descubra como a MEMRYA regista, relaciona e recupera conversas para facilitar o acompanhamento.'],
 it:['Memoria connessa | MEMRYA','Scopri come MEMRYA registra, collega e ritrova le conversazioni per aiutarti a seguire le attività.']},
 'use-cases.html':{
 en:['Real-life use cases | MEMRYA','See connected memory in family life, friendships, doctor visits, work meetings and learning.'],
 ar:['حالات استخدام من الحياة | MEMRYA','اكتشف كيف تساعد الذاكرة المترابطة العائلة والأصدقاء وزيارات الطبيب واجتماعات العمل والتعلّم.'],
 es:['Casos de uso cotidianos | MEMRYA','Descubre cómo la memoria conectada ayuda a las familias, los amigos, las visitas médicas, el trabajo y el aprendizaje.'],
 fr:['Cas d’usage au quotidien | MEMRYA','Découvrez comment la mémoire connectée aide la famille, les amis, les consultations médicales, le travail et l’apprentissage.'],
 de:['Anwendungsfälle im Alltag | MEMRYA','Entdecken Sie, wie vernetzte Erinnerungen in Familie, Freundeskreis, beim Arzt, bei der Arbeit und beim Lernen helfen.'],
 pt:['Casos de uso do dia a dia | MEMRYA','Descubra como a memória ligada ajuda famílias, amigos, consultas médicas, reuniões de trabalho e aprendizagem.'],
 it:['Casi d’uso quotidiani | MEMRYA','Scopri come la memoria connessa aiuta in famiglia, con gli amici, nelle visite mediche, al lavoro e nello studio.']}
};
const page=location.pathname.split('/').pop();
if(!pages[page])return;
const textNodes=[],attrs=[];
const walker=document.createTreeWalker(document.querySelector('.depth-footer'),NodeFilter.SHOW_TEXT);
while(walker.nextNode()){
 const node=walker.currentNode,source=node.nodeValue;
 if(!source.trim()||node.parentElement?.closest('[data-i18n]'))continue;
 textNodes.push({node,source});
}
for(const el of document.querySelectorAll('.skip-link,.nav-toggle,.brand[aria-label],.nav-links[aria-label],.locale-switch select[aria-label],main img[alt]')){
 for(const name of ['aria-label','alt']){
  const source=el.getAttribute(name);if(source)attrs.push({el,name,source});
 }
}
const desc=document.querySelector('meta[name="description"]');
function apply(){
 const lang=document.documentElement.lang,dict=copy[lang]||{};
 for(const {node,source} of textNodes){
  const trimmed=source.trim(),translated=dict[trimmed]||trimmed;
  node.nodeValue=source.replace(trimmed,translated);
 }
 for(const {el,name,source} of attrs)el.setAttribute(name,dict[source]||source);
 const metadata=pages[page][lang]||pages[page].en;
 document.title=metadata[0];if(desc)desc.content=metadata[1];
}
document.addEventListener('memrya:locale-changed',apply);
apply();
})();