const vm=require('vm'),fs=require('fs'),assert=require('assert/strict');
const transport=fs.readFileSync('site-overrides/completion-receipt.js','utf8'),ui=fs.readFileSync('site-overrides/party-rsvp.js','utf8');
function setup({query='?name=Lexi',stored=new Map(),response='ok',blockedStorage=false,deferred=false}={}){
 const nodes=new Map(),requests=[],timers=new Map(),resolvers=[];let serial=0;
 function el(id){if(nodes.has(id))return nodes.get(id);const e={disabled:false,attrs:{},textContent:'',listeners:{},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,f){this.listeners[k]=f},click(){this.listeners.click?.()}};nodes.set(id,e);return e;}
 const window={localStorage:{getItem(k){if(blockedStorage)throw Error();return stored.get(k)||null},setItem(k,v){if(blockedStorage)throw Error();stored.set(k,v)}},setTimeout(f,ms){timers.set(++serial,{f,ms});return serial}};
 const context=vm.createContext({window,document:{getElementById:el},URLSearchParams,location:{search:query},Date,Map,Set,Promise,
  fetch(url,args){requests.push({url,args,body:JSON.parse(args.body)});if(deferred)return new Promise(resolve=>resolvers.push(resolve));if(response==='reject')return Promise.reject(Error('Offline'));return Promise.resolve({ok:response!=='http',json:async()=>({success:response==='false'?'false':'true'})})}});
 vm.runInContext(transport,context);vm.runInContext(ui,context);
 return{el,requests,stored,timers,window,async flush(){for(let i=0;i<30;i++)await Promise.resolve()},async retry(){const first=[...timers][0];if(first){timers.delete(first[0]);first[1].f()}await this.flush()},async finish(){resolvers.shift()?.({ok:true,json:async()=>({success:'true'})});await this.flush()}};
}
(async()=>{
 let s=setup();assert.equal(s.requests.length,0);const stop=s.window.CompletionReceipt.reached({panel:{},name:'LEXI'});stop();assert.equal(s.requests.length,0);
 s.el('rsvp-solo').click();s.el('rsvp-solo').click();assert.equal(s.el('rsvp-status').textContent,'SELECTION LOCKED.');await s.flush();assert.equal(s.requests.length,1);
 const p=s.requests[0];assert.equal(p.url,'https://formsubmit.co/ajax/7f54c1a73e1be0744d6ad589eaa50030');assert.equal(p.args.method,'POST');assert.equal(p.args.keepalive,true);assert.equal(p.args.headers.Accept,'application/json');assert.equal(p.body.name,'LEXI');assert.equal(p.body.activity,'DETAILS VIEWED');assert.equal(p.body.selection,'SOLO OPERATIVE');assert.equal(p.body._template,'table');assert.equal(p.body._captcha,'false');assert(p.body._subject.includes('details viewed'));assert(p.body.viewed_at);assert(!('notification_id' in p.body));
 s.el('rsvp-solo').click();await s.flush();assert.equal(s.requests.length,1,'successful duplicate is suppressed');
 s.el('rsvp-plus').click();await s.flush();assert.equal(s.requests[1].body.selection,'BRINGING BACKUP · +1');s.el('rsvp-solo').click();await s.flush();assert.equal(s.requests.length,3,'changing back sends the new latest choice');
 let restored=setup({stored:s.stored});assert.equal(restored.requests.length,0,'restoring selection never sends');assert.equal(restored.el('rsvp-solo').attrs['aria-pressed'],'true');restored.el('rsvp-solo').click();await restored.flush();assert.equal(restored.requests.length,0);
 for(const response of ['reject','http','false']){s=setup({response});s.el('rsvp-plus').click();await s.flush();assert.equal(s.el('rsvp-status').textContent,'SELECTION LOCKED.');assert(![...s.stored.keys()].some(k=>k.includes('choice-receipt')),'failed attempts are not marked sent');await s.retry();assert.equal(s.requests.length,2);assert.equal(s.timers.size,0,'original helper has one five-second retry');}
 s=setup({query:''});s.el('rsvp-plus').click();await s.flush();assert.equal(s.requests[0].body.name,'OPERATIVE');
 s=setup({blockedStorage:true});s.el('rsvp-solo').click();await s.flush();s.el('rsvp-solo').click();await s.flush();assert.equal(s.requests.length,1,'memory dedupe survives storage failure');
 s=setup({deferred:true});s.el('rsvp-solo').click();s.el('rsvp-plus').click();assert.equal(s.requests.length,1);await s.finish();assert.equal(s.el('rsvp-plus').disabled,false);
 // A helper retry already in flight must not swallow a newer choice.
 const pending=s.window.CompletionReceipt.selected({name:'LEXI',mode:'backup'});s.window.CompletionReceipt.selected({name:'LEXI',mode:'solo'});await s.finish();assert.equal(s.requests.at(-1).body.selection,'SOLO OPERATIVE');await s.finish();await pending;
 for(const n of ['index.html','briefing.html','experience.html']){const html=fs.readFileSync('site-overrides/'+n,'utf8');const block=html.match(/<section id="party-rsvp"[\s\S]*?<\/section>/)[0];assert.equal((block.match(/<button /g)||[]).length,2);assert(!/<input|<form|mailto:/.test(block));assert(html.indexOf('completion-receipt.js')<html.indexOf('party-rsvp.js'));assert(html.includes('party-rsvp.js?v=original-receipt-v18'));}
 assert(!/fetch\(|ZionAudio|ConstructMusic|\.play\(|\.pause\(|mailto:/.test(ui));
 console.log('PASS original receipt transport, choice-only trigger, both labels, unchanged payload plus selection, dedupe/choice updates, one retry, no false sent record, fallback, restored state, concurrent choice, both routes and media isolation');
})().catch(e=>{console.error(e);process.exit(1)});
