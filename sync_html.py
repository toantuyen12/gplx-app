import os
import re

HEADER_CONTENT = """<header>
<div class="nav-container">
<a href="index.html" class="logo" style="display:flex; align-items:center;">
    <img src="assets/logo.svg" alt="Thi GPLX Logo" style="height:32px; margin-right:10px;">
    Thi GPLX
</a>
<button class="menu-toggle" aria-label="Toggle menu" onclick="toggleMenu()">
    <i class="fa-solid fa-bars"></i>
</button>
<nav class="main-nav">
<a href="index.html">Trang chủ</a>
<a href="cand-menu.html">600 Câu Hỏi</a>
<a href="meo-thi-gplx.html">Mẹo Thi</a>
<a href="sahinh.html">Sa Hình</a>
<a href="bien-bao-giao-thong.html">Biển Báo</a>
<a href="contact.html">Liên hệ</a>
</nav>
</div>
<!-- Mobile Menu -->
<nav class="mobile-menu">
<a href="index.html">Trang chủ</a>
<a href="cand-menu.html">600 Câu Hỏi</a>
<a href="meo-thi-gplx.html">Mẹo Thi</a>
<a href="sahinh.html">Sa Hình</a>
<a href="bien-bao-giao-thong.html">Biển Báo</a>
<a href="contact.html">Liên hệ</a>
</nav>
</header>"""

FOOTER_CONTENT = """<footer class="footer">
<div class="footer-container">
    <div class="footer-nav">
        <a href="index.html">Trang chủ</a>
        <a href="index.html#quiz">Thi GPLX Online</a>
        <a href="cand-menu.html">600 câu hỏi GPLX</a>
        <a href="meo-thi-gplx.html">Mẹo thi GPLX</a>
        <a href="sahinh.html">Sa hình lái xe</a>
        <a href="bien-bao-giao-thong.html">Biển báo giao thông</a>
        <a href="class-b-menu.html">Thi thử sát hạch</a>
    </div>
    
    <div class="footer-seo-text">
        <p>Luyện thi GPLX online miễn phí với bộ 600 câu hỏi lý thuyết mới nhất. Website cung cấp thi thử sát hạch lái xe, mẹo thi GPLX, bài sa hình lái xe và hệ thống biển báo giao thông giúp người học ôn luyện hiệu quả.</p>
    </div>

    <div class="footer-keywords">
        <span>Thi GPLX B2</span> • <span>Thi GPLX A1</span> • <span>600 câu hỏi GPLX mới nhất</span> • <span>Mẹo thi GPLX đậu nhanh</span> • <span>Sa hình lái xe B2</span> • <span>Biển báo giao thông đường bộ</span>
    </div>

    <div id="visitorStats">
        <span>👥 Đang online: <span id="onlineUsers">0</span></span> | 
        <span>📅 Hôm nay: <span id="todayUsers">0</span></span>
        <span id="totalUsers" style="display:none;">0</span>
    </div>
    
    <p class="footer-contact">thigplx.contact@gmail.com</p>
    
    <div class="footer-bottom-links">
        <a href="about.html">Giới thiệu</a> | 
        <a href="privacy.html">Chính sách bảo mật</a> | 
        <a href="terms.html">Điều khoản</a> | 
        <a href="contact.html">Liên hệ</a>
    </div>
    
    <p class="copyright">© 2026 thigplx.site</p>
</div>
</footer>"""

GLOBAL_SCHEMA = """    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Thi GPLX Online",
      "url": "https://thigplx.site/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://thigplx.site/index.html#quiz?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Thi GPLX",
      "url": "https://thigplx.site/",
      "logo": "https://thigplx.site/assets/logo.svg",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "thigplx.contact@gmail.com",
        "contactType": "customer service"
      }
    }
    </script>"""

SCRIPT_MENU_CONTENT = """<!-- Global UI Scripts -->
<script>
function toggleMenu() {
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}
document.addEventListener('click', function(e) {
    const nav = document.querySelector('.main-nav');
    const toggle = document.querySelector('.menu-toggle');
    if (nav && nav.classList.contains('active')) {
        if (!nav.contains(e.target) && (!toggle || !toggle.contains(e.target))) {
            nav.classList.remove('active');
        }
    }
});
</script>"""

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    if file == 'feedback.html':
        continue # Ignore the feedback component

    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Replace header
    content = re.sub(r'<header>.*?</header>', HEADER_CONTENT, content, flags=re.DOTALL)
    
    # 2. Replace footer
    content = re.sub(r'<footer class="footer">.*?</footer>', FOOTER_CONTENT, content, flags=re.DOTALL)
    
    # 3. Inject Canonical Tag if not present
    canonical_url = f"https://thigplx.site/{file}"
    if file == 'index.html':
        canonical_url = "https://thigplx.site/"
    
    if '<link rel="canonical"' not in content:
        canonical_tag = f'<link rel="canonical" href="{canonical_url}">'
        content = content.replace('</head>', f'    {canonical_tag}\n</head>')
    else:
        content = re.sub(r'<link rel="canonical" href=".*?">', f'<link rel="canonical" href="{canonical_url}">', content)

    # 3.5 Inject Global Schema
    if 'Organization' not in content:
        content = content.replace('</head>', f'{GLOBAL_SCHEMA}\n</head>')

    # 4. Add loading="lazy" to images
    content = content.replace('<img ', '<img loading="lazy" ')
    # Fix double loading="lazy" if already present
    content = content.replace('loading="lazy" loading="lazy"', 'loading="lazy"')

    # 5. Ensure global UI scripts exist
    if 'function toggleMenu()' not in content:
        # insert before closing body
        content = content.replace('</body>', f'\n{SCRIPT_MENU_CONTENT}\n</body>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated {len(html_files)} files.")
