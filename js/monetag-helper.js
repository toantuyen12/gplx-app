/**
 * Monetag Ad Manager v6 – Session-Aware 4-Layer Exam Shield
 * ===========================================================
 *
 * BLOCKING (4 layers – giữ nguyên từ v5):
 *   L1: window.open override
 *   L2: EventTarget.prototype.addEventListener override
 *   L3: document.onclick property override
 *   L4: Bubble stopper trên exam containers
 *
 * SESSION CONTROL (mới):
 *   - Max 5 onclick/popunder per session (sessionStorage)
 *   - Cooldown: Mobile 50s / Desktop 90s giữa các lần
 *   - Zone alternating: 2 zones không trigger cùng lúc
 *   - Priority actions (start/submit/retry): không bị session limit
 *     vì chúng được gọi khi examMode = OFF (timing-based)
 *
 * TIMING FLOW:
 *   startExam  → showAd() + cho phép onclick (examMode=OFF) → 100ms → examMode=ON
 *   submit     → examMode=OFF → onclick fires tự nhiên → showAd()
 *   retryExam  → showAd() + cho phép onclick (examMode=OFF) → 100ms → examMode=ON
 *   Làm bài    → examMode=ON → tất cả onclick bị block
 *
 * Zones:
 *   236976  – Multitag (display, in-page, onclick)
 *   236798  – Onclick / Popunder zone 2
 *   10971955 – Vignette
 */

