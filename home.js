/* Home page: hero, route map, fleet, estimator, programs, contact form */
(function(){
const C=window.SITE,AP=C.airports,P=C.pricing,H=C.base||C.company.baseCode;
const money=n=>'$'+Math.round(n).toLocaleString('en-US');
const fleet=Object.fromEntries(C.fleet.map(a=>[a.code,a]));

/* hero */
$('#h-eyebrow').textContent=C.hero.eyebrow;$('#h-title').textContent=C.hero.title;$('#h-lead').textContent=C.hero.lead;
if(C.brand.heroImage){const h=$('.hero');h.classList.add('has-img');h.style.setProperty('--hero-img',`url("${C.brand.heroImage.replace(/"/g,'')}")`)}
$('#h-facts').innerHTML=`<div><b>${C.fleet.length}</b>charter aircraft</div><div><b>${C.school.trainers.length}</b>trainers</div><div><b>${esc(C.company.hours.split(' ').find(w=>/24\/7/.test(w))||C.company.baseCode)}</b>${/24\/7/.test(C.company.hours)?'ops desk':'home base'}</div>`;

/* map: equirectangular projection to the viewBox */
const X=lo=>(lo+122)*12.6+14,Y=la=>(42-la)*13+16;
const LB={KAUS:['end',-8,-5],KSAT:['end',-8,12],KHOU:['start',8,12],KOKC:['start',8,0],KAPA:['end',-8,4],KVNY:['start',0,-10],KTEB:['end',-8,-8],KPBI:['end',-8,4]};
(function(){
 const home=AP[H]||Object.values(AP)[0],hx=X(home[2]),hy=Y(home[1]);let g='',r='',p='';
 for(let lo=-120;lo<=-70;lo+=10)g+=`<line x1="${X(lo)}" y1="16" x2="${X(lo)}" y2="276" stroke="var(--hero-line)"/>`;
 for(let la=30;la<=40;la+=10)g+=`<line x1="14" y1="${Y(la)}" x2="630" y2="${Y(la)}" stroke="var(--hero-line)"/>`;
 Object.entries(AP).forEach(([k,a])=>{if(k===H)return;const x=X(a[2]),y=Y(a[1]),cx=(hx+x)/2,cy=Math.min(hy,y)-Math.hypot(x-hx,y-hy)*.22,l=LB[k]||['start',8,4];
  r+=`<path class="route" d="M${hx} ${hy} Q${cx} ${cy} ${x} ${y}" fill="none" stroke="var(--hero-accent)" stroke-width="1.4" opacity=".8"/>`;
  p+=`<circle cx="${x}" cy="${y}" r="3.5" fill="var(--hero)" stroke="var(--hero-accent)" stroke-width="1.5"/><text text-anchor="${l[0]}" x="${x+l[1]}" y="${y+l[2]}" fill="var(--hero-muted)" font-family="IBM Plex Mono,monospace" font-size="11">${esc(k)}</text>`});
 $('#map').innerHTML=g+r+p+`<circle class="pulse" cx="${hx}" cy="${hy}" r="11" fill="var(--signal)" opacity=".25"/><circle cx="${hx}" cy="${hy}" r="5" fill="var(--signal)"/><text x="${hx+12}" y="${hy-2}" fill="var(--hero-fg)" font-family="IBM Plex Mono,monospace" font-size="12" font-weight="500">${esc(H)} · HOME BASE</text>`;
})();
if(C.hero.showBoard){$('#board').innerHTML='<div class="sample-tag">Sample schedule</div><div class="r h"><span>Time</span><span>Route</span><span>Type</span><span>Status</span></div>'+C.departures.map(b=>`<div class="r"><span>${esc(b[0])}</span><span>${esc(b[1])}</span><span>${esc(b[2])}</span><span class="st ${b[3][0]==='D'?'d':''}">${esc(b[3])}</span></div>`).join('')}else $('#board').remove();

/* fleet */
$('#fleet').innerHTML=C.fleet.map(a=>`<article class="card">${a.photo?`<img class="ph" src="${esc(a.photo)}" alt="${esc(a.name)}" loading="lazy">`:''}<h3>${esc(a.name)}</h3><p style="color:var(--muted);font-size:14px">${esc(a.desc)}</p><div class="price">${money(a.rate)} / flight hour</div><div class="spec"><div>Seats<b>${a.seats}</b></div><div>Cruise<b>${a.kt} kt</b></div><div>Range<b>${a.rng.toLocaleString()} nm</b></div><div>Crew<b>2 pilots</b></div></div></article>`).join('');

/* estimator */
const opts=Object.entries(AP).map(([k,a])=>`<option value="${esc(k)}">${esc(k)} · ${esc(a[0])}</option>`).join('');
$('#from').innerHTML=opts;$('#to').innerHTML=opts;$('#from').value=H;$('#to').value=Object.keys(AP).find(k=>k!==H);
$('#ac').innerHTML=C.fleet.map(a=>`<option value="${esc(a.code)}">${esc(a.name)} · up to ${a.seats} seats</option>`).join('');
function nm(a,b){const R=3440.07,r=x=>x*Math.PI/180,dl=r(b[1]-a[1]),dn=r(b[2]-a[2]),h=Math.sin(dl/2)**2+Math.cos(r(a[1]))*Math.cos(r(b[1]))*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(h))}
let last=null;
function est(){
 const fk=$('#from').value,tk=$('#to').value,a=fleet[$('#ac').value];
 if(fk===tk){last=null;$('#out').innerHTML='<h3>Choose two different airports</h3>';return}
 const d=nm(AP[fk],AP[tk]),h=Math.max(P.minHours,d/a.kt+.3),fl=h*a.rate,fet=fl*P.exciseTax,tot=fl+P.fboFee+P.segmentFee+fet;
 last={fk,tk,a:a.name,tot,h,d};
 $('#out').innerHTML=`<div class="eyebrow">Estimated total</div><div class="big">${money(tot)}</div><dl><dt>Distance</dt><dd>${Math.round(d)} nm</dd><dt>Flight time</dt><dd>${h.toFixed(1)} h</dd><dt>Flight charge</dt><dd>${money(fl)}</dd><dt>Airport and FBO fees</dt><dd>${money(P.fboFee)}</dd><dt>Segment fee</dt><dd>$${P.segmentFee.toFixed(2)}</dd><dt>Federal excise tax (${(P.exciseTax*100).toFixed(1).replace('.0','')}%)</dt><dd>${money(fet)}</dd></dl>${d>a.rng?'<p class="note">This leg is beyond the aircraft range. A fuel stop or a longer-range aircraft is recommended.</p>':''}<p class="note">${esc(P.note)}</p><div><button class="btn" type="button" id="reqtrip">Request this trip</button></div>`;
 $('#reqtrip').onclick=()=>{$('#i').value='Charter';$('#m').value=`Trip request: ${fk} to ${tk}, ${a.name}. Estimate ${money(tot)} (${Math.round(d)} nm, ${h.toFixed(1)} h). Preferred date and passengers: `;track('Quote Requested',{route:fk+'-'+tk,aircraft:a.name});$('#contact').scrollIntoView({behavior:'smooth'});setTimeout(()=>$('#m').focus({preventScroll:true}),500)};
}
['from','to','ac'].forEach(i=>$('#'+i).onchange=est);est();

/* programs */
const S=C.school,tr=S.trainers;
$('#programs').innerHTML=`<article class="card"><h3>${esc(S.discovery.name)}</h3><p style="color:var(--muted);font-size:14px">${esc(S.discovery.desc)}</p><div class="price">${money(S.discovery.price)}</div><div><a class="btn" style="padding:7px 14px;font-size:14px" href="#contact" data-int="Discovery flight">Book it</a></div></article>`+
 S.programs.map(p=>{const c=p.total*tr[p.trainer||0].rate+p.dual*S.instructorRate;return `<article class="card"><h3>${esc(p.name)}</h3><p style="color:var(--muted);font-size:14px">${esc(p.desc)}</p><div class="price">Est. ${money(c)} total</div><div><a class="btn" style="padding:7px 14px;font-size:14px" href="#contact" data-int="Flight training program">Ask about this program</a></div></article>`}).join('');
document.querySelectorAll('[data-int]').forEach(a=>a.addEventListener('click',()=>{$('#i').value=a.dataset.int}));

/* contact form: posts to Formspree (or any endpoint that accepts JSON) */
$('#i').innerHTML=C.form.interests.map(x=>`<option>${esc(x)}</option>`).join('');
const note=(h,err)=>$('#cr').innerHTML=`<div class="toast ${err?'err':''}" role="status">${h}</div>`;
const mail=()=>`<a href="mailto:${esc(C.company.email)}">${esc(C.company.email)}</a>`;
$('#cf').onsubmit=async e=>{e.preventDefault();
 const v=id=>$('#'+id).value.trim();
 if(!v('n')||!/^\S+@\S+\.\S+$/.test(v('e'))){note('Enter your name and a valid email address.',1);return}
 if($('#hp').value)return;
 if(!C.form.endpoint){note(`This form is not connected yet. Please email us at ${mail()} or call ${esc(C.company.phone)}.`,1);return}
 const b=$('#send');b.disabled=true;b.textContent='Sending…';
 try{const r=await fetch(C.form.endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({name:v('n'),email:v('e'),phone:v('ph'),interest:v('i'),message:v('m'),_subject:C.form.subject+' ('+v('i')+')'})});
  if(!r.ok)throw 0;$('#cf').reset();note('Thanks. A dispatcher will reply within one business day.');track('Contact Form Sent',{interest:v('i')})}
 catch(x){note(`Something went wrong sending your message. Please email ${mail()} or call ${esc(C.company.phone)}.`,1)}
 b.disabled=false;b.textContent='Send message'};
})();
