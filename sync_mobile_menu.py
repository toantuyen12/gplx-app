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
<a href="cand-menu.html">600 Câu Hỏi</a>
<a href="meo-thi-gplx.html">Mẹo Thi</a>
<a href="sahinh.html">Sa Hình</a>
<a href="signs.html">Biển Báo</a>
<a href="contact.html">Liên hệ</a>
</nav>
</div>
<!-- Mobile Menu -->
<nav class="mobile-menu">
<a href="index.html">Trang chủ</a>
<a href="cand-menu.html">600 Câu Hỏi</a>
<a href="meo-thi-gplx.html">Mẹo Thi</a>
<a href="sahinh.html">Sa Hình</a>
<a href="signs.html">Biển Báo</a>
<a href="contact.html">Liên hệ</a>
</nav>
</header>"""

TOGGLE_SCRIPT = """<!-- Global UI Scripts -->
<script>
function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileMenu = document.querySelector('.mobile-menu');
    const toggleBtn = document.querySelector('.menu-toggle');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    }
});
</script>"""

FEEDBACK_LOADER_CONTENT = """<div id="feedbackContainer"></div>
<script>
fetch("/feedback.html?v=3")
.then(res=>res.text())
.then(data=>{
    document.getElementById("feedbackContainer").innerHTML=data;
});
</script>
<script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
<script>
(function(){
    emailjs.init("Gn37aooYVlLuKdN9j");
})();
</script>
<link rel="stylesheet" href="/css/feedback.css?v=3">
<script src="/js/feedback.js?v=3"></script>"""


html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    if file == 'feedback.html':
        continue

    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Clean up old feedback container logic and old fetch scripts
    content = re.sub(r'<div id="feedbackContainer">.*?<script src="/js/feedback\.js.*?>.*?</script>', '', content, flags=re.DOTALL)
    content = re.sub(r'<script src="https://cdn\.jsdelivr\.net/npm/emailjs-com@3/dist/email\.min\.js"></script>', '', content)
    content = re.sub(r'<script>\s*\(function\(\)\{\s*emailjs\.init\("Gn37aooYVlLuKdN9j"\);\s*\}\)\(\);\s*</script>', '', content, flags=re.DOTALL)
    content = re.sub(r'<link rel="stylesheet" href="/css/feedback\.css.*?">', '', content)

    # 2. Replace the header
    content = re.sub(r'<header>.*?</header>', HEADER_CONTENT, content, flags=re.DOTALL)

    # 3. Handle Toggle Scripts: Remove all occurrences of the old scripts and add the new one
    # Remove older toggles that look like the one we're replacing
    content = re.sub(r'<!-- Global UI Scripts -->.*?function toggleMenu\(\).*?</script>', '', content, flags=re.DOTALL)
    
    # Just in case there are script blocks without the comment
    content = re.sub(r'<script>\s*function toggleMenu\(\).*?</script>', '', content, flags=re.DOTALL)

    # 4. Inject Unified Toggle Script and Feedback Loader right before </body>
    if "function toggleMenu()" not in content:
        content = content.replace('</body>', f'\n{TOGGLE_SCRIPT}\n</body>')
    
    if "id=\"feedbackContainer\"" not in content:
        content = content.replace('</body>', f'\n{FEEDBACK_LOADER_CONTENT}\n</body>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated header, unified toggle scripts, and feedback loader in {len(html_files) - 1} files.")
