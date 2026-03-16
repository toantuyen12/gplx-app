import os
import re

seo_config = {
    'index.html': {
        'title': 'Thi Thử GPLX Online – 600 Câu Hỏi Mới Nhất 2026 | thigplx.site',
        'desc': 'Luyện thi GPLX online miễn phí với bộ 600 câu hỏi lý thuyết mới nhất. Thi thử sát hạch lái xe, mẹo thi GPLX, sa hình lái xe và hệ thống biển báo giao thông đầy đủ.'
    },
    'meo-thi-gplx.html': {
        'title': 'Mẹo Thi GPLX 600 Câu Hỏi – Đậu 100% | thigplx.site',
        'desc': 'Tổng hợp các mẹo thi lý thuyết GPLX 600 câu hỏi mới nhất. Bí kíp ghi nhớ nhanh, mẹo trả lời các câu hỏi điểm liệt giúp bạn vượt qua kỳ thi dễ dàng.'
    },
    'sahinh.html': {
        'title': '11 Bài Thi Sa Hình GPLX Ô Tô Mới Nhất | thigplx.site',
        'desc': 'Hướng dẫn chi tiết 11 bài thi sa hình lái xe ô tô hạng B2, C. Các mẹo vượt qua bài thi sa hình, lưu ý tránh bị trừ điểm và các lỗi loại trực tiếp.'
    },
    'bien-bao-giao-thong.html': {
        'title': 'Hệ Thống Biển Báo Giao Thông Đường Bộ Mới Nhất | thigplx.site',
        'desc': 'Tra cứu đầy đủ các loại biển báo giao thông đường bộ: biển báo cấm, biển hiệu lệnh, biển chỉ dẫn, biển cảnh báo. Hình ảnh rõ nét, giải thích chi tiết.'
    },
    'kinh-nghiem-hoc-gplx.html': {
        'title': 'Kinh Nghiệm Học Lái Xe Ô Tô & Thi GPLX | thigplx.site',
        'desc': 'Chia sẻ kinh nghiệm học lái xe thực tế, cách ôn luyện 600 câu hỏi hiệu quả và những lưu ý quan trọng khi tham gia kỳ thi sát hạch lái xe.'
    },
    'cand-menu.html': {
        'title': 'Thi Thử GPLX Ô TÔ CAND – 500 Câu Hỏi CAND | thigplx.site',
        'desc': 'Bộ đề thi thử sát hạch lái xe dành riêng cho lực lượng Công an nhân dân. Ôn tập 500 câu hỏi lý thuyết CAND mới nhất, sát đề thi thật.'
    },
    'signs.html': {
        'title': 'Tra Cứu Biển Báo Giao Thông Online | thigplx.site',
        'desc': 'Danh sách đầy đủ các loại biển báo giao thông đường bộ Việt Nam. Giúp bạn ôn luyện 600 câu hỏi và tham gia giao thông an toàn.'
    }
}

# Generic title/desc for class menus
for c in ['a', 'a1', 'b', 'b1', 'c', 'c1']:
    fname = f'class-{c}-menu.html'
    if fname not in seo_config:
        seo_config[fname] = {
            'title': f'Thi Thử GPLX Hạng {c.upper()} – Đề Thi Sát Hạch Mới Nhất | thigplx.site',
            'desc': f'Thi thử bằng lái xe hạng {c.upper()} online. Bộ đề thi 600 câu hỏi sát hạch lý thuyết mới nhất, có đáp án và giải thích chi tiết.'
        }

for file, data in seo_config.items():
    if not os.path.exists(file):
        continue
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update Title
    content = re.sub(r'<title>.*?</title>', f'<title>{data["title"]}</title>', content)
    
    # Update Meta Description
    if '<meta name="description"' in content:
        content = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{data["desc"]}">', content)
    else:
        # Insert after title
        content = content.replace('</title>', f'</title>\n    <meta name="description" content="{data["desc"]}">')
        
    # Open Graph Tags
    og_tags = f"""
    <meta property="og:title" content="{data["title"]}">
    <meta property="og:description" content="{data["desc"]}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://thigplx.site/{file if file != 'index.html' else ''}">
    <meta property="og:image" content="https://thigplx.site/assets/og-image.png">
    """
    # Clean up existing OG tags to avoid duplication
    content = re.sub(r'<meta property="og:.*?>', '', content)
    content = content.replace('</head>', f'    {og_tags}\n</head>')
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated SEO meta tags for {len(seo_config)} key pages.")
