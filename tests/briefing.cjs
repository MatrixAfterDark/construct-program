const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');const code=fs.readFileSync('site-overrides/briefing.js','utf8');
function setup({reduced=false,name='Lexi',blocked=false}={}){
 let serial=0;const timers=new Map(),finales=[],plays=[],elements=new Map();let resets=0;
 function el(id){if(elements.has(id))return elements.get(id);const e={id,hidden:false,dataset:{},style:{},naturalWidth:640,naturalHeight:793,listeners:{},paused:true,addEventListener(k,fn){(this.listeners[k]??=[]).push(fn)},setAttribute(){},append(){},replaceChildren(){},focus(){},getBoundingClientRect:()=>({width:320,height:400}),decode:()=>Promise.resolve(),play(){this.paused=false;plays.push(id);return blocked?Promise.reject(Error('blocked')):Promise.resolve()},pause(){this.paused=true},click(){for(const fn of this.listeners.click||[])fn({preventDefault(){}})},fire(k){for(const fn of this.listeners[k]||[])fn()}};elements.set(id,e);return e;}
 const life={setTimeout(fn,ms){timers.set(++serial,{ms,fn});return serial},clearTimeout(id){timers.delete(id)}};const body={dataset:{pathMenu:'true'}};
 const window={ProgramLifecycle:life,BriefingFinale:{show:async x=>finales.push(x)},ProgramSurge:{start(){}},ZionTerminal:{reset(){resets++}}};
 vm.runInNewContext(code,{window,document:{querySelector:el,createElement:()=>el('created'+(++serial)),body},URLSearchParams,location:{search:'?name='+encodeURIComponent(name)},matchMedia:()=>({matches:reduced}),Promise});
 async function flush(){for(let i=0;i<30;i++)await Promise.resolve();}async function next(){await flush();const first=[...timers][0];if(first){timers.delete(first[0]);first[1].fn();}await flush();}
 return{el,body,finales,plays,next,flush,get resets(){return resets}};
}
(async()=>{
 let s=setup();assert.equal(s.plays.length,0);s.el('#path-construct').click();assert.equal(s.resets,1);assert.equal(s.body.dataset.pathMenu,undefined);
 s=setup();s.el('#path-briefing').click();await s.next();assert.deepEqual(s.plays,['#brief-music','#brief-action']);assert.equal(s.finales.length,0);assert.equal(s.el('#brief-stream').dataset.playing,'true');s.el('#brief-action').fire('ended');await s.flush();assert.equal(s.finales.length,1);assert.equal(s.finales[0].profile.subject,'LEXI');assert.equal(s.finales[0].gatherCharacter,true);
 s=setup();s.el('#path-briefing').click();s.el('#brief-skip').click();s.el('#brief-skip').click();await s.flush();await s.next();assert.equal(s.finales.length,1);assert.equal(s.el('#brief-action').paused,true);
 s=setup({reduced:true,name:''});s.el('#path-briefing').click();await s.flush();assert.equal(s.finales[0].profile.subject,'OPERATIVE');assert.deepEqual(s.plays,['#brief-music']);
 s=setup({blocked:true});s.el('#path-briefing').click();await s.next();await s.flush();assert.equal(s.finales.length,1);
 const css=fs.readFileSync('site-overrides/briefing.css','utf8');assert(css.includes('object-fit:contain'));assert(css.includes('mix-blend-mode:screen'));assert(css.includes('#brief-stream[data-playing="true"] #brief-action'));assert(!css.includes('data-shot="guns"'));
 console.log('PASS one continuous stream, click-to-start audio, ended/skip/error completion, code formation, names, reduced motion and foreground rain');
})().catch(e=>{console.error(e);process.exit(1)});
