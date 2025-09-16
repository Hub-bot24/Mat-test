
const CACHE = 'mattest-cache-241';
const ASSETS = [
  "./",
  "./index.html",
  "./page6.html",
  "./style.241.css",
  "./app.241.js",
  "./page6.241.js",
  "./manifest.webmanifest?v=241",
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
