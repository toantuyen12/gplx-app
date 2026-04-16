import os

filepath = r'c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app\about.html'
with open(filepath, 'r', encoding='utf-8') as f:
    c = f.read()

import re

target_pattern = re.compile(r"<h2>Cam kết chất lượng</h2>.*?</div>", re.DOTALL)

repl = """<h2>Đội ngũ biên tập & Nguồn dữ liệu (E-E-A-T)</h2>
<p>
Tại <strong>thigplx.site</strong>, sự chính xác và đáng tin cậy của thông tin được đặt lên hàng đầu. Nội dung bài giảng, phần giải thích câu hỏi và cơ sở dữ liệu thi thử đều được <strong>cập nhật nghiêm ngặt theo bộ đề thi 600 câu lý thuyết mới nhất của Tổng Cục Đường Bộ Việt Nam (Bộ GTVT).</strong>
</p>
<p>
Từng chuyên đề hướng dẫn, các bài chia sẻ kinh nghiệm sa hình, đường trường và mẹo học điểm liệt đã được biên soạn và kiểm duyệt cẩn thận bởi <strong>đội ngũ Giảng viên Đào tạo Lái xe</strong> có chứng chỉ sư phạm và hơn 10 năm kinh nghiệm trực tiếp giảng dạy thực hành tại các trung tâm sát hạch uy tín.
</p>
<p>
Độc giả có thể hoàn toàn yên tâm sử dụng nền tảng của chúng tôi như một kho tài liệu Bách Khoa Toàn Thư chính thống nhất để vượt qua kỳ thi một cách mỹ mãn.
</p>

<h2>Cam kết chất lượng và Tầm nhìn</h2>
<p>
Đội ngũ kỹ sư phát triển thigplx.site không ngừng nỗ lực tối ưu hóa trải nghiệm người dùng, đảm bảo giao diện thi thử hoạt động ổn định và mượt mà trên cả máy tính PC và thiết bị di động (Smartphones). Tầm nhìn của chúng tôi là "Số hoá 100% tài liệu ôn tập giao thông đường bộ Việt Nam", qua đó lan toả kiến thức pháp luật và kỹ năng lái xe an toàn cho cộng đồng với chi phí 0 đồng.
</p>

<p>
<em>Lưu ý: Website được cung cấp nhằm mục đích giáo dục, ôn luyện nâng cao và tự tra cứu hữu ích cho hàng vạn học viên trên toàn quốc.</em>
</p>

<hr style="margin: 40px 0; border: none; border-top: 1px solid #eaeaea;">

<h2>Tuyên bố miễn trừ trách nhiệm pháp lý</h2>

<p>
Website thigplx.site là trung tâm nguồn dữ liệu mở, độc lập và được xây dựng nhằm cung cấp công cụ tự kiểm tra đánh giá năng lực cá nhân. Nội dung trên website được thừa hưởng từ các báo cáo hướng dẫn luật giao thông công khai.
</p>

<p>
Tuy nhiên, chúng tôi không phải là cơ quan nhà nước và cũng không đại diện pháp lý cho bất kỳ tổ chức Chính phủ hay đơn vị cấp phép nào. Quyết định cấp bằng và điều kiện dự thi của bạn phải chịu sự phân tích hồ sơ trực tiếp từ Sở GTVT địa phương khi bạn ứng tuyển thi.
</p>

<p>
Việc sử dụng thông tin trên website hoàn toàn do người dùng tự
chịu trách nhiệm.
</p>
</div>"""

if target_pattern.search(c):
    c = target_pattern.sub(repl, c)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(c)
    print("Replaced successfully")
else:
    print("Pattern not found")
