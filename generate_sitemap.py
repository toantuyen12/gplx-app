import os
from datetime import datetime

def generate_sitemap():
    base_url = "https://thigplx.site/"
    directory = "."
    games_dir = "games"
    output_file = "sitemap.xml"
    today = datetime.now().strftime("%Y-%m-%d")

    # Define page categories and SEO settings
    categories = {
        "home": {"priority": "1.0", "changefreq": "daily", "files": ["index.html"]},
        "menus": {"priority": "0.9", "changefreq": "weekly", "files": [
            "class-a-menu.html", "class-a1-menu.html", "class-b-menu.html", 
            "class-b1-menu.html", "class-c-menu.html", "class-c1-menu.html", "cand-menu.html"
        ]},
        "quizzes": {"priority": "0.8", "changefreq": "weekly", "files": [
            "cand-exam.html", "cand-study.html"
        ]},
        "content": {"priority": "0.7", "changefreq": "weekly", "files": [
            "meo-thi-gplx.html", "sahinh.html", "bien-bao-giao-thong.html", 
            "signs.html", "duong-truong.html", "kinh-nghiem-hoc-gplx.html"
        ]},
        "static": {"priority": "0.7", "changefreq": "monthly", "files": [
            "about.html", "privacy.html", "terms.html", "contact.html"
        ]},
        "games": {"priority": "0.8", "changefreq": "weekly", "files": []} # To be populated
    }

    # Populate games category
    if os.path.exists(games_dir):
        for f in os.listdir(games_dir):
            if f.endswith(".html"):
                categories["games"]["files"].append(os.path.join(games_dir, f).replace("\\", "/"))

    xml_header = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_header += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    xml_footer = '</urlset>'

    url_entries = []

    for cat_name, info in categories.items():
        for filename in info["files"]:
            if os.path.exists(filename):
                # Clean filename for URL
                url_path = filename
                if url_path == "index.html":
                    url_path = ""
                
                url = f"{base_url}{url_path}"
                entry = f"  <url>\n"
                entry += f"    <loc>{url}</loc>\n"
                entry += f"    <lastmod>{today}</lastmod>\n"
                entry += f"    <changefreq>{info['changefreq']}</changefreq>\n"
                entry += f"    <priority>{info['priority']}</priority>\n"
                entry += f"  </url>"
                url_entries.append(entry)

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(xml_header)
        f.write("\n".join(url_entries))
        f.write("\n" + xml_footer)

    print(f"Successfully generated {output_file} with {len(url_entries)} URLs.")

if __name__ == "__main__":
    generate_sitemap()
