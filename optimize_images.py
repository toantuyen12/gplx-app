import os
import re
from PIL import Image

root_dir = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"

# 1. Image Optimization
image_extensions = ('.png', '.jpg', '.jpeg')
def optimize_images():
    print("Optimizing images...")
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
                    # Convert to WebP, handling RGBA
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGBA")
                    else:
                        img = img.convert("RGB")
                    
                    img.save(webp_filepath, 'WEBP', quality=80)
                    print(f"Converted {file} to {webp_filename}")
                except Exception as e:
                    print(f"Error converting {file}: {e}")

# 2. Update HTML `<img ...>` tags
def update_image_tags_in_html():
    print("Updating HTML image tags...")
    for root, dirs, files in os.walk(root_dir):
        if "backups" in root or ".git" in root or "node_modules" in root:
            continue
        for file in files:
            if file.endswith(".html"):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Replace .png/.jpg with .webp
                def img_replacer(match):
                    img_tag = match.group(0)
                    src_val = match.group(1)
                    if src_val.lower().endswith(image_extensions):
                        new_src = os.path.splitext(src_val)[0] + '.webp'
                        img_tag = img_tag.replace(src_val, new_src)
                        
                    # Add loading="lazy" decoding="async"
                    if 'loading="lazy"' not in img_tag:
                        img_tag = img_tag.replace('<img ', '<img loading="lazy" ')
                    if 'decoding="async"' not in img_tag:
                        img_tag = img_tag.replace('<img ', '<img decoding="async" ')
                        
                    return img_tag

                new_content = re.sub(r'<img[^>]*src=["\']([^"\']+)["\'][^>]*>', img_replacer, content)

                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated images in {file}")

if __name__ == "__main__":
    optimize_images()
    update_image_tags_in_html()
