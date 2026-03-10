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
    # We remove the block containing the feedback stuff to prevent duplication
    content = re.sub(r'<div id="feedbackContainer">.*?<script src="/js/feedback\.js.*?>.*?</script>', '', content, flags=re.DOTALL)
    
    # Just in case there's slight variations, let's also remove old explicit emailjs tags manually
    content = re.sub(r'<script src="https://cdn\.jsdelivr\.net/npm/emailjs-com@3/dist/email\.min\.js"></script>', '', content)
    content = re.sub(r'<script>\s*\(function\(\)\{\s*emailjs\.init\("Gn37aooYVlLuKdN9j"\);\s*\}\)\(\);\s*</script>', '', content, flags=re.DOTALL)
    content = re.sub(r'<link rel="stylesheet" href="/css/feedback\.css.*?">', '', content)

    # 2. Replace the header to remove the "Góp ý" nav link
    content = re.sub(r'<header>.*?</header>', HEADER_CONTENT, content, flags=re.DOTALL)

    # 3. Inject the clean unified FEEDBACK_LOADER_CONTENT right before </body>
    if "feedbackContainer" not in content:
        content = content.replace('</body>', f'\n{FEEDBACK_LOADER_CONTENT}\n</body>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Removed nav links and injected universal feedback loader into {len(html_files) - 1} files.")
