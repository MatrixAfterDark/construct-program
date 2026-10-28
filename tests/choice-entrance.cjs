const fs=require('fs'),assert=require('assert/strict');const read=p=>fs.readFileSync('site-overrides/'+p,'utf8');
const home=read('index.html'),original=read('experience.html'),terminal=read('terminal.js');
assert(home.includes('data-path-menu="true"'));assert(home.indexOf('id="path-choice"')>home.indexOf('class="program"'));
assert(home.includes('&gt; ENTER THE CONSTRUCT')&&home.includes('&gt; ACCESS THE BRIEFING'));
assert(!original.includes('id="path-choice"'));assert(terminal.includes("if(document.body.dataset.pathMenu==='true')return;"));
assert.equal(home.match(/<dl class="final-details">[\s\S]*?<\/dl>/)[0],original.match(/<dl class="final-details">[\s\S]*?<\/dl>/)[0]);
const prior=fs.existsSync('../pause-update/overrides/terminal.js')?fs.readFileSync('../pause-update/overrides/terminal.js','utf8'):null;
if(prior){const gate=terminal.replace("enterConstruct(){wakeAudio();reset(false);},","").replace("if(document.body.dataset.pathMenu==='true')return;\n ", '').replace("if(document.body.dataset.pathMenu!=='true'&&e.key", "if(e.key");assert.equal(gate.replace("[welcome,(document.body.dataset.constructChosen==='true'?'A WISE CHOICE, ':'WELCOME, ')+subject+'.',40,document.body.dataset.constructChosen==='true'?850:650]","[welcome,'WELCOME, '+subject+'.',40,650]"),prior);}
console.log('PASS menu in original CRT, gated startup, unchanged full-route terminal logic and exact party copy');
