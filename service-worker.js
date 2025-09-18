/* Scope-safe auto-updating SW for GitHub Pages */
const VERSION = '2025-09-18-02';
const CACHE_NAME = 'mattest-cache-' + VERSION;

const SCOPE = self.registration.scope;
const url = (u) => new URL(u, SCOPE).toString();

const FILES = [
  url('index.html'),
  url('style.css?v=20250918'),
  url('app.js?v=20250918'),
  url('page6.html'),
  url('colas-logo.svg')
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Network-first for navigations (fresh HTML)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(req, copy));
        return resp;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Cache-first with background update for assets
  event.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(networkResp => {
        caches.open(CACHE_NAME).then(c => c.put(req, networkResp.clone()));
        return networkResp;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
