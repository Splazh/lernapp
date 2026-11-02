// Offline-Cache: erst Netz (damit Updates ankommen), sonst Cache.
const CACHE = 'lernapp-v21';
const FILES = ['./', 'index.html', 'style.css', 'core.js', 'play.js', 'play2.js', 'tests.js', 'notes.js', 'quests.js', 'backup.js', 'ui.js', 'manifest.webmanifest',
  'icon.svg', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'decks/subjects.js', 'decks/irregular-verbs.js',
  'decks/en-wortschatz.js', 'decks/en-units.js', 'decks/en-formate.js', 'decks/deutsch.js', 'decks/spanisch.js', 'decks/mathe.js',
  'decks/geografie.js', 'decks/ethik.js', 'decks/informatik.js', 'decks/sentences.js', 'decks/explanations-geo.js', 'decks/explanations-de.js', 'decks/tenses-einzeln.js', 'decks/tenses-buch.js', 'decks/tenses-erkennen.js', 'decks/tenses-luecken.js'];

self.addEventListener('install', e => {
  // Beim Einrichten immer frisch vom Server holen (nicht aus dem Browser-Zwischenspeicher), sonst landen alte Dateien im neuen Cache.
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => fetch(new Request(f, { cache: 'reload' })).then(r => { if (!r.ok) throw new Error(f); return c.put(f, r); })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request.url, { cache: 'no-cache' }).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
