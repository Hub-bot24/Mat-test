
// Simple SW with cache bump
const CACHE = 'mattest-cache-v331';
const ASSETS = [
  './',
  './index.html?v=331',
  './style.css?v=331',
  './app.js?v=331',
  './manifest.webmanifest?v=331'
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>{ if(k!==CACHE) return caches.delete(k); })))
  );
  self.clients.claim();
});
self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url);
  // Bypass for non-GET
  if(e.request.method !== 'GET'){ return; }
  e.respondWith(
    caches.match(e.request).then(res=> res || fetch(e.request))
  );
});
