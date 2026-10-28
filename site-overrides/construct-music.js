/* Continuous Construct music: explicit silent warm-up, gain ducking and interruption recovery. */
(()=>{'use strict';const life=window.ProgramLifecycle;
function create({media,context,active,muted}){
 let level=media.volume,source=null,gain=null,ctx=null,primed=false,primeRun=0,attempts=0,retry=0;
 function graph(){const next=context();if(!next?.createMediaElementSource)return;
  if(!source){try{const g=next.createGain(),s=next.createMediaElementSource(media);s.connect(g);g.connect(next.destination);source=s;gain=g;ctx=next;media.volume=1;g.gain.value=level;
   ctx.addEventListener?.('statechange',()=>{if(ctx.state==='running'&&active()&&!document.hidden&&!muted())ensure(false);});
  }catch{gain=null;}}
 }
 function setLevel(value){level=Math.max(0,Math.min(1,value));graph();if(gain)gain.gain.value=level;else media.volume=level;}
 function ensure(reset=true){if(reset)attempts=0;if(!active()||document.hidden)return Promise.resolve(false);
  primeRun++;graph();media.muted=!!muted();if(media.muted)return Promise.resolve(false);
  if(ctx&&ctx.state!=='running')ctx.resume?.().catch(()=>{});
  if(!media.paused&&!media.ended)return Promise.resolve(true);
  try{return Promise.resolve(media.play()).then(()=>true,()=>false);}catch{return Promise.resolve(false);}
 }
 function prime(){if(primed)return;primed=true;const own=++primeRun;graph();setLevel(0);media.muted=true;
  try{Promise.resolve(media.play()).then(()=>{if(own!==primeRun)return;if(active()){media.muted=!!muted();ensure();}else{media.pause();media.currentTime=0;}},()=>{if(own===primeRun)primed=false;});}catch{primed=false;}
 }
 media.addEventListener('pause',()=>{if(!active()||document.hidden||muted()||attempts>=2||retry)return;retry=life.setTimeout(()=>{retry=0;if(!active()||document.hidden||muted())return;attempts++;ensure(false);},250);});
 const recover=()=>{if(active()&&!document.hidden&&!muted())ensure();};
 document.addEventListener('pointerdown',recover,{passive:true});document.addEventListener('visibilitychange',()=>{if(!document.hidden)recover();});
 function stop(){primeRun++;life.clearTimeout(retry);retry=0;attempts=0;media.muted=true;media.pause();}
 return{prime,ensure,setLevel,stop,get level(){return level;}};
}
window.ConstructMusic={create};})();
