/**
 * Monetag Ad Manager v7 – Hard Block
 * ====================================
 * Intercepts ALL possible ad-click mechanisms:
 *  - EventTarget.prototype.addEventListener (click, touch, pointer)
 *  - document/window/body/html .onclick property
 *  - document CAPTURE phase với non-bubbling re-dispatch
 *  - window.open override
 *  - Bubble stopper on containers
 *
 * Session: max 5 onclick/session, cooldown Mobile 50s / Desktop 90s
 * Exam mode: HARD block tất cả ad clicks trong exam/study areas
 */
(function () {
  'use strict';
  if (window.__monetagInit) return;
  window.__monetagInit = true;

  /* ── Config ─────────────────────────────────────────────────────── */
  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
                 || window.innerWidth < 768;
  var ONCLICK_COOLDOWN  = isMobile ? 50000 : 90000;
  var VIGNETTE_COOLDOWN = isMobile ? 60000 : 90000;
  var SESSION_MAX = 5;
  var SESSION_KEY = 'mtg_onclick_n';
  var AD_EVENT_TYPES = ['click','touchstart','touchend','pointerdown'];

  /* ── State ───────────────────────────────────────────────────────── */
  var _exam = false;           // exam / study mode ON
  var _vigLoaded = false;
  var _lastVigTs = 0;
  var _lastAdTs  = 0;
  window.__monetagExamMode = false;

  /* ── Session helpers ─────────────────────────────────────────────── */
  function _cnt()    { try { return +sessionStorage.getItem(SESSION_KEY)||0; } catch(e){return 0;} }
  function _incCnt() { try { sessionStorage.setItem(SESSION_KEY, _cnt()+1); } catch(e){} }

  /* ── Gate: kiểm tra mọi điều kiện trước khi cho ad chạy ─────────── */
  function _allow() {
    if (_exam) return false;
    if (_cnt() >= SESSION_MAX) { console.log('[Mtg] session limit'); return false; }
    var now = Date.now();
    if (now - _lastAdTs < ONCLICK_COOLDOWN) { console.log('[Mtg] cooldown'); return false; }
    _lastAdTs = now; _incCnt();
    console.log('[Mtg] ad allowed, count='+ _cnt() +'/'+ SESSION_MAX);
    return true;
  }

  /* ═══════════════════════════════════════════════════════════════════
     L1 – window.open override
  ═══════════════════════════════════════════════════════════════════ */
  var _origOpen = window.open;
  window.open = function(url, tgt, feat) {
    var newTab = !tgt || tgt==='_blank' || tgt==='' || tgt==='_new';
    if (newTab && !_allow()) return null;
    return _origOpen.apply(this, arguments);
  };

  /* ═══════════════════════════════════════════════════════════════════
     L2 – EventTarget.prototype.addEventListener override
     Wraps TẤT CẢ event listeners thêm vào document/window/body/html
  ═══════════════════════════════════════════════════════════════════ */
  var _origAEL = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, fn, opts) {
    var adType = AD_EVENT_TYPES.indexOf(type) !== -1;
    var adTarget = this === document || this === window
                || this === document.body
                || this === document.documentElement;
    if (adType && adTarget) {
      var orig = fn;
      var wrapped = function(e) {
        if (!_allow()) return;
        return orig.apply(this, arguments);
      };
      wrapped._mtgOrig = orig;
      return _origAEL.call(this, type, wrapped, opts);
    }
    return _origAEL.call(this, type, fn, opts);
  };

  /* ═══════════════════════════════════════════════════════════════════
     L3 – Override .onclick / .ontouchstart properties
     Covers: document, window, body, html element
  ═══════════════════════════════════════════════════════════════════ */
  function _wrapOnEvt(obj, prop) {
    var _stored = null;
    try {
      Object.defineProperty(obj, prop, {
        configurable: true,
        set: function(fn) {
          if (!fn) { _stored = null; return; }
          var orig = fn;
          _stored = function(e) { if (!_allow()) return; return orig.call(this, e); };
        },
        get: function() { return _stored; }
      });
    } catch(e) {}
  }
  ['onclick','ontouchstart','ontouchend','onpointerdown'].forEach(function(p) {
    _wrapOnEvt(document, p);
    _wrapOnEvt(window,   p);
    if (document.body)            _wrapOnEvt(document.body, p);
    if (document.documentElement) _wrapOnEvt(document.documentElement, p);
  });
  // Re-apply on body once DOM ready (body may not exist at parse time)
  document.addEventListener('DOMContentLoaded', function() {
    ['onclick','ontouchstart','ontouchend','onpointerdown'].forEach(function(p) {
      _wrapOnEvt(document.body, p);
    });
  });

  /* ═══════════════════════════════════════════════════════════════════
     L4 – Exam containers: bubble stopper
     stopPropagation() ngay tại container level → Monetag bubble handler không nhận
  ═══════════════════════════════════════════════════════════════════ */
  var CONTAINER_IDS = [
    'quiz','cExamRoot','c1ExamRoot','motoExamRoot','bExamRoot','s600StudyRoot'
  ];
  function _shieldContainers() {
    CONTAINER_IDS.forEach(function(id) {
      var el = document.getElementById(id);
      if (el && !el._mtgShield) {
        el._mtgShield = true;
        AD_EVENT_TYPES.forEach(function(type) {
          el.addEventListener(type, function(e) {
            if (_exam) e.stopPropagation();
          }, false);
        });
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     L5 – Document CAPTURE interceptor (chạy TRƯỚC mọi handler khác)
     Nếu examMode=ON và click trong exam area:
       1. stopImmediatePropagation() → ngăn tất cả capture handlers khác
       2. Re-dispatch non-bubbling event → button inline onclick vẫn chạy
  ═══════════════════════════════════════════════════════════════════ */
  var _safeEvents = typeof WeakSet !== 'undefined' ? new WeakSet() : null;

  function _isInExamArea(target) {
    if (!target || !target.closest) return false;
    for (var i = 0; i < CONTAINER_IDS.length; i++) {
      var c = document.getElementById(CONTAINER_IDS[i]);
      if (c && c.contains(target)) return true;
    }
    return false;
  }

  function _captureBlocker(e) {
    if (_safeEvents && _safeEvents.has(e)) return; // safe re-dispatch, skip
    if (!_exam) return;
    if (!_isInExamArea(e.target)) return;

    // Hard stop – no ad handler will receive this event
    e.stopImmediatePropagation();

    // Re-dispatch a non-bubbling clone so inline onclick="..." still fires
    try {
      var opts = {
        bubbles: false,   // ← key: won't reach document level
        cancelable: e.cancelable,
        view: window,
        clientX: e.clientX || 0,
        clientY: e.clientY || 0,
        button: e.button  || 0,
        buttons: e.buttons || 0
      };
      var safe = (e.type === 'click') ? new MouseEvent('click', opts)
               : new Event(e.type, { bubbles: false, cancelable: false });
      if (_safeEvents) _safeEvents.add(safe);
      e.target.dispatchEvent(safe);
    } catch(err) { /* fallback: button still had its handler called via inline */ }
  }

  // Register BEFORE Monetag loads (scripts are async, this is sync)
  AD_EVENT_TYPES.forEach(function(type) {
    _origAEL.call(document, type, _captureBlocker, true); // capture=true → FIRST
  });

  /* ═══════════════════════════════════════════════════════════════════
     Vignette (zone 10971955)
  ═══════════════════════════════════════════════════════════════════ */
  function _loadVig() {
    if (_vigLoaded) return;
    _vigLoaded = true;
    var s = document.createElement('script');
    s.dataset.zone = '10971955';
    s.src = 'https://n6wxm.com/vignette.min.js';
    s.async = true;
    (document.body || document.head).appendChild(s);
  }

  /* ═══════════════════════════════════════════════════════════════════
     Public API
  ═══════════════════════════════════════════════════════════════════ */
  window.MoneytagAds = {
    /**
     * setExamMode(true)  → hard block tất cả ad clicks
     * setExamMode(false) → cho phép ad clicks (có gate)
     * Gọi qua setTimeout(fn,100) để click trigger action được phép chạy
     */
    setExamMode: function(on) {
      _exam = !!on;
      window.__monetagExamMode = _exam;
      console.log('[Mtg] examMode='+_exam+' session='+_cnt()+'/'+SESSION_MAX);
      if (_exam) {
        _shieldContainers();
        setTimeout(_shieldContainers, 300);
        setTimeout(_shieldContainers, 1000);
      }
    },
    /** Trigger vignette (manual, với cooldown) */
    showAd: function() {
      var now = Date.now();
      if (now - _lastVigTs < VIGNETTE_COOLDOWN) return;
      _lastVigTs = now;
      _loadVig();
    },
    /** Debug info */
    info: function() {
      return { exam:_exam, session:_cnt()+'/'+SESSION_MAX,
               cooldown: Math.max(0,Math.round((ONCLICK_COOLDOWN-(Date.now()-_lastAdTs))/1000))+'s' };
    }
  };

  // Backward compat
  window.showAd = function() { window.MoneytagAds.showAd(); };

  // Lazy vignette pre-load
  var delay = isMobile ? 2000 : 3000;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(_loadVig, delay); });
  } else {
    setTimeout(_loadVig, delay);
  }

})();
