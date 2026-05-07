/**
 * Monetag Ad Manager v5 – 4-Layer Exam Shield
 * =============================================
 * LAYER 1: Override window.open        → chặn redirect/tab mới
 * LAYER 2: Override addEventListener   → wrap click handlers của Monetag trên document/window
 * LAYER 3: Override document.onclick   → chặn nếu Monetag dùng onclick property
 * LAYER 4: Bubble stopper trên container → stopPropagation trước khi event lên document
 *
 * Zones:
 *   236976  – Multitag (display, in-page, onclick)
 *   236798  – Onclick / Popunder zone 2
 *   10971955 – Vignette
 *
 * Frequency:
 *   Onclick/Popunder: Mobile 50s / Desktop 120s
 *   Vignette:         Mobile 60s / Desktop 90s
 *
 * SPA-safe: chỉ khởi tạo 1 lần (__monetagInit guard)
 */

(function () {
  'use strict';

  if (window.__monetagInit) return;
  window.__monetagInit = true;

  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
                  || window.innerWidth < 768;

  var ONCLICK_COOLDOWN  = isMobile ? 50000  : 120000;
  var VIGNETTE_COOLDOWN = isMobile ? 60000  :  90000;

  var _examMode       = false;
  var _vignetteLoaded = false;
  var _lastVignetteTs = 0;
  var _lastOnclickTs  = 0;

  // Expose cho cross-script access
  window.__monetagExamMode = false;

  // ═══════════════════════════════════════════════════════════════
  // LAYER 1 – Override window.open
  // ═══════════════════════════════════════════════════════════════
  var _origWindowOpen = window.open;
  window.open = function (url, target, features) {
    if (_examMode) {
      console.log('[MoneytagAds] L1: Blocked window.open (exam mode)');
      return null;
    }
    var isNewTab = !target || target === '_blank' || target === '_new' || target === '';
    if (isNewTab) {
      var now = Date.now();
      if (now - _lastOnclickTs < ONCLICK_COOLDOWN) {
        console.log('[MoneytagAds] L1: Onclick cooldown active');
        return null;
      }
      _lastOnclickTs = now;
    }
    return _origWindowOpen.apply(this, arguments);
  };

  // ═══════════════════════════════════════════════════════════════
  // LAYER 2 – Override EventTarget.prototype.addEventListener
  // Bắt mọi click handler được thêm vào document / window / body
  // và wrap chúng để kiểm tra exam mode trước khi chạy.
  // Phải chạy TRƯỚC khi Monetag script load (script async nên OK).
  // ═══════════════════════════════════════════════════════════════
  var _origAEL = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (type === 'click' &&
        (this === document || this === window || this === document.body)) {
      var _origFn = listener;
      var _wrapped = function (e) {
        if (_examMode) {
          console.log('[MoneytagAds] L2: Blocked document click handler (exam mode)');
          return;
        }
        return _origFn.apply(this, arguments);
      };
      _wrapped._monetagOrig = _origFn;
      return _origAEL.call(this, type, _wrapped, options);
    }
    return _origAEL.call(this, type, listener, options);
  };

  // ═══════════════════════════════════════════════════════════════
  // LAYER 3 – Override document.onclick property
  // Một số ad script dùng document.onclick = fn thay vì addEventListener
  // ═══════════════════════════════════════════════════════════════
  var _docOnclickFn = null;
  try {
    Object.defineProperty(document, 'onclick', {
      configurable: true,
      set: function (fn) {
        if (!fn) { _docOnclickFn = null; return; }
        var _orig = fn;
        _docOnclickFn = function (e) {
          if (_examMode) {
            console.log('[MoneytagAds] L3: Blocked document.onclick (exam mode)');
            return;
          }
          return _orig.call(document, e);
        };
      },
      get: function () { return _docOnclickFn; }
    });
  } catch (e) {
    console.warn('[MoneytagAds] L3: Could not override document.onclick:', e);
  }

  // ═══════════════════════════════════════════════════════════════
  // LAYER 4 – Bubble stopper trên exam containers
  // Khi event bubble lên đến container → stopPropagation
  // → Monetag's document-level handler không nhận được event.
  // ═══════════════════════════════════════════════════════════════
  var EXAM_CONTAINER_SELECTORS = [
    '#quiz',
    '#cExamRoot',
    '#c1ExamRoot',
    '#motoExamRoot',
    '#bExamRoot',
    '#s600StudyRoot',
    '.s600-layout',
    '.s600-study-wrap',
    '.exam-container-wrapper'
  ];

  function _installContainerShield() {
    EXAM_CONTAINER_SELECTORS.forEach(function (sel) {
      try {
        document.querySelectorAll(sel).forEach(function (el) {
          if (el._monetagShielded) return;
          el._monetagShielded = true;
          // Bubble phase: event đã được button xử lý, giờ chặn trước khi lên document
          el.addEventListener('click', function (e) {
            if (_examMode) {
              e.stopPropagation();
            }
          }, false);
          console.log('[MoneytagAds] L4: Shield installed on', sel);
        });
      } catch (err) { /* selector not found */ }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // Vignette loader (zone 10971955)
  // ═══════════════════════════════════════════════════════════════
  function _loadVignetteScript() {
    if (_vignetteLoaded) return;
    _vignetteLoaded = true;
    var s = document.createElement('script');
    s.dataset.zone = '10971955';
    s.src = 'https://n6wxm.com/vignette.min.js';
    s.async = true;
    (document.body || document.head).appendChild(s);
  }

  // ═══════════════════════════════════════════════════════════════
  // Public API – window.MoneytagAds
  // ═══════════════════════════════════════════════════════════════
  window.MoneytagAds = {

    /**
     * Bật / tắt exam mode.
     * true  → tất cả 4 layer chặn onclick/popunder
     * false → cho phép, có frequency check
     */
    setExamMode: function (enabled) {
      _examMode = !!enabled;
      window.__monetagExamMode = _examMode;
      console.log('[MoneytagAds] Exam mode:', _examMode ? 'ON – all ad clicks blocked' : 'OFF');

      if (_examMode) {
        // Cài shield lên container ngay và sau 500ms (đợi DOM render)
        _installContainerShield();
        setTimeout(_installContainerShield, 500);
        setTimeout(_installContainerShield, 1500);
      }
    },

    /**
     * Trigger vignette thủ công.
     * Dùng tại: startExam(), submit()
     */
    showAd: function () {
      var now = Date.now();
      if (now - _lastVignetteTs < VIGNETTE_COOLDOWN) return;
      _lastVignetteTs = now;
      _loadVignetteScript();
    }
  };

  // Backward compat
  window.showAd = function () { window.MoneytagAds.showAd(); };

  // Auto-load vignette (lazy, sau khi trang sẵn sàng)
  var vignetteDelay = isMobile ? 2000 : 3000;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(_loadVignetteScript, vignetteDelay);
    });
  } else {
    setTimeout(_loadVignetteScript, vignetteDelay);
  }

})();
