import os
import re
import json

root_dir = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"
domain = "https://thigplx.site"

# We target certain hub pages
hub_pages = {
    "meo-thi-gplx.html": "Mẹo thi GPLX - Bí quyết đậu 100%",
    "sahinh.html": "Hướng dẫn thực hành Sa Hình Ô Tô",
    "bien-bao-giao-thong.html": "Hệ thống Biển báo Giao thông đường bộ",
    "kinh-nghiem-hoc-gplx.html": "Kinh nghiệm học và thi GPLX thực tế"
}

related_links_html = """
<div class="related-links-section" style="margin-top: 40px; padding: 20px; background: #f9fafb; border-radius: 8px;">
    <h3><i class="fa-solid fa-link" style="color:var(--primary-color);"></i> Bài viết liên quan (Có thể bạn quan tâm)</h3>
    <ul style="list-style-type: none; padding-left: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; margin-top: 15px;">
        <li><a href="/meo-thi-gplx.html" style="text-decoration: none; color: #2d3748; font-weight: 500;">✓ Mẹo thi GPLX B2, C đậu 100%</a></li>
        <li><a href="/sahinh.html" style="text-decoration: none; color: #2d3748; font-weight: 500;">✓ 11 Bài thi Sa Hình Ô Tô chi tiết</a></li>
        <li><a href="/bien-bao-giao-thong.html" style="text-decoration: none; color: #2d3748; font-weight: 500;">✓ Tổng hợp Biển báo Giao thông mới nhất</a></li>
        <li><a href="/kinh-nghiem-hoc-gplx.html" style="text-decoration: none; color: #2d3748; font-weight: 500;">✓ Kinh nghiệm học lái xe thực tế từ A-Z</a></li>
        <li><a href="/duong-truong.html" style="text-decoration: none; color: #2d3748; font-weight: 500;">✓ Kỹ năng thi lái xe đường trường</a></li>
        <li><a href="/class-b-menu.html" style="text-decoration: none; color: #2d3748; font-weight: 500;">✓ Hệ thống 600 câu hỏi thi GPLX Hạng B</a></li>
        <li><a href="/class-c-menu.html" style="text-decoration: none; color: #2d3748; font-weight: 500;">✓ Đề thi thử lý thuyết Hạng C chuẩn</a></li>
        <li><a href="/games/sign-puzzle.html" style="text-decoration: none; color: #2d3748; font-weight: 500;">✓ Game học biển báo vui nhộn (Puzzle)</a></li>
        <li><a href="/games/memory-challenge.html" style="text-decoration: none; color: #2d3748; font-weight: 500;">✓ Trò chơi luyện trí nhớ biển báo</a></li>
        <li><a href="/bai-viet/nhung-dieu-can-biet-ve-bai-thi-sa-hinh-o-to.html" style="text-decoration: none; color: #2d3748; font-weight: 500;">✓ Những lỗi hay gặp khi thi Sa Hình</a></li>
    </ul>
</div>
"""

breadcrumb_base = """
<nav aria-label="breadcrumb" class="breadcrumb-container" style="padding: 10px 20px; font-size: 14px; color: #666; background: #fff; border-bottom: 1px solid #eaeaea;">
  <a href="/" style="color: var(--primary-color); text-decoration: none;">Trang chủ</a> 
  <span style="margin: 0 8px;">/</span> 
  <span aria-current="page" style="font-weight: 600;">{page_title}</span>
</nav>
"""

def clean_noindex(content):
    content = re.sub(r'<meta[^>]*name=["\']?robots["\']?[^>]*content=["\']?noindex[^>]*>', '', content, flags=re.IGNORECASE)
    return content

def inject_related_links(content, filename):
    if filename in ["index.html", "contact.html", "about.html", "privacy.html", "terms.html", "feedback.html"]:
        return content
    if "related-links-section" in content:
        return content
    
    # Try injecting at the end of .container, or before footer
    if "<footer" in content:
        parts = content.split("<footer", 1)
        # Check if there is a closing container div
        return parts[0] + related_links_html + "\n<footer" + parts[1]
    return content

