import os
import re

HEADER_CONTENT = """<header>
<div class="nav-container">
<a href="index.html" class="logo" style="display:flex; align-items:center;">
    <img src="assets/logo.svg" alt="Logo" style="height:32px; margin-right:10px;">
    Thi GPLX
</a>
<button class="menu-toggle" aria-label="Toggle menu">
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
<!-- Mobile Menu -->
<nav class="mobile-menu">
<a href="index.html">Trang chủ</a>
<a href="about.html">Giới thiệu</a>
<a href="privacy.html">Chính sách bảo mật</a>
<a href="terms.html">Điều khoản</a>
<a href="contact.html">Liên hệ</a>
</nav>
</header>"""

SCRIPT_MENU_CONTENT = """<!-- Global UI Scripts -->
<script>
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
});
</script>"""

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    if file == 'feedback.html':
        continue

    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Replace header completely
    content = re.sub(r'<header>.*?</header>', HEADER_CONTENT, content, flags=re.DOTALL)
    
    # 2. Replace old inline script toggleMenu()
    content = re.sub(r'<!-- Global UI Scripts -->\s*<script>\s*function toggleMenu\(\)(.*?)</script>', '', content, flags=re.DOTALL)
    content = re.sub(r'<script>\s*function toggleMenu\(\)(.*?)</script>', '', content, flags=re.DOTALL)
    
    # Ensure button doesn't have inline onclick
    content = content.replace('onclick="toggleMenu()"', '')
    
    # Insert new script if not present
    if "const mobileMenu = document.querySelector('.mobile-menu');" not in content:
        content = content.replace('</body>', f'\n{SCRIPT_MENU_CONTENT}\n</body>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated header and mobile menu logic in {len(html_files)} files.")
