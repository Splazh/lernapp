// auto_generated: false
const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const { root } = require('./harness.cjs');
function worker({ fail = '', offline = false } = {}) {
  const scope = 'https://example.test/lernapp/', stores = new Map(), listeners = {}, calls = [];
  let activated = false;
  const key = r => new URL(typeof r === 'string' ? r : r.url, scope).href;
  const caches = { open: async name => {
    if (!stores.has(name)) stores.set(name, new Map()); const map = stores.get(name);
    return { put: async (r, response) => map.set(key(r), response), match: async (r, opts) => { const url = new URL(key(r)); if (opts?.ignoreSearch) url.search = ''; return map.get(url.href); } };
  }, keys: async () => [...stores.keys()], delete: async name => stores.delete(name) };
  const ctx = { self: { registration: { scope }, addEventListener: (name, fn) => { listeners[name] = fn; }, skipWaiting: () => { activated = true; } }, caches,
    Request: class { constructor(url) { this.url = key(url); } }, Response,
    fetch: async request => { const url = key(request); calls.push(url); if (offline || url.endsWith(fail) && fail) throw new Error('offline'); return new Response('asset:' + url); }, URL };
  vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(root, 'sw.js'), 'utf8'), ctx);
  return { stores, calls, ctx, activated: () => activated, listeners, caches, scope,
    event: async name => { let pending; listeners[name]({ waitUntil: p => { pending = p; } }); await pending; },
    request: async (file, mode = 'cors') => { let pending; listeners.fetch({ request: { url: key(file), method: 'GET', mode }, respondWith: p => { pending = p; } }); return pending; } };
}
test('complete release installs all assets and waits for explicit update', async () => {
  const w = worker(); await w.event('install'); assert.ok(w.stores.get('lernapp-v34').size > 40); assert.equal(w.activated(), false);
  w.listeners.message({ data: { type: 'ACTIVATE_UPDATE' } }); assert.equal(w.activated(), true);
});
test('failed install never leaves a partial release as a usable cache', async () => {
  const w = worker({ fail: 'core.js' }); await assert.rejects(w.event('install')); assert.equal(w.stores.has('lernapp-v34'), false);
});
test('activation deletes only this app old caches', async () => {
  const w = worker(); await w.caches.open('other-app'); await w.caches.open('lernapp-v33'); await w.event('install'); await w.event('activate');
  assert.ok(w.stores.has('other-app')); assert.ok(w.stores.has('lernapp-v34')); assert.equal(w.stores.has('lernapp-v33'), false);
});
test('cached scripts and navigation work offline without a network request', async () => {
  const w = worker({ offline: true }), cache = await w.caches.open('lernapp-v34');
  await cache.put('core.js', new Response('script')); await cache.put('index.html', new Response('page'));
  assert.equal(await (await w.request('core.js?v=34')).text(), 'script'); assert.equal(await (await w.request('route', 'navigate')).text(), 'page'); assert.equal(w.calls.length, 0);
});
test('missing offline script returns an error rather than HTML', async () => {
  const w = worker({ offline: true }), result = await w.request('missing.js'); assert.equal(result.status, 503); assert.match(result.headers.get('Content-Type'), /text\/plain/);
});
test('requests outside app scope are not intercepted', async () => { const w = worker(); assert.equal(await w.request('https://other.test/a.js'), undefined); });
