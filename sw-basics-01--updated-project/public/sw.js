self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...", event);
});

self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  console.log("Event:", event);
  event.waitUntil(self.clients.claim()); // Claim clients
});

self.addEventListener("fetch", (event) => {
  console.log("[service worker ] fetching ...", event);
});
