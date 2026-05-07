/**
 * Monetag Ad Manager v9 – Precision Shield (Stack Trace Filtering)
 * ==============================================================
 * 
 * THE CHALLENGE:
 * We need to allow APP logic (popups, exam answers) to run while 
 * blocking AD logic (popunders) on the SAME click event.
 * 
 * THE SOLUTION:
 * 1. Universal addEventListener wrapper that uses Stack Trace Analysis
 *    to identify and neutralize only listeners coming from ad domains.
 * 2. Hard block blacklist zones (.exam-page, [data-popup-trigger], etc.)
 *    specifically for identified ad handlers.
 * 3. Session-based onclick limiting (max 5 per session).
 */
(function () {
  'use strict';
  if (window.__monetagInit) return;
  window.__monetagInit = true;

  /* ── Config ─────────────────────────────────────────────────────── */
  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
                 || window.innerWidth < 768;
  var ONCLICK_COOLDOWN  = isMobile ? 50000 : 90000;
  var SESSION_MAX = 5;
  var SESSION_KEY = 'mtg_v9_cnt';

  var AD_DOMAINS = ['quge5.com', 'monetag', 'n6wxm.com', 'vignette.min.js'];
  var AD_EVENT_TYPES = ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'pointerdown', 'pointerup'];

  var BLACKLIST_SELECTORS = [
    '[data-popup-trigger]', '.nav-class-card', '#navPopupClose', '.nav-popup-modal',
    '.class-card-v4', '.q-action-card', '.btn-v4',
    '#quiz', '#cExamRoot', '#c1ExamRoot', '#motoExamRoot', '#bExamRoot', '#s600StudyRoot',
    '.exam-container', '.study-container', '.question-area', '.answers-area', 
    '.question-navigation', '.practice-page', '.exam-page', '.s600-layout', 
    '.s600-study-wrap', '.exam-container-wrapper'
  ];

  /* ── State ───────────────────────────────────────────────────────── */
  var _examMode = false;
  var _lastAdTs  = 0;
  window.__monetagExamMode = false;

  /* ── Helpers ─────────────────────────────────────────────────────── */
  function _cnt()    { try { return +sessionStorage.getItem(SESSION_KEY)||0; } catch(e){return 0;} }
  function _incCnt() { try { sessionStorage.setItem(SESSION_KEY, _cnt()+1); } catch(e){} }

  function _isAdStack() {
    try {
      var stack = new Error().stack || '';
      for (var i = 0; i < AD_DOMAINS.length; i++) {
        if (stack.indexOf(AD_DOMAINS[i]) !== -1) return true;
      }
    } catch(e) {}
    return false;
  }

  function _isInBlacklist(target) {
    if (!target || !target.closest) return false;
    for (var i = 0; i < BLACKLIST_SELECTORS.length; i++) {
      try { if (target.closest(BLACKLIST_SELECTORS[i])) return true; } catch(e) {}
    }
    return false;
  }

  /**
   * Quyết định xem có cho phép một ad-listener chạy hay không.
   */
  function _allowAdClick(e) {
    // 1. HARD BLOCK tuyệt đối trong flow làm bài (Exam Mode)
    // Nếu đang làm bài, không cho bất kỳ ad-click nào lọt qua, kể cả priority.
    // (Priority ads sẽ được kích hoạt sau khi gọi setExamMode(false))
    if (_examMode) {
      // console.log('[Mtg] Absolute block during exam/study flow');
      return false;
    }

    // 2. Kiểm tra vùng blacklist (Của các trang ngoài flow thi, ví dụ Home CTAs)
    if (e && _isInBlacklist(e.target)) {
      // Cho phép nếu là priority action trên trang chủ/menu
      var el = e.target.closest('button, .btn, .btn-v4, [data-popup-trigger]');
      if (el) {
        var oc = el.getAttribute('onclick') || '';
        if (oc.indexOf('startExam') !== -1 || oc.indexOf('openQuiz') !== -1 ||
            el.dataset.popupTrigger === 'thithu' || el.dataset.popupTrigger === 'onthuyet') {
          return true; 
        }
      }
      return false;
    }

    // 3. Normal conditions (Ngoài flow thi)
    if (_cnt() >= SESSION_MAX) return false;
    var now = Date.now();
    if (now - _lastAdTs < ONCLICK_COOLDOWN) return false;

    // Allowed
    _lastAdTs = now;
    _incCnt(); 
    return true;
  }

  /* ── Auto-Shield based on URL ──────────────────────────────────── */
  function _autoShield() {
    var path = window.location.pathname.toLowerCase();
    var search = window.location.search.toLowerCase();
    if (path.indexOf('exam') !== -1 || path.indexOf('study') !== -1 || 
        path.indexOf('sahinh') !== -1 || search.indexOf('license=') !== -1) {
      _examMode = true;
      console.log('[Mtg] Auto-Shield active for ' + path);
    }
  }
  _autoShield();

  /* ═══════════════════════════════════════════════════════════════════
     L1 – window.open override
  ═══════════════════════════════════════════════════════════════════ */
  var _origOpen = window.open;
  window.open = function(url, tgt, feat) {
    // Luôn block window.open nếu trong exam mode hoặc blacklist
    if (_examMode) return null;
    
    // Nếu là click-triggered open (thường Monetag dùng window.open trong click handler)
    var isNewTab = !tgt || tgt === '_blank' || tgt === '';
    if (isNewTab) {
      // Chúng ta không có context 'event' ở đây dễ dàng, 
      // nhưng nếu đang trong cooldown hoặc quá giới hạn session thì block.
      if (_cnt() >= SESSION_MAX || (Date.now() - _lastAdTs < ONCLICK_COOLDOWN)) {
        return null;
      }
      // Note: _incCnt sẽ được gọi ở wrapper click.
    }
    return _origOpen.apply(this, arguments);
  };

  /* ═══════════════════════════════════════════════════════════════════
     L2 – addEventListener Wrapper (Stack Analysis)
  ═══════════════════════════════════════════════════════════════════ */
  var _origAEL = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, fn, opts) {
    if (AD_EVENT_TYPES.indexOf(type) !== -1) {
      if (_isAdStack()) {
        var orig = fn;
        var wrapped = function(e) {
          if (!_allowAdClick(e)) return;
          return orig.apply(this, arguments);
        };
        wrapped._mtgOrig = orig;
        return _origAEL.call(this, type, wrapped, opts);
      }
    }
    return _origAEL.call(this, type, fn, opts);
  };

  /* ═══════════════════════════════════════════════════════════════════
     L3 – Property Overrides (.onclick, etc.)
  ═══════════════════════════════════════════════════════════════════ */
  function _wrapProp(obj, prop) {
    var _val = null;
    try {
      Object.defineProperty(obj, prop, {
        configurable: true,
        set: function(fn) {
          if (!fn) { _val = null; return; }
          // Check if the setter is called from an ad script
          if (_isAdStack()) {
            var orig = fn;
            _val = function(e) {
              if (!_allowAdClick(e)) return;
              return orig.call(this, e);
            };
          } else {
            _val = fn;
          }
        },
        get: function() { return _val; }
      });
    } catch(e) {}
  }
  
  [window, document, document.body, document.documentElement].forEach(function(o) {
    if (!o) return;
    AD_EVENT_TYPES.forEach(function(t) {
      _wrapProp(o, 'on' + t);
    });
  });

  /* ═══════════════════════════════════════════════════════════════════
     L4 – Node.appendChild Guard (Kill aggressive zone scripts)
  ═══════════════════════════════════════════════════════════════════ */
  var _origAppend = Node.prototype.appendChild;
  Node.prototype.appendChild = function(node) {
    if (node && node.tagName === 'SCRIPT') {
      var src = node.src || '';
      var zone = node.dataset ? node.dataset.zone : '';
      if (zone === '236798' || src.indexOf('quge5.com') !== -1) {
        // Nếu trang hiện tại là exam/study, block thẳng tay việc load script mới của Monetag
        if (_examMode || window.location.search.indexOf('license=') !== -1) {
           console.log('[Mtg] Blocked dynamic script injection');
           return node;
        }
      }
    }
    return _origAppend.apply(this, arguments);
  };

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
      // Vignette manual trigger
      if (window.location.href.indexOf('index.html') !== -1) return; // Không hiện trên home nếu không cần
      var now = Date.now();
      if (now - _lastAdTs < 60000) return; // 60s cooldown cho vignette
      
      var s = document.createElement('script');
      s.dataset.zone = '10971955';
      s.src = 'https://n6wxm.com/vignette.min.js';
      s.async = true;
      document.head.appendChild(s);
    }
  };

  window.showAd = function() { window.MoneytagAds.showAd(); };

})();
