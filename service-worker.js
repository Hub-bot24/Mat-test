
const CACHE = 'mattest-cache-v31';
const ASSETS = [
  './',
  './index.html?v=31',
  './style.css?v=31',
  './manifest.webmanifest?v=31',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))) // drop old
    .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
