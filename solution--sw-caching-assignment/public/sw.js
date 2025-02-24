const CACHE_DYNAMIC_NAME = "dynamic-v12";
const CACHE_STATIC_NAME = "static-v1";

self.addEventListener("install", (event) => {
  console.log("event ", event);
  event.waitUntil(
    caches
      .open(CACHE_STATIC_NAME)
      .then((cache) => {
        return cache.addAll([
          "/",
          "/index.html",
          "/src/css/app.css",
          "/src/css/main.css",
          "/src/js/main.js",
          "/src/js/material.min.js",
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
self.addEventListener("activate", (event) => {
  console.log(event);
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_DYNAMIC_NAME && key !== CACHE_STATIC_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then((res) => {
          return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
            cache.put(event.request.url, res.clone());
            return res;
          });
        });
      }
    })
  );
});

// var CACHE_STATIC_NAME = 'static-v2';
// var CACHE_DYNAMIC_NAME = 'dynamic-v1';

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(CACHE_STATIC_NAME)
//       .then(function(cache) {
//         cache.addAll([
//           '/',
//           '/index.html',
//           '/src/css/app.css',
//           '/src/css/main.css',
//           '/src/js/main.js',
//           '/src/js/material.min.js',
//           'https://fonts.googleapis.com/css?family=Roboto:400,700',
//           'https://fonts.googleapis.com/icon?family=Material+Icons',
//           'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
//         ]);
//       })
//   )
// });

// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     caches.keys()
//       .then(function(keyList) {
//         return Promise.all(keyList.map(function(key) {
//           if (key !== CACHE_STATIC_NAME) {
//             return caches.delete(key);
//           }
//         }));
//       })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function(res) {
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 });
//             })
//             .catch(function(err) {

//             });
//         }
//       })
//   );
// });
