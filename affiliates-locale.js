/* Draft only: descriptions do not promise commissions without a written agreement. */
(() => {
'use strict';
if (!location.pathname.endsWith('/affiliates.html')) return;
const root=document.querySelector('main');
if(!root)return;
const en=["Contact","Partnership inquiries","If you are interested in referring MEMRYA or discussing an affiliate or commercial partnership, contact","Commercial terms","Any commission, attribution, eligibility or payout terms are agreed in writing with the MEMRYA team.","Email","with a short description of the partnership you have in mind."];
const translations={"ar":["التواصل","استفسارات الشراكة","إذا كنت ترغب في التوصية بـ MEMRYA أو مناقشة شراكة تسويقية أو تجارية، تواصل عبر","الشروط التجارية","تُتفق أي شروط للعمولة أو الإحالة أو الأهلية أو الدفع كتابيًا مع فريق MEMRYA.","راسل","مع وصف مختصر للشراكة التي تقترحها."],"es":["Contacto","Consultas sobre colaboraciones","Si deseas recomendar MEMRYA o hablar sobre un programa de afiliados o una colaboración comercial, escribe a","Condiciones comerciales","Las condiciones de comisiones, atribución, requisitos y pagos se acuerdan por escrito con el equipo de MEMRYA.","Escribe a","con una breve descripción de la colaboración que propones."],"fr":["Contact","Demandes de partenariat","Si vous souhaitez recommander MEMRYA ou discuter d’un partenariat d’affiliation ou commercial, écrivez à","Conditions commerciales","Les commissions, modalités d’attribution, critères d’éligibilité et paiements sont définis par écrit avec l’équipe MEMRYA.","Écrivez à","en décrivant brièvement le partenariat envisagé."],"de":["Kontakt","Anfragen zu Partnerschaften","Wenn Sie MEMRYA empfehlen oder eine Affiliate- bzw. Geschäftspartnerschaft besprechen möchten, schreiben Sie an","Geschäftliche Bedingungen","Provisionen, Zuordnung, Teilnahmebedingungen und Auszahlungen werden schriftlich mit dem MEMRYA-Team vereinbart.","Schreiben Sie an","und beschreiben Sie kurz Ihre Partnerschaftsidee."],"pt":["Contacto","Pedidos de parceria","Se pretende recomendar a MEMRYA ou discutir uma parceria de afiliação ou comercial, escreva para","Condições comerciais","As comissões, regras de atribuição, elegibilidade e pagamentos são acordados por escrito com a equipa da MEMRYA.","Escreva para","com uma breve descrição da parceria que propõe."],"it":["Contatti","Richieste di collaborazione","Se desideri consigliare MEMRYA o discutere di un programma di affiliazione o di una collaborazione commerciale, scrivi a","Condizioni commerciali","Commissioni, attribuzione, requisiti e pagamenti vengono concordati per iscritto con il team MEMRYA.","Scrivi a","con una breve descrizione della collaborazione proposta."]};
const titles={"en":"MEMRYA | Affiliates","ar":"MEMRYA | الشراكات","es":"MEMRYA | Afiliados","fr":"MEMRYA | Partenariats","de":"MEMRYA | Partnerprogramme","pt":"MEMRYA | Parcerias","it":"MEMRYA | Affiliazioni"};
const descriptions={"en":"For affiliate, referral and partnership inquiries, contact the MEMRYA team.","ar":"للاستفسار عن التسويق بالعمولة والإحالات والشراكات مع MEMRYA، تواصل مع فريقنا.","es":"Contacta con MEMRYA para consultas sobre afiliados, recomendaciones y colaboraciones.","fr":"Contactez MEMRYA pour toute question concernant l’affiliation, les recommandations et les partenariats.","de":"Kontaktieren Sie MEMRYA bei Fragen zu Partnerprogrammen, Empfehlungen und Kooperationen.","pt":"Contacte a MEMRYA para questões sobre afiliação, recomendações e parcerias.","it":"Contatta MEMRYA per informazioni su affiliazioni, segnalazioni e collaborazioni."};
const nodes=[];
const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
while(walker.nextNode()) {
 const node=walker.currentNode,original=node.nodeValue,source=original.trim();
 if(!source||node.parentElement?.closest('[data-i18n],script,style,svg'))continue;
 nodes.push({node,original,source});
}
const meta=document.querySelector('meta[name="description"]');
function apply(){
 const lang=document.documentElement.lang||'en';
 const t=translations[lang]||en;
 for(const item of nodes){const i=en.indexOf(item.source);if(i!==-1)item.node.nodeValue=item.original.replace(item.source,t[i]);}
 document.title=titles[lang]||titles.en;
 if(meta)meta.content=descriptions[lang]||descriptions.en;
}
document.addEventListener('memrya:locale-changed',apply);
apply();
window.MEMRYA_AFFILIATES_LOCALE_AUDIT=()=>({covered:en.filter(s=>nodes.some(n=>n.source===s)).length,total:en.length});
})();
