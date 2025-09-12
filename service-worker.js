self.addEventListener('install', e => {
  e.waitUntil(caches.open('mat-cache-v1').then(cache => cache.addAll([
    './',
    './cover.html',
    './index.html'
  ])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(resp => resp || fetch(e.request)));
});