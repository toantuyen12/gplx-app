import os
import glob
import re

folder = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"

# 1. Update all JS files: replace showAdSafely with showAd
js_files = glob.glob(os.path.join(folder, "js", "*.js"))
for filepath in js_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = content.replace('window.showAdSafely', 'window.showAd')
    new_content = new_content.replace('showAdSafely', 'showAd')
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {os.path.basename(filepath)}")
    else:
        print(f"No change: {os.path.basename(filepath)}")

# 2. Remove old Monetag head scripts from all HTML files
html_files = glob.glob(os.path.join(folder, "*.html"))
removed_count = 0
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove <!-- Monetag --> comment + script tag
    new_content = re.sub(
        r'\s*<!-- Monetag -->\s*<script src="https://quge5\.com/88/tag\.min\.js"[^>]*>\s*</script>',
        '',
        content
    )
    # Remove without comment
    new_content = re.sub(
        r'\s*<script src="https://quge5\.com/88/tag\.min\.js"[^>]*>\s*</script>',
        '',
        new_content
    )

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        removed_count += 1
        print(f"Cleaned old Monetag from: {os.path.basename(filepath)}")

print(f"\nDone. JS updated, old Monetag removed from {removed_count} HTML files.")
