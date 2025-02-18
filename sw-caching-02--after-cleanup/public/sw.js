self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches
      .open("static")
      .then((cache) => {
        console.log("[service worker] precache....");
        cache.add("/src/js/app.js");
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      if (resp) {
        console.log("fetched from the service worker ", resp);
        return resp;
      } else {
        return fetch(event.request);
      }
    })
  );
});
