const VERSION = new Date().toISOString().slice(0,19).replace(/[-T:]/g,"");
const CACHE = `mattest-cache-v28-${VERSION}`;
const ASSETS = ['./','./index.html','./app.js','./manifest.webmanifest','./icons/colas-logo.svg'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
