import os
import re

HEADER_CONTENT = """<header>
<div class="nav-container">
<a href="index.html" class="logo" style="display:flex; align-items:center;">
    <img src="assets/logo.svg" alt="Logo" style="height:32px; margin-right:10px;">
    Thi GPLX
</a>
<button class="menu-toggle" aria-label="Toggle menu" onclick="toggleMenu()">
    <i class="fa-solid fa-bars"></i>
</button>
<nav class="main-nav">
<a href="index.html">Trang chủ</a>
<a href="about.html">Giới thiệu</a>
<a href="privacy.html">Chính sách bảo mật</a>
<a href="terms.html">Điều khoản</a>
<a href="contact.html">Liên hệ</a>
</nav>
</div>
</header>"""

FOOTER_CONTENT = """<footer class="footer">
<div class="footer-links">
<a href="index.html">Trang chủ</a>
<span class="footer-divider">|</span>
<a href="about.html">Giới thiệu</a>
<span class="footer-divider">|</span>
<a href="privacy.html">Chính sách bảo mật</a>
<span class="footer-divider">|</span>
<a href="terms.html">Điều khoản</a>
<span class="footer-divider">|</span>
<a href="contact.html">Liên hệ</a>
</div>
<p>
Bộ câu hỏi được tổng hợp từ tài liệu ôn tập sát hạch lái xe trong lực lượng Công an nhân dân,
chỉ phục vụ mục đích học tập và ôn luyện.
</p>
<div id="visitorStats" style="font-size:16px;line-height:1.8">
👥 Đang online: <span id="onlineUsers">0</span><br>
📅 Lượt truy cập hôm nay: <span id="todayUsers">0</span><br>
🌍 Tổng lượt truy cập: <span id="totalUsers">0</span>
</div>
<p style="font-weight: bold; margin-top: 10px; font-size: 16px;">thigplx.contact@gmail.com</p>
<p style="margin-top: 5px;">© 2026 thigplx.site</p>
</footer>"""

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
    
    # 1. Ensure CSS is linked and remove custom article styles
    if '<link rel="stylesheet" href="css/style.css">' not in content and '<link rel="stylesheet" href="/css/style.css">' not in content:
        content = content.replace('</head>', '    <link rel="stylesheet" href="css/style.css">\n</head>')
    
    # Remove inline style tags in article pages
    if file in ['meo-thi-gplx.html', 'bien-bao-giao-thong.html', 'kinh-nghiem-hoc-gplx.html']:
        content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
        
        # Change specific overrides to match global design system
        content = content.replace('class="article-container"', 'class="container card"')
    
    # 2. Replace header
    if '<header>' in content:
        content = re.sub(r'<header>.*?</header>', HEADER_CONTENT, content, flags=re.DOTALL)
    else:
        content = content.replace('<body>', f'<body>\n{HEADER_CONTENT}\n')
    
    # 3. Handle footer
    if '<footer class="footer">' in content:
        content = re.sub(r'<footer class="footer">.*?</footer>', FOOTER_CONTENT, content, flags=re.DOTALL)
    else:
        # Add footer before the feedback container or closing body
        if '<div id="feedbackContainer"></div>' in content:
            content = content.replace('<div id="feedbackContainer"></div>', f'\n{FOOTER_CONTENT}\n<div id="feedbackContainer"></div>')
        else:
            content = content.replace('</body>', f'\n{FOOTER_CONTENT}\n</body>')
    
    # 4. Ensure global UI scripts exist
    if 'function toggleMenu()' not in content:
        content = content.replace('</body>', f'\n{SCRIPT_MENU_CONTENT}\n</body>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Standardized UI consistency in {len(html_files)} files.")
