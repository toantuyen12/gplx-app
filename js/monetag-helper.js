/**
 * Monetag Helper - Vignette
 */

let adScriptLoaded = false;

function loadAdScript() {
  if (adScriptLoaded) return;
  adScriptLoaded = true;

  const script = document.createElement("script");
  script.dataset.zone = "10971955";
  script.src = "https://n6wxm.com/vignette.min.js";
  document.body.appendChild(script);
}

let lastAdTime = 0;

window.showAd = function() {
  const now = Date.now();
  if (now - lastAdTime < 30000) return;

  loadAdScript(); // chỉ load 1 lần
  lastAdTime = now;
};
