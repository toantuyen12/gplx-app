/**
 * Monetag Ad Manager v14 – Surgical Route-Based Edition
 * ====================================================
 * 
 * THE CHALLENGE:
 * Even with V13, some ads were persisting due to static HTML inclusion.
 * 
 * THE SOLUTION:
 * 1. Physical Purge: All learning routes now have ZERO static intrusive tags.
 * 2. Dynamic Injection: Onclick/Popunder scripts are only loaded via reloadOnclick().
 * 3. Route Awareness: Auto-detect if we are in a "Safe" route (Home, Blog) and allow static loads.
 * 4. Zero Interruption: No stopPropagation or click-blocking used.
 */
(function () {
  'use strict';
  if (window.__monetagInit) return;
  window.__monetagInit = true;

  /* ── Config ─────────────────────────────────────────────────────── */
  var POPUNDER_ZONES = ['236798', '236976'];
  var AD_DOMAINS = ['quge5.com', 'monetag', 'n6wxm.com'];
  
  // Routes where onclick ads are allowed to load statically or dynamically
  var SAFE_ROUTES = ['index.html', 'blog.html', 'bai-viet', 'signs.html', 'meo-thi-gplx.html'];
  
  var _examMode = false;

  /* ── Helpers ─────────────────────────────────────────────────────── */
  
  function _isSafeRoute() {
    var p = window.location.pathname.toLowerCase();
    // Root path is safe
    if (p === '/' || p === '/index.html' || p === '') return true;
    return SAFE_ROUTES.some(function(r) { return p.indexOf(r) !== -1; });
  }

  function _nukeAdElements() {
    // Only nuke if we are NOT in a safe route
    if (_isSafeRoute() && !_examMode) return;

    document.querySelectorAll('script').forEach(function(s) {
      var src = s.src || '';
      var zone = s.dataset ? s.dataset.zone : '';
      if (POPUNDER_ZONES.indexOf(zone) !== -1 || src.indexOf('quge5.com') !== -1) {
        console.log('[Mtg] Purging intrusive script: ' + (zone || src));
        s.remove();
      }
    });

    var suspects = ['#mtg-popunder', '.mtg-container', 'iframe[src*="monetag"]', 'div[id^="punder-"]'];
    suspects.forEach(function(sel) {
      document.querySelectorAll(sel).forEach(function(el) { el.remove(); });
    });
  }

  /* ── Core Logic ────────────────────────────────────────────────── */

  function _checkMode() {
    var p = window.location.pathname.toLowerCase();
    var s = window.location.search.toLowerCase();
    
    // Learning routes
    if (p.indexOf('exam') !== -1 || p.indexOf('study') !== -1 || 
        p.indexOf('sahinh') !== -1 || s.indexOf('license=') !== -1 || p.indexOf('games') !== -1) {
      _examMode = true;
      _nukeAdElements();
    } else {
      _examMode = false;
    }
  }

  var observer = new MutationObserver(function(mutations) {
    if (_examMode) {
      mutations.forEach(function(m) {
        m.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) {
            if (node.tagName === 'SCRIPT' || node.tagName === 'IFRAME') {
              var src = node.src || '';
              var zone = node.dataset ? node.dataset.zone : '';
              if (POPUNDER_ZONES.indexOf(zone) !== -1 || AD_DOMAINS.some(function(d) { return src.indexOf(d) !== -1; })) {
                node.remove();
                console.log('[Mtg] Suppressed dynamic injection in learning route');
              }
            }
          }
        });
      });
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  _checkMode();

  /* ── Public API ────────────────────────────────────────────────── */
  
  window.MoneytagAds = {
    setExamMode: function(on) {
      _examMode = !!on;
      if (_examMode) _nukeAdElements();
      console.log('[Mtg] Mode: ' + (_examMode ? 'LEARNING' : 'NORMAL'));
    },

    showAd: function() {
      if (_examMode) return;
      var s = document.createElement('script');
      s.dataset.zone = '10971955';
      s.src = 'https://n6wxm.com/vignette.min.js';
      s.async = true;
      document.head.appendChild(s);
    },

    reloadOnclick: function() {
      // Only reload if NOT in exam mode or if we specifically want to show result ads
      if (_examMode) {
        console.log('[Mtg] reloadOnclick suppressed: Exam Mode is ON');
        return;
      }
      
      if (!document.querySelector('script[data-zone="236798"]')) {
        console.log('[Mtg] Dynamically injecting onclick zone...');
        var s = document.createElement('script');
        s.src = 'https://quge5.com/88/tag.min.js';
        s.dataset.zone = '236798';
        s.async = true;
        s.setAttribute('data-cfasync', 'false');
        document.head.appendChild(s);
      }
    }
  };

  window.showAd = function() { window.MoneytagAds.showAd(); };

})();
