import os
import glob
import re

folder_path = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"
files = glob.glob(os.path.join(folder_path, "*.html"))

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the old monetag script and the comment if present
    content = re.sub(r'<!-- Monetag -->\s*<script src="https://quge5.com/88/tag.min.js".*?</script>', '', content, flags=re.DOTALL)
    # Remove it if it's there without the comment
    content = re.sub(r'<script src="https://quge5.com/88/tag.min.js".*?</script>', '', content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
print("Removed old monetag scripts from head.")
