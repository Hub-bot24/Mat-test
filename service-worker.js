const CACHE_NAME = "tristate-cache-v3"; // bump version each update
const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/colas-logo.svg"
];

// Install SW and cache assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // activate worker immediately
});

// Activate SW and remove old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    // Always try network first for HTML pages
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match("/index.html")
      )
    );
  } else {
    // Cache-first for other assets
    event.respondWith(
      caches.match(event.request).then(response =>
        response || fetch(event.request)
      )
    );
  }
});
