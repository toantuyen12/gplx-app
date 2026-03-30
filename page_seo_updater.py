"""
page_seo_updater.py
Global SEO Meta Injector for thigplx.site — all root-level HTML pages.
Injects/updates: <meta robots>, <link canonical>, <meta og:*> tags.
Run after any structural HTML changes to keep SEO in sync.
"""
import os
import re
import glob

BASE_URL    = "https://thigplx.site"
ROOT_DIR    = os.path.dirname(os.path.abspath(__file__))
DEFAULT_OG_IMAGE = "https://thigplx.site/assets/og-image.png"

# Pages EXCLUDED from this global update (blog articles are handled by build_blog.py)
EXCLUDE_FILES = {"test_index.html", "feedback.html"}

# Manual title/description overrides for key pages
SEO_OVERRIDE = {
    "index.html": {
        "title": "Thi Thử GPLX Online – 600 Câu Hỏi Mới Nhất 2026 | thigplx.site",
        "desc": "Luyện thi GPLX online miễn phí với bộ 600 câu hỏi lý thuyết mới nhất. Thi thử sát hạch lái xe, mẹo thi GPLX, sa hình lái xe và hệ thống biển báo giao thông đầy đủ.",
    },
    "blog.html": {
        "title": "Blog Thi GPLX – Kinh Nghiệm, Mẹo Thi, Lộ Trình | thigplx.site",
        "desc": "Tổng hợp bài viết kinh nghiệm thi GPLX, mẹo học 600 câu, lộ trình ôn tập và bí kíp đậu nhanh bằng lái xe các hạng A1, B, C.",
    },
    "meo-thi-gplx.html": {
        "title": "Mẹo Thi GPLX 600 Câu Hỏi – Đậu 100% | thigplx.site",
        "desc": "Tổng hợp các mẹo thi lý thuyết GPLX 600 câu hỏi mới nhất. Bí kíp ghi nhớ nhanh, mẹo trả lời các câu hỏi điểm liệt giúp bạn vượt qua kỳ thi dễ dàng.",
    },
    "sahinh.html": {
        "title": "11 Bài Thi Sa Hình GPLX Ô Tô Mới Nhất | thigplx.site",
        "desc": "Hướng dẫn chi tiết 11 bài thi sa hình lái xe ô tô hạng B2, C. Các mẹo vượt qua bài thi sa hình, lưu ý tránh bị trừ điểm và các lỗi loại trực tiếp.",
    },
    "signs.html": {
        "title": "Tra Cứu Biển Báo Giao Thông Online | thigplx.site",
        "desc": "Danh sách đầy đủ các loại biển báo giao thông đường bộ Việt Nam. Giúp bạn ôn luyện 600 câu hỏi và tham gia giao thông an toàn.",
    },
    "cand-menu.html": {
        "title": "Thi Thử GPLX Ô TÔ CAND – 500 Câu Hỏi CAND | thigplx.site",
        "desc": "Bộ đề thi thử sát hạch lái xe dành riêng cho lực lượng Công an nhân dân. Ôn tập 500 câu hỏi lý thuyết CAND mới nhất, sát đề thi thật.",
    },
    "kinh-nghiem-hoc-gplx.html": {
        "title": "Kinh Nghiệm Học Lái Xe Ô Tô & Thi GPLX | thigplx.site",
        "desc": "Chia sẻ kinh nghiệm học lái xe thực tế, cách ôn luyện 600 câu hỏi hiệu quả và những lưu ý quan trọng khi tham gia kỳ thi sát hạch lái xe.",
    },
}

# Auto-generate title/desc for per-class pages
for cls in ["a", "a1", "b", "c", "c1"]:
    fname = f"class-{cls}-menu.html"
    if fname not in SEO_OVERRIDE:
        SEO_OVERRIDE[fname] = {
            "title": f"Thi Thử GPLX Hạng {cls.upper()} – Đề Thi Sát Hạch Mới Nhất | thigplx.site",
            "desc": f"Thi thử bằng lái xe hạng {cls.upper()} online. Bộ đề thi 600 câu hỏi sát hạch lý thuyết mới nhất, có đáp án và giải thích chi tiết.",
        }

def get_title_desc(html: str, filename: str) -> tuple:
    """Extract or generate title & description for the page."""
    override = SEO_OVERRIDE.get(filename)
    if override:
        return override["title"], override["desc"]
    t = re.search(r"<title>(.*?)</title>", html, re.IGNORECASE | re.DOTALL)
    d = re.search(r'<meta\s+name="description"\s+content="(.*?)"', html, re.IGNORECASE)
    return (
        t.group(1).strip() if t else "Thi GPLX Online | thigplx.site",
        d.group(1).strip() if d else "Luyện thi GPLX miễn phí với bộ đề thi chuẩn mới nhất.",
    )

def make_canonical(filename: str) -> str:
    if filename == "index.html":
        return BASE_URL + "/"
    return BASE_URL + "/" + filename

def inject_seo(html: str, title: str, desc: str, canonical: str, og_image: str) -> str:
    """Purge old duplicate tags then inject fresh SEO block before </head>."""
    # Clean up duplicates
    html = re.sub(r'<meta\s+name="robots"[^>]*>', '', html, flags=re.IGNORECASE)
    html = re.sub(r'<link\s+rel="canonical"[^>]*/?>', '', html, flags=re.IGNORECASE)
    html = re.sub(r'<meta\s+property="og:[^"]+"[^>]*>', '', html, flags=re.IGNORECASE)

    seo_tags = [
        '<meta name="robots" content="index, follow">',
        f'<link rel="canonical" href="{canonical}">',
        f'<meta property="og:type" content="website">',
        f'<meta property="og:url" content="{canonical}">',
        f'<meta property="og:title" content="{title}">',
        f'<meta property="og:description" content="{desc}">',
        f'<meta property="og:image" content="{og_image}">',
        '<meta property="og:locale" content="vi_VN">',
        '<meta property="og:site_name" content="Thi GPLX">',
    ]

    seo_block = '\n    ' + '\n    '.join(seo_tags) + '\n'
    return html.replace('</head>', seo_block + '</head>', 1)


def main():
    updated = 0
    skipped = []

    for filepath in sorted(glob.glob(os.path.join(ROOT_DIR, "*.html"))):
        name = os.path.basename(filepath)
        if name in EXCLUDE_FILES:
            continue

        with open(filepath, "r", encoding="utf-8", errors="replace") as f:
            html = f.read()

        if "<head" not in html.lower():
            skipped.append(name)
            continue

        title, desc = get_title_desc(html, name)
        canonical   = make_canonical(name)

        # Update meta description where missing
        if '<meta name="description"' not in html:
            html = html.replace('</title>', f'</title>\n    <meta name="description" content="{desc}">', 1)

        html = inject_seo(html, title, desc, canonical, DEFAULT_OG_IMAGE)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(html)
        updated += 1

    print(f"[OK] SEO meta tags injected into {updated} root pages.")
    if skipped:
        print(f"[SKIP] No <head> in: {', '.join(skipped)}")


if __name__ == "__main__":
    main()
