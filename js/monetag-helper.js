/**
 * Monetag Ad Manager v3
 * =====================
 * CHIẾN LƯỢC:
 *   - Banner / In-page Push / Vignette: hoạt động bình thường, tự hiển thị
 *   - Onclick / Popunder: giới hạn tần suất, không spam redirect
 *
 * KHÔNG auto-bind toàn bộ click.
 * Script vignette chỉ load 1 lần (SPA-safe).
 */

(function () {
  'use strict';

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
                    || window.innerWidth < 768;

  // ─── Giới hạn chỉ áp dụng cho onclick/popunder ─────────
  const ONCLICK_COOLDOWN = isMobile ? 30000 : 60000; // 30s mobile / 60s desktop
  let lastOnclickTime = 0;

  // ─── Vignette: load 1 lần, auto trigger khi load ────────
  let vignetteLoaded = false;

  function loadVignette() {
    if (vignetteLoaded) return;
    vignetteLoaded = true;

    const s = document.createElement('script');
    s.dataset.zone = '10971955';
    s.src = 'https://n6wxm.com/vignette.min.js';
    s.async = true;
    // Append ngay sau body sẵn sàng
    if (document.body) {
      document.body.appendChild(s);
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(s);
      });
    }
  }

  // ─── Vignette: trigger thủ công (bắt đầu thi / nộp bài) ─
  // Không giới hạn session, chỉ cần khoảng cách 30s
  let lastVignetteTime = 0;
  const VIGNETTE_COOLDOWN = 30000; // 30 giây

  window.showAd = function () {
    const now = Date.now();
    if (now - lastVignetteTime < VIGNETTE_COOLDOWN) return;
    loadVignette(); // gọi lại để vignette script tự re-trigger nếu hỗ trợ
    lastVignetteTime = now;
  };

  // ─── Onclick / Popunder guard ────────────────────────────
  // Chỉ cho phép nếu đủ cooldown; dùng nội bộ nếu Monetag SDK cần
  window._onclickGuard = function (callback) {
    const now = Date.now();
    if (now - lastOnclickTime < ONCLICK_COOLDOWN) return;
    lastOnclickTime = now;
    if (typeof callback === 'function') {
      try { callback(); } catch (e) { console.log('Ad callback error', e); }
    }
  };

  // ─── Auto load vignette ngay khi trang sẵn sàng ─────────
  // Banner, in-page push sẽ tự hoạt động từ script Monetag
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(loadVignette, isMobile ? 1500 : 2500);
    });
  } else {
    setTimeout(loadVignette, isMobile ? 1500 : 2500);
  }

})();
