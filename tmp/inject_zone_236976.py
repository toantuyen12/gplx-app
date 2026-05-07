import os
import glob
import re

ROOT = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"

NEW_TAG = '<script src="https://quge5.com/88/tag.min.js" data-zone="236976" async data-cfasync="false"></script>'
NEW_COMMENT = '    <!-- Monetag zone 236976 (display/in-page) -->'

# Collect all HTML files recursively
html_files = glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True)

injected = 0
skipped = 0

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # Skip if already has this zone
        if 'zone="236976"' in content or "zone='236976'" in content:
            skipped += 1
            continue

        # Skip feedback.html (no </head>)
        if '</head>' not in content:
            skipped += 1
            continue

        # Inject before </head>
        new_content = content.replace(
            '</head>',
            f'{NEW_COMMENT}\n    {NEW_TAG}\n</head>',
            1  # replace only first occurrence
        )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        rel = os.path.relpath(filepath, ROOT)
        print(f"  Injected: {rel}")
        injected += 1

    except Exception as e:
        print(f"  ERROR: {filepath} — {e}")

print(f"\nDone: {injected} injected, {skipped} skipped.")
