/**
 * Monetag Helper
 * Provides a globally accessible, rate-limited ad trigger function.
 */

window._lastAdTime = 0;

window.triggerAd = function() {
    try {
        if (typeof window !== "undefined" && window.monetag) {
            window.monetag();
        }
    } catch (e) {
        console.log("Ad trigger error", e);
    }
};

window.safeTriggerAd = function() {
    const now = Date.now();
    // 30 seconds rate limit (30000 ms)
    if (now - window._lastAdTime > 30000) {
        window.triggerAd();
        window._lastAdTime = now;
    }
};
