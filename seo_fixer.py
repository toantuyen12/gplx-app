import os
import re
from datetime import datetime

base_url = "https://thigplx.site"
root_dir = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"

html_files = []
for root, dirs, files in os.walk(root_dir):
    if "backups" in root or ".git" in root or "node_modules" in root:
        continue
    for file in files:
        if file.endswith(".html"):
            rel_path = os.path.relpath(os.path.join(root, file), root_dir).replace("\\", "/")
            html_files.append(rel_path)

xml_content = ['<?xml version="1.0" encoding="UTF-8"?>']
xml_content.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

today = datetime.now().strftime("%Y-%m-%d")

for f in sorted(html_files):
    priority = "1.0" if f == "index.html" else ("0.9" if "menu" in f else "0.8")
    loc = f"{base_url}/{f}"
    
    xml_content.append("  <url>")
    xml_content.append(f"    <loc>{loc}</loc>")
    xml_content.append(f"    <lastmod>{today}</lastmod>")
    xml_content.append("    <changefreq>weekly</changefreq>")
    xml_content.append(f"    <priority>{priority}</priority>")
    xml_content.append("  </url>")

xml_content.append("</urlset>")

xml_path = os.path.join(root_dir, "sitemap.xml")
with open(xml_path, "w", encoding="utf-8") as file:
    file.write("\n".join(xml_content))
print(f"Generated {xml_path}")

htaccess_content = """RewriteEngine On

# Force HTTPS (single step only)
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://thigplx.site%{REQUEST_URI} [L,R=301]
"""
htaccess_path = os.path.join(root_dir, ".htaccess")
with open(htaccess_path, "w", encoding="utf-8") as file:
    file.write(htaccess_content)
print(f"Generated {htaccess_path}")

def process_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    original_content = content
    
    # Remove meta refresh tags
    content = re.sub(r'<meta[^>]*http-equiv=["\']refresh["\'][^>]*>', '', content, flags=re.IGNORECASE)
    
    # Ensure canonical tags point to absolute URLs with .html (except possibly index.html)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for root, dirs, files in os.walk(root_dir):
    if "backups" in root or ".git" in root or ".vscode" in root:
        continue
    for file in files:
        if file.endswith(".html"):
            process_html_file(os.path.join(root, file))

print("Done processing HTML files.")
