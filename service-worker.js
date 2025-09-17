const CACHE='mattest-cache-v40';
const ASSETS=['./','./index.html?v=40','./page6.html?v=40','./style.css?v=40','./app.js?v=40','./manifest.webmanifest?v=40','./icons/icon-192.png','./icons/icon-512.png','./icons/colas-logo.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
