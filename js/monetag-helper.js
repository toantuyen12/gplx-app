/**
 * Monetag Ad Manager
 * ==================
 * - Device-aware: mobile vs desktop strategy
 * - Session cap: giới hạn số lần hiện ads / phiên
 * - Cooldown: khoảng cách tối thiểu giữa các ads
 * - Script vignette chỉ load 1 lần
 * - KHÔNG auto-bind click, KHÔNG spam redirect
 * - SPA-safe: không duplicate listener
 */

(function () {
  'use strict';

  // ─── CONFIG ───────────────────────────────────────────────
  const isMobile = window.innerWidth < 768;

  const CONFIG = {
    // Mobile: ưu tiên doanh thu hơn chút
    mobile: {
      cooldown:    30000,   // 30 giây giữa mỗi lần
      sessionLimit: 5,      // tối đa 5 lần / session
    },
    // Desktop: cân bằng hơn
    desktop: {
      cooldown:    40000,   // 40 giây giữa mỗi lần
      sessionLimit: 3,      // tối đa 3 lần / session
    }
  };

  const cfg = isMobile ? CONFIG.mobile : CONFIG.desktop;
  const SESSION_KEY = 'mtag_n';

  // ─── STATE ────────────────────────────────────────────────
  let adScriptLoaded = false;
  let lastAdTime = 0;

  // ─── HELPERS ──────────────────────────────────────────────
  function getCount() {
    try { return parseInt(sessionStorage.getItem(SESSION_KEY) || '0', 10); }
    catch (e) { return 0; }
  }

  function incCount() {
    try { sessionStorage.setItem(SESSION_KEY, String(getCount() + 1)); }
    catch (e) {}
  }

  function canShow() {
    const now = Date.now();
    return (now - lastAdTime >= cfg.cooldown) && (getCount() < cfg.sessionLimit);
  }

  // ─── LOAD SCRIPT (1 LẦN) ─────────────────────────────────
  function loadVignette() {
    if (adScriptLoaded) return;
    adScriptLoaded = true;
    const s = document.createElement('script');
    s.dataset.zone = '10971955';
    s.src = 'https://n6wxm.com/vignette.min.js';
    s.async = true;
    if (document.body) {
      document.body.appendChild(s);
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(s);
      });
    }
  }

  // ─── PUBLIC API ───────────────────────────────────────────
  /**
   * Gọi thủ công tại các điểm quan trọng:
   * startExam(), submit(), startChapter()
   */
  window.showAd = function () {
    if (!canShow()) return;
    loadVignette();
    incCount();
    lastAdTime = Date.now();
  };

  // ─── AUTO TRIGGER: lần đầu vào trang ─────────────────────
  // Chỉ trigger 1 lần duy nhất khi count = 0, sau delay nhẹ
  if (getCount() === 0) {
    var _initDelay = isMobile ? 2000 : 3000; // mobile show sớm hơn nhẹ
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        setTimeout(window.showAd, _initDelay);
      });
    } else {
      setTimeout(window.showAd, _initDelay);
    }
  }

})();
