/* Two choices; email uses the original final-page receipt helper. */
(()=>{'use strict';
const root=document.getElementById('party-rsvp');if(!root)return;
const name=(new URLSearchParams(location.search).get('name')||'OPERATIVE').replace(/[\x00-\x1f\x7f]/g,'').trim().slice(0,32).toUpperCase()||'OPERATIVE';
const solo=document.getElementById('rsvp-solo'),plus=document.getElementById('rsvp-plus'),status=document.getElementById('rsvp-status');
const key='matrix-after-dark:2026-11-07:choice-ui:v18:'+encodeURIComponent(name);
let mode=null,busy=false;
try{const saved=window.localStorage.getItem(key);if(['solo','backup'].includes(saved))mode=saved;}catch{}
function render(){for(const [button,value] of [[solo,'solo'],[plus,'backup']]){button.disabled=busy;button.setAttribute('aria-pressed',String(mode===value));}status.textContent=mode?'SELECTION LOCKED.':'';}
async function choose(value){
 if(busy)return;mode=value;
 try{window.localStorage.setItem(key,mode);}catch{}
 busy=true;render();
 try{await window.CompletionReceipt?.selected({name,mode});}catch{}finally{busy=false;render();}
}
solo.addEventListener('click',()=>choose('solo'));plus.addEventListener('click',()=>choose('backup'));
render();
})();
