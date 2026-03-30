import os

with open('update_modal_ui_cand.py', 'r', encoding='utf-8') as f:
    content = f.read()
    
# Extract html_to_insert from the script
import ast
# We know it starts with 'html_to_insert = """' and ends with '"""'
start = content.find('html_to_insert = """') + len('html_to_insert = """')
end = content.find('"""\n\ndirectory')
html_to_insert = content[start:end]

files_to_fix = [
    'blog.html',
    r'bai-viet\bo-de-thi-gplx-2025-2026-moi-nhat.html'
]

for file in files_to_fix:
    path = os.path.join(r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app", file)
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
        
    # Replace the stub
    if '<div id="navPopupOverlay" class="nav-popup-overlay">' in html:
        import re
        stub_pattern = re.compile(r'<!-- Class Selection Modal -->\s*<div id="navPopupOverlay" class="nav-popup-overlay">\s*<!--.*?-->\s*</div>|<div id="navPopupOverlay" class="nav-popup-overlay"></div>', re.IGNORECASE | re.DOTALL)
        new_html = stub_pattern.sub(html_to_insert, html)
        if new_html != html:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_html)
            print(f"Injected modal successfully into {file}")
