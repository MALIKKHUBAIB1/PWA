if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => {
      console.log("servise worker register sucessefully ");
    })
    .catch((err) => {
      console.log(err);
    });
}
