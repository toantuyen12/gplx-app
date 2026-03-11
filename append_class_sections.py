import os

html_path = r'c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app\cand-menu.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

target = '<div style="text-align: center; margin-top: 40px;">'

def make_card(title, desc, icon, icon_color, bg_color, link='#'):
    if link == '#':
        onclick = "onclick=\"alert('Module đang được cập nhật!')\""
    else:
        onclick = ""
    href = link
    
    return f'''
            <!-- {title} -->
            <a href="{href}" class="cat-card" {onclick}>
                <div class="cat-icon" style="color: {icon_color}; background: {bg_color};"><i
                        class="{icon}"></i></div>
                <div class="cat-title">{title}</div>
                <div class="cat-desc">{desc}</div>
                <button class="primary-btn" style="background: {icon_color};">Bắt đầu ngay</button>
            </a>'''

def make_section(title, title_icon, exam_questions):
    cards = [
        make_card('Study 600 Questions', 'Ôn tập 600 câu hỏi lý thuyết', 'fa-solid fa-book-open-reader', '#3b82f6', 'rgba(59, 130, 246, 0.1)'),
        make_card(f'Practice Exam ({exam_questions} Questions)', f'Thi thử đề ngẫu nhiên {exam_questions} câu', 'fa-solid fa-stopwatch', '#22c55e', 'rgba(34, 197, 94, 0.1)'),
        make_card('Traffic Signs', 'Học và ghi nhớ các loại biển báo giao thông', 'fa-solid fa-triangle-exclamation', '#eab308', 'rgba(234, 179, 8, 0.1)', 'signs.html'),
        make_card('Critical Questions', 'Danh sách câu hỏi tình huống mất an toàn giao thông nghiêm trọng', 'fa-solid fa-radiation', '#ef4444', 'rgba(239, 68, 68, 0.1)'),
        make_card('Memory Tips', 'Các mẹo giúp ghi nhớ lý thuyết nhanh chóng', 'fa-solid fa-lightbulb', '#8b5cf6', 'rgba(139, 92, 246, 0.1)', 'meo-thi-gplx.html'),
        make_card('Sa Hinh (Driving Simulation)', 'Nắm vững quy tắc các tình huống sa hình', 'fa-solid fa-map-location-dot', '#f97316', 'rgba(249, 115, 22, 0.1)', 'sahinh.html'),
        make_card('Road Driving', 'Kinh nghiệm chuẩn bị cho phần thi thực hành đường trường', 'fa-solid fa-road', '#14b8a6', 'rgba(20, 184, 166, 0.1)')
    ]
    
    section_html = f'''        <!-- {title} -->
        <div class="category-wrapper" style="margin-top: 60px;">
            <h2 class="category-title" style="color: var(--primary);"><i class="{title_icon}"></i> {title}</h2>
            <div class="category-grid">
{''.join(cards)}
            </div>
        </div>
'''
    return section_html

sections_html = make_section('License Class B', 'fa-solid fa-car-side', 30)
sections_html += make_section('License Class C1', 'fa-solid fa-truck', 35)
sections_html += make_section('License Class C', 'fa-solid fa-truck-moving', 40)

if target in html:
    new_html = html.replace(target, sections_html + '\n        ' + target)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Successfully added 3 main sections to cand-menu.html")
else:
    print("Could not find target to inject sections")
