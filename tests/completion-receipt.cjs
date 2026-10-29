const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const code=fs.readFileSync('site-overrides/completion-receipt.js','utf8');
let sends=0;const window={};vm.runInNewContext(code,{window,fetch(){sends++;throw Error('Page views must not send')}});
for(const name of ['LEXI','OPERATIVE']){const stop=window.CompletionReceipt.reached({panel:{},name});assert.equal(typeof stop,'function');stop();}
assert.equal(sends,0);assert(!/fetch\(|setTimeout|localStorage/.test(code));
console.log('PASS reaching either final page sends no email; compatible finale cancellation interface retained');
