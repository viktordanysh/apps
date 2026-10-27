const CACHE="las-youcan-5817799e63c8", SCOPE="/apps/youcan/", URLS=["/apps/youcan/aer-breath-icon.png","/apps/youcan/app-icon.png","/apps/youcan/apple-touch-icon.png","/apps/youcan/assets/index-7BjZJI1J.css","/apps/youcan/assets/index-BW1Wfbtn.js","/apps/youcan/favicon.png","/apps/youcan/icon-192.png","/apps/youcan/icon-512.png","/apps/youcan/index.html","/apps/youcan/site.webmanifest"];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('las-youcan-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
 const url = new URL(event.request.url);
 if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE)) return;
 if (event.request.mode === 'navigate') {
  event.respondWith(fetch(event.request).catch(() => caches.match(SCOPE + 'index.html', { ignoreVary: true }))); return;
 }
 if (URLS.includes(url.pathname)) event.respondWith(caches.match(event.request, { ignoreVary: true }).then(hit => hit || fetch(event.request)));
});
