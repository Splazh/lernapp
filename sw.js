// Offline-Cache: erst Netz (damit Updates ankommen), sonst Cache.
const CACHE = 'lernapp-v12';
const FILES = ['./', 'index.html', 'style.css', 'core.js', 'play.js', 'tests.js', 'notes.js', 'quests.js', 'ui.js', 'manifest.webmanifest',
  'icon.svg', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'decks/subjects.js', 'decks/irregular-verbs.js',
  'decks/en-wortschatz.js', 'decks/en-units.js', 'decks/en-formate.js', 'decks/deutsch.js', 'decks/spanisch.js', 'decks/mathe.js',
  'decks/geografie.js', 'decks/ethik.js', 'decks/informatik.js', 'decks/tenses-einzeln.js', 'decks/tenses-buch.js', 'decks/tenses-erkennen.js', 'decks/tenses-luecken.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
