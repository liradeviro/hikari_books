const CACHE = 'hikari-v1';
const FILES = [
  '/hikari_books/',
  '/hikari_books/index.html',
  '/hikari_books/manifest.json',
  '/hikari_books/icons/icon-192.png',
  '/hikari_books/icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
