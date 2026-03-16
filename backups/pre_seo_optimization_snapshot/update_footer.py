import os
import glob
import re

search_dir = r'c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app'
html_files = glob.glob(os.path.join(search_dir, '*.html'))

count = 0
for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to remove the <br> and the text "Tổng lượt truy cập:" but keep the span with id="totalUsers" hidden
    # Example HTML: <br>\n            🌍 Tổng lượt truy cập: <span id="totalUsers">0</span>
    
    # Match <br> followed by whitespace, the globe emoji, text, and the span tag.
    # We'll replace it with just <span id="totalUsers" style="display:none;">0</span>
    
    pattern = r'<br>\s*🌍\s*Tổng lượt truy cập:\s*<span id="totalUsers">0</span>'
    replacement = r'<span id="totalUsers" style="display:none;">0</span>'
    
    new_content = re.sub(pattern, replacement, content)
    
    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f'Updated {os.path.basename(fpath)}')

print(f'Updated {count} files in total.')
