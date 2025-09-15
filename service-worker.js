self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('mat-test-pro-v22').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './mat-test.html',
        './style.css',
        './app.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
