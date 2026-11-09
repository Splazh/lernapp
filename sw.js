// Offline-Cache: erst Netz (damit Updates ankommen), sonst Cache.
const CACHE = 'lernapp-v35';
const FILES = ['schema.js', 'content.js', 'journey.js', 'exam.js', 'visuals.js', 'decks/practice.js', './', 'index.html', 'style.css', 'core.js', 'play.js', 'play2.js', 'tests.js', 'notes.js', 'quests.js', 'backup.js', 'study.js', 'open.js', 'mine.js', 'games.js', 'read.js', 'decks/lesen-geo.js', 'decks/open-geo.js', 'ui.js', 'manifest.webmanifest',
  'icon.svg', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'decks/subjects.js', 'decks/irregular-verbs.js',
  'decks/en-wortschatz.js', 'decks/en-units.js', 'decks/en-formate.js', 'decks/en-sa.js','decks/deutsch.js', 'decks/spanisch.js', 'decks/mathe.js',
  'decks/geografie.js', 'decks/geo-test2.js', 'decks/ethik.js', 'decks/informatik.js', 'decks/sentences.js', 'decks/explanations-geo.js', 'decks/explanations-de.js', 'decks/explanations-ma.js', 'decks/explanations-es.js', 'decks/explanations-ei.js', 'decks/explanations-en.js', 'decks/tenses-einzeln.js', 'decks/tenses-buch.js', 'decks/tenses-erkennen.js', 'decks/tenses-luecken.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(async cache => {
    try { await Promise.all(FILES.map(async f => {
      const r = await fetch(new Request(f, { cache: 'reload' }));
      if (!r.ok) throw new Error('Incomplete release'); await cache.put(f, r);
    })); } catch (error) { await caches.delete(CACHE); throw error; }
  }));
});
self.addEventListener('message', e => { if (e.data?.type === 'ACTIVATE_UPDATE') self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('lernapp-v') && k !== CACHE).map(k => caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.registration.scope)) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(e.request, { ignoreSearch: true });
    if (cached) return cached;
    if (e.request.mode === 'navigate') { const page = await cache.match('index.html'); if (page) return page; }
    try { return await fetch(e.request); }
    catch (_) { return new Response('Offline: Datei nicht verfügbar', { status: 503, headers: { 'Content-Type': 'text/plain' } }); }
  }));
});
