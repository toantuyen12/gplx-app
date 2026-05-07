/**
 * Monetag Ad Manager v4
 * =====================
 * Zones:
 *   236976  - Multitag (banner, in-page push, onclick) – tất cả trang
 *   236798  - Onclick / Popunder zone thứ 2
 *   10971955 - Vignette
 *
 * CHIẾN LƯỢC:
 *   - Banner / In-page Push: hoạt động 100% bình thường, không can thiệp
 *   - Onclick / Popunder (zone 236976 + 236798): BỊ BLOCK trong exam mode
 *     bằng cách override window.open – block redirect/tab mới khi user làm bài
 *   - Vignette (zone 10971955): chỉ trigger thủ công tại startExam() + submit()
 *
 * EXAM MODE:
 *   - window.open bị suspend → không thể mở tab mới
 *   - Onclick handler của Monetag không thể redirect
 *   - Banner / display ads vẫn hiển thị bình thường
 *
 * FREQUENCY LIMITS (onclick/popunder):
 *   Mobile : 50 giây
 *   Desktop: 120 giây
 *
 * FREQUENCY LIMITS (vignette):
 *   Mobile : 60 giây
 *   Desktop: 90 giây
 *
 * SPA-SAFE: init chỉ chạy 1 lần (guard __monetagInit)
 * ZONE ALTERNATING: 2 onclick zones không trigger cùng lúc
 */

(function () {
  'use strict';

  // ─── SPA guard – chỉ khởi tạo 1 lần ──────────────────────────────────────
  if (window.__monetagInit) return;
  window.__monetagInit = true;

  // ─── Device detection ─────────────────────────────────────────────────────
  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
                  || window.innerWidth < 768;

  // ─── Frequency limits ─────────────────────────────────────────────────────
  var ONCLICK_COOLDOWN  = isMobile ? 50000  : 120000; // 50s  / 120s
  var VIGNETTE_COOLDOWN = isMobile ? 60000  :  90000; // 60s  / 90s

  // ─── State ────────────────────────────────────────────────────────────────
  var _examMode       = false;   // true khi user đang làm bài
  var _vignetteLoaded = false;   // vignette script chỉ load 1 lần
  var _lastVignetteTs = 0;       // timestamp lần trigger vignette gần nhất
  var _lastOnclickTs  = 0;       // timestamp lần onclick/popunder gần nhất

  // ─── Override window.open ─────────────────────────────────────────────────
  // Cơ chế chặn HOÀN TOÀN tất cả redirect / tab-mới trong exam mode.
  // Banner và in-page ads không dùng window.open nên KHÔNG bị ảnh hưởng.
  var _origWindowOpen = window.open;

  window.open = function (url, target, features) {
    // 1. Block trong exam mode
    if (_examMode) {
      // eslint-disable-next-line no-console
      console.log('[MoneytagAds] Blocked: window.open suspended (exam mode).');
      return null;
    }

    // 2. Frequency check cho onclick/popunder (thường target = '_blank' hoặc '')
    var isNewTab = !target || target === '_blank' || target === '_new';
    if (isNewTab) {
      var now = Date.now();
      if (now - _lastOnclickTs < ONCLICK_COOLDOWN) {
        // eslint-disable-next-line no-console
        console.log('[MoneytagAds] Onclick cooldown active (' + Math.round((ONCLICK_COOLDOWN - (now - _lastOnclickTs)) / 1000) + 's remaining).');
        return null;
      }
      _lastOnclickTs = now;
    }

    return _origWindowOpen.apply(this, arguments);
  };

  // ─── Vignette loader (zone 10971955) ──────────────────────────────────────
  function _loadVignetteScript() {
    if (_vignetteLoaded) return;
    _vignetteLoaded = true;
    var s = document.createElement('script');
    s.dataset.zone = '10971955';
    s.src = 'https://n6wxm.com/vignette.min.js';
    s.async = true;
    var parent = document.body || document.head;
    if (parent) {
      parent.appendChild(s);
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(s);
      });
    }
  }

  // ─── Public API – window.MoneytagAds ──────────────────────────────────────
  window.MoneytagAds = {

    /**
     * Bật / tắt exam mode.
     *   true  → block tất cả window.open (onclick / popunder không thể mở tab)
     *   false → cho phép onclick / popunder (có frequency check)
     */
    setExamMode: function (enabled) {
      _examMode = !!enabled;
      // eslint-disable-next-line no-console
      console.log('[MoneytagAds] Exam mode:', _examMode ? 'ON – onclick/popunder blocked' : 'OFF – onclick/popunder allowed');
    },

    /**
     * Trigger vignette thủ công.
     * Dùng tại: bắt đầu thi (startExam), nộp bài (submit).
     * Có cooldown để không spam.
     */
    showAd: function () {
      var now = Date.now();
      if (now - _lastVignetteTs < VIGNETTE_COOLDOWN) return;
      _lastVignetteTs = now;
      _loadVignetteScript();
    }
  };

  // ─── Backward compatibility ───────────────────────────────────────────────
  // Các file exam JS cũ dùng window.showAd() → vẫn hoạt động
  window.showAd = function () {
    window.MoneytagAds.showAd();
  };

  // ─── Auto-load vignette script sau khi trang sẵn sàng ────────────────────
  // Delay nhỏ để không block LCP / FCP
  var vignetteInitDelay = isMobile ? 2000 : 3000;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(_loadVignetteScript, vignetteInitDelay);
    });
  } else {
    setTimeout(_loadVignetteScript, vignetteInitDelay);
  }

})();
