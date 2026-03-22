import os
import glob

html_files = glob.glob('*.html')
processed = 0

old_func = """function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}"""

new_func = """function toggleMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    changed = False

    # Apply fix to button
    if 'onclick="toggleMenu()"' in content:
        content = content.replace(
            'onclick="toggleMenu()"',
            'onclick="toggleMenu(event)"'
        )
        changed = True

    # Apply fix to function
    if old_func in content:
        content = content.replace(old_func, new_func)
        changed = True

    if changed:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        processed += 1

print(f"Processed {processed} files.")
