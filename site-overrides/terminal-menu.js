/* Personalised terminal menu: same pausable clock as the Construct opening. */
(()=>{'use strict';const menu=document.getElementById('path-choice');if(!menu)return;
const life=window.ProgramLifecycle,body=document.body;
const name=(new URLSearchParams(location.search).get('name')||'OPERATIVE').replace(/[\x00-\x1f\x7f]/g,'').trim().slice(0,32).toUpperCase()||'OPERATIVE';
const greeting=menu.querySelector('[data-menu-type="welcome"]');greeting.textContent='WELCOME, '+name+'.';document.getElementById('path-welcome').setAttribute('aria-label',greeting.textContent);
const rows=Array.from(menu.querySelectorAll('[data-menu-type]'),(el,i)=>{const text=el.textContent;el.replaceChildren();const ghost=document.createElement('span'),typed=document.createElement('span');ghost.className='menu-ghost';ghost.setAttribute('aria-hidden','true');ghost.textContent=text;typed.className='menu-typed';el.append(ghost,typed);return{typed,text,speed:i===0?32:i===1?20:10};});
let cancelled=false;const stop=()=>{cancelled=true;for(const row of rows)row.typed.classList.remove('menu-typing');};
for(const id of ['path-construct','path-briefing'])document.getElementById(id).addEventListener('click',stop);
const wait=ms=>new Promise(resolve=>life.setTimeout(resolve,ms));
async function type(){if(matchMedia('(prefers-reduced-motion: reduce)').matches){for(const row of rows)row.typed.textContent=row.text;body.dataset.menuReady='true';return;}
// Wait for the terminal's physical layers to finish loading before the first line.
while(!document.querySelector('.stage').classList.contains('art-ready')){if(cancelled)return;await wait(50);}
await wait(150);for(const row of rows){if(cancelled)return;row.typed.classList.add('menu-typing');for(let i=1;i<=row.text.length;i++){if(cancelled)return;row.typed.textContent=row.text.slice(0,i);await wait(row.speed);}row.typed.classList.remove('menu-typing');await wait(row===rows[0]?260:80);}if(!cancelled)body.dataset.menuReady='true';}
type();})();
