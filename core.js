/* © 2026 Manseur BET – Situations_DGD – Tous droits réservés. Toute reproduction, copie ou diffusion sans autorisation écrite est interdite. */
const $=s=>document.querySelector(s);
/* ================================================================
   PRÉCISION — JAMAIS D'ARRONDI : on coupe (troncature), même règle partout
   Quantités : m³ = 3 chiffres après la virgule, autres unités = 2 chiffres
   Montants  : 2 chiffres. Ex. 10,398 m² -> 10,39 ; 10,3987 m³ -> 10,398
   Ce qui est affiché est exactement ce qui est calculé (totaux = somme des lignes affichées).
   ================================================================ */
const isM3=u=>/^m(3|³)$/i.test(String(u||"").trim());
const tr=(x,d)=>{const k=Math.pow(10,d),v=Math.round((+x||0)*1e6)/1e6;return(Math.sign(v)*Math.floor(Math.abs(v)*k+Math.abs(v)*k*4e-16+1e-9)/k)||0};
const ta=x=>tr(x,2);
const tz=(it,x)=>tr(x,isM3(it.u)?3:2);
const fmt=n=>ta(n).toLocaleString("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2});
/* montant d'une ligne = quantité (coupée) x prix unitaire (coupé), coupé à 2 chiffres */
const Mt=(it,q)=>ta(tz(it,q)*ta(it.pu));
const Mq=it=>Mt(it,it.qm),Mp=it=>Mt(it,it.pr),Mc=it=>Mt(it,it.cu);
/* colonne « Mois » = Cumulé − Précédent (précédent + mois = cumulé, toujours exact) */
const Mm=it=>ta(Mc(it)-Mp(it));
/* TVA et TTC : TVA = HT x taux (coupée), TTC = HT + TVA */
const TVx=(h,t)=>ta(ta(h)*t/100),TT=(h,t)=>ta(ta(h)+TVx(h,t));
/* Décompte : colonnes [Marché, Précédent, Mois, Cumulé] -> [HT, TVA, TTC] ; Mois = Cumulé − Précédent aussi pour TVA et TTC */
const D4=(h,t)=>{const H=h.map(ta);H[2]=ta(H[3]-H[1]);const V=[TVx(H[0],t),TVx(H[1],t),0,TVx(H[3],t)];V[2]=ta(V[3]-V[1]);return[H,V,H.map((x,i)=>ta(x+V[i]))]};
/* DGD : colonnes [Marché, Réalisé, Plus-value, Moins-value] -> [HT, TVA, TTC] ; Marché + Plus − Moins = Réalisé, toujours exact */
const DV=it=>{const a=Mt(it,it.qm),b=Mt(it,it.tot);return[a,b,Math.max(ta(b-a),0),Math.max(ta(a-b),0)]};
const G4=(T,t)=>{const H=T.map(ta),vm=TVx(H[0],t),vr=TVx(H[1],t),dv=ta(vr-vm);let vp,vn;if(H[2]===0){vp=0;vn=ta(-dv)}else if(H[3]===0){vn=0;vp=dv}else{vp=TVx(H[2],t);vn=ta(vp-dv)}const V=[vm,vr,vp,vn];return[H,V,H.map((x,i)=>ta(x+V[i]))]};
/* Situation : chaque étape est coupée à 2 chiffres (comme le calcul à la main du trésor) */
const sitCalc=(r,a,b,q)=>{const T1=ta(r.cum+ta(a.af)+ta(a.aa)+ta(a.ao)),T2=ta(r.prev+ta(b.af)+ta(b.aa)+ta(b.ao)),br=ta(T1-T2),T4=ta(ta(a.rf)+ta(a.ra)+ta(a.ro)),ht=ta(br-T4),tva=TVx(ht,q.tva),ttc=ta(ht+tva),ret=(q.gar||"retenue")=="retenue",rt=ret?ta(ttc*q.ret/100):0,pen=ta(a.pen),net=ta(ttc-rt-pen),cau=ta(TT(r.mm,q.tva)*q.ret/100);return{T1,T2,br,T4,ht,tva,ttc,ret,rt,pen,net,cau}};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
let OK=true,S;try{S=JSON.parse(localStorage.getItem("archigest_dz"));localStorage.setItem("archigest_t","1");localStorage.removeItem("archigest_t")}catch(e){OK=false}
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
if(!S||!S.projects)S={projects:[],cur:null,tab:"projets",del:null};
S.tab="projets";S.cur=null;S.del=null;S.back=null;
const save=()=>{try{localStorage.setItem("archigest_dz",JSON.stringify(S));OK=true}catch(e){OK=false}};
const P=()=>S.projects.find(p=>p.id===S.cur);
function mk(name){return{id:Date.now(),name,moa:"",ent:"",gar:"caution",contrat:"",objet:"",montant:0,doit:"",adr:"",rc:"",nif:"",nis:"",art:"",rib:"",bq:"",tva:19,ret:5,items:[],adj:{},sit:1}}
function setMode(m){S.mode=m;S.del=null;go()}
function np(){npj()}
function dp(){if(S.del==S.cur){S.projects=S.projects.filter(x=>x.id!=S.cur);S.cur=S.projects[0]?S.projects[0].id:null;S.del=null}else S.del=S.cur;go()}
function go(t){if(t){if(t=="infos"&&S.tab!="infos")S.prev=S.tab;S.tab=t;S.msg="";S.bm="";S.sm="";if(t!="projets")S.nw=false;const q=S.cur&&S.projects.find(x=>x.id==S.cur);if(q&&/^(devis|attachement|decompte|situation|avenants|dgd)$/.test(t))q.lt=t}save();render()}
function set(k,v){P()[k]=v;go()}
function ai(){P().items.push({d:"",u:"m²",q:0,pu:0,m:Array(12).fill(0),av:[0,0,0]});go()}
function di(i){P().items.splice(i,1);go()}
function si(i,k,v){P().items[i][k]=v;go()}
function sm(i,v){const p=P();if(p.val&&p.val[p.sit])return;p.items[i].m[p.sit-1]=v;go()}
function sa(k,v){const p=P();(p.adj[p.sit]=p.adj[p.sit]||{av:0,pen:0})[k]=v;go()}
const IT=it=>{it.av=it.av||[];while(it.av.length<12)it.av.push(0);const t=x=>tz(it,x);it.qm=t(t(it.q)+it.av.reduce((a,b)=>a+t(b),0));it.qa=it.qm;return it};
function calc(p){const n=p.sit,r={prev:0,mois:0,cum:0,mi:0,avm:0,mk:0,real:0,pv:0,mv:0,mm:0};
p.items.forEach(it=>{IT(it);const t=x=>tz(it,x),sum=k=>t(it.m.slice(0,k).reduce((a,b)=>a+t(b),0)),tot=sum(12),pl=t(Math.max(tot-it.qm,0)),mn=p.done?t(Math.max(it.qm-tot,0)):0;
it.qa=t(it.qm+pl-mn);it.au=t(pl-mn);
const cap=k=>Math.min(sum(k),it.qm),pr=cap(n-1),cu=cap(n);
Object.assign(it,{pr,cu,mo:t(cu-pr),tot,rawp:sum(n-1),raw:sum(n),mr:it.m[n-1]||0});
r.mi+=Mt(it,it.q);r.mm+=Mq(it);r.avm+=ta(Mq(it)-Mt(it,it.q));r.mk+=Mt(it,it.qa);r.prev+=Mp(it);r.mois+=Mm(it);r.cum+=Mc(it);r.real+=Mt(it,Math.min(tot,it.qa));r.pv+=ta(Mt(it,it.qm+pl)-Mq(it));r.mv+=mn?ta(Mq(it)-Mt(it,it.qm-mn)):0});
Object.keys(r).forEach(k=>r[k]=ta(r[k]));
return r}
const fp=x=>fmt(x);
const idBlock=p=>{const g=(l,v)=>v?`<div>${l} ${esc(v)}</div>`:"";return`<div style="font-size:12px;line-height:1.5"><div style="text-align:center;font-weight:700">République Algérienne Démocratique et Populaire</div>${g("",p.ent)}${g("Adresse :",p.adr)}${g("RC :",p.rc)}${g("NIF :",p.nif)}${g("NIS :",p.nis)}${g("N° d’article :",p.art)}${g("N° de compte :",(p.rib||"")+(p.bq?" · "+p.bq:""))}${g("Contrat n°",p.contrat)}${g("Objet :",p.objet)}${p.montant?g("Montant du contrat :",fmt(p.montant)+" DA"):""}${g("Doit à :",p.doit)}${g("Projet :",p.name)}</div>`};
function sv(i,k,v){P().items[i].av[k]=v;go()}
const L=(l,v,c)=>`<tr class="${c||""}"><td>${l}</td><td class="r">${v}</td></tr>`;
const okTo=(p,m)=>{for(let k=1;k<m;k++)if(!(p.val&&p.val[k]))return false;return true};
const selS=(p,lb)=>`<div class="card row np"><label style="width:150px">${lb||"Situation"} n°<select onchange="gs(+this.value)">${[...Array(4)].map((_,i)=>`<option value="${i+1}" ${i+1==p.sit?"selected":""} ${okTo(p,i+1)?"":"disabled"}>${i+1}${p.val&&p.val[i+1]?" ✓":""}</option>`).join("")}</select></label>${S.sm?`<span class="bad">${esc(S.sm)}</span>`:""}</div>`;
function gs(v){const p=P();if(!okTo(p,v)){let k=1;while(p.val&&p.val[k])k++;S.sm="Validez d’abord l’attachement n° "+k+" pour passer au suivant.";go();return}S.sm="";p.sit=v;p.sd=false;go()}
function nx(){const p=P();if(p.sit<4&&p.val&&p.val[p.sit]){p.sit++;S.sm=""}go()}

/* ===== Licence : essai complet de 30 jours, puis filigrane « VERSION D’ESSAI » à l’impression et dans l’export Excel, jusqu’à l’activation par code ===== */
const LIC_SECRET="89737dff280f36580736",LIC_DAY=864e5,LIC_D0=Date.UTC(2024,0,1),LIC_TRIAL=30,LIC_AUTO=false; /* LIC_AUTO=false : aucun essai libre, un code (d’essai ou d’activation) est nécessaire pour créer un projet · true : 30 jours libres dès le premier lancement */
const h53=s=>{let a=0xdeadbeef,b=0x41c6ce57;for(let i=0,c;i<s.length;i++){c=s.charCodeAt(i);a=Math.imul(a^c,2654435761);b=Math.imul(b^c,1597334677)}a=Math.imul(a^(a>>>16),2246822507)^Math.imul(b^(b>>>13),3266489909);b=Math.imul(b^(b>>>16),2246822507)^Math.imul(a^(a>>>13),3266489909);return 4294967296*(2097151&b)+(a>>>0)};
const licNorm=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim();
const licHash=(n,e)=>h53(LIC_SECRET+"|"+licNorm(n)+"|"+e).toString(36).toUpperCase().padStart(11,"0").slice(0,8);
const licCode=(n,days)=>{const e=days.toString(36).toUpperCase().padStart(3,"0"),c=e+licHash(n,e);return c.slice(0,3)+"-"+c.slice(3,7)+"-"+c.slice(7)};
const licCheck=(n,code)=>{const c=String(code||"").toUpperCase().replace(/[^A-Z0-9]/g,"");if(c.length!=11||!licNorm(n))return null;const amb={"0":"0O",O:"0O","1":"1I",I:"1I"};let vs=[""];for(const ch of c){const o=amb[ch]||ch,nv=[];for(const v of vs)for(const x of o)nv.push(v+x);vs=nv}for(const v of vs){const e=v.slice(0,3);if(licHash(n,e)===v.slice(3)){const d=parseInt(e,36);return{exp:d?LIC_D0+d*LIC_DAY:0}}}return null}; /* tolère la confusion 0/O et 1/I à la saisie */

let LIC=null;try{LIC=JSON.parse(localStorage.getItem("sdgd_lic"))}catch(e){}
if(!LIC||!LIC.t0)LIC={t0:Date.now()};
const licSave=()=>{try{localStorage.setItem("sdgd_lic",JSON.stringify(LIC))}catch(e){}};licSave();
/* état de la licence : actif (code valide) · essai (jours restants) · fin (essai terminé) · exp (code expiré) ; wm = filigrane à appliquer. Un retour en arrière de l’horloge du téléphone n’allonge pas l’essai. */
function licSt(){const t=Date.now(),now=Math.max(t,LIC.ls||0);if(now-(LIC.ls||0)>36e5){LIC.ls=now;licSave()}
const v=LIC.code&&licCheck(LIC.name,LIC.code);
if(v)return(!v.exp||now<v.exp+LIC_DAY)?{k:"actif",name:LIC.name,exp:v.exp,wm:false}:{k:"exp",name:LIC.name,exp:v.exp,wm:true};
if(!LIC_AUTO)return{k:"none",wm:true};const left=LIC_TRIAL-Math.floor((now-LIC.t0)/LIC_DAY);return left>0?{k:"essai",left,wm:false}:{k:"fin",wm:true}}
(()=>{const st=document.createElement("style");st.textContent='@media print{body.wm::before{content:"VERSION D’ESSAI";position:fixed;top:38%;left:0;right:0;text-align:center;font-size:60px;font-weight:800;letter-spacing:2px;color:rgba(190,0,0,.16);transform:rotate(-28deg);z-index:9999;pointer-events:none;white-space:nowrap}}';document.head.appendChild(st)})();
