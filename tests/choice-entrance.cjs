const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const read=p=>fs.readFileSync('site-overrides/'+p,'utf8');
const home=read('index.html'),brief=read('briefing.html');
assert(home.includes('[ ENTER THE CONSTRUCT ]')&&home.includes('[ ACCESS THE BRIEFING ]'));
assert(!home.includes('completion-receipt.js'));
for(const q of ['?name=Lexi','?name=A%26B','']){const links=['experience.html','briefing.html'].map(route=>({dataset:{route}}));vm.runInNewContext(read('choice-routes.js'),{URL,location:{href:'https://example.com/new/',search:q},document:{querySelectorAll:()=>links}});for(const a of links)assert.equal(new URL(a.href).searchParams.get('name'),new URLSearchParams(q).get('name'));}
for(const [query,expected] of [['?name=Lexi','LEXI'],['','OPERATIVE'],['?name=%3Cscript%3E','<SCRIPT>']]){const els={},calls=[];vm.runInNewContext(read('briefing.js'),{URLSearchParams,Date,location:{search:query},document:{getElementById:id=>els[id]??={}},window:{ProgramLifecycle:{setInterval:()=>{}},CompletionReceipt:{reached:x=>calls.push(x)}}});assert.equal(els['brief-guest'].textContent,expected);assert.equal(calls.length,1);assert.equal(calls[0].name,expected);}
const experience=read('experience.html');assert.equal(brief.match(/<dl class="final-details">[\s\S]*?<\/dl>/)[0],experience.match(/<dl class="final-details">[\s\S]*?<\/dl>/)[0]);assert(!brief.includes('<video'));console.log('Choice routes, names, receipt entry and exact party copy: PASS');
