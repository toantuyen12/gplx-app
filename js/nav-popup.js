/**
 * nav-popup.js — Unified Navigation System
 * Handles: mobile drawer, accordion, desktop dropdown, class-selection modal
 */
(function () {
    'use strict';

    // ── A. Config ──
    const url = window.location.href.toLowerCase();
    const isCAND = url.includes('b-cand') || url.includes('c-cand') ||
                   url.includes('cand-study') || url.includes('cand-exam');
    const isGame = url.includes('games/');
    const runModal = !isCAND && !isGame;

    let pathPrefix = '';
    const homeLink = document.querySelector('.main-nav a[href*="index.html"]');
    if (homeLink) {
        const href = homeLink.getAttribute('href');
        const match = href.match(/^(\.\.\/)+/);
        if (match) pathPrefix = match[0];
    }

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

    // ── B. Inject Modal ──
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
                        <button class="nav-popup-close" id="navPopupClose" aria-label="Đóng"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="nav-popup-body">
                        <div class="nav-popup-grid">${cardsHTML}</div>
                    </div>
                </div>
            </div>`);
    }

    // ── C. Mobile Drawer ──
    function initMobileDrawer() {
        const toggle = document.querySelector('.menu-toggle');
        const drawer = document.querySelector('.mobile-menu');
        if (!toggle || !drawer) return;

        if (!drawer.querySelector('.mobile-menu-close')) {
            const children = Array.from(drawer.childNodes);
            const brand = document.createElement('div');
            brand.className = 'mobile-menu-brand';
            brand.innerHTML = `<img src="${pathPrefix}assets/logo.svg" alt="Logo" style="height:28px;"><span>Thi GPLX</span>`;
            const closeBtn = document.createElement('button');
            closeBtn.className = 'mobile-menu-close';
            closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            const divider = document.createElement('div');
            divider.className = 'mobile-menu-divider';
            const nav = document.createElement('div');
            nav.className = 'mobile-menu-nav';

            children.forEach(c => { if (c.nodeType === 1 || (c.nodeType === 3 && c.textContent.trim())) nav.appendChild(c); });
            drawer.innerHTML = '';
            drawer.appendChild(closeBtn);
            drawer.appendChild(brand);
            drawer.appendChild(divider);
            drawer.appendChild(nav);

            const iconMap = { 'index': 'fa-house', 'cand': 'fa-stopwatch', 'sign': 'fa-signs-post', 'meo': 'fa-lightbulb', 'sahinh': 'fa-car-side' };
            nav.querySelectorAll(':scope > a').forEach(a => {
                const href = a.getAttribute('href') || '';
                const match = Object.keys(iconMap).find(k => href.includes(k));
                if (match && !a.querySelector('.link-icon')) {
                    const i = document.createElement('i'); i.className = `fa-solid ${iconMap[match]} link-icon`; a.prepend(i);
                }
            });
        }

        let overlay = document.querySelector('.menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);
        }

        const openDrawer = () => { drawer.classList.add('active'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; };
        const closeDrawer = (e) => { 
            // FINAL SAFEGUARD: never close if the click was on/inside the accordion toggle
            if (e && e.target && e.target.closest('.accordion-btn-toggle')) return;
            drawer.classList.remove('active'); 
            overlay.classList.remove('active'); 
            document.body.style.overflow = ''; 
        };

        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        newToggle.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openDrawer(); });

        overlay.addEventListener('click', (e) => closeDrawer(e));
        drawer.querySelector('.mobile-menu-close')?.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); closeDrawer(e); });

        // Accordion
        const accAnchor = drawer.querySelector('.accordion-toggle');
        if (accAnchor) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'accordion-btn-toggle';
            btn.innerHTML = `<span class="acc-label"><i class="fa-solid fa-layer-group link-icon"></i> Ôn theo hạng</span><i class="fa-solid fa-chevron-down chevron"></i>`;
            accAnchor.parentNode.replaceChild(btn, accAnchor);

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); 
                e.stopImmediatePropagation();
                const item = btn.closest('.accordion-item');
                if (item) item.classList.toggle('expanded');
            });
        }

        // Delegate drawer clicks
        drawer.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            const href = (link.getAttribute('href') || '').trim();
            if (!href || href === '#' || href.startsWith('javascript')) return;
            if (link.classList.contains('accordion-toggle') || link.closest('.accordion-btn-toggle')) return;
            closeDrawer(e);
        });
    }

    // ── D. Modal Logic ──
    function initModal() {
        if (!runModal) return;
        const overlay = document.getElementById('navPopupOverlay');
        const closeBtn = document.getElementById('navPopupClose');
        const cards = document.querySelectorAll('.nav-class-card');
        if (!overlay) return;

        const openP = (ctx) => {
            currentContext = ctx;
            const saved = localStorage.getItem('hangDangHoc');
            cards.forEach(c => c.classList.toggle('selected', c.dataset.class === saved));
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
        const closeP = () => { overlay.classList.remove('active'); document.body.style.overflow = ''; };

        closeBtn?.addEventListener('click', closeP);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeP(); });
        cards.forEach(c => c.addEventListener('click', () => {
            const cls = c.dataset.class;
            localStorage.setItem('hangDangHoc', cls);
            const t = routeMap[currentContext]?.[cls];
            if (t) window.location.href = pathPrefix + t;
            closeP();
        }));

        document.querySelectorAll('.main-nav a, .mobile-menu a').forEach(a => {
            if (a.closest('.dropdown-menu') || a.closest('.accordion-menu')) return;
            const txt = a.textContent.trim().toLowerCase();
            if (txt.includes('thi thử')) a.addEventListener('click', (e) => {
                e.preventDefault();
                const s = localStorage.getItem('hangDangHoc');
                if (s && routeMap['thithu'][s]) window.location.href = pathPrefix+routeMap['thithu'][s];
                else openP('thithu');
            });
            else if (txt.includes('sa hình')) a.addEventListener('click', (e) => { e.preventDefault(); openP('sahinh'); });
        });
    }

    const boot = () => { initMobileDrawer(); initModal(); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
