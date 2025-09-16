
// SW killer v317: clears caches, unregisters, and reloads once.
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    try {
      if (self.registration && self.registration.unregister) { await self.registration.unregister(); }
      if (caches && caches.keys) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
      const clientsArr = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const client of clientsArr) { try { client.navigate(client.url); } catch(e){} }
    } catch(e) { }
  })());
});
self.addEventListener('fetch', (e) => { });
