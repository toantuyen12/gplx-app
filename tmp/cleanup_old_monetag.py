import os
import glob
import re

folder = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"

# Remove old Monetag script from all HTML files (including subdirs)
html_files = glob.glob(os.path.join(folder, "**", "*.html"), recursive=True)
removed_count = 0

pattern = re.compile(
    r'\s*<!-- Monetag -->\s*<script src="https://quge5\.com/88/tag\.min\.js"[^>]*>\s*</script>|'
    r'\s*<script src="https://quge5\.com/88/tag\.min\.js"[^>]*>\s*</script>'
)

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    new_content = pattern.sub('', content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        removed_count += 1
        print(f"Cleaned: {os.path.relpath(filepath, folder)}")

print(f"\nDone. Old Monetag tag removed from {removed_count} files.")
