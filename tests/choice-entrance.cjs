const fs=require('fs'),assert=require('assert/strict');const read=p=>fs.readFileSync('site-overrides/'+p,'utf8');
const home=read('index.html'),original=read('experience.html'),terminal=read('terminal.js');
assert(home.includes('data-path-menu="true"'));assert(home.indexOf('id="path-choice"')>home.indexOf('class="program"'));
assert(home.includes('&gt; ENTER THE CONSTRUCT')&&home.includes('&gt; ACCESS THE BRIEFING'));
assert(!original.includes('id="path-choice"'));assert(terminal.includes("if(document.body.dataset.pathMenu==='true')return;"));
assert.equal(home.match(/<dl class="final-details">[\s\S]*?<\/dl>/)[0],original.match(/<dl class="final-details">[\s\S]*?<\/dl>/)[0]);
console.log('PASS menu in original CRT, gated startup, unchanged full-route terminal logic and exact party copy');
