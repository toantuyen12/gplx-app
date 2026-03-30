import os
import glob
import re

html_to_insert = """<!-- Class Selection Modal -->
<div id="navPopupOverlay" class="nav-popup-overlay">
    <div class="nav-popup-modal modern-popup">
        <div class="nav-popup-header">
            <div class="header-texts">
                <h3>Chọn hạng xe</h3>
                <p>Chọn hạng để bắt đầu học hoặc thi</p>
            </div>
            <button id="navPopupClose" class="nav-popup-close" aria-label="Đóng popup"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="nav-popup-body">
            <div class="nav-group-title">Hạng Phổ Thông</div>
            <div class="nav-class-card" data-class="a1">
                <div class="card-icon"><i class="fa-solid fa-bicycle"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong>Hạng A1</strong>
                        <span class="badge badge-popular">Phổ biến</span>
                    </div>
                    <span class="desc">Xe máy dưới 175cc</span>
                </div>
                <div class="card-indicator"></div>
            </div>
            <div class="nav-class-card" data-class="a">
                <div class="card-icon"><i class="fa-solid fa-motorcycle"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong>Hạng A (A2 cũ)</strong>
                    </div>
                    <span class="desc">Xe phân khối lớn ≥ 175cc</span>
                </div>
                <div class="card-indicator"></div>
            </div>
            <div class="nav-class-card" data-class="b">
                <div class="card-icon"><i class="fa-solid fa-car"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong>Hạng B (B1, B2)</strong>
                        <span class="badge badge-hot">Khuyên dùng</span>
                    </div>
                    <span class="desc">Ô tô đến 9 chỗ, tải dưới 3.5 tấn</span>
                </div>
                <div class="card-indicator"></div>
            </div>
            <div class="nav-class-card" data-class="c1">
                <div class="card-icon"><i class="fa-solid fa-truck"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong>Hạng C1</strong>
                    </div>
                    <span class="desc">Xe tải từ 3.5 tấn đến 7.5 tấn</span>
                </div>
                <div class="card-indicator"></div>
            </div>
            <div class="nav-class-card" data-class="c">
                <div class="card-icon"><i class="fa-solid fa-truck-moving"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong>Hạng C</strong>
                    </div>
                    <span class="desc">Xe tải trọng trên 7.5 tấn</span>
                </div>
                <div class="card-indicator"></div>
            </div>
            
            <div class="nav-group-title" style="margin-top: 8px;">Hạng CAND</div>
            <div class="nav-class-card" data-class="bcand" style="border-color: #fee2e2;">
                <div class="card-icon" style="color: #ef4444;"><i class="fa-solid fa-shield-halved"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong style="color: #ef4444;">Hạng B CAND</strong>
                        <span class="badge badge-hot">Mới</span>
                    </div>
                    <span class="desc">Bộ đề 500 câu riêng cho CAND</span>
                </div>
                <div class="card-indicator"></div>
            </div>
            <div class="nav-class-card" data-class="ccand" style="border-color: #fee2e2;">
                <div class="card-icon" style="color: #ef4444;"><i class="fa-solid fa-shield-halved"></i></div>
                <div class="card-info">
                    <div class="title-wrap">
                        <strong style="color: #ef4444;">Hạng C CAND</strong>
                        <span class="badge badge-hot">Mới</span>
                    </div>
                    <span class="desc">Bộ đề 500 câu riêng cho CAND</span>
                </div>
                <div class="card-indicator"></div>
            </div>
        </div>
    </div>
</div>"""

directory = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"
pattern = re.compile(r'<!-- Class Selection Modal -->\s*<div id="navPopupOverlay" class="nav-popup-overlay">[\s\S]*?</div>\s*</div>\s*</div>', re.IGNORECASE)

count = 0
for root, dirs, files in os.walk(directory):
    if '.git' in root or 'node_modules' in root:
        continue
    for file in files:
        if file.endswith(".html"):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            if "navPopupOverlay" in content:
                new_content = pattern.sub(html_to_insert, content)
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    count += 1

print(f"Updated {count} HTML files with CAND modal.")

# Update inject_modal.js
js_path = os.path.join(directory, 'inject_modal.js')
if os.path.exists(js_path):
    with open(js_path, 'r', encoding='utf-8') as f:
        js_content = f.read()
    js_pattern = re.compile(r'const modalHtml = `[\s\S]*?`;')
    new_js = js_pattern.sub(f'const modalHtml = `\n{html_to_insert}\n`;', js_content)
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(new_js)
    print("Updated inject_modal.js with CAND modal.")
