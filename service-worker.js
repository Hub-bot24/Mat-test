
const CACHE = 'mattest-cache-v2.3.0';
const ASSETS = [
  "./",
  "./index.html",
  "./page6.html",
  "./app.js",
  "./page6.js",
  "./style.css",
  "./manifest.webmanifest?v=v2.3.0",
  "./icons/colas-logo.svg"
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
