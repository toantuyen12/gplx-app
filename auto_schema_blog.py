import os
import glob
import re
import json
import codecs

blog_dir = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app\bai-viet"

def remove_old_schemas(html):
    blocks = re.split(r'(<script type="application/ld\+json">.*?</script>)', html, flags=re.IGNORECASE | re.DOTALL)
    out = []
    for b in blocks:
        if b.lower().startswith('<script type="application/ld+json">'):
            # Detect if it's Article or FAQPage schema
            if '"@type": "Article"' in b or '"@type": "FAQPage"' in b or '"@type":"Article"' in b or '"@type":"FAQPage"' in b or '"Article"' in b or '"FAQPage"' in b:
                continue # Skip -> Remove
        out.append(b)
    
    html = "".join(out)
    html = re.sub(r'<!-- Schema Markup -->\s*', '', html)
    html = re.sub(r'<!-- Auto-generated Schema -->\s*', '', html)
    return html

count = 0
for filepath in glob.glob(os.path.join(blog_dir, "*.html")):
    with codecs.open(filepath, 'r', 'utf-8') as f:
        html = f.read()

    # Extract title
    title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    headline = title_match.group(1).strip() if title_match else ""

    # Extract meta description
    desc_match = re.search(r'<meta\s+name="description"\s+content="(.*?)"\s*>', html, re.IGNORECASE)
    description = desc_match.group(1).strip() if desc_match else ""

    # Extract FAQs
    faqs = []
    faq_items = re.findall(r'<div class="faq-item">.*?<div class="faq-q">(.*?)</div>.*?<div class="faq-a">(.*?)</div>', html, re.IGNORECASE | re.DOTALL)
    for q, a in faq_items:
        q = re.sub(r'<[^>]+>', '', q).strip()
        a = re.sub(r'<[^>]+>', '', a).strip()
        faqs.append({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": a
            }
        })

    # Generate schemas
    article_schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": headline,
      "description": description,
      "author": {
        "@type": "Organization",
        "name": "Thi GPLX"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Thi GPLX",
        "logo": {
          "@type": "ImageObject",
          "url": "https://thigplx.site/assets/logo.svg"
        }
      }
    }

    faq_schema = None
    if faqs:
        faq_schema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs
        }

    # Remove old schemas
    html = remove_old_schemas(html)

    # Inject new
    schema_script = '\n    <!-- Auto-generated Schema -->\n    <script type="application/ld+json">\n' + json.dumps(article_schema, ensure_ascii=False, indent=4) + '\n    </script>\n'
    if faq_schema:
        schema_script += '    <script type="application/ld+json">\n' + json.dumps(faq_schema, ensure_ascii=False, indent=4) + '\n    </script>\n'

    if '</head>' in html:
        html = html.replace('</head>', schema_script + '</head>')
        
        with codecs.open(filepath, 'w', 'utf-8') as f:
            f.write(html)
        print(f"Injected auto-schema for {os.path.basename(filepath)}")
        count += 1

print(f"Complete. Processed {count} articles.")
