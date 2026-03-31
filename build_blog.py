import os
import glob
import re
import shutil
import json
import codecs

root_dir = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"
blog_dir = os.path.join(root_dir, "bai-viet")
src_img_dir = r"C:\Users\TOANTUYEN\.gemini\antigravity\brain\b6c6587d-a66d-4773-859b-542b62e8e65f"
dst_img_dir = os.path.join(root_dir, "images", "blog")

print("--- 1. Copying Images ---")
for prefix in ["blog_*", "kinh_nghiem_*", "cach_hoc_*"]:
    images = glob.glob(os.path.join(src_img_dir, f"{prefix}_*.png"))
    images.sort(key=os.path.getmtime)
    for img in images:
        base = os.path.basename(img)
        # Handle the artifact timestamp `_TIMESTAMP.png`
        parts = re.split(r'_\d{13}', base)
        target = parts[0] + ".png" if len(parts) > 1 else base
        shutil.copy(img, os.path.join(dst_img_dir, target))
        print(f"Copied {target}")

print("--- 2. Loading Core Layout Components ---")
with open(os.path.join(root_dir, "index.html"), "r", encoding="utf-8") as f:
    index_html = f.read()

h_match = re.search(r'(<header>.*?</header>)', index_html, re.DOTALL)
f_match = re.search(r'(<footer class="footer">.*?</footer>)', index_html, re.DOTALL)
header_html = h_match.group(1) if h_match else "<header></header>"
footer_html = f_match.group(1) if f_match else "<footer></footer>"

# get modal HTML
with open(os.path.join(root_dir, "update_modal_ui_cand.py"), 'r', encoding='utf-8') as f:
    upd_content = f.read()
start = upd_content.find('html_to_insert = """') + len('html_to_insert = """')
end = upd_content.find('"""\n\ndirectory')
modal_html = upd_content[start:end]

print("--- 3. Processing Articles ---")
def slugify(text):
    text = re.sub(r'<[^>]+>', '', text)
    text = text.encode('ascii', 'ignore').decode('ascii') if not any(ord(c) > 127 for c in text) else text
    accents = {
        'a': 'á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ',
        'e': 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
        'i': 'í|ì|ỉ|ĩ|ị',
        'o': 'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
        'u': 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
        'y': 'ý|ỳ|ỷ|ỹ|ỵ',
        'd': 'đ',
        '': ':',
        '-': '\?'
    }
    for non_accent, pattern in accents.items():
        text = re.sub(pattern, non_accent, text, flags=re.IGNORECASE)
    text = re.sub(r'[^\w\s-]', '', text).strip().lower()
    text = re.sub(r'[\s_-]+', '-', text)
    return text if text else "muc"

