/* © 2026 Manseur BET – Situations_DGD – Tous droits réservés. Toute reproduction, copie ou diffusion sans autorisation écrite est interdite. */
function parseSheet(rows,fx){const num=v=>{let t=String(v).replace(/\s/g,"");const a=t.lastIndexOf("."),b=t.lastIndexOf(",");if(a>=0&&b>=0)t=a>b?t.replace(/,/g,""):t.replace(/\./g,"").replace(",",".");else t=t.replace(",",".");return parseFloat(t)};let c=null,s=0;
for(let i=0;i<Math.min(rows.length,25)&&!c;i++){const r=rows[i].map(x=>String(x).toLowerCase().trim()),f=g=>r.findIndex(g),d=f(x=>/désignation|designation|libellé|libelle/.test(x)),q=f(x=>/^(quant|qté|qte)/.test(x)),pu=f(x=>/^(p[.\-\s]?u|prix)/.test(x));
if(d>=0&&q>=0&&pu>=0){c={k:f(x=>/^(code|n°)/.test(x)),d,u:f(x=>x=="u"||/^unit/.test(x)),q,pu,mt:f(x=>/^montant/.test(x))};s=i+1}}
if(!c&&fx){c={k:0,d:1,u:2,q:3,pu:4,mt:5};rows=rows.map(r=>{const a=Array.from(r);while(a.length<6)a.push("");return a});for(let i=0;i<Math.min(rows.length,40);i++){const t=rows[i].map(x=>String(x).trim()).join(" ");if(/d[ée]signation|libell[ée]/i.test(t)&&!(num(rows[i][3])>0))s=i+1}if(s===0)for(let i=0;i<rows.length;i++){const r=rows[i];if(/^lot\s*\d/i.test(String(r[1]).trim())||/^lot\s*\d/i.test(String(r[0]).trim())||(num(r[3])>0&&num(r[4])>0)){s=i;break}}}
if(!c)return[];
const it=[],W=[],TL=[],seen={},TOTX=/(^|[^a-zà-ÿ])(total|montant|t\.?v\.?a|t\.?t\.?c|h\.?t|net\s+à\s+payer|toutes\s+taxes)([^a-zà-ÿ]|$)/i,sn=t=>t.length>40?t.slice(0,40)+"…":t,isT=t=>/(^|[\s\/])total([^a-zà-ÿ]|$)/i.test(t),glob=t=>/g[ée]n[ée]ral|t\.?t\.?c|toutes\s+taxes|^\s*t\.?v\.?a\b/i.test(t)||/^\s*total\s*(en\s*)?h\.?t\.?\s*:?\s*$/i.test(t);let lot="",pre=[],mS=0,mN=0,nu=0;
let stp=false;rows.slice(s).forEach((r,ix)=>{const ln=s+ix+1,dd=String(r[c.d]).replace(/\s+/g," ").trim(),k=c.k>=0?String(r[c.k]).trim():"",q=num(r[c.q]),pu=num(r[c.pu]),mt=c.mt>=0?num(r[c.mt]):NaN,last=it[it.length-1];
if(stp)return;if(!(q>0)){const tx0=Array.from(r).map(x=>String(x).replace(/\s+/g," ").trim()).filter(x=>x&&isNaN(num(x))).join(" ");if(/(^|[^a-zà-ÿ])(t\.?v\.?a|t\.?t\.?c)([^a-zà-ÿ]|$)/i.test(tx0)){stp=true;TL.push(ln);return}}
const sub=lb=>{if(last&&!glob(lb)){(last.sub=last.sub||[]).push(lb);const m=lb.match(/^\s*total\s*lot\s*(\d+)/i);if(m)for(let j=it.length-1;j>=0&&!it[j].lot;j--)it[j].lot="LOT "+m[1]}};
if(!dd){const lb=String(r[c.pu]).trim(),lk=lb||k;if(isT(lk)||glob(lk)){sub(lk);return}if(!(q>0)){if(pu>0||mt>0){const tx=Array.from(r).map(x=>String(x).replace(/\s+/g," ").trim()).filter(x=>x&&isNaN(num(x))).join(" ");if(tx&&TOTX.test(tx)){TL.push(ln);return}W.push("Ligne "+ln+" : des montants sont présents mais ni désignation ni quantité. Ligne non reprise.")}return}}
if(!(q>0)){if(isT(dd)||glob(dd)){sub(dd);return}const qc=String(r[c.q]).trim();
if(pu>0)W.push("Ligne "+ln+" « "+sn(dd)+" » : un prix est indiqué mais la quantité est "+(qc===""?"vide":"« "+qc+" »")+". Ligne reprise comme simple titre.");
else if(qc!==""&&q!==0)W.push("Ligne "+ln+" « "+sn(dd)+" » : quantité « "+qc+" » non reconnue. Ligne reprise comme simple titre.");
if(/^lot\s*\d/i.test(dd)){lot=dd;pre.push({t:dd,l:1})}else pre.push({t:dd,k});return}
const puv=pu>=0?pu:0;if(!(pu>=0))W.push("Ligne "+ln+" « "+sn(dd)+" » : prix unitaire absent ou illisible. Il est compté 0.");
if(mt>=0){mS+=mt;mN+=q*puv;if(Math.abs(q*puv-mt)>0.5)W.push("Ligne "+ln+" « "+sn(dd)+" » : quantité × prix = "+fmt(q*puv)+" DA, mais le fichier indique "+fmt(mt)+" DA.")}
const u=c.u>=0?String(r[c.u]).trim():"";if(!u)nu++;

it.push({n:k,pre,d:dd,u,q,pu:puv,lot,m:Array(12).fill(0),av:[0,0,0]});pre=[]});

if(nu)W.push(nu+" article(s) sans unité.");
if(fx===2&&it.length&&c.mt>=0&&mS>0&&Math.abs(mS-mN)>1)W.unshift("Aucune ligne d’en-tête reconnue : lecture par position (Code – Désignation – Unité – Quantité – Prix unitaire – Montant). Vérifiez que cet ordre est bien celui du fichier.");
it.w=W;it.tl=TL;it.chk=c.mt>=0&&mS>0?{mS,mN}:null;return it}
let CAND=[],FN="",CM=false;
function use(i){licCnt("devis-importe","Devis importé");const p=P(),c=CAND[i];
if(CM){const n=p.avn||1;p.cp=p.cp||{};p.cp[n]=c.it.map(x=>({n:x.n||"",d:x.d,u:x.u,q:x.q,pu:x.pu}));S.msg=c.it.length+" article(s) complémentaire(s) importé(s) depuis « "+c.nm+" » : total HT "+fmt(c.t)+" DA. Comparez avec votre devis complémentaire.";CAND=[];CM=false;go();return}
p.items=c.it.slice();p.adj={};p.sit=1;p.val={};p.lock=true;if((S.pn||"").trim())p.name=S.pn.trim();if(p.name==="Nouveau projet"&&FN)p.name=FN.replace(/\.[^.]+$/,"");S.msg=c.it.length+" articles importés depuis « "+c.nm+" » : total HT "+fmt(c.t)+" DA. Comparez avec le total de votre devis.";CAND=[];S.pt="";S.pn="";S.pz=false;S.tab="devis";go()}
function cands(l){CAND=l.filter(x=>x.it.length).map(x=>Object.assign(x,{t:x.it.reduce((a,y)=>a+y.q*y.pu,0)}));
if(!CAND.length){S.msg="Aucun article reconnu : vérifiez que les colonnes sont dans l’ordre Code, Désignation, Unité, Quantité, Prix unitaire, Montant.";go();return}
S.msg="";go()}
function cn(){CM=false;if(CAND[0]&&CAND[0].nm=="Texte collé")S.pz=true;CAND=[];S.msg="";go()}
function imp(inp,cm){if(!IMPORT_FILE_ON){inp.value="";return}const fl=inp.files[0];if(!fl)return;const p=P();CM=!!cm;if(!cm&&Object.keys(p.val||{}).length){S.msg="Devis verrouillé : des attachements sont déjà validés.";go();return}
const rd=new FileReader();FN=fl.name;
rd.onload=e=>{try{if(typeof XLSX==="undefined"){S.msg="La bibliothèque de lecture Excel n’est pas chargée (connexion internet ?). Vérifiez votre connexion puis réessayez.";go();return}const wb=XLSX.read(e.target.result,{type:"array"});
const sh=wb.SheetNames.filter(n=>!/infrastructure/i.test(n)).map(nm=>({nm,rw:XLSX.utils.sheet_to_json(wb.Sheets[nm],{header:1,defval:""})}));let l=sh.map(x=>({nm:x.nm,it:parseSheet(x.rw)}));if(!l.some(x=>x.it.length))l=sh.map(x=>({nm:x.nm,it:parseSheet(x.rw,2)}));cands(l)}catch(x){S.msg="Fichier illisible. Utilisez un fichier Excel ou CSV.";go()}};
rd.onerror=()=>{S.msg="Lecture du fichier impossible. Réessayez avec un fichier Excel ou CSV.";go()};rd.readAsArrayBuffer(fl)}
function ptab(t){const R=[];let r=[],f="",q=false;for(let i=0;i<t.length;i++){const ch=t[i];if(q){if(ch=='"'){if(t[i+1]=='"'){f+='"';i++}else q=false}else f+=ch}else if(ch=='"'&&f==="")q=true;else if(ch=="\t"){r.push(f);f=""}else if(ch=="\n"||ch=="\r"){if(ch=="\r"&&t[i+1]=="\n")i++;r.push(f);f="";R.push(r);r=[]}else f+=ch}
if(f!==""||r.length){r.push(f);R.push(r)}while(R.length&&R[R.length-1].every(x=>!String(x).trim()))R.pop();return R}
function spt(v){S.pt=v}
function pzs(){S.pz=!S.pz;if(S.pz&&!S.pn){const n=P().name;S.pn=(n==="Nouveau projet"||n==="Nouveau devis")?"":n}go()}
function spn(v){S.pn=v}
function pza(){const p=P();if(Object.keys(p.val||{}).length){S.msg="Devis verrouillé : des attachements sont déjà validés.";go();return}
if(!(S.pn||"").trim()&&(p.name==="Nouveau projet"||p.name==="Nouveau devis")){S.msg="Donnez d’abord un nom au devis (champ « Nom du devis »).";go();return}
const t=S.pt||"";if(!t.trim()){S.msg="Rien à analyser : collez d’abord les lignes de votre devis.";go();return}
if(t.indexOf("\t")<0){S.msg="Aucune séparation de colonnes trouvée. Copiez les cellules directement depuis Excel ou Google Sheets (un texte copié depuis un PDF n’est pas lisible).";go();return}
const R=ptab(t),wide=R.some(r=>r.slice(6).some(x=>String(x).trim()));FN="";const it=parseSheet(R,1);
if(wide&&it.length)it.w.unshift("Plus de 6 colonnes collées : les colonnes au-delà de la 6e sont ignorées. Vérifiez l’ordre des colonnes.");
S.pz=!it.length;cands([{nm:"Texte collé",it}])}
function tg(){const p=P();p.lock=!p.lock;go()}

