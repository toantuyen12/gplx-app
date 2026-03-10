import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

viewport_tag = '<meta name="viewport" content="width=device-width, initial-scale=1.0">'

updated_count = 0

for file in html_files:
    if file == 'feedback.html':
        continue # ignore components

    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if viewport meta tag already exists
    if 'name="viewport"' not in content:
        # Inject right below <meta charset="UTF-8"> if it exists, otherwise just after <head>
        if '<meta charset="UTF-8">' in content:
            content = content.replace('<meta charset="UTF-8">', f'<meta charset="UTF-8">\n{viewport_tag}')
        else:
            content = content.replace('<head>', f'<head>\n{viewport_tag}')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        updated_count += 1

print(f"Injected viewport meta tag into {updated_count} files.")
