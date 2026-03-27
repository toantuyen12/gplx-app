/**
 * nav-popup.js — Unified Navigation System
 * Handles: mobile drawer, accordion, desktop dropdown, class-selection modal
 */
(function () {
    'use strict';

    // ── A. Check if modal/popup should run (skip CAND & games) ──
    const url = window.location.href.toLowerCase();
    const isCAND = url.includes('b-cand') || url.includes('c-cand') ||
                   url.includes('cand-study') || url.includes('cand-exam');
    const isGame = url.includes('games/');
    const runModal = !isCAND && !isGame;

    // ── B. Path prefix detection (for sub-pages in sub-dirs) ──
    let pathPrefix = '';
    const homeLink = document.querySelector('.main-nav a[href*="index.html"]');
    if (homeLink) {
        const href = homeLink.getAttribute('href');
        const match = href.match(/^(\.\.\/)+ /);
        if (match) pathPrefix = match[0];
    }

    // ── C. Class / Route data (only needed for modal) ──
    const classData = {
        'a1': { name: 'Hạng A1', desc: 'Xe máy < 125cm³', icon: 'fa-motorcycle', color: 'card-a1' },
        'a':  { name: 'Hạng A',  desc: 'Xe máy ≥ 125cm³', icon: 'fa-motorcycle', color: 'card-a'  },
        'b':  { name: 'Hạng B',  desc: 'Ô tô 4 – 9 chỗ',  icon: 'fa-car',        color: 'card-b'  },
        'c1': { name: 'Hạng C1', desc: 'Ô tô tải nhẹ',    icon: 'fa-truck',      color: 'card-c1' },
        'c':  { name: 'Hạng C',  desc: 'Ô tô tải nặng',   icon: 'fa-truck-moving', color: 'card-c' }
    };
    const routeMap = {
        'thithu':  { 'a1': 'class-a1-menu.html', 'a': 'class-a-menu.html', 'b': 'class-b-menu.html', 'c1': 'class-c1-menu.html', 'c': 'class-c-menu.html' },
        'sahinh':  { 'a1': 'sahinh-a1.html',     'a': 'sahinh-a.html',    'b': 'sahinh-b.html',    'c1': 'sahinh-c1.html',    'c': 'sahinh-c.html'    }
    };
    let currentContext = 'thithu';

    // ── D. Inject Class-Selection Modal (non-CAND only) ──
    if (runModal && !document.getElementById('navPopupOverlay')) {
        const cardsHTML = Object.entries(classData).map(([key, info]) => `
            <div class="nav-class-card ${info.color}" data-class="${key}">
                <div class="nav-class-icon"><i class="fa-solid ${info.icon}"></i></div>
                <div class="nav-class-info">
                    <span class="nav-class-name">${info.name}</span>
                    <span class="nav-class-desc">${info.desc}</span>
                </div>
                <div class="nav-class-check"><i class="fa-solid fa-check"></i></div>
            </div>`).join('');

        document.body.insertAdjacentHTML('beforeend', `
            <div class="nav-popup-overlay" id="navPopupOverlay">
                <div class="nav-popup-modal">
                    <div class="nav-popup-header">
                        <h2>Chọn hạng xe</h2>
                        <button class="nav-popup-close" id="navPopupClose" aria-label="Đóng">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div class="nav-popup-body">
                        <div class="nav-popup-grid">${cardsHTML}</div>
                    </div>
                </div>
            </div>`);
    }

    // ── E. Mobile Drawer Setup ──
    function initMobileDrawer() {
        const toggle  = document.querySelector('.menu-toggle');
        const drawer  = document.querySelector('.mobile-menu');
        if (!toggle || !drawer) return;

        // Inject branded header + close button + nav wrapper (once)
        if (!drawer.querySelector('.mobile-menu-close')) {
            // Collect existing children
            const existingChildren = Array.from(drawer.childNodes);

            // Build brand header
            const brand = document.createElement('div');
            brand.className = 'mobile-menu-brand';
            brand.innerHTML = `
                <img src="${pathPrefix}assets/logo.svg" alt="Logo" style="height:28px;">
                <span>Thi GPLX</span>`;

            const closeBtn = document.createElement('button');
            closeBtn.className = 'mobile-menu-close';
            closeBtn.setAttribute('aria-label', 'Đóng menu');
            closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

            const divider = document.createElement('div');
            divider.className = 'mobile-menu-divider';

            const navWrapper = document.createElement('div');
            navWrapper.className = 'mobile-menu-nav';

            // Move existing links into wrapper
            existingChildren.forEach(child => {
                if (child.nodeType === Node.ELEMENT_NODE || (child.nodeType === Node.TEXT_NODE && child.textContent.trim())) {
                    navWrapper.appendChild(child);
                }
            });

            drawer.appendChild(closeBtn);
            drawer.appendChild(brand);
            drawer.appendChild(divider);
            drawer.appendChild(navWrapper);

            // Upgrade accordion toggle to have chevron + icon
            const accToggle = navWrapper.querySelector('.accordion-toggle');
            if (accToggle && !accToggle.querySelector('.chevron')) {
                // Wrap existing text
                const text = accToggle.textContent.trim().replace(/\s*<.*$/, '');
                accToggle.innerHTML = `
                    <span style="display:flex;align-items:center;gap:10px;">
                        <i class="fa-solid fa-layer-group link-icon"></i>
                        Ôn theo hạng
                    </span>
                    <i class="fa-solid fa-chevron-down chevron"></i>`;
            }

            // Add icons to top-level links
            const iconMap = {
                'index.html': 'fa-house',
                'cand-menu.html': 'fa-stopwatch',
                'signs.html': 'fa-signs-post',
                'meo-thi-gplx.html': 'fa-lightbulb',
                'sahinh.html': 'fa-car-side',
                'contact.html': 'fa-envelope'
            };
            navWrapper.querySelectorAll(':scope > a').forEach(link => {
                const href = link.getAttribute('href') || '';
                const matched = Object.keys(iconMap).find(k => href.includes(k));
                if (matched && !link.querySelector('i')) {
                    const icon = document.createElement('i');
                    icon.className = `fa-solid ${iconMap[matched]} link-icon`;
                    link.insertBefore(icon, link.firstChild);
                }
            });
        }

        // Create overlay (once)
        let overlay = document.querySelector('.menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);
        }

        function openDrawer() {
            drawer.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeDrawer() {
            drawer.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Replace toggle button to wipe any old listeners
        const freshToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(freshToggle, toggle);
        freshToggle.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openDrawer(); });

        overlay.addEventListener('click', closeDrawer);

        const closeBtn = drawer.querySelector('.mobile-menu-close');
        if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

        // Accordion — replace <a> with <button> to prevent link-click side effects
        const accAnchor = drawer.querySelector('.accordion-toggle');
        if (accAnchor) {
            const btn = document.createElement('button');
            btn.className = 'accordion-btn-toggle';
            btn.innerHTML = `
                <span style="display:flex;align-items:center;gap:10px;">
                    <i class="fa-solid fa-layer-group link-icon"></i>
                    Ôn theo hạng
                </span>
                <i class="fa-solid fa-chevron-down chevron"></i>`;
            btn.style.cssText = 'width:100%;background:none;border:none;cursor:pointer;font-family:inherit;font-size:15px;font-weight:600;color:#1e293b;padding:12px 14px;border-radius:12px;display:flex;align-items:center;justify-content:space-between;gap:10px;text-align:left;min-height:48px;margin:2px 0;box-shadow:none;transform:none;transition:background 0.18s,color 0.18s;';
            accAnchor.parentNode.replaceChild(btn, accAnchor);

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                const item = btn.closest('.accordion-item');
                if (item) {
                    item.classList.toggle('expanded');
                    btn.style.background = item.classList.contains('expanded') ? '#f5f3ff' : '';
                    btn.style.color = item.classList.contains('expanded') ? '#4f46e5' : '';
                    const chevron = btn.querySelector('.chevron');
                    if (chevron) chevron.style.transform = item.classList.contains('expanded') ? 'rotate(180deg)' : '';
                }
            });
        }

        // Event delegation: close drawer only when a NAVIGATING link is clicked
        drawer.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            const href = (link.getAttribute('href') || '').trim();
            const isNonNav = !href || href === '#' || href.startsWith('javascript');
            const isAccordionParent = !!link.closest('.accordion-item') && !link.closest('.accordion-menu');

            if (isNonNav || isAccordionParent) return;
            closeDrawer();
        });
    }

    // ── F. Modal Logic (non-CAND only) ──
    function initModal() {
        if (!runModal) return;
        const overlay  = document.getElementById('navPopupOverlay');
        const closeBtn = document.getElementById('navPopupClose');
        const cards    = document.querySelectorAll('.nav-class-card');
        if (!overlay) return;

        function openPopup(context) {
            currentContext = context;
            const saved = localStorage.getItem('hangDangHoc');
            cards.forEach(c => c.classList.toggle('selected', c.dataset.class === saved));
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closePopup() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        function selectClass(cls) {
            localStorage.setItem('hangDangHoc', cls);
            const target = routeMap[currentContext]?.[cls];
            if (target) window.location.href = pathPrefix + target;
            closePopup();
        }

        closeBtn?.addEventListener('click', closePopup);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
        cards.forEach(c => c.addEventListener('click', () => selectClass(c.dataset.class)));

        // Intercept nav links for modal
        document.querySelectorAll('.main-nav a, .mobile-menu a').forEach(link => {
            if (link.closest('.dropdown-menu') || link.closest('.accordion-menu')) return;
            const text = link.textContent.trim().toLowerCase();
            if (text.includes('thi thử')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const saved = localStorage.getItem('hangDangHoc');
                    if (saved && routeMap['thithu'][saved]) {
                        window.location.href = pathPrefix + routeMap['thithu'][saved];
                    } else {
                        openPopup('thithu');
                    }
                });
            } else if (text.includes('sa hình')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    openPopup('sahinh');
                });
            }
        });
    }

    // ── G. Boot ──
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    function boot() {
        initMobileDrawer();
        initModal();
    }
})();
