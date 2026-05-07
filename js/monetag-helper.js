/**
 * Monetag Ad Manager v8 – HARD BLOCK Edition
 * ==========================================
 * This version implements a zero-tolerance policy for intrusive ads during exam/study.
 * 
 * BLOCKING STRATEGY:
 * 1. Capture Phase Interception: Block events at the document level BEFORE they reach any script.
 * 2. Re-dispatch Logic: Carefully re-dispatch non-bubbling events to keep app logic working.
 * 3. AddEventListener Wrappers: Intercept and block Monetag's attempts to hook into events.
 * 4. Zone Blacklist: Explicitly block any activity from zone 236798 in exam mode.
 * 5. Blacklist Containers: Force stop propagation on all relevant UI areas.
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
  
  // All event types that ad scripts typically hook into
  var AD_EVENT_TYPES = [
    'click', 'mousedown', 'mouseup', 
    'touchstart', 'touchend', 
    'pointerdown', 'pointerup'
  ];

  /* ── State ───────────────────────────────────────────────────────── */
  var _examMode = false;
  var _vigLoaded = false;
  var _lastVigTs = 0;
  var _lastAdTs  = 0;
  window.__monetagExamMode = false;

  /* ── Blacklist Containers (Selectors) ───────────────────────────── */
  var BLACKLIST_SELECTORS = [
    '#quiz', '#cExamRoot', '#c1ExamRoot', '#motoExamRoot', '#bExamRoot', '#s600StudyRoot',
    '.exam-container', '.study-container', '.question-area', '.answers-area', 
    '.question-navigation', '.practice-page', '.exam-page', '.s600-layout', 
    '.s600-study-wrap', '.exam-container-wrapper'
  ];

  /* ── Session helpers ─────────────────────────────────────────────── */
  function _cnt()    { try { return +sessionStorage.getItem(SESSION_KEY)||0; } catch(e){return 0;} }
  function _incCnt() { try { sessionStorage.setItem(SESSION_KEY, _cnt()+1); } catch(e){} }

  /* ── Gate: kiểm tra mọi điều kiện trước khi cho ad chạy ─────────── */
  function _allow(e) {
    if (_examMode) return false;
    
    // Check if event originated from a blacklisted area
    if (e && e.target && _isInBlacklistArea(e.target)) return false;

    if (_cnt() >= SESSION_MAX) return false;
    
    var now = Date.now();
    if (now - _lastAdTs < ONCLICK_COOLDOWN) return false;
    
    _lastAdTs = now; 
    _incCnt();
    console.log('[Mtg] Ad allowed. Count: ' + _cnt() + '/' + SESSION_MAX);
    return true;
  }

  function _isInBlacklistArea(target) {
    if (!target || !target.closest) return false;
    try {
      for (var i = 0; i < BLACKLIST_SELECTORS.length; i++) {
        if (target.closest(BLACKLIST_SELECTORS[i])) return true;
      }
    } catch(e) {}
    return false;
  }

  /* ═══════════════════════════════════════════════════════════════════
     L1 – window.open override
  ═══════════════════════════════════════════════════════════════════ */
  var _origOpen = window.open;
  window.open = function(url, tgt, feat) {
    var newTab = !tgt || tgt==='_blank' || tgt==='' || tgt==='_new';
    if (newTab && !_allow()) {
      console.log('[Mtg] Blocked window.open');
      return null;
    }
    return _origOpen.apply(this, arguments);
  };

  /* ═══════════════════════════════════════════════════════════════════
     L2 – EventTarget.prototype.addEventListener override
  ═══════════════════════════════════════════════════════════════════ */
  var _origAEL = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, fn, opts) {
    var isAdEvent = AD_EVENT_TYPES.indexOf(type) !== -1;
    var isGlobalTarget = this === document || this === window
                      || this === document.body
                      || this === document.documentElement;
                      
    if (isAdEvent && isGlobalTarget) {
      var orig = fn;
      var wrapped = function(e) {
        if (!_allow(e)) return;
        return orig.apply(this, arguments);
      };
      wrapped._mtgOrig = orig;
      return _origAEL.call(this, type, wrapped, opts);
    }
    return _origAEL.call(this, type, fn, opts);
  };

  /* ═══════════════════════════════════════════════════════════════════
     L3 – Document CAPTURE interceptor (HARD BLOCK)
  ═══════════════════════════════════════════════════════════════════ */
  var _safeEvents = typeof WeakSet !== 'undefined' ? new WeakSet() : null;

  function _captureBlocker(e) {
    if (_safeEvents && _safeEvents.has(e)) return; // Already re-dispatched, allow
    
    if (!_examMode && !_isInBlacklistArea(e.target)) return;

    // If we are in exam mode OR the click is in a blacklisted area, stop it!
    e.stopImmediatePropagation();
    e.stopPropagation();

    // Re-dispatch a non-bubbling clone for app logic
    try {
      var opts = {
        bubbles: false, // CRITICAL: prevent it from bubbling back to document
        cancelable: e.cancelable,
        view: window,
        clientX: e.clientX || 0,
        clientY: e.clientY || 0,
        button: e.button  || 0,
        buttons: e.buttons || 0,
        detail: e.detail || 0,
        screenX: e.screenX || 0,
        screenY: e.screenY || 0,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey
      };
      
      var safe;
      if (e instanceof MouseEvent) {
        safe = new MouseEvent(e.type, opts);
      } else if (window.PointerEvent && e instanceof PointerEvent) {
        safe = new PointerEvent(e.type, opts);
      } else {
        safe = new Event(e.type, { bubbles: false, cancelable: e.cancelable });
      }

      if (_safeEvents) _safeEvents.add(safe);
      e.target.dispatchEvent(safe);
      // console.log('[Mtg] Hard blocked ad-click and re-dispatched for target');
    } catch(err) {
      // Fallback for older browsers or complex events
    }
  }

  // Register capture blocker BEFORE any other scripts
  AD_EVENT_TYPES.forEach(function(type) {
    _origAEL.call(document, type, _captureBlocker, true);
    _origAEL.call(window, type, _captureBlocker, true);
  });

  /* ═══════════════════════════════════════════════════════════════════
     L4 – Script Injection Guard (Kill Zone 236798)
  ═══════════════════════════════════════════════════════════════════ */
  var _origAppendChild = Node.prototype.appendChild;
  Node.prototype.appendChild = function(node) {
    if (node && node.tagName === 'SCRIPT' && node.dataset && node.dataset.zone === '236798') {
      console.log('[Mtg] Blocked dynamic injection of aggressive zone 236798');
      return node;
    }
    return _origAppendChild.apply(this, arguments);
  };

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
    setExamMode: function(on) {
      _examMode = !!on;
      window.__monetagExamMode = _examMode;
      console.log('[Mtg] ExamMode=' + _examMode);
    },
    showAd: function() {
      var now = Date.now();
      if (now - _lastVigTs < VIGNETTE_COOLDOWN) return;
      _lastVigTs = now;
      _loadVig();
    },
    info: function() {
      return { 
        examMode: _examMode, 
        session: _cnt() + '/' + SESSION_MAX,
        cooldown: Math.max(0, Math.round((ONCLICK_COOLDOWN - (Date.now() - _lastAdTs)) / 1000)) + 's' 
      };
    }
  };

  window.showAd = function() { window.MoneytagAds.showAd(); };

  // Lazy pre-load vignette
  var delay = isMobile ? 2000 : 3000;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(_loadVig, delay); });
  } else {
    setTimeout(_loadVig, delay);
  }

})();
