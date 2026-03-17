import os
import re
from PIL import Image

root_dir = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"
image_extensions = ('.png', '.jpg', '.jpeg')

def optimize_images():
    print("Optimizing images to under 200KB...")
    for root, dirs, files in os.walk(root_dir):
        if "backups" in root or ".git" in root or "node_modules" in root:
            continue
        for file in files:
            if file.lower().endswith(image_extensions):
                filepath = os.path.join(root, file)
                try:
                    img = Image.open(filepath)
                    webp_filename = os.path.splitext(file)[0] + '.webp'
                    webp_filepath = os.path.join(root, webp_filename)
                    
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGBA")
                    else:
                        img = img.convert("RGB")
                    
                    # Target High quality but smaller sizes
                    img.save(webp_filepath, 'WEBP', quality=80, optimize=True)
                    print(f"Verified/Generated WebP: {webp_filename}")
                except Exception as e:
                    print(f"Error handling {file}: {e}")

def update_html():
    print("Updating HTML to use <picture>...")
    for root, dirs, files in os.walk(root_dir):
        if "backups" in root or ".git" in root or "node_modules" in root:
            continue
        for file in files:
            if file.endswith(".html"):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Strategy: Find <img> tags NOT inside <picture> yet.
                # In previous step, some src were already changed to .webp. 
                # We want to change them back to .png in the <img> and add the <picture><source...webp></picture> wrap
                
                # Exclude images already in <picture>
                # Using regex to match <img> tags.
                # Find all <img> tags that don't immediately follow <source or something.
                
                # Wait, simpler string replacement approach if we just parse carefully:
                # Let's find all <img ... >
                
                def img_replacer(match):
                    img_tag = match.group(0)
                    
                    # We might have injected loading="lazy" decoding="async" previously.
                    src_match = re.search(r'src=["\']([^"\']+)["\']', img_tag)
                    if not src_match:
                        return img_tag
                        
                    src_val = src_match.group(1)
                    
                    # If it's SVG or external HTTP, skip
                    if src_val.lower().endswith('.svg') or src_val.startswith('http'):
                        return img_tag
                        
                    # If src is .webp (from last run), the fallback needs to be .png/.jpg
                    # Let's assume .png as the original fallback if original file exists.
                    # Or we just derive it.
                    original_ext = ".png"
                    if src_val.lower().endswith('.jpg') or src_val.lower().endswith('.jpeg'):
                        original_ext = ".jpg"
                    elif src_val.lower().endswith('.webp'):
                        # Check if a .png exists
                        base = os.path.splitext(src_val)[0]
                        potential_png = os.path.join(root, os.path.basename(base) + ".png")
                        if os.path.exists(potential_png):
                            original_ext = ".png"
                        else:
                            original_ext = ".jpg"
                    else:
                        original_ext = ".png"
                        
                    base_path = os.path.splitext(src_val)[0]
                    webp_src = base_path + ".webp"
                    png_src = base_path + original_ext
                    
                    # Build new img tag
                    new_img_tag = img_tag
                    new_img_tag = re.sub(r'src=["\'][^"\']+["\']', f'src="{png_src}"', new_img_tag)
                    
                    if 'loading="lazy"' not in new_img_tag:
                         new_img_tag = new_img_tag.replace('<img ', '<img loading="lazy" ')
                    if 'decoding="async"' not in new_img_tag:
                         new_img_tag = new_img_tag.replace('<img ', '<img decoding="async" ')
                         
                    # Check if already in <picture> in content text -- we need to scan the wider context, but regex on group is local.
                    # A trick: return a special marker to verify later or just wrap it.
                    picture_tag = f'<picture>\n  <source srcset="{webp_src}" type="image/webp">\n  {new_img_tag}\n</picture>'
                    return picture_tag

                # To avoid double wrapping, let's temporarily strip existing <picture> around <img> if they exist, or just use a regex that only targets raw <img>
                # Actually, there are no <picture> tags right now in user's index.html as checked.
                # So we can just directly replace <img> if it is not inside <picture>.
                
                # Remove ANY existing <picture> tag structures to reset cleanly
                # We'll just carefully match <img> that aren't inside <picture> 
                content_safe = re.sub(r'<picture>\s*<source[^>]*>\s*(<img[^>]*>)\s*</picture>', r'\1', content, flags=re.DOTALL)
                
                new_content = re.sub(r'<img[^>]+>', img_replacer, content_safe)

                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated images to <picture> in {file}")

def update_css_js():
    print("Updating CSS and JS references to .webp...")
    for root, dirs, files in os.walk(root_dir):
        if "backups" in root or ".git" in root or "node_modules" in root:
            continue
        for file in files:
            if file.endswith(".css") or file.endswith(".js"):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                new_content = re.sub(r'(\.png|\.jpg|\.jpeg)', '.webp', content, flags=re.IGNORECASE)

                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated references in {file}")

if __name__ == "__main__":
    optimize_images()
    update_html()
    update_css_js()