def inject_breadcrumbs_and_schema(content, filename, relative_path):
    if filename == "index.html":
        title = "Trang chủ - Ôn Thi GPLX Online"
    else:
        # Extract title
        title_match = re.search(r'<title>([^<]+)</title>', content)
        title = title_match.group(1).split('|')[0].strip() if title_match else filename.replace(".html", "").replace("-", " ").title()

    # Inject Breadcrumb HTML right after header or body start
    if "breadcrumb-container" not in content and filename != "index.html":
        # Find </header>
        breadcrumb_html = breadcrumb_base.format(page_title=title)
        if "</header>" in content:
            content = content.replace("</header>", "</header>\n" + breadcrumb_html)
        elif "<body>" in content:
            content = content.replace("<body>", "<body>\n" + breadcrumb_html)

    # Build Schema
    schema_graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": f"{domain}/#website",
                "url": f"{domain}/",
                "name": "Thi GPLX Online",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": f"{domain}/index.html#quiz?q={{search_term_string}}",
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "WebPage",
                "@id": f"{domain}/{relative_path}#webpage",
                "url": f"{domain}/{relative_path}",
                "name": title,
                "isPartOf": {"@id": f"{domain}/#website"}
            },
            {
                "@type": "BreadcrumbList",
                "@id": f"{domain}/{relative_path}#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Trang chủ",
                        "item": f"{domain}/"
                    }
                ]
            }
        ]
    }
    
    if filename != "index.html":
        schema_graph["@graph"][2]["itemListElement"].append({
            "@type": "ListItem",
            "position": 2,
            "name": title,
            "item": f"{domain}/{relative_path}"
        })
        
        # Add Article Schema for content pages
        if filename in hub_pages or filename.startswith("bai-viet/"):
            schema_graph["@graph"].append({
                "@type": "Article",
                "@id": f"{domain}/{relative_path}#article",
                "headline": title,
                "author": {"@type": "Organization", "name": "Thi GPLX"},
                "publisher": {"@type": "Organization", "name": "Thi GPLX"},
                "mainEntityOfPage": {"@id": f"{domain}/{relative_path}#webpage"}
            })

    schema_script = f"\n<script type=\"application/ld+json\">\n{json.dumps(schema_graph, ensure_ascii=False, indent=2)}\n</script>\n"

    # Replace existing application/ld+json to avoid duplicates
    # Let's cleanly remove old schema blocks
    content = re.sub(r'<script type="application/ld\+json">.*?<\/script>', '', content, flags=re.DOTALL)
    
    # Inject new schema before </head>
    if "</head>" in content:
        content = content.replace("</head>", schema_script + "</head>")
        
    return content

def process_files():
    for root, dirs, files in os.walk(root_dir):
        if "backups" in root or ".git" in root or ".vscode" in root:
            continue
        for file in files:
            if file.endswith(".html"):
                filepath = os.path.join(root, file)
                relative_path = os.path.relpath(filepath, root_dir).replace("\\", "/")
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = clean_noindex(content)
                new_content = inject_breadcrumbs_and_schema(new_content, file, relative_path)
                new_content = inject_related_links(new_content, file)
                
                # Turn homepage into a stronger hub
                if file == "index.html" and "Meo Thi GPLX" not in new_content:
                    # just ensure links are there, homepage already has strong Hub links but let's append a quick footer hub just in case
                    if "hub-links" not in new_content:
                        hub_html = """
                        <div class="hub-links" style="padding: 40px 20px; background: #fff; text-align: center;">
                            <h2>Hệ Thống Phân Loại GPLX Nhanh</h2>
                            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 20px;">
                                <a href="/meo-thi-gplx.html" class="primary-btn">📚 Mẹo Thi GPLX</a>
                                <a href="/sahinh.html" class="primary-btn">🚗 Sa Hình Ô Tô</a>
                                <a href="/bien-bao-giao-thong.html" class="primary-btn">🛑 Biển Báo</a>
                                <a href="/kinh-nghiem-hoc-gplx.html" class="primary-btn">💡 Kinh Nghiệm</a>
                            </div>
                        </div>
                        """
                        new_content = new_content.replace("</main>", "</main>\n" + hub_html) if "</main>" in new_content else new_content.replace("<footer", hub_html + "\n<footer")
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Injected advanced SEO into {relative_path}")

process_files()
