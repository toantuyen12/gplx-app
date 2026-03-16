import os

output_dir = r'c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app'
html_path = os.path.join(output_dir, 'cand-menu.html')

def make_card(title, desc, icon, icon_color, bg_color, idx, link='#'):
    if link == '#':
        onclick = "onclick=\"alert('Module đang được cập nhật!')\""
    else:
        onclick = ""
    href = link
    return f'''
            <!-- {title} -->
            <a href="{href}" class="cat-card" {onclick}>
                <div class="cat-icon" style="color: {icon_color}; background: {bg_color};"><i class="{icon}"></i></div>
                <div class="cat-title">{idx}. {title}</div>
                <div class="cat-desc">{desc}</div>
                <button class="primary-btn" style="background: {icon_color};">Bắt đầu ngay</button>
            </a>'''

def make_page(class_name, class_title, exam_questions, target_file, bg_color, title_icon):
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Replace title
    html = html.replace('<title>Danh Mục Luyện Thi GPLX Ô TÔ CAND</title>', f'<title>Danh Mục Luyện Thi GPLX - {class_title}</title>')
    html = html.replace('Luyện Thi GPLX Ô TÔ CAND', f'Luyện Thi GPLX {class_name}')
    html = html.replace('Chọn một chức năng bên dưới để bắt đầu ôn luyện bộ 500 câu hỏi sát hạch dành cho lực lượng Công an nhân dân.', f'Chọn một chức năng bên dưới để bắt đầu ôn luyện bộ 600 câu hỏi sát hạch {class_title}.')
    
    start_grid = '<div class="category-grid">'
    end_grid = '        <div style="text-align: center; margin-top: 40px;">'
    
    idx_s = html.find(start_grid)
    idx_e = html.find(end_grid)
    
    cards = [
        make_card('Ôn tập 600 câu', 'Học toàn bộ 600 câu hỏi lý thuyết', 'fa-solid fa-book-open-reader', '#3b82f6', 'rgba(59, 130, 246, 0.1)', 1),
        make_card(f'Thi đề {exam_questions} câu', f'Thi thử đề ngẫu nhiên {exam_questions} câu', 'fa-solid fa-stopwatch', '#22c55e', 'rgba(34, 197, 94, 0.1)', 2),
        make_card('Biển báo giao thông', 'Học và ghi nhớ các loại biển báo giao thông', 'fa-solid fa-triangle-exclamation', '#eab308', 'rgba(234, 179, 8, 0.1)', 3, 'signs.html'),
        make_card('Câu điểm liệt', 'Danh sách 60 câu hỏi tình huống mất an toàn giao thông nghiêm trọng', 'fa-solid fa-radiation', '#ef4444', 'rgba(239, 68, 68, 0.1)', 4),
        make_card('Mẹo ghi nhớ', 'Các mẹo giúp ghi nhớ lý thuyết', 'fa-solid fa-lightbulb', '#8b5cf6', 'rgba(139, 92, 246, 0.1)', 5, 'meo-thi-gplx.html'),
        make_card('Sa hình', 'Nắm vững quy tắc các tình huống sa hình', 'fa-solid fa-map-location-dot', '#f97316', 'rgba(249, 115, 22, 0.1)', 6, 'sahinh.html'),
        make_card('Đường trường', 'Kinh nghiệm chuẩn bị cho phần thi thực hành đường trường', 'fa-solid fa-road', '#14b8a6', 'rgba(20, 184, 166, 0.1)', 7)
    ]
    
    new_grid_html = start_grid + '\n' + ''.join(cards) + '\n        </div>\n\n'
    
    new_html = html[:idx_s] + new_grid_html + html[idx_e:]
    
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print(f'Created {target_file}')


make_page('Hạng B', 'Hạng B (B1, B2)', 30, os.path.join(output_dir, 'class-b-menu.html'), 'rgba(59, 130, 246, 0.1)', 'fa-solid fa-car-side')
make_page('Hạng C1', 'Hạng C1', 35, os.path.join(output_dir, 'class-c1-menu.html'), 'rgba(34, 197, 94, 0.1)', 'fa-solid fa-truck')
make_page('Hạng C', 'Hạng C', 40, os.path.join(output_dir, 'class-c-menu.html'), 'rgba(234, 179, 8, 0.1)', 'fa-solid fa-truck-moving')
