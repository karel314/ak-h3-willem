const CACHE_VERSION = 'ak-h3-willem-v1';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './style.css',
  './config.json',
  './manifest.json',
  './data/vragen.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './images/bron23_irrigatie.png',
  './images/bron9_diepwaterpomp.png',
  './images/bron22_watertekort.png',
  './images/bron11_waterbalans.png',
  './images/bron6_waterkringloop.png',
  './images/bron18_overstromingskans.png',
  './images/bron7_verdeling_water.png',
  './images/bron12_aquifer.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
