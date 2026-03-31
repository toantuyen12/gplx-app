/**
 * mobile-drawer.js
 * Clean implementation for mobile navigation drawer.
 */
(function () {
    'use strict';
    // alert('MOBILE DRAWER LOADED v100');
    console.log('Mobile Drawer v100 Loaded');

    // Remove any previous debug info
    document.getElementById('debug-z')?.remove();

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
        'a1': { name: 'H\u1ea1ng A1', desc: 'Xe m\u00e1y < 125cm\u00b3', icon: 'fa-motorcycle', color: 'card-a1' },
        'a':  { name: 'H\u1ea1ng A',  desc: 'Xe m\u00e1y \u2265 125cm\u00b3', icon: 'fa-motorcycle', color: 'card-a'  },
        'b':  { name: 'H\u1ea1ng B',  desc: '\u00d4 t\u00f4 4 \u2013 9 ch\u1ed7',  icon: 'fa-car',        color: 'card-b'  },
        'c1': { name: 'H\u1ea1ng C1', desc: '\u00d4 t\u00f4 t\u1ea3i nh\u1eb9',    icon: 'fa-truck',      color: 'card-c1' },
        'c':  { name: 'H\u1ea1ng C',  desc: '\u00d4 t\u00f4 t\u1ea3i n\u1eb7ng',   icon: 'fa-truck-moving', color: 'card-c' }
    };

    const routeMap = {
        'thithu': { 'a1': 'moto-exam.html?license=a1', 'a': 'moto-exam.html?license=a', 'b': 'b-exam.html', 'c1': 'c1-exam.html', 'c': 'c-exam.html' },
        'onthuyet': { 'a1': 'study600.html?license=a1', 'a': 'study600.html?license=a', 'b': 'study600.html?license=b', 'c1': 'study600.html?license=c1', 'c': 'study600.html?license=c', 'bcand': 'cand-study.html', 'ccand': 'cand-study.html' },
        'sahinh': { 'a1': 'sahinh-a1.html', 'a': 'sahinh-a.html', 'b': 'sahinh-b.html', 'c1': 'sahinh-c1.html', 'c': 'sahinh-c.html', 'bcand': 'sahinh-b-cand.html', 'ccand': 'sahinh-c-cand.html' }
    };

    let currentContext = 'thithu';

    function initMobileDrawer() {
        const toggle = document.querySelector('.menu-toggle');
        const drawer = document.querySelector('.mobile-menu');
        if (!toggle || !drawer) return;

        // Ensure drawer is a direct child of body for correct stacking
        if (drawer.parentNode !== document.body) {
            document.body.appendChild(drawer);
        }

        if (!drawer.querySelector('.mobile-menu-close')) {
            const children = Array.from(drawer.childNodes);
            const brand = document.createElement('div');
            brand.className = 'mobile-menu-brand';
            brand.innerHTML = `<img src="${pathPrefix}assets/logo.svg" alt="Logo" style="height:32px;"><span>Thi GPLX</span>`;
            
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

        const openDrawer = () => {
            drawer.style.display = 'flex';
            overlay.style.display = 'block';
            void drawer.offsetWidth;
            document.body.classList.add('no-scroll');
            drawer.classList.add('active');
            overlay.classList.add('active');
        };

        const closeDrawer = () => { 
            drawer.classList.remove('active'); 
            overlay.classList.remove('active'); 
            document.body.classList.remove('no-scroll');
            setTimeout(() => {
                if (!drawer.classList.contains('active')) {
                    drawer.style.display = 'none';
                    overlay.style.display = 'none';
                }
            }, 300);
        };

        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        newToggle.addEventListener('click', (e) => { e.preventDefault(); openDrawer(); });

        overlay.addEventListener('click', closeDrawer);
        drawer.querySelector('.mobile-menu-close')?.addEventListener('click', closeDrawer);

        // Close drawer on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && drawer.classList.contains('active')) {
                closeDrawer();
            }
        });

        // Accordion event binding
        const accBtn = drawer.querySelector('.accordion-btn-toggle');
        if (accBtn) {
            accBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const item = accBtn.closest('.accordion-item');
                if (item) item.classList.toggle('expanded');
            });
        }
    }

    function initModal() {
        if (!runModal) return;
        const overlay = document.getElementById('navPopupOverlay');
        const closeBtn = document.getElementById('navPopupClose');
        const cards = document.querySelectorAll('.nav-class-card');
        
        if (!overlay || !closeBtn) {
            console.warn('Navigation popup components not found. Modal functions disabled.');
            return;
        }

        window.openLicensePopup = (ctx = 'thithu') => {
            currentContext = ctx;
            const currentSelected = localStorage.getItem('hangDangHoc');
            if (currentSelected) {
                cards.forEach(c => {
                    if (c.dataset.class === currentSelected) {
                        c.classList.add('is-selected');
                    } else {
                        c.classList.remove('is-selected');
                    }
                });
            }
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeP = () => { overlay.classList.remove('active'); document.body.style.overflow = ''; };
        window.closeLicensePopup = closeP;

        closeBtn.addEventListener('click', closeP);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeP(); });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeP();
            }
        });

        cards.forEach(c => c.addEventListener('click', () => {
            cards.forEach(card => card.classList.remove('is-selected'));
            c.classList.add('is-selected');
            
            setTimeout(() => {
                const cls = c.dataset.class;
                localStorage.setItem('hangDangHoc', cls);
                
                if (cls === 'bcand' || cls === 'ccand') {
                    closeP();
                    if (window.openCandMenuPopup) {
                        window.openCandMenuPopup(cls);
                    } else {
                        const t = routeMap[currentContext]?.[cls] || (cls === 'bcand' ? 'cand-exam.html?type=B' : 'cand-exam.html?type=C');
                        window.location.href = pathPrefix + t;
                    }
                    return;
                }

                const t = routeMap[currentContext]?.[cls];
                if (t) window.location.href = pathPrefix + t;
                closeP();
            }, 100);
        }));
    }

    function initGlobalDelegation() {
        // Global Event Delegation for all CTA triggers
        document.addEventListener('click', (e) => {
            const el = e.target.closest('[data-popup-trigger], .btn, .btn-v4, .cta-box button, .mobile-sticky-cta button, .main-nav a, .mobile-menu a, .article-content a');
            if (!el) return;

            let trigger = el.getAttribute('data-popup-trigger');
            
            if (!trigger) {
                const text = el.textContent.trim().toLowerCase();
                const matchesThithu = ['thi thử', 'luyện đề', 'sát hạch', 'đề thi', 'vào thi', 'thi ngay', 'bắt đầu', 'thử sức', 'vào thi thử lý thuyết'];
                const matchesOnthuyet = ['ôn tập', 'ôn lý thuyết', 'luyện tập', 'củng cố kiến thức', 'điểm liệt', 'mẹo thi', 'mẹo học', 'tổng hợp mẹo', 'ôn lý thuyết theo nhóm', 'ôn lý thuyết gplx'];
                const matchesSahinh = ['sa hình', 'thực hành', 'lái xe trong sân', 'kỹ thuật lái'];

                if (matchesThithu.some(k => text.includes(k))) {
                    trigger = 'thithu';
                } else if (matchesSahinh.some(k => text.includes(k))) {
                    trigger = 'sahinh';
                } else if (matchesOnthuyet.some(k => text.includes(k))) {
                    trigger = 'onthuyet';
                }
            }

            if (trigger) {
                const href = el.getAttribute('href');
                if (!href || href.includes('index.html') || href.includes('javascript') || href.includes('#')) {
                    e.preventDefault();
                    if (window.openLicensePopup) {
                        window.openLicensePopup(trigger);
                    } else {
                        console.warn('License popup function not available. Trigger:', trigger);
                    }
                }
            }
        });
    }

    const boot = () => { 
        initMobileDrawer(); 
        initModal(); 
        initGlobalDelegation();
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
