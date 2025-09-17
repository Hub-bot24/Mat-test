
const VERSION='323';
const CACHE='mattest-cache-'+VERSION;
const CORE=['./','./index.html?v='+VERSION,'./page6.html?v='+VERSION,'./style.css?v='+VERSION,'./app.js?v='+VERSION,'./manifest.webmanifest?v='+VERSION,'./icons/icon-192.png','./icons/icon-512.png','./logo.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const req=e.request; const url=new URL(req.url);
  if(url.origin===location.origin && (req.destination==='document'||req.destination==='script'||req.destination==='style')){
    e.respondWith((async()=>{try{const fresh=await fetch(req,{cache:'no-store'}); const c=await caches.open(CACHE); c.put(req,fresh.clone()); return fresh;}catch(_){return (await caches.match(req))||fetch(req)}})());
    return;
  }
  e.respondWith(caches.match(req).then(r=>r||fetch(req)));
});
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING'){self.skipWaiting()}});
