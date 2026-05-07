import os
import glob
import re

# Routes to PURGE (No onclick ads)
PROTECTED_PATTERNS = [
    "*exam.html",
    "study600.html",
    "cand-study.html",
    "sahinh*.html",
    "games/*.html"
]

# Intrusive ad patterns to remove
AD_PATTERNS = [
    r'<script\s+src="https://quge5\.com/88/tag\.min\.js"[^>]*data-zone="(236798|236976)"[^>]*></script>',
    r'<!--\s*Monetag\s*-->', # Comments usually accompanying the script
    r'<!--\s*Monetag\s*zone\s*236976[^>]*-->'
]

ROOT_DIR = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"

def purge_file(filepath):
    print(f"Checking: {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    for pattern in AD_PATTERNS:
        content = re.sub(pattern, '', content, flags=re.IGNORECASE)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  [PURGED] Ad tags removed from {os.path.basename(filepath)}")
    else:
        print(f"  [SKIPPED] No intrusive ad tags found.")

def main():
    files_to_process = []
    for pattern in PROTECTED_PATTERNS:
        full_pattern = os.path.join(ROOT_DIR, pattern)
        files_to_process.extend(glob.glob(full_pattern, recursive=True))

    # Also handle files in subdirectories manually if needed
    # (glob with recursive=True and ** handle most cases)

    for filepath in set(files_to_process):
        if 'node_modules' in filepath or '.git' in filepath or 'backups' in filepath:
            continue
        purge_file(filepath)

if __name__ == "__main__":
    main()
