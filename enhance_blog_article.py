import re
import os

filepath = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app\bai-viet\bo-de-thi-gplx-2025-2026-moi-nhat.html"

with open(filepath, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add Progress Bar to top of body
if '<div class="reading-progress-container">' not in html:
    html = html.replace('<body>', '<body>\n    <div class="reading-progress-container"><div class="reading-progress-bar" id="progressBar"></div></div>')

# 2. Add scroll script before </body>
scroll_script = """
    <!-- Reading Progress Script -->
    <script>
        window.onscroll = function() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            var pb = document.getElementById("progressBar");
            if(pb) pb.style.width = scrolled + "%";
        };
    </script>
"""
if '<!-- Reading Progress Script -->' not in html:
    html = html.replace('</body>', scroll_script + '\n</body>')

# 3. Generate TOC and add IDs
def slugify(text):
    text = re.sub(r'<[^>]+>', '', text) # remove tags
    # Remove emojis (very basic)
    text = text.encode('ascii', 'ignore').decode('ascii') if not any(ord(c) > 127 for c in text) else text
    # basic non-accent mapping
    accents = {
        'a': 'á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ',
        'e': 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
        'i': 'í|ì|ỉ|ĩ|ị',
        'o': 'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
        'u': 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
        'y': 'ý|ỳ|ỷ|ỹ|ỵ',
        'd': 'đ'
    }
    for non_accent, pattern in accents.items():
        text = re.sub(pattern, non_accent, text, flags=re.IGNORECASE)
    
    text = re.sub(r'[^\w\s-]', '', text).strip().lower()
    text = re.sub(r'[\s_-]+', '-', text)
    if not text:
        text = "section"
    # fallback if emoji only
    return text

# Find all H2s
h2_pattern = re.compile(r'<h2>(.*?)</h2>', re.IGNORECASE)
h2_matches = h2_pattern.findall(html)

toc_links = []
count = 1
for h2_content in h2_matches:
    slug = slugify(h2_content)
    if not slug or slug.strip('-') == '':
        slug = f"muc-{count}"
    
    # inject id into the html
    original = f"<h2>{h2_content}</h2>"
    replaced = f'<h2 id="{slug}">{h2_content}</h2>'
    html = html.replace(original, replaced, 1)
    
    # construct TOC link
    clean_title = re.sub(r'<[^>]+>', '', h2_content)
    toc_links.append(f'<li><a href="#{slug}">{clean_title}</a></li>')
    count += 1

if '<div class="blog-toc">' not in html and toc_links:
    toc_html = f'''
            <div class="blog-toc">
                <div class="blog-toc-title"><i class="fa-solid fa-list-ul"></i> Nội dung bài viết</div>
                <ul>
                    {chr(10).join("                    " + link for link in toc_links)}
                </ul>
            </div>
    '''
    # Insert TOC before the first H2
    first_h2_idx = html.find('<h2 id=')
    if first_h2_idx != -1:
        html = html[:first_h2_idx] + toc_html + html[first_h2_idx:]

# 4. Convert some callouts to blockquotes
html = html.replace('<div class="callout">', '<div class="blog-quote">')

with open(filepath, "w", encoding="utf-8") as f:
    f.write(html)
    
print("Successfully injected TOC, Progress Bar, and IDs.")
