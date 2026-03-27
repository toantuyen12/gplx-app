"""
patch_nav.py — Batch-patches all HTML files in the gplx-app project:
  1. Removes the inline toggleMenu script block
  2. Adds missing <link> for nav-popup.css in <head>
  3. Adds missing <script src="js/nav-popup.js"> before </body>
"""

import os
import re
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CSS_LINK = '<link rel="stylesheet" href="css/nav-popup.css">'
JS_SCRIPT = '<script src="js/nav-popup.js"></script>'

# Pattern for the inline toggleMenu block — captures from "function toggleMenu" to the
# closing </script> of that same block including the click-outside listener.
TOGGLE_MENU_PATTERN = re.compile(
    r'<script>\s*function toggleMenu\(e\).*?</script>',
    re.DOTALL | re.IGNORECASE
)

# For files like bai-viet/... that have the OLD single-arg-less version
TOGGLE_MENU_PATTERN2 = re.compile(
    r'<script>\s*function toggleMenu\(\).*?</script>',
    re.DOTALL | re.IGNORECASE
)

# Collect all HTML files (root + sub-dirs, excluding node_modules / games)
html_files = glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True)
html_files = [
    f for f in html_files
    if 'node_modules' not in f
    and r'\games\\' not in f
    and '/games/' not in f
    and r'\backups\\' not in f
    and '/backups/' not in f
]

changed = 0
skipped = 0

for filepath in sorted(html_files):
    with open(filepath, 'r', encoding='utf-8', errors='replace') as fh:
        original = fh.read()

    content = original

    # ─── 1. Remove inline toggleMenu block ───
    content, n1 = TOGGLE_MENU_PATTERN.subn('', content)
    content, n2 = TOGGLE_MENU_PATTERN2.subn('', content)

    # ─── 2. Determine relative path prefix ───
    rel = os.path.relpath(filepath, ROOT)
    depth = rel.count(os.sep)  # 0 = root, 1 = one level down (e.g. bai-viet/)
    prefix = '../' * depth

    css_href = f'{prefix}css/nav-popup.css'
    js_src   = f'{prefix}js/nav-popup.js'

    css_tag = f'<link rel="stylesheet" href="{css_href}">'
    js_tag  = f'<script src="{js_src}"></script>'

    # ─── 3. Add CSS link (before </head>) if missing ───
    # Check if ANY nav-popup.css link exists
    if 'nav-popup.css' not in content:
        content = content.replace('</head>', f'    {css_tag}\n</head>', 1)

    # ─── 4. Add JS script (before </body>) if missing ───
    if 'nav-popup.js' not in content:
        content = content.replace('</body>', f'    {js_tag}\n</body>', 1)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as fh:
            fh.write(content)
        changed += 1
        removed = n1 + n2
        print(f'  PATCHED [{removed} block(s) removed] {rel}')
    else:
        skipped += 1

print(f'\nDone. {changed} files patched, {skipped} files unchanged.')
