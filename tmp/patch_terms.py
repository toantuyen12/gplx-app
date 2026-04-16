import os
import re

file_path = r'c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app\terms.html'
with open(file_path, 'r', encoding='utf-8') as f:
    c = f.read()

pattern = re.compile(r'(<h1>Điều khoản sử dụng</h1>).*?(</div>\s*</div>\s*</section>)', re.DOTALL)

new_content = """<h1>Điều khoản và Thỏa thuận sử dụng</h1>

<p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 24px;">
Chào mừng bạn đến với chuyên trang luyện thi <strong>thigplx.site</strong>. Xin vui lòng đọc kỹ các Điều khoản và Thỏa thuận dưới đây trước khi bắt đầu sử dụng các tài liệu, hệ thống câu hỏi, bài thi mô phỏng của chúng tôi. 
Việc bạn truy cập và bấm vào nút làm bài được hiểu là bạn đã nắm rõ và chấp thuận vô điều kiện các tiêu chuẩn dịch vụ này.
</p>

<h2>1. Mục đích hoạt động phi lợi nhuận</h2>
<p>
Hệ thống **thigplx.site** là sản phẩm trí tuệ do đội ngũ tình nguyện viên xây dựng. Chúng tôi đóng vai trò là một "Cổng thông tin trắc nghiệm tương tác số" nhằm hỗ trợ công dân làm quen trước với format đề thi của Tổng Cục Đường Bộ. Chúng tôi **KHÔNG PHẢI** là cơ quan Nhà nước cấp bằng, và không cung cấp dịch vụ "lo bằng", "bao đậu" dưới bất kỳ hình thức nào.
</p>

<h2>2. Trách nhiệm và Giới hạn sử dụng của Người dùng</h2>
<p>
Chúng tôi cung cấp tài nguyên hoàn toàn miễn phí. Để duy trì một không gian học tập công bằng, bạn cam kết tuân thủ các quy định sau:
</p>
<ul>
    <li>💡 <strong>Hành vi được ủy quyền:</strong> Sử dụng công cụ trực tuyến hoặc in ấn tài liệu để tự học, thi thử. Nêu trích dẫn (credit/backlink) khi chia sẻ thông tin.</li>
    <li>⛔ <strong>Hành vi nghiêm cấm:</strong> Sử dụng phần mềm (bot, crawler, spider) để cào dữ liệu, lấy cắp nguồn câu hỏi nhằm lập trang web cạnh tranh thương mại.</li>
    <li>⛔ <strong>Cấm tấn công mạng:</strong> Cấm cố ý gây quá tải máy chủ bằng các cuộc tấn công DDoS, chèn mã độc, tiêm SQL ảnh hưởng đến chức năng website.</li>
</ul>

<h2>3. Quyền sở hữu trí tuệ</h2>
<p>
Logo thương hiệu "Thi GPLX", tên miền, bộ mã nguồn hệ thống thi trắc nghiệm (bao gồm các hiệu ứng Javascript, giao diện CSS chuyên biệt) là tài sản độc quyền được chúng tôi thiết kế và bảo lưu. Bạn không được phép đóng gói dạng Ứng dụng/App để thương mại hóa trên Google Play hoặc App Store mà không có văn bản chuyển nhượng cấp phép.
</p>

<h2>4. Giới hạn Trách nhiệm Đối với Kết Quả Thi</h2>
<p>
Mục tiêu trung tâm của hệ thống là cung cấp một **hệ tọa độ mô phỏng sát 99% thực tế**. Tuy nhiên, điểm số tuyệt đối mà bạn đạt được trên màn hình thigplx.site không bắt buộc là một chứng thực pháp lý cho việc "bạn sẽ đậu kỳ thi thật ngoài đời".
</p>
<p>
Thành bại phụ thuộc vào kỹ năng thao tác trên máy tính ở rạp thi, tình trạng tâm lý, và các yếu tố khách quan tại ngày thi sát hạch thực tế. Thigplx.site **Miễn Trừ Toàn Bộ Trách Nhiệm** về khoản thiệt hại lệ phí thi nếu bạn thi trễ, rớt lý thuyết hoặc trượt thực hành.
</p>

<h2>5. Quy định về Liên kết ngoài (Third-party Links)</h2>
<p>
Trong các bài blog chia sẻ kinh nghiệm, hệ thống có thể dẫn link đến các diễn đàn xe cộ hoặc trung tâm sát hạch khác. Chúng tôi không thể chịu trách nhiệm cho các dịch vụ bảo mật hay chất lượng hàng hóa của họ khi bạn nhấn rẽ nhánh sang website đó.
</p>

<h2>6. Thay đổi điều khoản</h2>
<p>
Chúng tôi bảo lưu quyền chỉnh sửa Điều khoản sử dụng bất cứ lúc nào (điển hình như khi có bộ quyết định mới ban hành từ Bộ GTVT). Phiên bản có hiệu lực tiếp theo sẽ được thay thế minh bạch trên cùng một đường dẫn URL. Bạn nên kiểm tra thường xuyên trang này mỗi chu kỳ luyện thi.
</p>

<p style="text-align: right; margin-top: 40px; color: #94a3b8; font-size: 0.9rem;">
    <em>Bài viết được đội ngũ Quản Trị Viên thigplx.site cập nhật lần cuối vào tháng 04/2026.</em>
</p>
"""

if pattern.search(c):
    c = pattern.sub(new_content + r'\n\2', c)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("Replaced terms.html successfully")
else:
    print("Pattern not found in terms.html")
