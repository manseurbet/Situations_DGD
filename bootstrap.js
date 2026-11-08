render();
if("serviceWorker" in navigator&&location.protocol.indexOf("http")===0)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));

/* champs numériques : le 0,00 se vide au clic (ce qu’on tape remplace), la valeur revient si on ne tape rien */
addEventListener("focusin",e=>{const t=e.target;if(t&&t.tagName=="INPUT"&&t.type=="number"){t.dataset.o=t.value;if(+t.value===0)t.value="";else try{t.select()}catch(x){}}});
addEventListener("focusout",e=>{const t=e.target;if(t&&t.tagName=="INPUT"&&t.type=="number"&&t.value===""&&t.dataset.o!==undefined)t.value=t.dataset.o});
/* impression : « Maître d’ouvrage / Maître d’œuvre / Entreprise » à la fin de chaque document (bloc ajouté juste le temps d’imprimer) */
addEventListener("beforeprint",()=>{document.querySelectorAll("#v .card").forEach(c=>{if(c.classList.contains("np")||c.querySelector(".card")||c.querySelector(".sig")||!c.querySelector("table"))return;const d=document.createElement("div");d.className="sig";d.innerHTML="<span>Maître d’ouvrage</span><span>Maître d’œuvre</span><span>Entreprise</span>";c.appendChild(d)})});
addEventListener("afterprint",()=>{document.querySelectorAll("#v .sig").forEach(e=>e.remove())});
