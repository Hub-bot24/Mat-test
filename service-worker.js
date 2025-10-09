const CACHE_NAME = 'mat-test-v202pro-' + Date.now();
const FILES_TO_CACHE = [
  './',
  './index.html',
  './app.js',
  './manifest.webmanifest',
  './service-worker.js'
,
  './page2.html'
,
  './surfacing_checklist.html'
,
  './conformance_report.html'
,
  './site_diagram.html'
,
  './field_spread_canvas.html'
,
  './loose_unit_mass.html'
,
  './ball_penetration.html'
,
  './bitumen_lot.html'
,
  './mat-test.html'
,
  './mat-test-v313.html'
,
  './mat-test-v202pro.html'
,
  './surfacing_checklist_print.html'
,
  './conformance_report_print.html'
,
  './site_diagram_print.html'
,
  './field_spread_canvas_print.html'
,
  './loose_unit_mass_print.html'
,
  './ball_penetration_print.html'
,
  './bitumen_lot_print.html'
,
  './qa_pack_exact.html'
,
  './assets/pdf_pages/page-1.png'
,
  './assets/pdf_pages/page-2.png'
,
  './assets/pdf_pages/page-3.png'
,
  './assets/pdf_pages/page-4.png'
,
  './assets/pdf_pages/page-5.png'
,
  './assets/pdf_pages/page-6.png'
,
  './assets/pdf_pages/page-7.png'
,
  './assets/pdf_pages/page-8.png'
,
  './assets/pdf_pages/page-9.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
