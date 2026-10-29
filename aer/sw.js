const CACHE="las-aer-fa6cfd555194", SCOPE="/apps/aer/", URLS=["/apps/aer/432hz_2.mp3","/apps/aer/aer-icon.png","/apps/aer/aer-og.png","/apps/aer/analytics-config.json","/apps/aer/assets/CoachChat-Cr-0LpF5.js","/apps/aer/assets/index-BZnjhlrr.js","/apps/aer/assets/index-_xrbRke4.css","/apps/aer/exhale_2.mp3","/apps/aer/heart-beating.mp3","/apps/aer/icon-192.png","/apps/aer/icon-512.png","/apps/aer/index.html","/apps/aer/inhale.mp3","/apps/aer/manifest.webmanifest","/apps/aer/vendor/README.txt","/apps/aer/vendor/telegram-web-app.js","/apps/aer/youcan-icon.png"];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('las-aer-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
 const url = new URL(event.request.url);
 if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE)) return;
 if (event.request.mode === 'navigate') {
  event.respondWith(fetch(event.request).catch(() => caches.match(SCOPE + 'index.html', { ignoreVary: true }))); return;
 }
 if (URLS.includes(url.pathname)) event.respondWith(caches.match(event.request, { ignoreVary: true }).then(async hit => {
   if (!hit) return fetch(event.request);
   const range = event.request.headers.get('Range');
   if (!range) return hit;
   const match = /^bytes=(\d*)-(\d*)$/.exec(range);
   if (!match || (!match[1] && !match[2])) return fetch(event.request);
   const body = await hit.blob(), size = body.size;
   const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
   const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
   if (start >= size || end < start) return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
   const headers = new Headers(hit.headers);
   headers.delete('Content-Encoding');
   headers.set('Content-Range', 'bytes ' + start + '-' + end + '/' + size);
   headers.set('Content-Length', String(end - start + 1));
   headers.set('Accept-Ranges', 'bytes');
   return new Response(body.slice(start, end + 1), { status: 206, headers });
 }));
});