/* ===== Export Excel (lecture seule, sans mot de passe) et restauration ===== */
const EXPORT_ON=true; /* false = bouton « 📤 Excel » grisé */
const IMPORT_FILE_ON=true;  /* true = réactive le bouton « 📄 Importer un devis » (chargement d’un fichier) */
const NUMFR=s=>{s=s.replace(/[\u202f\u00a0]/g," ");let m=/^([−-])?\s*(\d{1,3}(?: \d{3})*|\d+),(\d+)$/.exec(s);if(m)return{t:"n",v:(m[1]?-1:1)*parseFloat(m[2].replace(/ /g,"")+"."+m[3]),z:"#,##0."+"0".repeat(m[3].length)};m=/^([−-])?\s*(\d{1,3}(?: \d{3})+)$/.exec(s);if(m)return{t:"n",v:(m[1]?-1:1)*parseInt(m[2].replace(/ /g,""),10),z:"#,##0"};return s};
/* ===== Export Excel : mise en page proche de l'écran (bordures, largeurs, centrage, retour à la ligne), écrit directement en .xlsx ===== */
const XS={th:{b:1,f:"E9EDF3",al:"center",wr:1,bd:1},des:{al:"left",wr:1,bd:1},txt:{al:"left",wr:1,bd:1},ctr:{al:"center",bd:1},num:{al:"center",bd:1},
tot:{b:1,f:"F3F5F8",al:"left",wr:1,bd:1},totn:{b:1,f:"F3F5F8",al:"center",bd:1},net:{b:1,f:"E4EAF2",sz:12,al:"left",wr:1,bd:1},netn:{b:1,f:"E4EAF2",sz:12,al:"center",bd:1},
p:{al:"left",wr:1,va:"top"},note:{i:1,c:"6B7280",sz:10,al:"left",wr:1,va:"top"},wm:{b:1,c:"C00000",sz:12,al:"left",wr:1,va:"top"},sig:{b:1,al:"center"}};
const xe=s=>String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g,"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),xa=s=>xe(s).replace(/"/g,"&quot;");
const cl=n=>{let s="";for(n++;n>0;n=Math.floor((n-1)/26))s=String.fromCharCode(65+(n-1)%26)+s;return s};
function styleBook(){const keys=[""],ix={"":0},id=k=>{if(!(k in ix)){ix[k]=keys.length;keys.push(k)}return ix[k]};
const spec=k=>{if(!k)return{};const a=k.split("|"),b=a[0].split("+"),s=Object.assign({},XS[b[0]]);if(b[1]=="b")s.b=1;if(a[1])s.z=a[1];return s};
const xml=()=>{const fo=[],fi=[],nf=[],u=(r,s)=>{let i=r.indexOf(s);if(i<0){i=r.length;r.push(s)}return i};
const xf=keys.map(k=>{const s=spec(k),fid=u(fo,`<font>${s.b?"<b/>":""}${s.i?"<i/>":""}<sz val="${s.sz||11}"/><color rgb="FF${s.c||"000000"}"/><name val="Calibri"/><family val="2"/></font>`),
fl=s.f?2+u(fi,`<fill><patternFill patternType="solid"><fgColor rgb="FF${s.f}"/><bgColor indexed="64"/></patternFill></fill>`):0,nid=s.z?164+u(nf,s.z):0;
return`<xf numFmtId="${nid}" fontId="${fid}" fillId="${fl}" borderId="${s.bd?1:0}" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="${s.al||"general"}" vertical="${s.va||"center"}"${s.wr?' wrapText="1"':""}/></xf>`}),
bl=c=>`<${c} style="thin"><color rgb="FFBFC5CF"/></${c}>`;
return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${nf.length?`<numFmts count="${nf.length}">${nf.map((z,i)=>`<numFmt numFmtId="${164+i}" formatCode="${xa(z)}"/>`).join("")}</numFmts>`:""}<fonts count="${fo.length}">${fo.join("")}</fonts><fills count="${fi.length+2}"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>${fi.join("")}</fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border>${bl("left")}${bl("right")}${bl("top")}${bl("bottom")}<diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="${xf.length}">${xf.join("")}</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`};
return{id,xml}}
/* tableau HTML -> grille de cellules {v,s,k,l} (v = texte ou nombre, s = style, k = type pour la largeur, l = longueur affichée) */
function t2a(tb){const rows=[...tb.rows],g=[],mg=[],N=s=>s.replace(/\s+/g," ").trim();
rows.forEach((tr,ri)=>{g[ri]=g[ri]||[];let c=0;const cls=tr.className||"",tt=/(^|\s)net(\s|$)/.test(cls)?"net":/(^|\s)tot(\s|$)/.test(cls)?"tot":"";
[...tr.cells].forEach(td=>{while(g[ri][c]!==undefined)c++;const cs=td.colSpan||1,rs=td.rowSpan||1,inp=td.querySelector("input,select"),th=td.tagName=="TH",r=td.classList.contains("r");
let v,z="",tx;
if(inp&&inp.type==="number"){tx=inp.value;v=tx===""?"":+inp.value;if(v!=="")z="#,##0.00##"}
else if(inp&&inp.type!=="checkbox"){tx=inp.value;v=inp.value}
else{tx=N(td.textContent);let n=NUMFR(tx);if(typeof n==="string"&&r&&/^[−-]?\d+$/.test(n))n={t:"n",v:parseInt(n.replace("−","-"),10),z:"0"};if(typeof n==="object"){v=n.v;z=n.z}else v=n}
const num=typeof v==="number",f=td.firstElementChild,bold=!!(f&&f.tagName=="B"&&N(f.textContent)===tx),dz=td.classList.contains("s2")||!!td.querySelector(".dz");
let b,k;
if(th){b="th";k="th"}else if(tt){b=(num||r||tx==="")?tt+"n":tt;k=num||r?"num":"txt"}
else if(num){b="num";k="num"}else if(r){b="ctr";k="num"}else if(dz||(inp&&td.classList.contains("d"))){b="des";k="des"}else{b="txt";k=td.classList.contains("s1")?"code":"txt"}
const key=b+(bold&&!tt&&!th?"+b":"")+(z?"|"+z:""),len=th?Math.max(/d[ée]signation/i.test(tx)?27:0,...tx.split(" ").map(w=>w.length)):tx.length,cell={v,s:key,k,l:len};
for(let a=0;a<rs;a++){g[ri+a]=g[ri+a]||[];for(let q=0;q<cs;q++)g[ri+a][c+q]=(a==0&&q==0)?cell:{v:"",s:key,k:"fill",l:0}}
if(cs>1||rs>1)mg.push({r1:ri,c1:c,r2:ri+rs-1,c2:c+cs-1});c+=cs})});
const w=Math.max(0,...g.map(r=>r?r.length:0));
return{A:Array.from(g,r=>Array.from({length:w},(_,i)=>(r&&r[i])||null)),MG:mg}}
/* bloc de l'écran (carte) -> lignes : textes (titres, en-tête, montant en lettres) et tableaux */
function pageRows(card){const A=[],MG=[],BR=[],T=s=>s.replace(/\s+/g," ").trim(),BLK=/^(DIV|P|TABLE|H[1-6]|UL|OL|LI|SECTION)$/;
const para=segs=>{const L=[[]];segs.forEach(s=>String(s.t).split("\u2028").forEach((x,i)=>{if(i)L.push([]);L[L.length-1].push({t:x,b:s.b})}));
L.forEach(l=>{const tx=T(l.map(x=>x.t).join(""));if(!tx||/^(🔒|✅|⚠️)/.test(tx))return;const f=l.find(x=>T(x.t));A.push([{v:tx,s:f&&f.b?"p+b":"p",k:"para",l:tx.length}])})};
const walk=(n,bd)=>{let buf=[];const fl=()=>{if(buf.length)para(buf);buf=[]};
n.childNodes.forEach(e=>{if(e.nodeType==3){buf.push({t:e.textContent,b:bd});return}if(e.nodeType!=1)return;
if(e.matches(".np,button,select,input,label,textarea,script,style"))return;const tg=e.tagName;
if(tg=="TABLE"){fl();const t=t2a(e),o=A.length;t.MG.forEach(m=>MG.push({r1:m.r1+o,c1:m.c1,r2:m.r2+o,c2:m.c2}));t.A.forEach(r=>A.push(r));A.push([]);return}
if(BLK.test(tg)||e.querySelector("table")){fl();if(e.classList.contains("pgb")&&A.length)BR.push(A.length);walk(e,bd||tg=="H3"||/700|bold/.test(e.style.fontWeight));return}
buf.push({t:e.textContent,b:bd||tg=="B"||tg=="STRONG"})});fl()};
walk(card,false);return{A,MG,BR}}
/* grille -> feuille : largeurs de colonnes calculées sur le contenu, paragraphes fusionnés sur toute la largeur */
function finSheet(pg,note,wf,wm){let A=pg.A.slice(),MG=pg.MG.slice(),BR=(pg.BR||[]).slice();
if(note){A=[[{v:note,s:wm?"wm":"note",k:"para",l:note.length}],[]].concat(A);MG=MG.map(m=>({r1:m.r1+2,c1:m.c1,r2:m.r2+2,c2:m.c2}));BR=BR.map(b=>b+2)}
const nc=Math.max(1,...A.map(r=>r.length)),hm=new Set(MG.filter(m=>m.c2>m.c1).map(m=>m.r1+","+m.c1)),W=Array(nc).fill(0);
A.forEach((r,ri)=>r.forEach((c,ci)=>{if(!c||c.k=="para"||c.k=="fill"||hm.has(ri+","+ci))return;
const n=c.k=="th"?Math.min(c.l+3,30):c.k=="num"?c.l+3:c.k=="code"?Math.min(c.l+2,16):Math.min(c.l*1.05+2,55);if(n>W[ci])W[ci]=n}));
for(let i=0;i<nc;i++)W[i]=Math.round(Math.min(Math.max(W[i],6),60)*10)/10;
if(wf)W[0]=wf;else if(nc==1&&W[0]<60)W[0]=100;
const tw=W.reduce((a,b)=>a+b,0),H=[];
A=A.map((r,ri)=>{if(r.length==1&&r[0]&&r[0].k=="para"){const c=r[0],o=[c];for(let i=1;i<nc;i++)o.push({v:"",s:c.s,k:"fill",l:0});if(nc>1)MG.push({r1:ri,c1:0,r2:ri,c2:nc-1});
const ln=Math.ceil(c.l*1.1/Math.max(tw,20));if(ln>1)H[ri]=ln*15+2;return o}return r});
{const rr=A.length,sg=["Maître d’ouvrage","Maître d’œuvre","Entreprise"],row=[];for(let i=0;i<nc;i++)row.push({v:"",s:"sig",k:"fill",l:0});
if(nc>=3){const a=Math.floor(nc/3),b=nc-a;[[0,a-1],[a,b-1],[b,nc-1]].forEach((g,j)=>{row[g[0]].v=sg[j];if(g[1]>g[0])MG.push({r1:rr+1,c1:g[0],r2:rr+1,c2:g[1]})})}
else{row[0].v=sg.join("          ");if(nc>1)MG.push({r1:rr+1,c1:0,r2:rr+1,c2:nc-1})}
A.push([]);A.push(row);A.push([]);H[rr+1]=20;H[rr+2]=64}
return{A,MG,BR,W,H,land:tw>105,wm:!!wm}}
function sheetXml(m,sb,first,prot){const{A,MG,BR,W,H}=m,nc=W.length;
const rows=A.map((r,ri)=>`<row r="${ri+1}"${H&&H[ri]?` ht="${H[ri]}" customHeight="1"`:""}>${r.map((c,ci)=>{if(!c)return"";const ref=cl(ci)+(ri+1),s=c.s&&sb?` s="${sb.id(c.s)}"`:"";
if(c.v===""||c.v==null)return`<c r="${ref}"${s}/>`;
if(typeof c.v=="number"&&isFinite(c.v))return`<c r="${ref}"${s}><v>${c.v}</v></c>`;
return`<c r="${ref}"${s} t="inlineStr"><is><t xml:space="preserve">${xe(c.v)}</t></is></c>`}).join("")}</row>`).join("");
const mg=(MG||[]).filter(x=>x.r2>x.r1||x.c2>x.c1);
return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetPr><pageSetUpPr fitToPage="1"/></sheetPr><dimension ref="A1:${cl(nc-1)}${Math.max(A.length,1)}"/><sheetViews><sheetView${first?' tabSelected="1"':""} workbookViewId="0" showGridLines="0"/></sheetViews><sheetFormatPr defaultRowHeight="15"/><cols>${W.map((w,i)=>`<col min="${i+1}" max="${i+1}" width="${w}" customWidth="1"/>`).join("")}</cols><sheetData>${rows}</sheetData>${prot?'<sheetProtection sheet="1" objects="1" scenarios="1"/>':""}${mg.length?`<mergeCells count="${mg.length}">${mg.map(x=>`<mergeCell ref="${cl(x.c1)}${x.r1+1}:${cl(x.c2)}${x.r2+1}"/>`).join("")}</mergeCells>`:""}<pageMargins left="0.4" right="0.4" top="0.5" bottom="0.5" header="0.3" footer="0.3"/><pageSetup paperSize="9" orientation="${m.land?"landscape":"portrait"}" fitToHeight="0"/>${m.wm?'<headerFooter><oddHeader>&amp;C&amp;"-,Bold"&amp;16&amp;KFF0000VERSION D’ESSAI</oddHeader></headerFooter>':""}${BR&&BR.length?`<rowBreaks count="${BR.length}" manualBreakCount="${BR.length}">${BR.map(b=>`<brk id="${b}" max="16383" man="1"/>`).join("")}</rowBreaks>`:""}</worksheet>`}
function shName(n,used){n=n.replace(/[\[\]:*?\/\\]/g," ").slice(0,31);let b=n,i=2;while(used.has(n.toLowerCase())){n=b.slice(0,28)+" "+i++}used.add(n.toLowerCase());return n}
/* archive .xlsx (zip) écrite à la main : compressée si le navigateur le permet */
const CRCT=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc32=b=>{let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=CRCT[(c^b[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0};
async function zipX(files){const enc=new TextEncoder(),out=[],cd=[],u16=n=>[n&255,(n>>8)&255],u32=n=>[n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255];let off=0;
for(const[name,txt]of files){const nm=enc.encode(name),raw=enc.encode(txt),crc=crc32(raw);let dat=raw,meth=0;
if(typeof CompressionStream!=="undefined"){try{dat=new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream("deflate-raw"))).arrayBuffer());meth=8}catch(e){dat=raw;meth=0}}
const lh=new Uint8Array([0x50,0x4b,3,4,...u16(20),...u16(0),...u16(meth),...u16(0),...u16(0x21),...u32(crc),...u32(dat.length),...u32(raw.length),...u16(nm.length),...u16(0)]);
out.push(lh,nm,dat);cd.push({nm,crc,cs:dat.length,us:raw.length,meth,off});off+=lh.length+nm.length+dat.length}
const cp=[];let cds=0;cd.forEach(e=>{const h=new Uint8Array([0x50,0x4b,1,2,...u16(20),...u16(20),...u16(0),...u16(e.meth),...u16(0),...u16(0x21),...u32(e.crc),...u32(e.cs),...u32(e.us),...u16(e.nm.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(e.off)]);cp.push(h,e.nm);cds+=h.length+e.nm.length});
const end=new Uint8Array([0x50,0x4b,5,6,...u16(0),...u16(0),...u16(cd.length),...u16(cd.length),...u32(cds),...u32(off),...u16(0)]);
return new Blob([...out,...cp,end],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})}
function buildXlsx(sh){const sb=styleBook(),n=sh.length,hd='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n',R="http://schemas.openxmlformats.org/officeDocument/2006/relationships",files=[],sx=sh.map((s,i)=>sheetXml(s.m,sb,i==0,!s.hid));
files.push(["[Content_Types].xml",hd+`<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${sh.map((s,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`]);
files.push(["_rels/.rels",hd+`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${R}/officeDocument" Target="xl/workbook.xml"/></Relationships>`]);
files.push(["xl/workbook.xml",hd+`<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="${R}"><bookViews><workbookView activeTab="0"/></bookViews><sheets>${sh.map((s,i)=>`<sheet name="${xa(s.nm)}" sheetId="${i+1}"${s.hid?' state="veryHidden"':""} r:id="rId${i+1}"/>`).join("")}</sheets></workbook>`]);
files.push(["xl/_rels/workbook.xml.rels",hd+`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sh.map((s,i)=>`<Relationship Id="rId${i+1}" Type="${R}/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join("")}<Relationship Id="rId${n+1}" Type="${R}/styles" Target="styles.xml"/></Relationships>`]);
files.push(["xl/styles.xml",sb.xml()]);sx.forEach((x,i)=>files.push([`xl/worksheets/sheet${i+1}.xml`,x]));return files}
function exportX(id){if(!EXPORT_ON)return;if(licSt().k!="actif"){xmShow(id);return}const p0=S.projects.find(x=>x.id==id);if(!p0)return;
const sv={cur:S.cur,tab:S.tab,msg:S.msg,pz:S.pz,cand:CAND,sit:p0.sit,avn:p0.avn,sd:p0.sd};let fn="",files=null;
try{S.cur=id;S.msg="";S.pz=false;CAND=[];const p=p0,sh=[],used=new Set(),wm=licSt().wm,dt=new Date().toLocaleDateString("fr-FR"),note=(wm?"VERSION D’ESSAI – ":"")+"Fichier en lecture seule – exporté de Situations_DGD le "+dt+" – projet : "+p.name;
const add=(nm,pg,nt,wf)=>sh.push({nm:shName(nm,used),m:finSheet(pg,nt,wf,wm)});
const cards=html=>{const d=document.createElement("div");d.innerHTML=String(html).replace(/<br\s*\/?>/gi,"\u2028");const o=[];[...d.children].forEach(c=>(c.classList.contains("land")?[...c.children]:[c]).forEach(x=>{if(!x.matches(".np")&&x.querySelector("table"))o.push(x)}));return o};
const merge=cs=>{const A=[],MG=[],BR=[];cs.forEach((c,i)=>{const g=pageRows(c),o=A.length;if(i)BR.push(o);g.MG.forEach(m=>MG.push({r1:m.r1+o,c1:m.c1,r2:m.r2+o,c2:m.c2}));g.BR.forEach(b=>BR.push(b+o));g.A.forEach(r=>A.push(r))});return{A,MG,BR}};
const put=(names,html)=>{const cs=cards(html);if(!cs.length)return;if(cs.length===names.length)cs.forEach((c,i)=>add(names[i],pageRows(c),note));else add(names[0],merge(cs),note)};
const pc=(t,b)=>[{v:t,s:b?"p+b":"p",k:"para",l:t.length}];
put(["Devis"],VW.devis(p));
const hasD=k=>(p.val&&p.val[k])||p.items.some(it=>(it.m[k-1]||0)>0)||k==sv.sit;
for(let k=1;k<=4;k++)if(hasD(k)){p.sit=k;put(["Attachement "+k],VW.attachement(p));put(["Décompte "+k,"Récap décompte "+k],VW.decompte(p));put(["Situation "+k],VW.situation(p))}
p.sit=sv.sit;
if(p.items.some(it=>it.m.some(x=>x>0))){p.sd=true;put(["Situation définitive"],VW.situation(p));p.sd=sv.sd}
const av=new Set([sv.avn||1]);Object.keys(p.cp||{}).forEach(k=>{if(p.cp[k].length)av.add(+k)});p.items.forEach(it=>(it.av||[]).forEach((x,j)=>{if(x)av.add(j+1)}));
[...av].sort((a,b)=>a-b).forEach(n=>{p.avn=n;put(["Avenant "+n+" - Supplémentaires","Avenant "+n+" - Diminution","Avenant "+n+" - Complémentaires","Avenant "+n+" - Récapitulatif","Avenant "+n+" - Nouveau devis"],VW.avenants(p))});
p.avn=sv.avn;
put(["DGD","Récap DGD"],VW.dgd(p));
/* données de restauration (feuille très cachée) */
const js=JSON.stringify({v:1,app:"archigest-dz",at:new Date().toISOString(),project:p}),R=[[{v:"ARCHIGEST-DZ-V1"}]];for(let i=0;i<js.length;i+=30000)R.push([{v:js.slice(i,i+30000)}]);
sh.push({nm:"_archigest",hid:1,m:{A:R,MG:[],BR:[],W:[20],H:[],land:false}});
fn=(p.name.replace(/[\\/:*?"<>|]+/g," ").trim().slice(0,60)||"projet")+" – Situations_DGD – "+new Date().toISOString().slice(0,10)+".xlsx";
files=buildXlsx(sh)}catch(x){sv.err=x}finally{p0.sit=sv.sit;p0.avn=sv.avn;p0.sd=sv.sd;S.cur=sv.cur;S.tab=sv.tab;S.msg=sv.msg;S.pz=sv.pz;CAND=sv.cand}
const fail=x=>{S.bm="L’export a échoué : "+(x&&x.message||"erreur inconnue")+". Rien n’a été modifié dans vos données.";go()};
if(!files){fail(sv.err);return}
zipX(files).then(bl=>{const a=document.createElement("a");a.href=URL.createObjectURL(bl);a.download=fn;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000);
licCnt("export-excel","Export Excel");S.bm="✅ Fichier « "+fn+" » créé (lecture seule). Conservez-le : il permet aussi de restaurer le projet.";go()}).catch(fail)}
function restX(inp){const fl=inp.files[0];inp.value="";if(!fl)return;if(!licGate())return;
if(S.mode=="entreprise"&&(S.projects.length||S.entUsed)){S.bm="Profil entreprise : un seul dossier. Utilisez « Réinitialiser » pour recommencer à zéro.";go();return}
const rd=new FileReader();rd.onload=e=>{try{if(typeof XLSX==="undefined"){S.bm="La bibliothèque Excel n’est pas chargée (connexion internet ?). Réessayez.";go();return}
const wb=XLSX.read(e.target.result,{type:"array"}),ws=wb.Sheets["_archigest"];
if(!ws){S.bm="Ce fichier ne contient pas de données de restauration Situations_DGD (il n’a pas été exporté par l’application). Pour un devis, utilisez « Importer un devis ».";go();return}
const rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:""});if(!rows.length||rows[0][0]!=="ARCHIGEST-DZ-V1")throw new Error("format");
const o=JSON.parse(rows.slice(1).map(r=>r[0]).join("")),q=o&&o.project;
if(!q||typeof q.name!=="string"||!Array.isArray(q.items)||!q.items.every(it=>it&&typeof it.d==="string"&&isFinite(it.q)&&isFinite(it.pu)&&Array.isArray(it.m)))throw new Error("contenu");
q.id=Date.now()+Math.floor(Math.random()*1000);if(S.mode!="entreprise"){q.rs=1;let n="Devis restauré",k=1;while(S.projects.some(x=>x.grp===q.grp&&x.name===n))n="Devis restauré "+(++k);q.name=n}else if(S.projects.some(x=>x.name===q.name&&x.grp===q.grp))q.name+=" (restauré)";
S.projects.push(q);S.cur=q.id;S.del=null;opn(q.id)}
catch(x){S.bm="Fichier illisible ou endommagé : la restauration est impossible. Aucune donnée n’a été modifiée.";go()}};
rd.onerror=()=>{S.bm="Lecture du fichier impossible.";go()};rd.readAsArrayBuffer(fl)}
const RSB=`<label class="btn" style="display:block;text-align:center;font-size:16px;padding:14px">📥 Restaurer depuis un fichier Excel<input type="file" accept=".xlsx" style="display:none" onchange="restX(this)"></label>`;
