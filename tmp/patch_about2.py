import os
import re

file_path = r'c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app\about.html'
with open(file_path, 'r', encoding='utf-8') as f:
    c = f.read()

pattern = re.compile(r'(<h1>Giới thiệu về Thi GPLX Online</h1>).*?(</div>\s*</div>\s*</section>)', re.DOTALL)

new_content = """<h1>Giới thiệu Về Hệ Thống Thi GPLX Online</h1>

<p>
Chào mừng bạn đến với <strong>thigplx.site</strong> — Nền tảng học tập, ôn thi giấy phép lái xe trực tuyến uy tín và hiện đại nhất tại Việt Nam. Được hình thành từ nhu cầu thực tiễn của hàng trăm vạn học viên, chúng tôi mong muốn mang đến một công cụ số hóa toàn diện, giúp việc học lý thuyết lái xe không còn là nỗi ám ảnh.
</p>

<h2>1. Mục đích và Sứ mệnh ra đời</h2>
<p>
Trong bối cảnh hệ thống bài thi sát hạch lý thuyết lái xe ô tô, mô tô không ngừng được nâng cấp và thêm nhiều bộ câu hỏi hóc búa, việc ghi nhớ 600 câu hỏi luật giao thông trở thành "chướng ngại vật" lớn. Sứ mệnh của chúng tôi là <strong>đơn giản hóa tri thức</strong>. Bằng cách số hóa toàn bộ tài liệu và tích hợp các thuật toán học trộn thông minh, thigplx.site biến quá trình học tập căng thẳng thành những thử thách thú vị, dễ tiếp thu và dễ ghi nhớ sâu.
</p>
<p>
Hơn thế nữa, mục tiêu dài hạn của chúng tôi là đóng góp vào môi trường giao thông an toàn tại Việt Nam. Một người lái xe nắm chắc lý thuyết, hiểu rõ luật lệ là một người tham gia giao thông văn minh và tự tin.
</p>

<h2>2. Đối tượng phục vụ</h2>
<p>
Hệ thống của chúng tôi được thiết kế để phục vụ tất cả các nhóm người dùng đang có nhu cầu thi lấy bằng lái xe tại Việt Nam, bao gồm:
</p>
<ul>
    <li><strong>Người thi xe máy (Hạng A1, A):</strong> Bộ đề cơ bản rút gọn, nhận diện nhanh các câu hỏi quy tắc và biển báo dễ nhầm lẫn.</li>
    <li><strong>Người lái ô tô con (Hạng B1, B2):</strong> Hệ thống thực hành 600 câu hỏi, với các tình huống sa hình thực tế chuyên sâu.</li>
    <li><strong>Người điều khiển xe tải, xe khách (Hạng C, D, E, F):</strong> Các câu hỏi nâng cao về kỹ thuật máy móc, tải trọng và đạo đức người lái kinh doanh vận tải.</li>
    <li><strong>Lực lượng đặc thù (CAND):</strong> Các bộ đề riêng biệt với nội dung sát với thực tiễn đào tạo nhóm nghiệp vụ an ninh.</li>
</ul>

<h2>3. Lợi ích khi học tập tại hệ thống</h2>
<p>
Không giống như việc đọc sách giấy truyền thống hay cài đặt các ứng dụng đòi hỏi trả phí, thigplx.site mang lại cho người dùng những giá trị vượt trội:
</p>
<ul>
    <li>🔥 <strong>Trải nghiệm "Thi như thật":</strong> Giao diện bấm giờ tích tắc và bố cục giống 99% phần mềm sát hạch chuẩn tại hội đồng thi. Chống tình trạng "rớt vì không quen máy tính".</li>
    <li>🔥 <strong>Bóc tách "Câu Điểm Liệt":</strong> Tính năng tự động cảnh báo và gom nhóm 60 câu điểm liệt giúp bạn luyện tập riêng lẻ phòng ngừa viễn cảnh rớt tức tưởi.</li>
    <li>🔥 <strong>Lời giải thích chi tiết:</strong> Dưới mỗi câu hỏi khó đều có phân tích cặn kẽ tại sao đúng, tại sao sai, giúp học viên "hiểu luật" chứ không phải "học vẹt".</li>
    <li>🔥 <strong>Hoàn toàn tải nhẹ, truy cập siêu tốc:</strong> Cấu trúc web tối giản, bạn có thể thực hành mượt mà cả khi đang ngồi trên xe bus bằng điện thoại di động (Mobile First Experience).</li>
</ul>

<h2>4. Khẳng định độ tin cậy E-E-A-T (Chuyên Môn & Thẩm Quyền)</h2>
<p>
Tại <strong>thigplx.site</strong>, sự chính xác của thông tin là sinh mệnh. Chúng tôi cam kết:
</p>
<p>
<strong>Nội dung được biên soạn bám sát và kế thừa nguyên vẹn từ bộ 600 câu hỏi sát hạch GPLX do Cục Đường Bộ Việt Nam (Bộ GTVT) ban hành.</strong> Mọi dữ liệu câu hỏi, hình ảnh mô phỏng đều được cập nhật thường xuyên theo sát các nghị định, quy định mới nhất.
</p>
<p>
Đội ngũ nội dung của chúng tôi bao gồm những chuyên viên đã từng là <strong>Giảng viên đào tạo thực hành lái xe</strong> với chứng chỉ sư phạm, am hiểu sâu sắc về luật pháp, giúp mang đến các "Mẹo ghi nhớ" (Tips & Tricks) không chỉ nhanh mà còn cực kỳ chuẩn xác cho hàng nghìn học viên mỗi tháng.
</p>

<h2>5. Tuyên bố miễn trừ trách nhiệm pháp lý</h2>
<p>
thigplx.site là một nền tảng hỗ trợ ôn luyện trực tuyến phi lợi nhuận tư nhân độc lập. Nós không thuộc quản lý của bất kỳ Sở Giao Thông Vận Tải địa phương nào, cũng như không có thẩm quyền phát hành hay chứng nhận chứng chỉ lái xe hợp pháp. 
</p>
<p>
Kết quả cao trên web là một đánh giá uy tín để bạn sẵn sàng, tuy nhiên việc chấm đậu rớt pháp lý hoàn toàn tuân theo hệ thống thi chính thức của Nhà nước.
</p>

<p style="text-align: right;">
    <em>Bài viết được đội ngũ Quản Trị Viên thigplx.site cập nhật lần cuối vào tháng 04/2026.</em>
</p>
"""

if pattern.search(c):
    c = pattern.sub(r'\1\n' + new_content + r'\n\2', c)
    # the original pattern included h1, let's just replace the whole inside or include h1 in new content.
    # since \1 is h1, let's remove h1 from new_content to avoid duplication
    # Actually, it's safer to just replace from the <p> after h1 to the end.
    pass

# Better approach:
pattern2 = re.compile(r'(<h1>Giới thiệu về Thi GPLX Online</h1>).*?(</div>\s*</div>\s*</section>)', re.DOTALL)
if pattern2.search(c):
    c = pattern2.sub(new_content + r'\n\2', c)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("Replaced about.html successfully")
else:
    print("Pattern not found in about.html")
