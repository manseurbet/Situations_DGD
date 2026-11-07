render();
if("serviceWorker" in navigator&&location.protocol.indexOf("http")===0)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));

/* champs numériques : le 0,00 se vide au clic (ce qu’on tape remplace), la valeur revient si on ne tape rien */
addEventListener("focusin",e=>{const t=e.target;if(t&&t.tagName=="INPUT"&&t.type=="number"){t.dataset.o=t.value;if(+t.value===0)t.value="";else try{t.select()}catch(x){}}});
addEventListener("focusout",e=>{const t=e.target;if(t&&t.tagName=="INPUT"&&t.type=="number"&&t.value===""&&t.dataset.o!==undefined)t.value=t.dataset.o});
