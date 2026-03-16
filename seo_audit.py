import os
import re

def audit_seo(directory):
    html_files = [f for f in os.listdir(directory) if f.endswith('.html')]
    results = {}

    for filename in html_files:
        path = os.path.join(directory, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        file_results = []

        # Check H1
        h1_tags = re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
        if len(h1_tags) == 0:
            file_results.append("MISSING H1")
        elif len(h1_tags) > 1:
            file_results.append(f"MULTIPLE H1s ({len(h1_tags)})")

        # Check Title
        title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
        if not title_match:
            file_results.append("MISSING TITLE")
        elif "thigplx.site" not in title_match.group(1).lower():
            file_results.append("TITLE MISSING BRANDING (thigplx.site)")

        # Check Meta Description
        desc_match = re.search(r'<meta\s+name="description"\s+content="(.*?)"', content, re.IGNORECASE | re.DOTALL)
        if not desc_match:
            # Try alternate order
            desc_match = re.search(r'<meta\s+content="(.*?)"\s+name="description"', content, re.IGNORECASE | re.DOTALL)
        
        if not desc_match:
            file_results.append("MISSING META DESCRIPTION")
        else:
            length = len(desc_match.group(1).strip())
            if length < 50 or length > 250:
                 file_results.append(f"META DESC LENGTH ISSUE ({length} chars)")

        # Check Canonical
        if '<link rel="canonical"' not in content:
            file_results.append("MISSING CANONICAL TAG")

        # Check JSON-LD
        if 'type="application/ld+json"' not in content:
            file_results.append("MISSING JSON-LD SCHEMA")

        # Check Images
        img_tags = re.findall(r'<img[^>]*>', content, re.IGNORECASE)
        for img in img_tags:
            if 'alt="' not in img or 'alt=""' in img:
                file_results.append(f"IMG MISSING ALT: {img}")
            if 'loading="lazy"' not in img:
                file_results.append(f"IMG MISSING LAZY LOADING: {img}")

        if file_results:
            results[filename] = file_results

    return results

if __name__ == "__main__":
    base_dir = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"
    errors = audit_seo(base_dir)
    
    if not errors:
        print("✅ SEO Audit passed for all HTML files!")
    else:
        for file, issues in errors.items():
            print(f"\n[!] {file}:")
            for issue in issues:
                print(f"  - {issue}")
