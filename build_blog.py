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
    
    # --- Sync Modal ---
    stub_pattern = re.compile(r'<!-- Class Selection Modal -->\s*<div id="navPopupOverlay"[^>]*>.*?</div>\s*</div>\s*</div>|<div id="navPopupOverlay"[^>]*>.*?</div>', re.IGNORECASE | re.DOTALL)
    
    # Clean old instances
    html = stub_pattern.sub('<div id="navPopupOverlay" class="nav-popup-overlay"></div>', html)
    # Inject 
    html = html.replace('<div id="navPopupOverlay" class="nav-popup-overlay"></div>', modal_html)

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

    # --- Convert Inline and Box CTAs ---
    # 1. Convert broken or existing onclick to data-popup-trigger
    html = re.sub(r'onclick=["\']openLicensePopup\(\\?[\'"]thithu\\?[\'"]\)\s?["\']', 'data-popup-trigger="thithu"', html)
    html = re.sub(r'onclick=["\']openLicensePopup\(\\?[\'"]onthuyet\\?[\'"]\)\s?["\']', 'data-popup-trigger="onthuyet"', html)
    
    # 2. Tag by ID (fallback for already stripped buttons)
    html = re.sub(r'(id="cta-thithu")(?!.*?data-popup-trigger)', r'\1 data-popup-trigger="thithu"', html)
    html = re.sub(r'(id="cta-onthuyet")(?!.*?data-popup-trigger)', r'\1 data-popup-trigger="onthuyet"', html)

    # 3. Tag by text for .btn elements that don't have a trigger yet
    def tag_by_text(m):
        tag_start = m.group(1)
        tag_body = m.group(2)
        inner_text = m.group(3).lower()
        if 'data-popup-trigger' in tag_start or 'data-popup-trigger' in tag_body:
            return m.group(0)
        
        if 'thi thử' in inner_text or 'thi gplx' in inner_text:
            return f'<{tag_start} data-popup-trigger="thithu" {tag_body}>{m.group(3)}</{tag_start}>'
        if 'ôn tập' in inner_text or 'ôn lý thuyết' in inner_text:
            return f'<{tag_start} data-popup-trigger="onthuyet" {tag_body}>{m.group(3)}</{tag_start}>'
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

