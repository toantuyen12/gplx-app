import os

SEO_TEMPLATE_EXAM = """
<!-- SEO CONTENT SECTION -->
<div class="section-v4 seo-content-section" style="margin-top: 40px; margin-bottom: 40px; background: white; padding: 32px; border-radius: 20px; box-shadow: 0 4px 15px -5px rgba(0,0,0,0.05); text-align: left; max-width: 1200px; margin-left: auto; margin-right: auto; width: 95%;">
    <div class="seo-block" style="margin-bottom: 32px;">
        <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 16px; font-weight: 700;">Hệ Thống Thi Thử GPLX Online Sát Đề Thi Thật</h2>
        <p style="color: #475569; line-height: 1.7; margin-bottom: 12px; font-size: 1.05rem;">Trang <strong>Thi Thử GPLX</strong> được thiết kế theo cấu trúc mô phỏng chính xác 100% phần mềm của Tổng Cục Đường Bộ. Công cụ này dành riêng cho các học viên chuẩn bị bước vào kỳ sát hạch chính thức để lấy giấy phép lái xe các hạng (A1, A, B, C...). Việc làm đề thi ngẫu nhiên ở đây giúp học viên làm quen áp lực thời gian, luyện phản xạ và củng cố kiến thức một cách thực tế nhất trước khi vào phòng máy.</p>
    </div>

    <div class="seo-block" style="margin-bottom: 32px;">
        <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 16px; font-weight: 700;">Hướng Dẫn Làm Bài Thi Thử Hiệu Quả</h2>
        <ul class="seo-list" style="color: #475569; line-height: 1.7; padding-left: 20px; font-size: 1.05rem;">
            <li style="margin-bottom: 8px;"><strong>Quản lý thời gian:</strong> Hãy luôn theo dõi đồng hồ đếm ngược. Mỗi câu chỉ nên suy nghĩ tối đa 30-40 giây. Câu nào quá khó hãy bỏ qua và quay lại sau.</li>
            <li style="margin-bottom: 8px;"><strong>Cẩn trọng câu điểm liệt:</strong> Tuyệt đối không được làm sai các câu hỏi tình huống nghiêm trọng (câu điểm liệt). Sai 1 câu là hủy bỏ toàn bộ kết quả bài thi.</li>
            <li style="margin-bottom: 8px;"><strong>Kiểm tra lại trước khi Nộp Bài:</strong> Nếu còn thừa thời gian, hãy rà soát kỹ lại những câu hỏi về hệ thống biển báo xe ưu tiên hoặc câu hỏi có yếu tố "quan sát".</li>
        </ul>
    </div>

    <div class="seo-block">
        <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 16px; font-weight: 700;">Mẹo Thi Thực Tế Và Lỗi Thường Gặp</h2>
        <p style="color: #475569; line-height: 1.7; font-size: 1.05rem;">Nhiều học viên thường vấp phải lỗi đọc không kỹ đề dẫn tới chọn nhầm đáp án "Nhanh nhất" thay vì "Đúng nhất". Hãy ôn luyện đan xen giữa trang <a href="cand-menu.html" style="color:#0ea5e9; font-weight:600; text-decoration:underline;">Thi thử</a> và hệ thống <a href="study600.html" style="color:#0ea5e9; font-weight:600; text-decoration:underline;">Ôn tập 600 câu</a> để hiểu sâu luật, tránh trường hợp học vẹt. Chúc bạn hoàn thành xuất sắc kỳ sát hạch sắp tới!</p>
    </div>
</div>
"""

