/* Shared by every page: applies config (brand, header, footer, contact details), analytics and consent. */
(function(){
const C=window.SITE,$=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const get=(o,p)=>p.split('.').reduce((a,k)=>a&&a[k],o);
window.$=$;window.esc=esc;

/* ---- brand colors: three-block theme pattern so dark mode keeps working ---- */
function lum(h){const n=parseInt(h.replace('#',''),16),f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(n>>16&255)+.7152*f(n>>8&255)+.0722*f(n&255)}
const fgOn=h=>lum(h)>.4?'#0a1522':'#ffffff';
(function(){const b=C.brand,st=document.createElement('style');
 const dark=`--accent:${b.accentOnDark};--accent-fg:${fgOn(b.accentOnDark)}`;
 st.textContent=`:root{--accent:${b.accent};--accent-fg:${fgOn(b.accent)};--hero:${b.hero};--hero-accent:${b.accentOnDark};--hero-line:color-mix(in srgb,${b.hero} 82%,#fff);--hero-scrim:color-mix(in srgb,${b.hero} 86%,transparent);--accent-soft:color-mix(in srgb,var(--accent) 14%,var(--bg))}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){${dark}}}
:root[data-theme="dark"]{${dark}}`;
 document.head.append(st);})();

/* ---- header and footer ---- */
const co=C.company,home=document.body.dataset.home==='1';
const logo=co.logo?`<img src="${esc(co.logo)}" alt="${esc(co.name)} logo">`:`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="16" cy="16" r="13"/><path d="M16 3v6M16 23v6M3 16h6M23 16h6M10 22l12-12"/></svg>`;
const base=home?'':'index.html';
$('#hd').innerHTML=`<div class="wrap"><a class="logo" href="${base||'#top'}">${logo}<span>${esc(co.name)}</span></a>
<nav aria-label="Main"><a href="${base}#charter">Charter</a><a href="${base}#school">Flight school</a><a href="${base}#safety">Safety</a><a href="${base}#contact">Contact</a></nav>
<a class="btn" href="${esc(C.dashboardUrl)}">Crew login</a></div>`;
const soc=Object.entries(co.social||{}).filter(([,u])=>u).map(([k,u])=>`<a href="${esc(u)}" target="_blank" rel="noopener">${k[0].toUpperCase()+k.slice(1)}</a>`).join('');
$('#ft').innerHTML=`<div class="wrap"><span>© ${new Date().getFullYear()} ${esc(co.legalName)}. ${esc(co.address)}</span><div class="links"><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a>${soc}</div></div>`;

/* ---- fill contact details anywhere in the page ---- */
document.querySelectorAll('[data-cfg]').forEach(e=>{e.textContent=get(C,e.dataset.cfg)||''});
document.querySelectorAll('[data-mailto]').forEach(e=>{e.href='mailto:'+co.email;if(!e.textContent.trim())e.textContent=co.email});
document.querySelectorAll('[data-tel]').forEach(e=>{e.href='tel:+1'+co.phone.replace(/\D/g,'');if(!e.textContent.trim())e.textContent=co.phone});
const pt=document.body.dataset.title;document.title=pt?`${pt} | ${co.name}`:co.name;

/* ---- analytics ---- */
function load(src,attrs={}){const s=document.createElement('script');s.src=src;s.async=true;Object.entries(attrs).forEach(([k,v])=>s.setAttribute(k,v));document.head.append(s)}
const A=C.analytics||{};
if(A.plausibleDomain){window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)};load('https://plausible.io/js/script.js',{defer:'',  'data-domain':A.plausibleDomain})}
function startGA(){window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',A.gaId,{anonymize_ip:true});load('https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(A.gaId))}
if(A.gaId){let v=null;try{v=localStorage.getItem('ga-consent')}catch(e){}
 if(v==='yes')startGA();
 else if(v!=='no'){const d=document.createElement('div');d.className='consent';d.setAttribute('role','dialog');d.setAttribute('aria-label','Cookie consent');
  d.innerHTML='<p>We use Google Analytics to understand how the site is used. See our <a href="privacy.html" style="color:inherit">Privacy Policy</a>.</p><button class="btn ghost" id="cn">Decline</button><button class="btn" id="cy">Accept</button>';
  document.body.append(d);const set=x=>{try{localStorage.setItem('ga-consent',x)}catch(e){}d.remove();if(x==='yes')startGA()};
  $('#cy').onclick=()=>set('yes');$('#cn').onclick=()=>set('no')}}
window.track=(name,props)=>{try{if(window.plausible)plausible(name,{props});if(window.gtag)gtag('event',name,props||{})}catch(e){}};
})();