(function () {
  'use strict';

  if (window.__monetagInit) return;
  window.__monetagInit = true;

  // ─── Config ────────────────────────────────────────────────────────────────
  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
                  || window.innerWidth < 768;

  var ONCLICK_COOLDOWN_MS  = isMobile ? 50000 : 90000;   // 50s / 90s
  var VIGNETTE_COOLDOWN_MS = isMobile ? 60000 : 90000;   // 60s / 90s
  var SESSION_ONCLICK_MAX  = 5;                           // max lần/session
  var SESSION_KEY          = 'monetag_onclick_count';

  // ─── State ─────────────────────────────────────────────────────────────────
  var _examMode       = false;
  var _vignetteLoaded = false;
  var _lastVignetteTs = 0;
  var _lastOnclickTs  = 0;  // cooldown giữa các lần onclick

  window.__monetagExamMode = false;

  // ─── Session helpers ───────────────────────────────────────────────────────
  function _getOnclickCount() {
    try { return parseInt(sessionStorage.getItem(SESSION_KEY) || '0', 10); }
    catch (e) { return 0; }
  }
  function _incOnclickCount() {
    try { sessionStorage.setItem(SESSION_KEY, _getOnclickCount() + 1); }
    catch (e) { /* quota or private mode */ }
  }
  function _sessionLimitReached() {
    return _getOnclickCount() >= SESSION_ONCLICK_MAX;
  }

  // ─── Onclick gate: kiểm tra tất cả điều kiện ──────────────────────────────
  // Trả về true nếu onclick được phép chạy, false nếu phải block.
  function _onclickAllowed() {
    // 1. Exam mode ON → block
    if (_examMode) return false;

    // 2. Session limit
    if (_sessionLimitReached()) {
      console.log('[MoneytagAds] Session onclick limit reached (' + SESSION_ONCLICK_MAX + ')');
      return false;
    }

    // 3. Cooldown
    var now = Date.now();
    if (now - _lastOnclickTs < ONCLICK_COOLDOWN_MS) {
      console.log('[MoneytagAds] Onclick cooldown (' + Math.round((ONCLICK_COOLDOWN_MS - (now - _lastOnclickTs)) / 1000) + 's left)');
      return false;
    }

    // Passed – record timestamp & increment counter
    _lastOnclickTs = now;
    _incOnclickCount();
    console.log('[MoneytagAds] Onclick allowed. Session count: ' + _getOnclickCount() + '/' + SESSION_ONCLICK_MAX);
    return true;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LAYER 1 – Override window.open
  // ═══════════════════════════════════════════════════════════════════════════
  var _origWindowOpen = window.open;
  window.open = function (url, target, features) {
    var isNewTab = !target || target === '_blank' || target === '_new' || target === '';
    if (isNewTab) {
      if (!_onclickAllowed()) return null;
    }
    return _origWindowOpen.apply(this, arguments);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // LAYER 2 – Override EventTarget.prototype.addEventListener
  // Wrap click listeners được thêm vào document/window/body
  // ═══════════════════════════════════════════════════════════════════════════
  var _origAEL = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (type === 'click' &&
        (this === document || this === window || this === document.body)) {
      var _origFn = listener;
      var _wrapped = function (e) {
        if (!_onclickAllowed()) {
          return; // block
        }
        return _origFn.apply(this, arguments);
      };
      _wrapped._monetagOrig = _origFn;
      return _origAEL.call(this, type, _wrapped, options);
    }
    return _origAEL.call(this, type, listener, options);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // LAYER 3 – Override document.onclick property
  // ═══════════════════════════════════════════════════════════════════════════
  var _docOnclickFn = null;
  try {
    Object.defineProperty(document, 'onclick', {
      configurable: true,
      set: function (fn) {
        if (!fn) { _docOnclickFn = null; return; }
        var _orig = fn;
        _docOnclickFn = function (e) {
          if (!_onclickAllowed()) return;
          return _orig.call(document, e);
        };
      },
      get: function () { return _docOnclickFn; }
    });
  } catch (e) {
    console.warn('[MoneytagAds] L3: Could not override document.onclick');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LAYER 4 – Bubble stopper trên exam containers
  // ═══════════════════════════════════════════════════════════════════════════
  var EXAM_CONTAINER_IDS = [
    'quiz', 'cExamRoot', 'c1ExamRoot', 'motoExamRoot',
    'bExamRoot', 's600StudyRoot'
  ];
  var EXAM_CONTAINER_CLASSES = ['.s600-layout', '.s600-study-wrap', '.exam-container-wrapper'];

  function _installContainerShield() {
    EXAM_CONTAINER_IDS.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && !el._monetagShielded) {
        el._monetagShielded = true;
        el.addEventListener('click', function (e) {
          if (_examMode) e.stopPropagation();
        }, false);
      }
    });
    EXAM_CONTAINER_CLASSES.forEach(function (sel) {
      try {
        document.querySelectorAll(sel).forEach(function (el) {
          if (!el._monetagShielded) {
            el._monetagShielded = true;
            el.addEventListener('click', function (e) {
              if (_examMode) e.stopPropagation();
            }, false);
          }
        });
      } catch (err) { /* noop */ }
    });
  }

  // ─── Vignette loader ───────────────────────────────────────────────────────
  function _loadVignetteScript() {
    if (_vignetteLoaded) return;
    _vignetteLoaded = true;
    var s = document.createElement('script');
    s.dataset.zone = '10971955';
    s.src = 'https://n6wxm.com/vignette.min.js';
    s.async = true;
    (document.body || document.head).appendChild(s);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Public API
  // ═══════════════════════════════════════════════════════════════════════════
  window.MoneytagAds = {

    /**
     * Bật / tắt exam mode.
     * Khi ON: tất cả click handler trên document bị block.
     * Khi OFF: onclick được phép (có session limit + cooldown).
     *
     * LƯU Ý TIMING:
     *   Tại startExam/retryExam, gọi setExamMode(true) qua setTimeout(fn, 100)
     *   để click gốc còn được phép trigger onclick ad TRƯỚC khi shield bật.
     */
    setExamMode: function (enabled) {
      _examMode = !!enabled;
      window.__monetagExamMode = _examMode;
      console.log('[MoneytagAds] Exam mode:', _examMode ? 'ON' : 'OFF',
                  '| Session onclick: ' + _getOnclickCount() + '/' + SESSION_ONCLICK_MAX);

      if (_examMode) {
        _installContainerShield();
        setTimeout(_installContainerShield, 200);
        setTimeout(_installContainerShield, 800);
      }
    },

    /**
     * Trigger vignette thủ công (startExam, submit, retry).
     */
    showAd: function () {
      var now = Date.now();
      if (now - _lastVignetteTs < VIGNETTE_COOLDOWN_MS) return;
      _lastVignetteTs = now;
      _loadVignetteScript();
    },

    /** Đọc trạng thái session (debug) */
    getSessionInfo: function () {
      return {
        onclickCount: _getOnclickCount(),
        maxOnclick: SESSION_ONCLICK_MAX,
        examMode: _examMode,
        cooldownRemaining: Math.max(0, Math.round((ONCLICK_COOLDOWN_MS - (Date.now() - _lastOnclickTs)) / 1000))
      };
    }
  };

  // Backward compat
  window.showAd = function () { window.MoneytagAds.showAd(); };

  // Auto-load vignette (lazy)
  var vignetteDelay = isMobile ? 2000 : 3000;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(_loadVignetteScript, vignetteDelay);
    });
  } else {
    setTimeout(_loadVignetteScript, vignetteDelay);
  }

})();
