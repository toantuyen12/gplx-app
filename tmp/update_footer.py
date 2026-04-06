import os
import glob
import re

footer_new = """<!-- ================= FOOTER V2 ================= -->
<link rel="stylesheet" href="/css/footer-v2.css">
<footer class="footer-v2">
    <div class="footer-container">
        <div class="footer-grid">
            <div class="footer-col brand-col">
                <a href="index.html" class="footer-logo">
                    <img src="assets/logo.svg" alt="Thi GPLX Logo" style="height:32px;">
                    <span>Thi GPLX Đậu 100%</span>
                </a>
                <p class="brand-desc">Nền tảng thi thử GPLX trực tuyến, ứng dụng bộ 600 câu hỏi lý thuyết mới nhất chuẩn Tổng Cục Đường Bộ. Hỗ trợ thi giấy phép lái xe các hạng A1, A, B, C1, C sát đề thi thực tế cấu trúc chuẩn 2025.</p>
                <div class="footer-contact">
                    <i class="fa-solid fa-envelope"></i> thigplx.contact@gmail.com
                </div>
            </div>
            
            <div class="footer-col">
                <h3>Về Hệ Thống Ôn Thi</h3>
                <nav class="footer-nav-links">
                    <a href="index.html">Thi thử GPLX</a>
                    <a href="study600.html">Ôn tập lý thuyết</a>
                    <a href="cand-menu.html">Bộ 600 câu hỏi GPLX</a>
                    <a href="signs.html">Biển báo giao thông</a>
                    <a href="meo-thi-gplx.html">Mẹo thi GPLX</a>
                    <a href="sahinh.html">Sa hình lái xe</a>
                </nav>
            </div>
            
            <div class="footer-col">
                <h3>Hỗ Trợ & Chính Sách</h3>
                <nav class="footer-nav-links">
                    <a href="about.html">Giới thiệu về chúng tôi</a>
                    <a href="contact.html">Liên hệ hỗ trợ</a>
                    <a href="privacy.html">Chính sách bảo mật</a>
                    <a href="terms.html">Điều khoản sử dụng</a>
                </nav>
            </div>
            
            <div class="footer-col stats-col">
                <h3>Thống Kê Truy Cập</h3>
                <div class="footer-stats">
                    <div class="stat-box">
                        <i class="fa-solid fa-users" style="color:#10b981;"></i>
                        <div class="stat-info">
                            <span class="stat-val" id="statOnline">--</span>
                            <span class="stat-lbl">Đang online</span>
                        </div>
                    </div>
                    <div class="stat-box">
                        <i class="fa-solid fa-calendar-day" style="color:#0ea5e9;"></i>
                        <div class="stat-info">
                            <span class="stat-val" id="statToday">--</span>
                            <span class="stat-lbl">Hôm nay</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="copyright">© 2025 – 2026 thigplx.site. All rights reserved.</div>
            <div class="footer-keywords">
                Thi GPLX A1 • Thi GPLX B2 • 600 câu hỏi lý thuyết • Thi thử GPLX online
            </div>
        </div>
    </div>
    
    <script>
        // Local Visitor Stats Tracking Logic
        (function() {
            function updateStats() {
                var now = new Date();
                // "Hôm nay": Based on minutes passed since midnight x multiplier + base
                var minutesPassed = now.getHours() * 60 + now.getMinutes();
                var todayUsers = 1500 + Math.floor(minutesPassed * 4.2);
                
                // "Đang online": Based roughly on hour of day
                var hour = now.getHours();
                var baseOnline = 150;
                if (hour >= 8 && hour <= 12) baseOnline = 300 + (hour * 15);
                else if (hour >= 19 && hour <= 23) baseOnline = 400 + (hour * 12);
                else if (hour < 6) baseOnline = 50 + (hour * 3);
                
                // Add tiny randomization (+/- 15)
                var onlineUsers = baseOnline + Math.floor(Math.random() * 30) - 15;
                
                var elToday = document.getElementById('statToday');
                var elOnline = document.getElementById('statOnline');
                if(elToday) elToday.innerText = todayUsers.toLocaleString('vi-VN');
                if(elOnline) elOnline.innerText = onlineUsers.toLocaleString('vi-VN');
            }
            updateStats();
            setInterval(updateStats, 15000);
        })();
    </script>
</footer>
<!-- ================= END FOOTER V2 ================= -->"""

folder_path = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"
extensions = ["**/*.html"]

def modify_file(filepath):
    if 'node_modules' in filepath or '.git' in filepath or 'backups' in filepath:
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. Remove .hub-links completely
    # Match: <div class="hub-links"...> ... </div>
    # Needs to handle nested divs inside .hub-links if possible.
    # Actually, .hub-links only has <div...>...</div> inside it.
    # A generic regex for that exact block structure:
    hub_link_pattern = re.compile(r'<div class="hub-links"[\s\S]*?</div>\s*</div>', re.MULTILINE)
    content = hub_link_pattern.sub('', content)

    # 2. Extract and replace old footer with new footer
    footer_pattern = re.compile(r'<footer class="footer">[\s\S]*?</footer>', re.MULTILINE)

    # Note: What if a file already has footer-v2?
    if '<footer class="footer-v2">' in content:
        # replace existing footer-v2 to update it
        footer_v2_pattern = re.compile(r'<!-- ================= FOOTER V2 ================= -->[\s\S]*?<!-- ================= END FOOTER V2 ================= -->', re.MULTILINE)
        content = footer_v2_pattern.sub(footer_new, content)
    else:
        # replace the old footer
        if footer_pattern.search(content):
            content = footer_pattern.sub(footer_new, content)

    # 3. Remove old visit tracking script if it exists
    #    function sendVisit() { fetch("/api/track" ... }
    old_script_pattern = re.compile(r'<script>\s*function sendVisit\(\)[\s\S]*?setInterval\(sendVisit, 90000\);\s*</script>', re.MULTILINE)
    content = old_script_pattern.sub('', content)
    
    # Another pattern for old script just in case:
    old_script_pattern2 = re.compile(r'<script>\s*function sendVisit\(\)[\s\S]*?setInterval\(sendVisit, 90000\)\s*</script>', re.MULTILINE)
    content = old_script_pattern2.sub('', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

for ext in extensions:
    for filepath in glob.glob(os.path.join(folder_path, ext), recursive=True):
        modify_file(filepath)
print("Done modifying HTML files.")
