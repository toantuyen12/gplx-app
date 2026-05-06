import os
import glob
import re

folder_path = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app\js"
files = glob.glob(os.path.join(folder_path, "*.js"))

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. document.getElementById("...").style... = ...
    def style_repl(match):
        id_str = match.group(1) 
        prop = match.group(2)   
        val = match.group(3)    
        var_name = "el_" + id_str.replace('"', '').replace("'", "").replace("-", "_")
        return f'var {var_name} = document.getElementById({id_str}); if({var_name}) {var_name}.style.{prop} = {val}'

    content = re.sub(r'document\.getElementById\((["\'][^"\']+["\'])\)\.style\.([a-zA-Z0-9_]+)\s*=\s*([^;\n]+)', style_repl, content)

    # 2. document.getElementById("...").innerHTML = ...
    def innerhtml_repl(match):
        id_str = match.group(1)
        val = match.group(2)
        var_name = "el_" + id_str.replace('"', '').replace("'", "").replace("-", "_")
        return f'var {var_name} = document.getElementById({id_str}); if({var_name}) {var_name}.innerHTML = {val}'

    content = re.sub(r'document\.getElementById\((["\'][^"\']+["\'])\)\.innerHTML\s*=\s*([^;\n]+)', innerhtml_repl, content)

    # 3. document.getElementById("...").textContent = ...
    def textcontent_repl(match):
        id_str = match.group(1)
        val = match.group(2)
        var_name = "el_" + id_str.replace('"', '').replace("'", "").replace("-", "_")
        return f'var {var_name} = document.getElementById({id_str}); if({var_name}) {var_name}.textContent = {val}'

    content = re.sub(r'document\.getElementById\((["\'][^"\']+["\'])\)\.textContent\s*=\s*([^;\n]+)', textcontent_repl, content)
    
    # 4. document.getElementById("...").onclick = ...
    def onclick_repl(match):
        id_str = match.group(1)
        val = match.group(2)
        var_name = "el_" + id_str.replace('"', '').replace("'", "").replace("-", "_")
        return f'var {var_name} = document.getElementById({id_str}); if({var_name}) {var_name}.onclick = {val}'

    content = re.sub(r'document\.getElementById\((["\'][^"\']+["\'])\)\.onclick\s*=\s*([^;\n]+)', onclick_repl, content)

    # 5. document.getElementById("...").reset();
    def reset_repl(match):
        id_str = match.group(1)
        var_name = "el_" + id_str.replace('"', '').replace("'", "").replace("-", "_")
        return f'var {var_name} = document.getElementById({id_str}); if({var_name}) {var_name}.reset()'

    content = re.sub(r'document\.getElementById\((["\'][^"\']+["\'])\)\.reset\(\)', reset_repl, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {os.path.basename(filepath)}")

for f in files:
    fix_file(f)

print("Done")
