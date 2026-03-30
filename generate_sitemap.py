"""
generate_sitemap.py
Dynamic SEO Sitemap Generator for thigplx.site
Auto-discovers all HTML pages and blog articles. No hardcoded URLs.
Run standalone or called from build_blog.py.
"""
import os
import glob
from datetime import datetime

BASE_URL = "https://thigplx.site"
ROOT_DIR  = os.path.dirname(os.path.abspath(__file__))
BLOG_DIR  = os.path.join(ROOT_DIR, "bai-viet")
OUTPUT    = os.path.join(ROOT_DIR, "sitemap.xml")
TODAY     = datetime.now().strftime("%Y-%m-%d")

# Pages to explicitly EXCLUDE from sitemap (dev / test / utility files)
EXCLUDE_FILES = {
    "test_index.html",
    "feedback.html",
}

def get_priority_and_freq(path: str) -> tuple:
    """Return (priority, changefreq) based on the page type."""
    name = os.path.basename(path).lower()
    if name == "index.html":
        return ("1.0", "daily")
    if name in ("blog.html",):
        return ("0.9", "weekly")
    if name.startswith("class-") or name.endswith("-menu.html"):
        return ("0.8", "weekly")
    if path.startswith("bai-viet/") or path.startswith("bai-viet\\"):
        return ("0.7", "weekly")
    # Utility / static pages
    if name in ("about.html", "privacy.html", "terms.html", "contact.html"):
        return ("0.5", "monthly")
    return ("0.7", "weekly")


def build_url(filepath: str) -> str:
    """Convert a local filepath (relative to ROOT_DIR) to a canonical URL."""
    rel = os.path.relpath(filepath, ROOT_DIR).replace("\\", "/")
    if rel == "index.html":
        return BASE_URL + "/"
    return BASE_URL + "/" + rel


def main():
    entries = []

    # ---- Root HTML pages ----
    for filepath in sorted(glob.glob(os.path.join(ROOT_DIR, "*.html"))):
        name = os.path.basename(filepath)
        if name in EXCLUDE_FILES:
            continue
        priority, changefreq = get_priority_and_freq(name)
        entries.append({
            "loc": build_url(filepath),
            "lastmod": TODAY,
            "changefreq": changefreq,
            "priority": priority,
        })

    # ---- Blog articles (/bai-viet/) ----
    if os.path.isdir(BLOG_DIR):
        for filepath in sorted(glob.glob(os.path.join(BLOG_DIR, "*.html"))):
            name = os.path.basename(filepath)
            if name in EXCLUDE_FILES:
                continue
            priority, changefreq = get_priority_and_freq("bai-viet/" + name)
            entries.append({
                "loc": build_url(filepath),
                "lastmod": TODAY,
                "changefreq": changefreq,
                "priority": priority,
            })

    # ---- Build XML ----
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for e in entries:
        lines.append("  <url>")
        lines.append(f"    <loc>{e['loc']}</loc>")
        lines.append(f"    <lastmod>{e['lastmod']}</lastmod>")
        lines.append(f"    <changefreq>{e['changefreq']}</changefreq>")
        lines.append(f"    <priority>{e['priority']}</priority>")
        lines.append("  </url>")
    lines.append("</urlset>")

    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

    print(f"[OK] sitemap.xml generated — {len(entries)} URLs written to {OUTPUT}")


if __name__ == "__main__":
    main()
