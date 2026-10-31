/* One-tap response: acknowledge only after the response service records it. */
(()=>{'use strict';
const root=document.getElementById('party-rsvp');if(!root)return;
const endpoint='https://matrix-after-dark-responses.steven106747.chatgpt.site';
const name=(new URLSearchParams(location.search).get('name')||'OPERATIVE').replace(/[\x00-\x1f\x7f]/g,'').trim().slice(0,32).toUpperCase()||'OPERATIVE';
const solo=document.getElementById('rsvp-solo'),plus=document.getElementById('rsvp-plus'),status=document.getElementById('rsvp-status');
const unique=()=>{const bytes=new Uint8Array(16);crypto.getRandomValues(bytes);return Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');};
let clientId;try{clientId=window.localStorage.getItem('matrix:response-client:v1');if(!/^[a-f0-9]{32}$/.test(clientId||'')){clientId=unique();window.localStorage.setItem('matrix:response-client:v1',clientId);}}catch{clientId=unique();}
const params=new URLSearchParams(location.search),trial=params.get('trial')==='1';
const rawInvite=params.get('invite'),inviteId=rawInvite&&/^[a-z0-9][a-z0-9_-]{0,63}$/i.test(rawInvite)?rawInvite.toLowerCase():null;
if(trial||inviteId)document.addEventListener('click',event=>{const home=event.target?.closest?.('[data-home-link]');if(!home)return;const url=new URL(home.href,location.href);if(url.origin===location.origin){if(trial)url.searchParams.set('trial','1');if(inviteId)url.searchParams.set('invite',inviteId);home.href=url.href;}},true);
const key='matrix:recorded-response:v19:'+encodeURIComponent(inviteId?'INVITE:'+inviteId:name)+(trial?':trial':'');
let record=null,busy=false,retry=0,attempts=0;
try{const r=JSON.parse(window.localStorage.getItem(key));if(r&&r.name===name&&(r.inviteId||null)===inviteId&&['solo','backup'].includes(r.choice)&&/^[a-f0-9]{32}$/.test(r.id)&&typeof r.recorded==='boolean'&&!(trial&&r.recorded))record=r;}catch{}
function persist(){try{window.localStorage.setItem(key,JSON.stringify(record));}catch{}}
function render(){root.setAttribute('aria-busy',String(busy));for(const [button,choice] of [[solo,'solo'],[plus,'backup']]){button.disabled=busy;button.setAttribute('aria-pressed',String(record?.choice===choice));}status.textContent=record?.recorded?'SELECTION LOCKED.':'';}
async function request(path,data,token){const controller=new AbortController(),timeout=window.setTimeout(()=>controller.abort(),15000);try{const response=await fetch(endpoint+path,{method:'POST',headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},body:JSON.stringify(data),signal:controller.signal,keepalive:true});if(!response.ok)throw Error('Unavailable');return await response.json();}finally{window.clearTimeout(timeout);}}
async function flush(){if(busy||!record||record.recorded||document.hidden)return;window.clearTimeout(retry);busy=true;attempts++;render();const pending=record;try{const session=await request('/api/session',{name,clientId,trial,inviteId});if(typeof session.token!=='string')throw Error('Missing session');const result=await request('/api/respond',{choice:pending.choice,requestId:pending.id},session.token);if(result.recorded!==true||result.id!==pending.id)throw Error('Not recorded');record={...pending,recorded:true};persist();}catch{}finally{busy=false;render();if(record&&!record.recorded&&attempts<3)retry=window.setTimeout(flush,5000);}}
function choose(choice){if(busy)return;if(record?.choice===choice&&record.recorded)return;if(record?.choice!==choice)record={name,inviteId,choice,id:unique(),recorded:false};persist();attempts=0;flush();}
solo.addEventListener('click',()=>choose('solo'));plus.addEventListener('click',()=>choose('backup'));
window.addEventListener('online',()=>{attempts=0;flush();});document.addEventListener('visibilitychange',()=>{if(!document.hidden){attempts=0;flush();}});
render();if(record&&!record.recorded)flush();
})();