SEO_TEMPLATE_STUDY = """
<!-- SEO CONTENT SECTION -->
<div class="section-v4 seo-content-section" style="margin-top: 40px; margin-bottom: 40px; background: white; padding: 32px; border-radius: 20px; box-shadow: 0 4px 15px -5px rgba(0,0,0,0.05); text-align: left; max-width: 1200px; margin-left: auto; margin-right: auto; width: 95%;">
    <div class="seo-block" style="margin-bottom: 32px;">
        <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 16px; font-weight: 700;">Nền Tảng Ôn Tập 600 Câu Hỏi Lý Thuyết Chi Tiết</h2>
        <p style="color: #475569; line-height: 1.7; margin-bottom: 12px; font-size: 1.05rem;">Chào mừng bạn đến với chuyên trang <strong>Ôn Tập 600 Câu GPLX</strong>. Đây là cuốn cẩm nang toàn thư số hóa giúp hàng ngàn học viên dễ dàng truy cập và học thuộc lòng bộ quy chuẩn đường bộ dành cho cả xe máy và ô tô. Lợi ích lớn nhất của công cụ này là nội dung được phân chia rõ ràng theo từng chương (Khái niệm, Văn hóa giao thông, Biển báo...) đi kèm lời giải thích rành mạch, nhấn mạnh đúng những câu dễ gây nhầm lẫn.</p>
    </div>

    <div class="seo-block" style="margin-bottom: 32px;">
        <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 16px; font-weight: 700;">Bí Quyết Ôn Tập Ghi Nhớ Lâu</h2>
        <ul class="seo-list" style="color: #475569; line-height: 1.7; padding-left: 20px; font-size: 1.05rem;">
            <li style="margin-bottom: 8px;"><strong>Học theo chủ đề:</strong> Đừng học tràn lan, hãy giải quyết dứt điểm từng chương một. Bắt đầu từ Khái niệm cơ bản rồi tiến tới Cấu tạo xe phức tạp.</li>
            <li style="margin-bottom: 8px;"><strong>Chú ý giải thích đỏ:</strong> Mỗi câu trả lời đều có phần "giải thích đáp án", hãy đọc kỹ để hiểu logic thay vì chỉ nhớ số 1, 2, 3. Điều khoản luật giao thông sẽ nhớ lâu hơn nếu bạn hiểu mục đích của nó.</li>
            <li style="margin-bottom: 8px;"><strong>Ưu tiên 60 câu điểm liệt:</strong> Đây là nhóm câu hỏi bắt buộc phải thuộc làu. Đánh dấu các câu bị sai nhiều lần để review lại mỗi ngày.</li>
        </ul>
    </div>

    <div class="seo-block">
        <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 16px; font-weight: 700;">Đánh Giá Năng Lực Trước Khi Thi</h2>
        <p style="color: #475569; line-height: 1.7; font-size: 1.05rem;">Sau khi đã lướt qua toàn bộ ngữ cảnh trong phần ôn tập này, bạn hãy chuyển sang công cụ <a href="cand-menu.html" style="color:#0ea5e9; font-weight:600; text-decoration:underline;">Thi thử ngẫu nhiên</a> để kiểm chứng trí nhớ của mình. Đừng quên tham khảo góc <a href="meo-thi-gplx.html" style="color:#0ea5e9; font-weight:600; text-decoration:underline;">Mẹo thi GPLX</a> để có góc nhìn "đi tắt đón đầu" lấy điểm tối đa phần sa hình bạn nhé.</p>
    </div>
</div>
"""

