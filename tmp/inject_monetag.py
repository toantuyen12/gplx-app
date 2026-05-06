import os
import glob
import re

folder_path = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"
files = glob.glob(os.path.join(folder_path, "*.html"))

tag_to_inject = '<script src="js/monetag-helper.js"></script>'

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already injected
    if 'monetag-helper.js' in content:
        continue

    # Inject right before </head>
    if '</head>' in content:
        content = content.replace('</head>', f'{tag_to_inject}\n</head>')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected into {os.path.basename(filepath)}")
    else:
        print(f"No </head> found in {os.path.basename(filepath)}")

print("Done")
