/* One-tap RSVP with silent notification. No media or sequence code is touched. */
(()=>{'use strict';const root=document.getElementById('party-rsvp');if(!root)return;
const name=(new URLSearchParams(location.search).get('name')||'OPERATIVE').replace(/[\x00-\x1f\x7f]/g,'').trim().slice(0,32).toUpperCase()||'OPERATIVE';
// Fill with the owner's Formspree endpoint before deployment.
const endpoint='',solo=document.getElementById('rsvp-solo'),plus=document.getElementById('rsvp-plus'),status=document.getElementById('rsvp-status');
const key='matrix-after-dark:2026-11-07:rsvp:formspree:v1:'+encodeURIComponent(name);
let record=null,busy=false,attempts=0,retry=0;
function read(){try{const r=JSON.parse(window.localStorage.getItem(key));if(r?.name===name&&['solo','backup'].includes(r.mode)&&typeof r.id==='string'&&typeof r.delivered==='boolean')return r;}catch{}return null;}
function persist(){try{window.localStorage.setItem(key,JSON.stringify(record));}catch{}}
function render(){root.setAttribute('aria-busy',String(busy));for(const [button,mode] of [[solo,'solo'],[plus,'backup']]){button.disabled=busy;button.setAttribute('aria-pressed',String(record?.mode===mode));}status.textContent=record?'SELECTION LOCKED.':'';}
function clearRetry(){window.clearTimeout(retry);retry=0;}
async function flush(){if(!/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)||busy||!record||record.delivered||document.hidden)return;clearRetry();busy=true;attempts++;render();const sending=record,controller=typeof AbortController==='function'?new AbortController():null;let timeout;
 try{
  const request=fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},keepalive:true,...(controller?{signal:controller.signal}:{}),body:JSON.stringify({name,response:'ATTENDING',plus_one:sending.mode==='backup'?'YES':'NO',event:'The Matrix After Dark — 7 November 2026',submitted_at:sending.selectedAt,_subject:'Matrix After Dark RSVP — '+name+' — '+(sending.mode==='solo'?'SOLO':'+1')})}).then(async response=>{if(!response.ok)throw Error('Request rejected');const result=await response.json();if(result.errors||result.ok===false||result.success===false)throw Error('Notification not accepted');});
  await Promise.race([request,new Promise((_,reject)=>{timeout=window.setTimeout(()=>{controller?.abort();reject(Error('Request timed out'));},15000);})]);
  if(record?.id===sending.id){record={...record,delivered:true};persist();}
 }catch{}finally{window.clearTimeout(timeout);busy=false;render();if(record&&!record.delivered&&attempts<3)retry=window.setTimeout(()=>{retry=0;flush();},attempts===1?20000:60000);}
}
function choose(mode){if(busy)return;if(record?.mode===mode){if(!record.delivered){attempts=0;flush();}return;}clearRetry();record={name,mode,id:typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+'-'+Math.random().toString(36).slice(2),selectedAt:new Date().toISOString(),delivered:false,updated:!!record?.delivered||!!record?.updated};persist();attempts=0;render();flush();}
solo.addEventListener('click',()=>choose('solo'));plus.addEventListener('click',()=>choose('backup'));
window.addEventListener('online',()=>{attempts=0;flush();});document.addEventListener('visibilitychange',()=>{if(!document.hidden){attempts=0;flush();}});
record=read();render();if(record&&!record.delivered)flush();
})();
