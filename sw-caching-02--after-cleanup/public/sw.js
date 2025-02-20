const STATIC_CACHE_NAME = "static-v3";
const DYNAMIC_CACHE_NAME = "dynamic-v2";

self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log("[service worker] precache....");
        cache.addAll([
          "/index.html",
          "/",
          "/src/js/app.js",
          "/src/js/feed.js",
          "/src/js/material.min.js",
          "/src/css/app.css",
          "/src/css/feed.css",
          "/src/images/main-image-lg.jpg",
          "https://fonts.googleapis.com/css?family=Roboto:400,700",
          "https://fonts.googleapis.com/icon?family=Material+Icons",
          "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
        ]);
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  event.waitUntil(
    caches.keys().then((list) =>
      Promise.all(
        list.map((key) => {
          if (key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
            console.log("[service worker] deleting cache ", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      if (resp) {
        // console.log("fetched from the service worker ", resp);
        return resp;
      } else {
        return fetch(event.request).then((res) => {
          return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request.url, res.clone());
            return res;
          });
        });
      }
    })
  );
});