for filepath in glob.glob(os.path.join(blog_dir, "*.html")):
    print(f"Processing: {os.path.basename(filepath)}")
    with codecs.open(filepath, 'r', 'utf-8') as f:
        html = f.read()

    # --- Sync Header/Footer ---
    # adjust paths
    h_html = header_html.replace('href="', 'href="../').replace('src="', 'src="../')
    h_html = h_html.replace('href="../javascript', 'href="javascript').replace('href="../http', 'href="http')
    f_html = footer_html.replace('href="', 'href="../').replace('src="', 'src="../')
    f_html = f_html.replace('href="../javascript', 'href="javascript').replace('href="../http', 'href="http')
    f_html = f_html.replace('href="../#', 'href="#')
    
    html = re.sub(r'<header>.*?</header>', h_html, html, flags=re.DOTALL)
    html = re.sub(r'<footer class="footer">.*?</footer>', f_html, html, flags=re.DOTALL)
    
    # --- Attributes fix (lazy load) ---
    html = re.sub(r'(<img\s+[^>]*?)(/?>)', lambda m: m.group(1) + ( ' loading="lazy"' if 'loading=' not in m.group(1) else '' ) + m.group(2), html)
    
    # --- Sync Modals (License Selection & CAND Menu) ---
    cand_modal_html = """
<!-- CAND Function Selection Modal -->
<div id="candMenuPopupOverlay" class="nav-popup-overlay">
    <div class="nav-popup-modal modern-popup">
        <div class="nav-popup-header">
            <div class="header-texts">
                <h3>Chọn chức năng</h3>
                <p id="candMenuSubtitle" style="color:#ef4444; font-weight:600;">Hạng B CAND</p>
            </div>
            <button class="nav-popup-close" onclick="closeCandMenuPopup()" aria-label="Đóng popup"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="nav-popup-body category-grid" style="grid-template-columns: 1fr; gap: 12px; padding: 15px;">
            <a id="candMenuStudy" href="#" class="cat-card" style="display:flex; align-items:center; gap: 15px; padding: 15px; text-decoration: none;">
                <div class="cat-icon" style="color: #3b82f6; background: rgba(59, 130, 246, 0.1); width: 44px; height: 44px; display:flex; align-items:center; justify-content:center; border-radius: 10px;"><i class="fa-solid fa-book-open-reader"></i></div>
                <div style="flex: 1; text-align: left;">
                    <div style="font-weight: 600; font-size: 16px; color: #0f172a; margin-bottom:4px;">1. Ôn tập 500 câu</div>
                    <div style="font-size: 13px; color: #64748b;">Học và ghi nhớ lý thuyết cực nhanh</div>
                </div>
            </a>
            <a id="candMenuExam" href="#" class="cat-card" style="display:flex; align-items:center; gap: 15px; padding: 15px; text-decoration: none;">
                <div class="cat-icon" style="color: #22c55e; background: rgba(34, 197, 94, 0.1); width: 44px; height: 44px; display:flex; align-items:center; justify-content:center; border-radius: 10px;"><i class="fa-solid fa-stopwatch"></i></div>
                <div style="flex: 1; text-align: left;">
                    <div style="font-weight: 600; font-size: 16px; color: #0f172a; margin-bottom:4px;">2. Thi đề 30 câu</div>
                    <div style="font-size: 13px; color: #64748b;">Làm đề thi ngẫu nhiên như thi thật</div>
                </div>
            </a>
            <a id="candMenuSahinh" href="#" class="cat-card" style="display:flex; align-items:center; gap: 15px; padding: 15px; text-decoration: none;">
                <div class="cat-icon" style="color: #ef4444; background: rgba(239, 68, 68, 0.1); width: 44px; height: 44px; display:flex; align-items:center; justify-content:center; border-radius: 10px;"><i class="fa-solid fa-map-location-dot"></i></div>
                <div style="flex: 1; text-align: left;">
                    <div style="font-weight: 600; font-size: 16px; color: #0f172a; margin-bottom:4px;">3. Sa hình</div>
                    <div style="font-size: 13px; color: #64748b;">Mô phỏng 11 bài thực hành trong sân</div>
                </div>
            </a>
        </div>
    </div>
</div>
<script>
    function openCandMenuPopup(type) {
        const overlay = document.getElementById('candMenuPopupOverlay');
        if(!overlay) return;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (type === 'bcand') {
            document.getElementById('candMenuSubtitle').innerText = 'Hạng B CAND';
            document.getElementById('candMenuStudy').href = '../cand-study.html';
            document.getElementById('candMenuExam').href = '../cand-exam.html?type=B';
            document.getElementById('candMenuSahinh').href = '../sahinh-b-cand.html';
        } else {
            document.getElementById('candMenuSubtitle').innerText = 'Hạng C CAND';
            document.getElementById('candMenuStudy').href = '../cand-study.html';
            document.getElementById('candMenuExam').href = '../cand-exam.html?type=C';
            document.getElementById('candMenuSahinh').href = '../sahinh-c-cand.html';
        }
    }
    function closeCandMenuPopup() {
        const overlay = document.getElementById('candMenuPopupOverlay');
        if(overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    document.getElementById('candMenuPopupOverlay')?.addEventListener('click', function(e) {
        if(e.target === this) closeCandMenuPopup();
    });
</script>
"""

    # Cleanup old modals
    stub_pattern = re.compile(r'<!-- Class Selection Modal -->\s*<div id="navPopupOverlay"[^>]*>.*?</div>\s*</div>\s*</div>|<div id="navPopupOverlay"[^>]*>.*?</div>|<!-- CAND Function Selection Modal -->.*?<script>.*?</script>', re.IGNORECASE | re.DOTALL)
    html = stub_pattern.sub('', html)
    
    # Inject modals at bottom
    modals_stack = f"\n{modal_html}\n{cand_modal_html}\n"
    html = html.replace('</body>', modals_stack + '</body>')

    # --- Inject Sticky CTA ---
    sticky_cta = """
<!-- Sticky Mobile CTA -->
<div class="mobile-sticky-cta">
    <button class="btn" style="flex:1;" data-popup-trigger="thithu"><i class="fa-solid fa-stopwatch"></i> Thi Thử GPLX</button>
    <button class="btn" style="flex:1; background:#10b981;" data-popup-trigger="onthuyet"><i class="fa-solid fa-book-open"></i> Ôn Tập</button>
</div>
"""
    # Remove old sticky cta accurately
    html = re.sub(r'<!-- Sticky Mobile CTA -->.*?</div>', '', html, flags=re.IGNORECASE | re.DOTALL)
    if '<div class="mobile-sticky-cta">' not in html:
        html = html.replace('</body>', sticky_cta + '\n</body>')

    # --- Automated CTA Refinement (Renaming & Normalization) ---
    # Rename legacy "Vào Thi Thử 35 Câu" to the more accurate "Vào thi thử lý thuyết"
    html = re.sub(r'Vào Thi Thử\s+\d+\s+Câu', r'Vào thi thử lý thuyết', html, flags=re.IGNORECASE)

    # --- Convert Inline and Box CTAs ---
    # 1. Convert broken or existing onclick to data-popup-trigger
    html = re.sub(r'onclick=["\']openLicensePopup\(\\?[\'"]thithu\\?[\'"]\)\s?["\']', 'data-popup-trigger="thithu"', html)
    html = re.sub(r'onclick=["\']openLicensePopup\(\\?[\'"]onthuyet\\?[\'"]\)\s?["\']', 'data-popup-trigger="onthuyet"', html)
    
    # 2. Tag by ID (fallback for already stripped buttons)
    html = re.sub(r'(id="cta-thithu")(?!.*?data-popup-trigger)', r'\1 data-popup-trigger="thithu"', html)
    html = re.sub(r'(id="cta-onthuyet")(?!.*?data-popup-trigger)', r'\1 data-popup-trigger="onthuyet"', html)

    # 3. Tag by text for .btn elements that don't have a trigger yet
    def tag_by_text(m):
        tag_name = m.group(1)
        tag_attrs = m.group(2)
        inner_content = m.group(3)
        inner_text_lower = inner_content.lower()
        
        if 'data-popup-trigger' in tag_attrs:
            return m.group(0)
        
        if any(k in inner_text_lower for k in ['thi thử', 'thi gplx', 'vào thi', 'bắt đầu', 'đề thi', 'thử sức']):
            return f'<{tag_name} data-popup-trigger="thithu" {tag_attrs}>{inner_content}</{tag_name}>'
        if any(k in inner_text_lower for k in ['ôn tập', 'ôn lý thuyết', 'luyện tập', 'mẹo', 'điểm liệt', 'bộ đề', 'củng cố']):
            return f'<{tag_name} data-popup-trigger="onthuyet" {tag_attrs}>{inner_content}</{tag_name}>'
        if 'sa hình' in inner_text_lower:
            return f'<{tag_name} data-popup-trigger="sahinh" {tag_attrs}>{inner_content}</{tag_name}>'
        return m.group(0)

    html = re.sub(r'<(button|a)\s+([^>]*?class="[^"]*?btn[^"]*?"[^>]*?)>(.*?)</\1>', tag_by_text, html, flags=re.IGNORECASE | re.DOTALL)
    
    # 4. Convert inline <a href="../index.html">thi thử...</a> to functional CTA
    def replace_inline_link(m):
        full_tag = m.group(0)
        inner_text = m.group(2).lower()
        if 'thi thử' in inner_text or 'thi gplx' in inner_text:
            return f'<a href="javascript:void(0)" data-popup-trigger="thithu" {m.group(1)}>{m.group(2)}</a>'
        return full_tag
    html = re.sub(r'<a\s+href="\.\./index\.html[^"]*"\s*([^>]*)>(.*?)</a>', replace_inline_link, html, flags=re.IGNORECASE)

    # --- Progress Bar & Script ---
    if '<div class="reading-progress-container">' not in html:
        html = html.replace('<body>', '<body>\n    <div class="reading-progress-container"><div class="reading-progress-bar" id="progressBar"></div></div>')
    
    scroll_script = """
    <!-- Reading Progress Script -->
    <script>
        window.onscroll = function() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            var pb = document.getElementById("progressBar");
            if(pb) pb.style.width = scrolled + "%";
        };
    </script>
"""
    if '<!-- Reading Progress Script -->' in html:
        html = re.sub(r'<!-- Reading Progress Script -->.*?</script>', '', html, flags=re.DOTALL)
    
    html = html.replace('</body>', scroll_script + '\n</body>')

    # --- TOC & IDs ---
    # Clean old TOC
    html = re.sub(r'<div class="blog-toc">.*?</ul>\s*</div>', '', html, flags=re.DOTALL)
    
    # Un-ID existing H2s to avoid appending repeatedly
    html = re.sub(r'<h2 id="[^"]*">(.*?)</h2>', r'<h2>\1</h2>', html)
    
    h2_pattern = re.compile(r'<h2>(.*?)</h2>', re.IGNORECASE)
    h2_matches = h2_pattern.findall(html)
    
    toc_links = []
    for count, h2_content in enumerate(h2_matches, start=1):
        slug = slugify(h2_content)
        if not slug or slug.strip('-') == '': slug = f"muc-{count}"
        html = html.replace(f"<h2>{h2_content}</h2>", f'<h2 id="{slug}">{h2_content}</h2>', 1)
        cln = re.sub(r'<[^>]+>', '', h2_content)
        toc_links.append(f'<li><a href="#{slug}">{cln}</a></li>')

    if toc_links:
        toc_html = f'''
            <div class="blog-toc">
                <div class="blog-toc-title"><i class="fa-solid fa-list-ul"></i> Nội dung bài viết</div>
                <ul>
                    {chr(10).join("                    " + link for link in toc_links)}
                </ul>
            </div>
    '''
        first_h2_idx = html.find('<h2 id=')
        if first_h2_idx != -1:
            html = html[:first_h2_idx] + toc_html + html[first_h2_idx:]

    # --- Schema Auto-Generator ---
    blocks = re.split(r'(<script type="application/ld\+json">.*?</script>)', html, flags=re.IGNORECASE | re.DOTALL)
    out = []
    for b in blocks:
        if b.lower().startswith('<script type="application/ld+json">'):
            if '"@type": "Article"' in b or '"@type": "FAQPage"' in b or '"Article"' in b or '"FAQPage"' in b:
                continue
        out.append(b)
    html = "".join(out).replace('<!-- Auto-generated Schema -->\n    \n', '')

    t_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    d_match = re.search(r'<meta\s+name="description"\s+content="(.*?)"\s*>', html, re.IGNORECASE)
    
    headline = t_match.group(1).strip() if t_match else ""
    description = d_match.group(1).strip() if d_match else ""

    faqs = []
    faq_items = re.findall(r'<div class="faq-item">.*?<div class="faq-q">(.*?)</div>.*?<div class="faq-a">(.*?)</div>', html, re.IGNORECASE | re.DOTALL)
    for q, a in faq_items:
        q = re.sub(r'<[^>]+>', '', q).strip()
        a = re.sub(r'<[^>]+>', '', a).strip()
        faqs.append({"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}})

    article_schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": headline,
      "description": description,
      "author": {"@type": "Organization", "name": "Thi GPLX"},
      "publisher": {"@type": "Organization", "name": "Thi GPLX", "logo": {"@type": "ImageObject", "url": "https://thigplx.site/assets/logo.svg"}}
    }
    faq_schema = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs} if faqs else None

    schema_script = '\n    <!-- Auto-generated Schema -->\n    <script type="application/ld+json">\n' + json.dumps(article_schema, ensure_ascii=False, indent=4) + '\n    </script>\n'
    if faq_schema:
        schema_script += '    <script type="application/ld+json">\n' + json.dumps(faq_schema, ensure_ascii=False, indent=4) + '\n    </script>\n'

    # --- SEO: robots meta, canonical, Open Graph ---
    slug = os.path.basename(filepath)  # e.g. bo-de-thi-gplx-2025-2026-moi-nhat.html
    canonical_url = f"https://thigplx.site/bai-viet/{slug}"

    # First-image in article as og:image (fallback to logo)
    img_match = re.search(r'<img\s+[^>]*src="([^"]+)"', html, re.IGNORECASE)
    og_image = img_match.group(1) if img_match else "https://thigplx.site/assets/og-image.png"
    if og_image.startswith("../images/"):
        og_image = "https://thigplx.site/images/" + og_image[len("../images/"):]
    elif og_image.startswith("../assets/"):
        og_image = "https://thigplx.site/assets/" + og_image[len("../assets/"):]

    seo_injections = [
        '<meta name="robots" content="index, follow">',
        f'<link rel="canonical" href="{canonical_url}">',
        f'<meta property="og:type" content="article">',
        f'<meta property="og:url" content="{canonical_url}">',
        f'<meta property="og:title" content="{headline}">',
        f'<meta property="og:description" content="{description}">',
        f'<meta property="og:image" content="{og_image}">',
        '<meta property="og:locale" content="vi_VN">',
        '<meta property="og:site_name" content="Thi GPLX">',
    ]

    # Remove duplicate existing tags to keep head clean
    html = re.sub(r'<meta\s+name="robots"[^>]*>', '', html, flags=re.IGNORECASE)
    html = re.sub(r'<link\s+rel="canonical"[^>]*/?>', '', html, flags=re.IGNORECASE)
    html = re.sub(r'<meta\s+property="og:[^"]+"[^>]*>', '', html, flags=re.IGNORECASE)

    seo_block = '\n    ' + '\n    '.join(seo_injections) + '\n'
    if '</head>' in html:
        html = html.replace('</head>', seo_block + '</head>')

    if '</head>' in html:
        html = html.replace('</head>', schema_script + '</head>')
   
    with codecs.open(filepath, 'w', 'utf-8') as f:
        f.write(html)
    print(f"-> Successfully built {os.path.basename(filepath)}")

print("Done!")

# --- Auto-rebuild sitemap.xml ---
print("--- 4. Rebuilding Sitemap ---")
try:
    import generate_sitemap
    generate_sitemap.main()
except Exception as e:
    print(f"Warning: Could not auto-regenerate sitemap: {e}")

