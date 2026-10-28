/* One continuous action stream, with code rain in the foreground. */
(()=>{'use strict';
const life=window.ProgramLifecycle,$=s=>document.querySelector(s),body=document.body;
const name=(new URLSearchParams(location.search).get('name')||'OPERATIVE').replace(/[\x00-\x1f\x7f]/g,'').trim().slice(0,32).toUpperCase()||'OPERATIVE';
const stream=$('#brief-stream'),video=$('#brief-action'),music=$('#brief-music'),sound=$('#brief-sound'),panel=$('#training-ready');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let started=false,arrived=false,epoch=0,muted=false,watchdog=0;
const wait=ms=>new Promise(resolve=>life.setTimeout(()=>resolve(true),ms));
function syncSound(){music.muted=muted;sound.textContent=muted?'SOUND OFF':'SOUND ON';sound.setAttribute('aria-pressed',String(!muted));}
function playMusic(){music.volume=.38;syncSound();return music.play().catch(()=>{sound.textContent='[ ENABLE SOUND ]';});}
sound.addEventListener('click',()=>{if(music.paused){muted=false;playMusic();}else{muted=!muted;syncSound();}});
function preparePortrait(){
 const slot=$('#training-ready-slot');slot.replaceChildren();const portrait=document.createElement('div');portrait.className='ready-portrait';const img=document.createElement('img');img.src='./briefing-media/final-trio.png';img.alt='Trinity, Neo and Morpheus in green CRT code';portrait.append(img);slot.append(portrait);
 return Promise.race([img.decode?.().catch(()=>{}),wait(1500)]).then(()=>{
  const r=slot.getBoundingClientRect(),w=r.width,h=r.height,scale=Math.min(w/(img.naturalWidth||640),h/(img.naturalHeight||793));
  portrait.style.width=w+'px';portrait.style.height=h+'px';img.style.width=(img.naturalWidth||640)*scale+'px';img.style.height=(img.naturalHeight||793)*scale+'px';img.style.left=(w-(img.naturalWidth||640)*scale)/2+'px';img.style.top=(h-(img.naturalHeight||793)*scale)/2+'px';
 });
}
async function arrive(){if(arrived)return;arrived=true;epoch++;life.clearTimeout(watchdog);video.pause();stream.hidden=true;$('#training-stage').hidden=false;panel.hidden=false;panel.scrollTop=0;
 $('#training-ready-title').textContent='MISSION BRIEFING // ACCESS GRANTED';$('#final-profile-review').hidden=true;$('#training-replay').hidden=true;
 await preparePortrait();const token=epoch;
 await window.BriefingFinale.show({panel,profile:{subject:name,role:'ZION // RESISTANCE SIGNAL'},valid:()=>token===epoch,wait,quiet:reduced,gatherCharacter:true});
}
async function begin(){if(started)return;started=true;body.dataset.briefing='true';delete body.dataset.pathMenu;$('#path-choice').hidden=true;stream.hidden=false;sound.hidden=false;music.preload='auto';playMusic();
 // Separate facade only: the approved Construct engine remains idle behind this route.
 window.ZionAudio={get muted(){return muted;}};
 window.ProgramSurge.start($('#brief-rain'),{ambient:true,quiet:reduced});
 $('#brief-skip').focus({preventScroll:true});if(reduced){await arrive();return;}
 const token=++epoch;await wait(350);if(token!==epoch)return;
 watchdog=life.setTimeout(arrive,8500);
 try{await video.play();if(token===epoch)stream.dataset.playing='true';}catch{await arrive();}
}
video.addEventListener('ended',arrive);video.addEventListener('error',()=>{if(started)arrive();});
$('#brief-skip').addEventListener('click',arrive);
$('#path-briefing').addEventListener('click',begin);
$('#path-construct').addEventListener('click',()=>{if(started)return;delete body.dataset.pathMenu;$('#path-choice').hidden=true;window.ZionTerminal.reset();});
})();
