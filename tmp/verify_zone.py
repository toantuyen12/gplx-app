import os

ROOT = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"
checks = [
    "b-exam.html", "c-exam.html", "c1-exam.html", "moto-exam.html",
    "index.html", "study600.html", "signs.html", "blog.html",
    r"bai-viet\kinh-nghiem-thi-gplx-b-dau-100.html",
    r"games\sign-memory-60s.html"
]
for f in checks:
    path = os.path.join(ROOT, f)
    content = open(path, encoding='utf-8', errors='ignore').read()
    has = '236976' in content
    status = "OK  " if has else "MISS"
    print(f"  [{status}] {f}")
