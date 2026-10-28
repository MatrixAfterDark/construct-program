/* Express route only. Existing Construct scripts and media are unchanged. */
(()=>{'use strict';
const life=window.ProgramLifecycle,$=s=>document.querySelector(s);
const name=(new URLSearchParams(location.search).get('name')||'OPERATIVE').replace(/[\x00-\x1f\x7f]/g,'').trim().slice(0,32).toUpperCase()||'OPERATIVE';
const root=$('#brief-root'),cinema=$('#brief-cinema'),video=$('#brief-clip'),music=$('#brief-music'),sound=$('#brief-sound'),start=$('#brief-start'),panel=$('#training-ready');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let epoch=0,started=false,arrived=false,muted=false;
const shots=[['morpheus',1200,'FOLLOW THE SIGNAL'],['trinity',3150,'DEFY THE RULES'],['neo',3000,'FREE YOUR MIND'],['guns',2880,'WELCOME TO THE CONSTRUCT']];
const wait=ms=>new Promise(resolve=>life.setTimeout(()=>resolve(true),ms));
function syncSound(){sound.textContent=muted?'SOUND OFF':'SOUND ON';sound.setAttribute('aria-pressed',String(!muted));music.muted=muted;window.ZionAudio={muted};}
function playMusic(){music.volume=.38;syncSound();return music.play().then(()=>{sound.textContent=muted?'SOUND OFF':'SOUND ON';}).catch(()=>{sound.textContent='[ ENABLE SOUND ]';});}
sound.addEventListener('click',()=>{if(music.paused){muted=false;playMusic();}else{muted=!muted;syncSound();}});
// Used only by the reused finale sound synchronisation.
const proxy=document.createElement('button');proxy.id='sound-toggle';proxy.hidden=true;proxy.onclick=()=>{muted=!muted;syncSound();};root.append(proxy);
async function readyShot(key,token){
 video.poster='./briefing-media/'+key+'.jpg';video.src='./briefing-media/'+key+'.mp4';video.load();
 return new Promise(resolve=>{let done=false;const finish=()=>{if(done)return;done=true;video.removeEventListener('canplay',finish);video.removeEventListener('error',finish);life.clearTimeout(timeout);resolve(token===epoch);};const timeout=life.setTimeout(finish,1800);video.addEventListener('canplay',finish,{once:true});video.addEventListener('error',finish,{once:true});if(video.readyState>=3)finish();});
}
async function arrive(){if(arrived)return;arrived=true;epoch++;video.pause();cinema.hidden=true;start.hidden=true;panel.hidden=false;panel.scrollTop=0;
 // Send only on final-page entry, never when the path picker or montage opens.
 window.CompletionReceipt?.reached({panel,name});
 const token=epoch;
 await window.BriefingFinale.show({panel,profile:{subject:name,role:'ZION OPERATIVE'},valid:()=>token===epoch,wait,quiet:reduced});
 if(token===epoch)$('#final-details-cue')?.focus({preventScroll:true});
}
async function begin(){if(started)return;started=true;root.hidden=false;$('#path-choice').hidden=true;start.hidden=true;cinema.hidden=false;music.preload='auto';playMusic();
 window.ProgramSurge?.start($('#brief-rain'),{ambient:true,quiet:reduced});
 const token=++epoch;$('#brief-status').textContent='ACCESS GRANTED';$('#brief-skip').focus({preventScroll:true});
 if(reduced){await arrive();return;}
 await wait(500);if(token!==epoch)return;
 for(const [key,duration,label] of shots){
  cinema.removeAttribute('data-shot');video.pause();
  if(!await readyShot(key,token)||token!==epoch)return;
  cinema.dataset.shot=key;$('#brief-status').textContent=label;
  try{await video.play();}catch{} // A blocked/failed clip retains its poster and never blocks the invitation.
  await wait(duration);if(token!==epoch)return;
 }
 cinema.removeAttribute('data-shot');$('#brief-status').textContent='TRANSMISSION RECEIVED';await wait(260);if(token===epoch)await arrive();
}
$('#brief-skip').addEventListener('click',arrive);
const link=document.querySelector('[data-route="briefing.html"]');link?.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();begin();});
start.addEventListener('click',begin);
if(document.body.dataset.directBriefing==='true'){root.hidden=false;$('#path-choice').hidden=true;start.hidden=false;sound.hidden=true;start.addEventListener('click',()=>{sound.hidden=false;},{once:true});}
// Warm the small clips after the first render. Audio waits for the guest's click.
for(const [key] of shots){const hint=document.createElement('link');hint.rel='prefetch';hint.href='./briefing-media/'+key+'.mp4';document.head.append(hint);}
})();
