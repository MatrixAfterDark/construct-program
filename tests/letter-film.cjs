const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const source=fs.readFileSync('site-overrides/training.js','utf8');
const code=source.slice(source.indexOf('function prepareLetterFilm()'),source.indexOf('function completionName()'));
function setup(){
 let now=0,id=0,loads=0,frames=0;const timers=new Map(),listeners={},stops=new Set();
 const film={src:'./assets/crt-letter-flythrough.mp4',networkState:2,readyState:0,currentTime:0,hidden:true,
  getAttribute(){return this.src},load(){loads++},play(){return Promise.resolve()},pause(){},
  addEventListener(k,f){listeners[k]=f},removeEventListener(k){delete listeners[k]},
  requestVideoFrameCallback(){return 9},cancelVideoFrameCallback(){}};
 const scope={Promise,$:()=>film,valid:()=>true,mediaStops:stops,
  setTimeout(f,ms){timers.set(++id,{at:now+ms,f});return id},clearTimeout(i){timers.delete(i)}};
 vm.createContext(scope);vm.runInContext(code,scope);
 return {film,stops,prepare:()=>scope.prepareLetterFilm(),play:()=>scope.playLetterFilm(1,()=>frames++),
  emit:k=>listeners[k]?.(),get frames(){return frames},get loads(){return loads},get listenerCount(){return Object.keys(listeners).length},
  tick(ms){const end=now+ms;while(true){const next=[...timers].filter(([,t])=>t.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!next)break;now=next[1].at;timers.delete(next[0]);next[1].f()}now=end}};
}
(async()=>{
 let s=setup();s.prepare();assert.equal(s.loads,0,'do not abort existing preload');s.film.networkState=0;s.prepare();assert.equal(s.loads,1);
 s=setup();let settled=false;const result=s.play().then(v=>{settled=true;return v});s.tick(9000);await Promise.resolve();assert.equal(settled,false,'slow cold start gets more than old 5.5 seconds');
 s.emit('playing');s.film.readyState=2;s.film.currentTime=.1;s.emit('timeupdate');assert.equal(s.frames,1,'advancing picture reveals even when Safari frame callback is delayed');
 for(let i=1;i<=8;i++){s.tick(1000);s.film.currentTime=i;s.emit('timeupdate')}
 assert.equal(settled,false,'startup time does not truncate playing film');s.emit('ended');assert.equal(await result,true);assert.equal(s.frames,1);assert.equal(s.listenerCount,0);assert.equal(s.stops.size,0);
 s=setup();const stalled=s.play();s.tick(12000);assert.equal(await stalled,false,'failed startup cannot hang indefinitely');
 s=setup();const cancelled=s.play();[...s.stops][0]();assert.equal(await cancelled,false);assert.equal(s.listenerCount,0);
 s=setup();const failed=s.play();s.emit('error');assert.equal(await failed,false);
 assert(!source.includes("$('#training-letter-film')?.load?.()"));
 console.log('PASS cold-load allowance, retained preload, full progressing playback, frame callback fallback, startup timeout and cancellation cleanup');
})().catch(e=>{console.error(e);process.exit(1)});
