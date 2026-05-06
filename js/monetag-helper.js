/**
 * Monetag Helper
 * Provides a globally accessible, rate-limited ad trigger function.
 */

window.lastAdTime = 0;

window.canShowAd = function() {
    const now = Date.now();
    return now - window.lastAdTime > 30000; // 30 seconds
};

window.showAdSafely = function() {
    if (!window.canShowAd()) return;

    try {
        if (typeof window !== "undefined" && window.monetag) {
            window.monetag();
            window.lastAdTime = Date.now();
        }
    } catch (e) {
        console.log("Ad error", e);
    }
};
