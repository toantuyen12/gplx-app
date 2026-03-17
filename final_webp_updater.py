import os
import re

root_dir = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"

def process_html():
    for root, dirs, files in os.walk(root_dir):
        if "backups" in root or ".git" in root or "node_modules" in root: continue
        for file in files:
            if file.endswith(".html"):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f: content = f.read()

                def img_replacer(match):
                    full_img = match.group(0)
                    if '.svg' in full_img.lower() or 'http' in full_img.lower() or 'data:image' in full_img.lower():
                        if 'loading=' not in full_img: full_img = full_img.replace('<img ', '<img loading="lazy" ')
                        if 'decoding=' not in full_img: full_img = full_img.replace('<img ', '<img decoding="async" ')
                        return full_img
                    
                    src_match = re.search(r'src=["\']([^"\']+)["\']', full_img)
                    if not src_match: return full_img
                    src_val = src_match.group(1)
                    
                    if src_val.lower().endswith('.webp'):
                        fallback_src = src_val[:-5] + ".png"
                        webp_src = src_val
                    elif src_val.lower().endswith('.png'):
                        fallback_src = src_val
                        webp_src = src_val[:-4] + ".webp"
                    elif src_val.lower().endswith('.jpg') or src_val.lower().endswith('.jpeg'):
                        fallback_src = src_val
                        webp_src = os.path.splitext(src_val)[0] + ".webp"
                    else:
                        fallback_src = src_val
                        webp_src = src_val

                    new_img = full_img.replace(src_val, fallback_src)
                    if 'loading=' not in new_img: new_img = new_img.replace('<img ', '<img loading="lazy" ')
                    if 'decoding=' not in new_img: new_img = new_img.replace('<img ', '<img decoding="async" ')
                    
                    return f'<picture>\n  <source srcset="{webp_src}" type="image/webp">\n  {new_img}\n</picture>'

                content = re.sub(r'<picture>\s*<source[^>]*>\s*(<img[^>]*>)\s*</picture>', r'\1', content, flags=re.DOTALL)
                content = re.sub(r'<img[^>]+>', img_replacer, content)

                parts = re.split(r'(<img[^>]+>)', content)
                for i in range(0, len(parts), 2):
                    parts[i] = parts[i].replace('.png', '.webp').replace('.jpg', '.webp')
                content = "".join(parts)

                with open(path, 'w', encoding='utf-8') as f: f.write(content)

def process_js_css_json():
    for root, dirs, files in os.walk(root_dir):
        if "backups" in root or ".git" in root or "node_modules" in root: continue
        for file in files:
            if file.endswith((".js", ".json", ".css")) and not file in ["seo_webp.py", "final_webp_updater.py"]:
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f: content = f.read()

                new_content = content.replace('.png', '.webp')

                if file == "app.js":
                    new_content = new_content.replace(
                        '`<div style="text-align:center; margin-bottom: 20px;"><img src="${qData.img}" style="max-width:100%; height:auto; border-radius:8px;" loading="lazy"></div>`',
                        '`<div style="text-align:center; margin-bottom: 20px;"><picture><source srcset="${qData.img}" type="image/webp"><img src="${qData.img.replace(\'.webp\', \'.png\')}" style="max-width:100%; height:auto; border-radius:8px;" loading="lazy" decoding="async"></picture></div>`'
                    )
                    new_content = new_content.replace(
                        '`<img src="${data.img}" loading="lazy">`',
                        '`<picture><source srcset="${data.img}" type="image/webp"><img src="${data.img.replace(\'.webp\', \'.png\')}" loading="lazy" decoding="async"></picture>`'
                    )
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f: f.write(new_content)

process_html()
process_js_css_json()
print("Final update complete.")
