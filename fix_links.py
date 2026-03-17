import os
import re

root_dir = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"

# Collect all valid internal html routes
html_files = set()
for root, dirs, files in os.walk(root_dir):
    if "backups" in root or ".git" in root or "node_modules" in root:
        continue
    for file in files:
        if file.endswith(".html"):
            rel_path = os.path.relpath(os.path.join(root, file), root_dir).replace("\\", "/")
            html_files.add(rel_path)

def fix_links(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all href="..."
    # We will look for internal links that don't end with .html or .css or etc.
    # We shouldn't change external links starting with http:// or https://
    
    def replace_href(match):
        full_href = match.group(0)
        url = match.group(1)
        if url.startswith("http") or url.startswith("mailto:") or url.startswith("tel:") or url.startswith("#"):
            return full_href
        
        # remove fragments for checking
        base_url = url.split("#")[0]
        fragment = "" if "#" not in url else "#" + url.split("#", 1)[1]
        
        # skip empty base url
        if not base_url:
            return full_href
            
        # check if it needs .html
        # only if it points to a known file if we append .html
        # e.g. /about -> about.html
        base_clean = base_url.lstrip("/")
        if base_clean + ".html" in html_files:
            new_url = "/" + base_clean + ".html" if url.startswith("/") else base_clean + ".html"
            return f'href="{new_url}{fragment}"'
            
        # Also need to remove 'index.html' if it's meant to be directory? No, the user wants ALWAYS .html
        # "always include .html" -> so index.html is good.
        
        # fix: replace / to /index.html if we want? The user said "always include .html"
        if base_url == "/" or base_url == "":
            new_url = "index.html" if not url.startswith("/") else "/index.html"
            return f'href="{new_url}{fragment}"'
            
        return full_href

    new_content = re.sub(r'href="([^"]+)"', replace_href, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed links in {filepath}")

for root, dirs, files in os.walk(root_dir):
    if "backups" in root or ".git" in root or ".vscode" in root:
        continue
    for file in files:
        if file.endswith(".html"):
            fix_links(os.path.join(root, file))

print("Link fixing complete.")
