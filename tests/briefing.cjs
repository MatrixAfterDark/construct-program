const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');const code=fs.readFileSync('site-overrides/briefing.js','utf8');
function setup({direct=false,reduced=false,name='Lexi',blocked=false}={}){
 let now=0,serial=0;const timers=new Map(),receipts=[],finales=[],plays=[];
 const elements=new Map();function el(id){if(elements.has(id))return elements.get(id);const e={id,hidden:['#brief-root','#training-ready','#brief-cinema'].includes(id),dataset:{},listeners:{},paused:true,readyState:4,addEventListener(k,fn){(this.listeners[k]??=[]).push(fn)},removeEventListener(){},setAttribute(){},removeAttribute(k){if(k==='data-shot')delete this.dataset.shot},append(){},focus(){},load(){},play(){this.paused=false;plays.push(this.src||id);return blocked?Promise.reject(Error('blocked')):Promise.resolve()},pause(){this.paused=true},click(){for(const fn of this.listeners.click||[])fn({preventDefault(){}})}};elements.set(id,e);return e;}
 const life={setTimeout(fn,ms){timers.set(++serial,{at:now+ms,fn});return serial},clearTimeout(id){timers.delete(id)}};
 const window={ProgramLifecycle:life,CompletionReceipt:{reached:x=>receipts.push(x)},BriefingFinale:{show:async x=>finales.push(x)},ProgramSurge:{start(){}}};
 vm.runInNewContext(code,{window,document:{querySelector:el,createElement:()=>el('created'+(++serial)),body:{dataset:{directBriefing:direct?'true':undefined}},head:{append(){}}},URLSearchParams,location:{search:'?name='+encodeURIComponent(name)},matchMedia:()=>({matches:reduced})});
 async function flush(){for(let i=0;i<15;i++)await Promise.resolve();}async function next(){await flush();const first=[...timers].sort((a,b)=>a[1].at-b[1].at)[0];if(!first)return false;timers.delete(first[0]);now=first[1].at;first[1].fn();await flush();return true;}
 return{el,receipts,finales,plays,next,flush,get now(){return now}};
}
(async()=>{
 let s=setup();assert.equal(s.receipts.length,0);s.el('[data-route="briefing.html"]').click();await s.flush();assert.equal(s.receipts.length,0);for(let i=0;i<20&&s.finales.length===0;i++)await s.next();assert.equal(s.finales.length,1);assert.equal(s.receipts.length,1);assert.equal(s.receipts[0].name,'LEXI');assert.equal(s.now,10990);assert.deepEqual(s.plays.filter(p=>p.endsWith('.mp4')).map(p=>p.split('/').pop()),['morpheus.mp4','trinity.mp4','neo.mp4','guns.mp4']);
 s=setup();s.el('[data-route="briefing.html"]').click();s.el('#brief-skip').click();s.el('#brief-skip').click();await s.flush();for(let i=0;i<12;i++)await s.next();assert.equal(s.finales.length,1);assert.equal(s.receipts.length,1);assert.equal(s.el('#brief-clip').paused,true);
 s=setup({direct:true});assert.equal(s.receipts.length,0);assert.equal(s.el('#brief-start').hidden,false);assert.equal(s.plays.length,0);s.el('#brief-start').click();s.el('#brief-skip').click();await s.flush();assert.equal(s.finales.length,1);
 s=setup({reduced:true,name:''});s.el('[data-route="briefing.html"]').click();await s.flush();assert.equal(s.receipts[0].name,'OPERATIVE');assert.equal(s.plays.filter(p=>p.endsWith('.mp4')).length,0);
 s=setup({blocked:true});s.el('[data-route="briefing.html"]').click();for(let i=0;i<20&&!s.finales.length;i++)await s.next();assert.equal(s.finales.length,1);assert.equal(s.el('#brief-sound').textContent,'[ ENABLE SOUND ]');
 console.log('PASS 10.99s shot order, soundtrack, no early receipt, skip cancellation, direct link, reduced motion, name fallback and autoplay failure');
})().catch(e=>{console.error(e);process.exit(1)});
