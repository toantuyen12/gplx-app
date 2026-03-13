import json
import sys

file_path = r'c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app\data\traffic-signs.json'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        json.load(f)
    print("JSON is valid")
except json.JSONDecodeError as e:
    print(f"Error: {e.msg}")
    print(f"Line: {e.lineno}, Column: {e.colno}")
    # Read the surrounding lines
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        start = max(0, e.lineno - 5)
        end = min(len(lines), e.lineno + 5)
        for i in range(start, end):
            prefix = "-> " if i + 1 == e.lineno else "   "
            print(f"{prefix}{i+1}: {lines[i].strip()}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
