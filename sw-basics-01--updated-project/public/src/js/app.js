let deferredPrompt;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((err) => {
      console.log("Service Worker registration failed:", err);
    });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  console.log("[beforeinstallprompt]", event);
  deferredPrompt = event;
  return false;
});
