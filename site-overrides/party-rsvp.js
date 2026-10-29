/* Explicit guest confirmation only. Independent of all media and sequence code. */
(()=>{'use strict';
const root=document.getElementById('party-rsvp');if(!root)return;
const $=id=>document.getElementById(id),endpoint='https://formsubmit.co/ajax/steven.cuzzillo@gmail.com';
const fallback=document.getElementById('rsvp-email-fallback');
const clean=(value,max=32)=>String(value||'').replace(/[\x00-\x1f\x7f]/g,'').trim().slice(0,max);
const linkedName=clean(new URLSearchParams(location.search).get('name')).toUpperCase();
const known=!!linkedName&&linkedName!=='OPERATIVE';
const nameInput=$('rsvp-name'),backupInput=$('rsvp-backup'),form=$('rsvp-form'),choices=$('rsvp-choices'),status=$('rsvp-status'),change=$('rsvp-change'),solo=$('rsvp-solo'),plus=$('rsvp-plus'),confirm=$('rsvp-confirm');
let busy=false,record=null;
nameInput.value=known?linkedName:'';nameInput.setAttribute('aria-required',String(!known));$('rsvp-name-row').hidden=known;
const name=()=>known?linkedName:clean(nameInput.value).toUpperCase();
const key=n=>'matrix-after-dark:2026-11-07:rsvp:v1:'+encodeURIComponent(n);
const signature=(mode,backup)=>JSON.stringify([mode,mode==='backup'?backup:'']);
function saved(n){try{const r=JSON.parse(window.localStorage.getItem(key(n)));if(r?.name===n&&['solo','backup'].includes(r.mode)&&typeof r.backup==='string')return r;}catch{}return null;}
function remember(r){record=r;try{window.localStorage.setItem(key(r.name),JSON.stringify(r));}catch{}}
function setBusy(value){busy=value;root.setAttribute('aria-busy',String(value));for(const el of [nameInput,backupInput,solo,plus,confirm,change])el.disabled=value;}
function message(text,error=false){status.textContent=text;status.dataset.state=error?'error':'ready';}
function confirmed(r){fallback.hidden=true;$('rsvp-name-row').hidden=true;choices.hidden=true;form.hidden=true;plus.setAttribute('aria-expanded','false');change.hidden=false;message('CONNECTION CONFIRMED. SEE YOU IN THE MATRIX.');$('rsvp-summary').textContent=r.mode==='solo'?'SOLO OPERATIVE // 1 GUEST':'BRINGING BACKUP // 2 GUESTS'+(r.backup?' · '+r.backup:'');}
function validName(){if(name())return true;message('ENTER YOUR NAME TO CONFIRM.',true);nameInput.focus();return false;}
async function send(mode){if(busy||!validName())return;const guest=name(),backup=mode==='backup'?clean(backupInput.value,64).toUpperCase():'';
 const previous=record?.name===guest?record:saved(guest);if(previous&&signature(previous.mode,previous.backup)===signature(mode,backup)){record=previous;confirmed(previous);return;}
 fallback.hidden=true;setBusy(true);message('TRANSMITTING CONNECTION…');
 const controller=typeof AbortController==='function'?new AbortController():null;let timeout;
 try{
  const request=fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},keepalive:true,...(controller?{signal:controller.signal}:{}),body:JSON.stringify({name:guest,attendance:'CONFIRMED',response:mode==='solo'?'SOLO OPERATIVE':'BRINGING BACKUP',party_size:mode==='solo'?1:2,backup_name:backup||'NOT PROVIDED',event:'The Matrix After Dark — 7 November 2026',submitted_at:new Date().toISOString(),_subject:'Matrix Construct — RSVP'+(previous?' UPDATED':'')+' — '+guest+' — '+(mode==='solo'?'SOLO':'+1'),_template:'table',_captcha:'false'})}).then(async response=>{if(!response.ok)throw Error('Request rejected');const result=await response.json();if(result.success!==true&&result.success!=='true')throw Error('Submission not accepted');});
  await Promise.race([request,new Promise((_,reject)=>{timeout=window.setTimeout(()=>{controller?.abort();reject(Error('Request timed out'));},15000);})]);
  const confirmedRecord={name:guest,mode,backup,submittedAt:new Date().toISOString()};remember(confirmedRecord);confirmed(confirmedRecord);
 }catch{const subject='Matrix Construct — RSVP — '+guest+' — '+(mode==='solo'?'SOLO':'+1');const body=['NAME: '+guest,'ATTENDANCE: CONFIRMED','PARTY SIZE: '+(mode==='solo'?'1':'2'),'BACKUP: '+(backup||'NOT PROVIDED'),'EVENT: THE MATRIX AFTER DARK — 7 NOVEMBER 2026'].join('\n');fallback.href='mailto:steven.cuzzillo@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);fallback.hidden=false;message('UPLINK UNAVAILABLE. TRY AGAIN OR SEND BY EMAIL.',true);}
 finally{window.clearTimeout(timeout);setBusy(false);}
}
solo.addEventListener('click',()=>send('solo'));
plus.addEventListener('click',()=>{if(busy||!validName())return;form.hidden=false;plus.setAttribute('aria-expanded','true');backupInput.focus();message('');});
form.addEventListener('submit',event=>{event.preventDefault();send('backup');});
fallback.addEventListener('click',()=>{message('SEND THE MESSAGE IN YOUR EMAIL APP TO CONFIRM.');});
change.addEventListener('click',()=>{if(busy)return;choices.hidden=false;$('rsvp-name-row').hidden=known;change.hidden=true;$('rsvp-summary').textContent='';message('');form.hidden=record?.mode!=='backup';plus.setAttribute('aria-expanded',String(!form.hidden));backupInput.value=record?.backup||'';solo.focus();});
if(known){record=saved(linkedName);if(record)confirmed(record);}
})();
