const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');const read=p=>fs.readFileSync('site-overrides/'+p,'utf8');
assert(read('index.html').includes('[ ENTER THE CONSTRUCT ]')&&read('index.html').includes('[ ACCESS THE BRIEFING ]'));
for(const q of ['?name=Lexi','?name=A%26B','']){const links=['experience.html','briefing.html'].map(route=>({dataset:{route}}));vm.runInNewContext(read('choice-routes.js'),{URL,location:{href:'https://example.com/new/',search:q},document:{querySelectorAll:()=>links}});for(const a of links)assert.equal(new URL(a.href).searchParams.get('name'),new URLSearchParams(q).get('name'));}
assert.equal(read('index.html').match(/<dl class="final-details">[\s\S]*?<\/dl>/)[0],read('experience.html').match(/<dl class="final-details">[\s\S]*?<\/dl>/)[0]);
console.log('Choice labels, relative personalised routes and exact approved party copy: PASS');
