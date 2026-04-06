import os
import glob

replacements = {
    'Xe máy dưới 175cc': 'Xe máy có dung tích xi-lanh đến 125cc',
    'Xe phân khối lớn ≥ 175cc': 'Xe máy có dung tích xi-lanh trên 125cc (gồm cả A1)',
    'Xe máy dưới 125cm³': 'Xe máy có dung tích xi-lanh đến 125cc',
    'Xe phân khối lớn ≥ 125cm³': 'Xe máy có dung tích xi-lanh trên 125cc (gồm cả A1)',
    'Xe máy < 125cm³': 'Xe máy có dung tích xi-lanh đến 125cc',
    'Xe máy ≥ 125cm³': 'Xe máy có dung tích xi-lanh trên 125cc (gồm cả A1)'
}

def process_file(filepath):
    # Skip node_modules, backups, tmp, etc.
    if 'node_modules' in filepath or 'backups' in filepath or 'tmp' in filepath or '.git' in filepath:
        return

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return
        
    original = content
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

if __name__ == '__main__':
    search_path = r'c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app'
    extensions = ['*.html', '*.js']
    
    for ext in extensions:
        pattern = os.path.join(search_path, '**', ext)
        for filepath in glob.glob(pattern, recursive=True):
            process_file(filepath)
    print("Done")
