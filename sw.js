// คลังคำ Finish the Word: offline cache. Bump VERSION whenever index.html or words.txt changes.
const VERSION = "ftw-v2";
const FONTS = "ftw-fonts";
const SHELL = ["./", "index.html", "words.txt", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== FONTS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: serve cached, refresh in the background
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(staleWhileRevalidate(req, FONTS));
    return;
  }
  if (url.origin !== self.location.origin) return;

  // pages: network first so updates show up, cached copy when offline
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put("index.html", copy)); return res; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }
  // the 2.8 MB word list never changes within a version: cache first
  if (url.pathname.endsWith("/words.txt")) {
    event.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
    return;
  }
  event.respondWith(staleWhileRevalidate(req, VERSION));
});

function staleWhileRevalidate(req, cacheName) {
  return caches.open(cacheName).then((cache) =>
    cache.match(req).then((hit) => {
      const net = fetch(req).then((res) => { if (res.ok || res.type === "opaque") cache.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })
  );
}
