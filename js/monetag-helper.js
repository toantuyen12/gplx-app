/**
 * Monetag Ad Manager v12 – NUCLEAR UNLOAD Edition
 * ===============================================
 * 
 * THE CHALLENGE:
 * "Blocking" is not enough; the user wants to "UNLOAD" and "REMOVE" 
 * the scripts and their effects completely from the DOM in exam flows.
 * 
 * THE SOLUTION:
 * 1. Physical Removal: Actively scan and remove aggressive ad script tags.
 * 2. Interaction Sterilization: Block ad scripts from creating new elements (iframes, scripts).
 * 3. Event Purge: Neutralize all click handlers and global hooks from ad domains.
 * 4. Context Aware: Auto-detect exam flow and engage the "Nuke" immediately.
 */
(function () {
  'use strict';
  if (window.__monetagInit) return;
  window.__monetagInit = true;

  /* ── Config ─────────────────────────────────────────────────────── */
  var AD_DOMAINS = ['quge5.com', 'monetag', 'n6wxm.com', 'vignette.min.js'];
  var AGGRESSIVE_ZONES = ['236798'];
  var AD_EVENT_TYPES = ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'pointerdown', 'pointerup'];

  var _examMode = false;
  var _lastAdTs = 0;

  /* ── Helpers ─────────────────────────────────────────────────────── */
  function _isAdStack() {
    try {
      var stack = new Error().stack || '';
      for (var i = 0; i < AD_DOMAINS.length; i++) {
        if (stack.indexOf(AD_DOMAINS[i]) !== -1) return true;
      }
    } catch(e) {}
    return false;
  }

  function _nukeAdElements() {
    // 1. Remove aggressive script tags
    document.querySelectorAll('script').forEach(function(s) {
      var src = s.src || '';
      var zone = s.dataset ? s.dataset.zone : '';
      if (AGGRESSIVE_ZONES.indexOf(zone) !== -1 || src.indexOf('quge5.com') !== -1) {
        console.log('[Mtg] Unloading aggressive ad script: ' + (zone || src));
        s.remove();
      }
    });

    // 2. Remove common ad-injected containers
    var suspects = ['#mtg-popunder', '.mtg-container', 'iframe[src*="monetag"]'];
    suspects.forEach(function(sel) {
      document.querySelectorAll(sel).forEach(function(el) { el.remove(); });
    });
  }

  function _allowAdClick() {
    if (_examMode) return false;
    // Session limit (5) & Cooldown (90s) check
    var cnt = 0; try { cnt = +sessionStorage.getItem('mtg_cnt')||0; } catch(e){}
    if (cnt >= 5) return false;
    var now = Date.now();
    if (now - _lastAdTs < 90000) return false;
    
    _lastAdTs = now;
    try { sessionStorage.setItem('mtg_cnt', cnt + 1); } catch(e){}
    return true;
  }

  /* ═══════════════════════════════════════════════════════════════════
     L1 – The "Nuke" Core: Resource & Creation Block
  ═══════════════════════════════════════════════════════════════════ */
  
  // Patch createElement to prevent ad scripts from making iframes or new scripts
  var _origCE = document.createElement;
  document.createElement = function(tag) {
    var tagName = (tag || '').toLowerCase();
    if ((tagName === 'script' || tagName === 'iframe') && _examMode && _isAdStack()) {
      console.log('[Mtg] Blocked ad-originated resource creation: ' + tagName);
      return _origCE.call(document, 'div'); // Return an inert div instead
    }
    return _origCE.apply(this, arguments);
  };

  // Patch window.open
  var _origOpen = window.open;
  window.open = function() {
    if (_examMode || (_isAdStack() && !_allowAdClick())) {
      console.log('[Mtg] Blocked window.open hijack');
      return null;
    }
    return _origOpen.apply(this, arguments);
  };

  /* ═══════════════════════════════════════════════════════════════════
     L2 – Event Sterilization
  ═══════════════════════════════════════════════════════════════════ */

  // Wrap addEventListener for ALL EventTargets
  var _origAEL = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, fn, opts) {
    if (AD_EVENT_TYPES.indexOf(type) !== -1 && _isAdStack()) {
      var orig = fn;
      var wrapped = function(e) {
        if (!_allowAdClick()) return;
        return orig.apply(this, arguments);
      };
      return _origAEL.call(this, type, wrapped, opts);
    }
    return _origAEL.call(this, type, fn, opts);
  };

  // Clean up global onclick properties
  function _sterilize(obj) {
    if (!obj) return;
    AD_EVENT_TYPES.forEach(function(t) {
      var prop = 'on' + t;
      var _val = obj[prop];
      Object.defineProperty(obj, prop, {
        configurable: true,
        set: function(fn) {
          if (_isAdStack()) {
            console.log('[Mtg] Sterilized ad property setter: ' + prop);
            return; 
          }
          _val = fn;
        },
        get: function() { return _val; }
      });
    });
  }
  [window, document, document.body].forEach(_sterilize);

  /* ═══════════════════════════════════════════════════════════════════
     L3 – Auto-Mode & Mutation Watch
  ════════════════════════════════════════─────────────────────── */
  
  function _checkMode() {
    var p = window.location.pathname.toLowerCase();
    var s = window.location.search.toLowerCase();
    if (p.indexOf('exam') !== -1 || p.indexOf('study') !== -1 || 
        p.indexOf('sahinh') !== -1 || s.indexOf('license=') !== -1) {
      _examMode = true;
      _nukeAdElements();
    }
  }

  // Monitor the DOM for any new ad-script injections
  var observer = new MutationObserver(function(mutations) {
    if (_examMode) {
      mutations.forEach(function(m) {
        m.addedNodes.forEach(function(node) {
          if (node.tagName === 'SCRIPT' || node.tagName === 'IFRAME') {
            var src = node.src || '';
            if (AD_DOMAINS.some(function(d) { return src.indexOf(d) !== -1; })) {
               node.remove();
               console.log('[Mtg] MutationObserver killed injected ad node');
            }
          }
        });
      });
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  _checkMode();

  /* ═══════════════════════════════════════════════════════════════════
     Public API
  ═══════════════════════════════════════════════════════════════════ */
  window.MoneytagAds = {
    setExamMode: function(on) {
      _examMode = !!on;
      if (_examMode) _nukeAdElements();
      console.log('[Mtg] ExamMode=' + _examMode);
    },
    showAd: function() {
      // Vignette manual trigger (allowed outside exam)
      if (_examMode) return;
      var s = document.createElement('script');
      s.dataset.zone = '10971955';
      s.src = 'https://n6wxm.com/vignette.min.js';
      s.async = true;
      document.head.appendChild(s);
    }
  };
  window.showAd = function() { window.MoneytagAds.showAd(); };

})();
