import os

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    if file == 'feedback.html':
        continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add cache busters
    content = content.replace('fetch("/feedback.html")', 'fetch("/feedback.html?v=2")')
    content = content.replace('href="/css/feedback.css"', 'href="/css/feedback.css?v=2"')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Applied cache-busters to {len(html_files)} files.")
