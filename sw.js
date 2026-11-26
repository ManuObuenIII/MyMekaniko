// MyMekaniko — service worker.
// Keeps the app shell (this wrapper page and the icons) on the device so the app
// installs and opens even with a weak signal. The system itself runs on
// Google Apps Script inside the frame and is never cached here.
const CACHE = 'motorpool-shell-v3';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest', './favicon.ico',
  './logo.png', './icon-192.png', './icon-512.png', './icon-maskable-192.png', './icon-maskable-512.png',
  './apple-touch-icon.png', './favicon-32.png'];

self.addEventListener('install', e => {
  // one file at a time: a missing file must never stop the app from installing
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(SHELL.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {}))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return; // Google's servers: untouched
  const key = req.url.split('?')[0];   // one cached copy per file, whatever comes after "?"
  // Always ask GitHub first (skipping the browser's 10-minute copy) so an edit to config.js
  // or a new icon shows up at once; fall back to the saved copy when there is no signal.
  e.respondWith(
    fetch(req, { cache: 'no-cache' }).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(key, copy)); }
      return res;
    }).catch(() => caches.match(key)
      .then(hit => hit || (req.mode === 'navigate' ? caches.match(new URL('./index.html', self.location).href) : Response.error())))
  );
});
