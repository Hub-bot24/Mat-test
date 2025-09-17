
const VERSION = '322';
const CACHE = 'mattest-v' + VERSION;

// Core assets
const CORE = [
  './',
  './index.html?v='+VERSION,
  './style.css?v='+VERSION,
  './app.js?v='+VERSION,
  './manifest.webmanifest?v='+VERSION,
  './icons/icon-192.png',
  './icons/icon-512.png',
  './logo.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(CORE);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE ? caches.delete(k) : null)));
    self.clients.claim();
  })());
});

// Network-first strategy for HTML/CSS/JS so updates reach desktop instantly
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (url.origin === location.origin && (req.destination === 'document' || req.destination === 'script' || req.destination === 'style')) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, {cache:'no-store'});
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        const cached = await caches.match(req);
        return cached || fetch(req);
      }
    })());
    return;
  }
  // otherwise: cache-first
  event.respondWith(caches.match(req).then(res => res || fetch(req)));
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