SEO_TEMPLATE_SAHINH = """
<!-- SEO CONTENT SECTION -->
<div class="section-v4 seo-content-section" style="margin-top: 40px; margin-bottom: 40px; background: white; padding: 32px; border-radius: 20px; box-shadow: 0 4px 15px -5px rgba(0,0,0,0.05); text-align: left; max-width: 1200px; margin-left: auto; margin-right: auto; width: 95%;">
    <div class="seo-block" style="margin-bottom: 32px;">
        <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 16px; font-weight: 700;">Mô Phỏng 11 Bài Thi Sa Hình Thực Hành</h2>
        <p style="color: #475569; line-height: 1.7; margin-bottom: 12px; font-size: 1.05rem;">Trang mô phỏng thực hành sa hình là vũ khí tối thượng giúp học viên hạng A, hạng B, và hạng C hình dung chi tiết sân bãi trước khi ngồi lên vô lăng. Bài thi thực hành sa hình luôn là rào cản lớn nhất với tỷ lệ đánh rớt rất cao. Việc nắm rõ thứ tự 11 bài thi, các cột mốc tính điểm, và điểm kết thúc sẽ giúp bạn chuẩn bị tâm lý cực tốt, bớt rung tay chân khi chạy trên sa hình thực.</p>
    </div>

    <div class="seo-block" style="margin-bottom: 32px;">
        <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 16px; font-weight: 700;">Hướng Dẫn Chạy Sa Hình Không Mất Điểm Oan</h2>
        <ul class="seo-list" style="color: #475569; line-height: 1.7; padding-left: 20px; font-size: 1.05rem;">
            <li style="margin-bottom: 8px;"><strong>Bài Khởi hành ngang dốc (Dốc cầu):</strong> Đây là bài thi rớt nhiều nhất. Tuyệt đối ghi nhớ cách giữ vòng tua máy, nhả côn và phối hợp chân phanh nhịp nhàng.</li>
            <li style="margin-bottom: 8px;"><strong>Bài Qua vệt bánh xe (Hàng đinh):</strong> Phải đi chậm, canh thẳng sống lưng người lái với điểm đối chiếu trên xe và mặt sân để bánh xe vừa khít với vạch.</li>
            <li style="margin-bottom: 8px;"><strong>Tuyệt đối tuân thủ biển báo:</strong> Chỉ lơ là một chút vượt đèn đỏ sẽ bị trừ điểm cực nặng, hãy quan sát mũi tên điều hướng.</li>
        </ul>
    </div>

    <div class="seo-block">
        <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 16px; font-weight: 700;">Kết Hợp Với Kiến Thức Lý Thuyết</h2>
        <p style="color: #475569; line-height: 1.7; font-size: 1.05rem;">Điểm cốt yếu khi chạy sa hình là bạn vẫn phải thuộc các tín hiệu <a href="signs.html" style="color:#0ea5e9; font-weight:600; text-decoration:underline;">Biển báo</a> và vạch kẻ đường liên quan. Đồng thời, trước khi bước qua vòng thực hành, hãy chắc chắn bạn đã <a href="index.html" style="color:#0ea5e9; font-weight:600; text-decoration:underline;">đậu tuyệt đối bài Lý Thuyết</a>. Chỉ cần kiên nhẫn luyện tập, bạn chắc chắn sẽ "Pass" 100%.</p>
    </div>
</div>
"""

