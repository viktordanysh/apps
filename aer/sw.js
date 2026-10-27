const CACHE="las-aer-b02d6bf02afe", SCOPE="/apps/aer/", URLS=["/apps/aer/432hz_2.mp3","/apps/aer/aer-icon.png","/apps/aer/aer-og.png","/apps/aer/assets/CoachChat-CqRptRIm.js","/apps/aer/assets/index-CaBNpD6o.js","/apps/aer/assets/index-DKTFPeuE.css","/apps/aer/exhale_2.mp3","/apps/aer/heart-beating.mp3","/apps/aer/icon-192.png","/apps/aer/icon-512.png","/apps/aer/index.html","/apps/aer/inhale.mp3","/apps/aer/manifest.webmanifest","/apps/aer/youcan-icon.png"];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('las-aer-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
 const url = new URL(event.request.url);
 if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE)) return;
 if (event.request.mode === 'navigate') {
  event.respondWith(fetch(event.request).catch(() => caches.match(SCOPE + 'index.html', { ignoreVary: true }))); return;
 }
 if (URLS.includes(url.pathname)) event.respondWith(caches.match(event.request, { ignoreVary: true }).then(hit => hit || fetch(event.request)));
});
