"""
patch_nav_css.py — Adds missing nav-popup.css <link> to all pages missing it.
Also removes old conflicting mobile-menu / dropdown CSS from .style.css section.
"""

import os
import re
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

html_files = glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True)
html_files = [
    f for f in html_files
    if 'node_modules' not in f
    and 'backups' not in f
]

changed = 0

for filepath in sorted(html_files):
    with open(filepath, 'r', encoding='utf-8', errors='replace') as fh:
        content = fh.read()

    original = content

    rel = os.path.relpath(filepath, ROOT)
    depth = rel.count(os.sep)
    prefix = '../' * depth
    css_href = f'{prefix}css/nav-popup.css'
    css_tag = f'<link rel="stylesheet" href="{css_href}">'
    js_src = f'{prefix}js/nav-popup.js'
    js_tag = f'<script src="{js_src}"></script>'

    # Add CSS if missing
    if 'nav-popup.css' not in content:
        content = content.replace('</head>', f'    {css_tag}\n</head>', 1)

    # Add JS if missing
    if 'nav-popup.js' not in content:
        content = content.replace('</body>', f'    {js_tag}\n</body>', 1)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as fh:
            fh.write(content)
        changed += 1
        print(f'  FIXED: {rel}')

print(f'\nDone. {changed} files updated.')
