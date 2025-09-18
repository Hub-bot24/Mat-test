/* Auto-updating Service Worker for GitHub Pages (project subpath safe) */
const VERSION = '2025-09-18-01';
const CACHE_NAME = 'mattest-cache-' + VERSION;

// Build a list of URLs relative to the SW scope so it works at user.github.io/repo/
const SCOPE = self.registration.scope; // e.g., https://user.github.io/repo/
function url(u){ return new URL(u, SCOPE).toString(); }

const FILES = [
  url('index.html'),
  url('style.css?v=20250918'),
  url('app.js?v=20250918'),
  url('page6.html'),
  url('colas-logo.svg'),
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
  );
  self.clients.claim();
});

// Message to trigger skipWaiting immediately
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // For navigations (HTML), go network-first, fallback to cache
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

  // For other requests, try cache first then network (stale-while-revalidate-ish)
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
