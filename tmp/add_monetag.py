import os
import glob
import re

monetag_script = '<!-- Monetag -->\n<script src="https://quge5.com/88/tag.min.js" data-zone="236798" async data-cfasync="false"></script>'

folder_path = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"
extensions = ["**/*.html"]

def modify_file(filepath):
    if 'node_modules' in filepath or '.git' in filepath or 'backups' in filepath or 'tmp' in filepath:
        return

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return

    original = content
    
    # Check if the specific script tag exists to avoid duplicates
    if 'https://quge5.com/88/tag.min.js' not in content:
        content = re.sub(r'</head>', f'    {monetag_script}\n</head>', content, flags=re.IGNORECASE)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

for ext in extensions:
    for filepath in glob.glob(os.path.join(folder_path, ext), recursive=True):
        modify_file(filepath)
print("Done modifying HTML files.")