SEO_TEMPLATE_MISC = """
<!-- SEO CONTENT SECTION -->
<div class="section-v4 seo-content-section" style="margin-top: 40px; margin-bottom: 40px; background: white; padding: 32px; border-radius: 20px; box-shadow: 0 4px 15px -5px rgba(0,0,0,0.05); text-align: left; max-width: 1200px; margin-left: auto; margin-right: auto; width: 95%;">
    <div class="seo-block" style="margin-bottom: 32px;">
        <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 16px; font-weight: 700;">Hệ Thống Biển Báo & Kiến Thức Mở Rộng</h2>
        <p style="color: #475569; line-height: 1.7; margin-bottom: 12px; font-size: 1.05rem;">Để điều khiển phương tiện tham gia giao thông an toàn và tránh các thẻ phạt nguội oan uổng, việc am hiểu luật giao thông và quy chuẩn nhận diện trang thiết bị, tình huống là bắt buộc. Hệ thống của chúng tôi cung cấp đầy đủ danh mục biển cấm, biển hiệu lệnh, biển báo nguy hiểm giúp bạn tra cứu tiện lợi và học nhanh nhất.</p>
    </div>

    <div class="seo-block" style="margin-bottom: 32px;">
        <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 16px; font-weight: 700;">Chiến Lược Tự Học Đạt Hiệu Quả Tối Đa</h2>
        <ul class="seo-list" style="color: #475569; line-height: 1.7; padding-left: 20px; font-size: 1.05rem;">
            <li style="margin-bottom: 8px;"><strong>Phân biệt bằng hình ảnh màu sắc:</strong> Hình tròn đỏ - Biển Cấm, Tam giác vàng - Cảnh báo nguy hiểm, Hình vuông xanh - Chỉ dẫn.</li>
            <li style="margin-bottom: 8px;"><strong>Học qua câu hỏi trắc nghiệm:</strong> Cách ghi nhớ trực quan nhất là trả lời ở phần <a href="cand-menu.html" style="color:#0ea5e9; font-weight:600; text-decoration:underline;">Thi thử trực tuyến</a>.</li>
        </ul>
    </div>

    <div class="seo-block">
        <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 16px; font-weight: 700;">Bài Thi Thực Hành Đường Trường</h2>
        <p style="color: #475569; line-height: 1.7; font-size: 1.05rem;">Bên cạnh lý thuyết thì bài thi đường trường cũng là một nỗi khiếp sợ cần lưu ý. Mọi thứ từ thắt dây an toàn, tăng giảm số theo tín hiệu giám thị đều được truyền đạt kinh nghiệm trực tiếp tại muc <a href="meo-thi-gplx.html" style="color:#0ea5e9; font-weight:600; text-decoration:underline;">Mẹo Thi</a>. Chúc bạn có một hành trình an toàn và cầm chắc tay lái!</p>
    </div>
</div>
"""


FILE_GROUPS = {
    "EXAM": [
        "b-exam.html",
        "c-exam.html",
        "c1-exam.html",
        "moto-exam.html",
        "cand-exam.html"
    ],
    "STUDY": [
        "study600.html",
        "cand-study.html"
    ],
    "SAHINH": [
        "sahinh-a.html",
        "sahinh-a1.html",
        "sahinh-b.html",
        "sahinh-b-cand.html",
        "sahinh-c.html",
        "sahinh-c1.html",
        "sahinh-c-cand.html"
    ],
    "MISC": [
        "signs.html",
        "duong-truong.html"
    ]
}

TARGET_DIR = r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app"

TEMPLATE_MAP = {
    "EXAM": SEO_TEMPLATE_EXAM,
    "STUDY": SEO_TEMPLATE_STUDY,
    "SAHINH": SEO_TEMPLATE_SAHINH,
    "MISC": SEO_TEMPLATE_MISC
}

def inject_seo_to_file(filepath, template):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if "SEO CONTENT SECTION" in content:
            print(f"[{os.path.basename(filepath)}] Already has SEO block. Skipping.")
            return

        # Find where to inject, just before footer usually.
        # "<!-- ================= FOOTER V2 ================= -->" or "<footer>"
        insertion_points = [
            "<!-- ================= FOOTER V2 ================= -->",
            "<!-- FOOTER V2 -->",
            "<footer ",
            "<footer>",
            "</body>"
        ]
        
        for p in insertion_points:
            idx = content.find(p)
            if idx != -1:
                # Inject right before p
                new_content = content[:idx] + "\n" + template + "\n" + content[idx:]
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"[{os.path.basename(filepath)}] Successfully injected SEO block at {p[:15]}")
                return
        
        print(f"[{os.path.basename(filepath)}] Could not find insertion point.")
    except Exception as e:
        print(f"[{os.path.basename(filepath)}] Error: {e}")

def main():
    for group, files in FILE_GROUPS.items():
        template = TEMPLATE_MAP[group]
        for file in files:
            filepath = os.path.join(TARGET_DIR, file)
            if os.path.exists(filepath):
                inject_seo_to_file(filepath, template)
            else:
                print(f"File not found: {file}")

if __name__ == "__main__":
    main()
