document.addEventListener('DOMContentLoaded', () => {
    // 0. Path Detection & Safety
    const currentUrl = window.location.href.toLowerCase();
    const isProtectedPage = currentUrl.includes('login') || 
                           currentUrl.includes('b-cand') || 
                           currentUrl.includes('c-cand') || 
                           currentUrl.includes('cand-study') || 
                           currentUrl.includes('cand-exam') ||
                           currentUrl.includes('games/');
    if (isProtectedPage) return;

    let pathPrefix = '';
    const homeLink = document.querySelector('.main-nav a[href*="index.html"]');
    if (homeLink) {
        const href = homeLink.getAttribute('href');
        const match = href.match(/^(\.\.\/)+/);
        if (match) pathPrefix = match[0];
    }

    // 1. Data & Configuration
    const classData = {
        'a1': { name: 'Hạng A1', desc: 'Xe máy < 125cm³', icon: 'fa-motorcycle', color: 'card-a1' },
        'a':  { name: 'Hạng A',  desc: 'Xe máy > 125cm³', icon: 'fa-motorcycle', color: 'card-a' },
        'b':  { name: 'Hạng B',  desc: 'Ô tô 4 – 9 chỗ', icon: 'fa-car', color: 'card-b' },
        'c1': { name: 'Hạng C1', desc: 'Ô tô tải nhẹ', icon: 'fa-truck', color: 'card-c1' },
        'c':  { name: 'Hạng C',  desc: 'Ô tô tải nặng', icon: 'fa-truck-moving', color: 'card-c' }
    };

    const routeMap = {
        'thithu': {
            'a1': 'class-a1-menu.html',
            'a':  'class-a-menu.html',
            'b':  'class-b-menu.html',
            'c1': 'class-c1-menu.html',
            'c':  'class-c-menu.html'
        },
        'sahinh': {
            'a1': 'sahinh-a1.html',
            'a':  'sahinh-a.html',
            'b':  'sahinh-b.html',
            'c1': 'sahinh-c1.html',
            'c':  'sahinh-c.html'
        }
    };

    let currentContext = 'thithu'; 

    // 2. Inject Modal HTML
    const cardsHTML = Object.entries(classData).map(([key, info]) => `
        <div class="nav-class-card ${info.color}" data-class="${key}">
            <div class="nav-class-icon"><i class="fa-solid ${info.icon}"></i></div>
            <div class="nav-class-info">
                <span class="nav-class-name">${info.name}</span>
                <span class="nav-class-desc">${info.desc}</span>
            </div>
            <div class="nav-class-check"><i class="fa-solid fa-check"></i></div>
        </div>
    `).join('');

    const modalHTML = `
        <div class="nav-popup-overlay" id="navPopupOverlay">
            <div class="nav-popup-modal">
                <div class="nav-popup-header">
                    <h2>Chọn hạng xe</h2>
                    <button class="nav-popup-close" id="navPopupClose" aria-label="Close modal">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="nav-popup-body">
                    <div class="nav-popup-grid">
                        ${cardsHTML}
                    </div>
                </div>
            </div>
        </div>
    `;
    if (!document.getElementById('navPopupOverlay')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const overlay = document.getElementById('navPopupOverlay');
    const closeBtn = document.getElementById('navPopupClose');
    const cards = document.querySelectorAll('.nav-class-card');

    // 3. Functions
    function openPopup(context) {
        currentContext = context;
        updateSelectedState();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateSelectedState() {
        const savedClass = localStorage.getItem('hangDangHoc');
        cards.forEach(card => {
            card.classList.toggle('selected', card.dataset.class === savedClass);
        });
    }

    function selectClass(selectedClass) {
        localStorage.setItem('hangDangHoc', selectedClass);
        updateSelectedState();
        const targetPage = routeMap[currentContext][selectedClass];
        if (targetPage) {
            window.location.href = pathPrefix + targetPage;
        }
        closePopup();
    }

    // 4. Navigation Interception
    function handleNavClick(e) {
        const link = e.currentTarget;
        const text = link.textContent.trim().toLowerCase();
        
        if (text.includes('thi thử')) {
            e.preventDefault();
            const savedClass = localStorage.getItem('hangDangHoc');
            if (savedClass && routeMap['thithu'][savedClass]) {
                window.location.href = pathPrefix + routeMap['thithu'][savedClass];
            } else {
                openPopup('thithu');
            }
        } else if (text.includes('sa hình') && !link.closest('.accordion-menu') && !link.closest('.dropdown-menu')) {
            // Only global Sa Hình link triggers modal, sub-links navigate direct
            e.preventDefault();
            openPopup('sahinh');
        }
    }

    // 5. Drawer & Accordion Logic
    function initMobileNav() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (!menuToggle || !mobileMenu) return;

        // Ensure old listeners don't interfere
        const newToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newToggle, menuToggle);

        // Overlay for mobile menu
        let menuOverlay = document.querySelector('.menu-overlay');
        if (!menuOverlay) {
            menuOverlay = document.createElement('div');
            menuOverlay.className = 'menu-overlay';
            document.body.appendChild(menuOverlay);
        }

        function toggleMenu(forceClose = false) {
            const isOpen = mobileMenu.classList.contains('active');
            if (isOpen || forceClose) {
                mobileMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                mobileMenu.classList.add('active');
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        newToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });

        menuOverlay.addEventListener('click', () => toggleMenu(true));

        // Accordion for "Ôn theo hạng"
        const accordionToggle = mobileMenu.querySelector('.accordion-toggle');
        if (accordionToggle) {
            accordionToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const item = accordionToggle.closest('.accordion-item');
                if (item) item.classList.toggle('expanded');
            });
        }

        // Close menu on link click (only links that actually navigate)
        mobileMenu.querySelectorAll('a').forEach(link => {
            if (link.classList.contains('accordion-toggle')) return;
            link.addEventListener('click', () => {
                // If it's a Thi Thử/Sa Hình link, handleNavClick will run first
                toggleMenu(true);
            });
        });
    }

    // 6. Bind Events
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    if (overlay) overlay.addEventListener('click', (e) => { e.target === overlay && closePopup(); });
    cards.forEach(card => card.addEventListener('click', () => selectClass(card.dataset.class)));

    const triggerLinks = document.querySelectorAll('.main-nav a, .mobile-menu a');
    triggerLinks.forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        // Skip links inside dropdowns/accordions to allow direct navigation to specific classes
        if (link.closest('.dropdown-menu') || link.closest('.accordion-menu')) return;
        
        if (text.includes('thi thử') || text.includes('sa hình')) {
            link.addEventListener('click', handleNavClick);
        }
    });

    initMobileNav();
});
