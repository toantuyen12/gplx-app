import os
import glob
import re
import shutil

# Move images
src_dir = r"C:\Users\TOANTUYEN\.gemini\antigravity\brain\b6c6587d-a66d-4773-859b-542b62e8e65f"
dest_dir = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app\images\blog"

img_found = False
for img in glob.glob(os.path.join(src_dir, "blog_*_v2_*.png")):
    img_found = True
    if "blog_main_thumbnail" in img:
        target = "blog_main_thumbnail.png"
    elif "blog_inline_1" in img:
        target = "blog_inline_1.png"
    elif "blog_inline_2" in img:
        target = "blog_inline_2.png"
    elif "blog_inline_3" in img:
        target = "blog_inline_3.png"
    else:
        continue
    
    shutil.copy(img, os.path.join(dest_dir, target))
    print(f"Copied {img} to {target}")

if not img_found:
    print("WARNING: No v2 images found. Ensure they are generated.")

# Sync HTML Headers
root_dir = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"
with open(os.path.join(root_dir, "index.html"), "r", encoding="utf-8") as f:
    index_html = f.read()

# Extract header and footer precisely
header_match = re.search(r'(<header>.*?</header>)', index_html, re.DOTALL)
footer_match = re.search(r'(<footer class="footer">.*?</footer>)', index_html, re.DOTALL)

header_html = header_match.group(1) if header_match else ""
footer_html = footer_match.group(1) if footer_match else ""

def sync_file(filepath, level: int):
    # level 0: same dir, level 1: sub dir
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()
    
    # adjust paths if needed
    h_html = header_html
    f_html = footer_html
    
    if level == 1:
        # add ../ to typical links, exclude absolute http and js
        h_html = h_html.replace('href="', 'href="../').replace('src="', 'src="../')
        h_html = h_html.replace('href="../javascript', 'href="javascript').replace('href="../http', 'href="http')
        f_html = f_html.replace('href="', 'href="../').replace('src="', 'src="../')
        f_html = f_html.replace('href="../javascript', 'href="javascript').replace('href="../http', 'href="http')
        f_html = f_html.replace('href="../#', 'href="#')
    
    html = re.sub(r'<header>.*?</header>', h_html, html, flags=re.DOTALL)
    html = re.sub(r'<footer class="footer">.*?</footer>', f_html, html, flags=re.DOTALL)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Synced Header/Footer for {filepath}")

sync_file(os.path.join(root_dir, "blog.html"), 0)
sync_file(os.path.join(root_dir, r"bai-viet\bo-de-thi-gplx-2025-2026-moi-nhat.html"), 1)

