/* Original final-page receipt transport, now triggered only by attendance buttons. */
(() => {
'use strict';
const endpoint = 'https://formsubmit.co/ajax/7f54c1a73e1be0744d6ad589eaa50030';
const sent = new Map(), pending = new Set(), latest = new Map();
const timers = window.ProgramLifecycle || window;
const later = (fn, ms) => timers.setTimeout(fn, ms);
const guestName = name => String(name || 'OPERATIVE').replace(/[\r\n\u0000-\u001f\u007f]/g, '').trim().slice(0,32).toUpperCase() || 'OPERATIVE';
const keyFor = name => 'matrix-after-dark:2026-11-07:choice-receipt:v18:' + encodeURIComponent(name);
function wasSent(name, selection) {
  if (sent.get(name) === selection) return true;
  try { return window.localStorage.getItem(keyFor(name)) === selection; } catch { return false; }
}
function remember(name, selection) { sent.set(name, selection); try { window.localStorage.setItem(keyFor(name), selection); } catch {} }
async function deliver(name, selection, attempt = 0) {
  if (latest.get(name) !== selection || wasSent(name, selection) || pending.has(name)) return;
  pending.add(name);
  let delivered = false;
  try {
    const response = await fetch(endpoint, {
      method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'}, keepalive: true,
      body: JSON.stringify({name, activity: 'DETAILS VIEWED', selection, event: 'The Matrix After Dark — 7 November 2026', viewed_at: new Date().toISOString(),
        _subject: 'Matrix Construct — details viewed — ' + name + ' — ' + selection, _template: 'table', _captcha: 'false'})
    });
    if (response.ok) { const result = await response.json(); delivered = result.success === true || result.success === 'true'; }
  } catch {} finally { pending.delete(name); }
  if (delivered) remember(name, selection);
  if (latest.get(name) !== selection) { deliver(name, latest.get(name)); return; }
  if (!delivered && attempt === 0) later(() => deliver(name, selection, 1), 5000);
}
function selected({name, mode}) {
  name = guestName(name);
  const selection = mode === 'backup' ? 'BRINGING BACKUP · +1' : 'SOLO OPERATIVE';
  latest.set(name, selection);
  return deliver(name, selection);
}
// Existing finale calls retain their cancellation interface, without sending.
function reached() { return () => {}; }
window.CompletionReceipt = Object.freeze({reached, selected});
})();
