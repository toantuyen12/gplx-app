import os
import re

file_path = r'c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app\privacy.html'
with open(file_path, 'r', encoding='utf-8') as f:
    c = f.read()

pattern = re.compile(r'(<h1>Chính sách bảo mật</h1>).*?(</div>\s*</div>\s*</div>)', re.DOTALL)

new_content = """<h1>Chính sách bảo mật & Quyền riêng tư</h1>

<p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 24px;">
Tại <strong>thigplx.site</strong>, chúng tôi coi trọng quyền riêng tư của bạn bằng sự minh bạch và trách nhiệm cao nhất. Chính sách này được biên soạn theo tiêu chuẩn bảo vệ dữ liệu chung nhằm giải thích rõ ràng về loại thông tin chúng tôi thu thập, cách chúng tôi sử dụng, và quyền lợi của bạn khi truy cập vào nền tảng luyện thi trực tuyến của chúng tôi.
</p>

<h2>1. Dữ liệu chúng tôi thu thập</h2>
<p>
Website của chúng tôi được thiết kế để bạn có thể học tập mở hoàn toàn. <strong>Chúng tôi KHÔNG yêu cầu bạn phải tạo tài khoản, đăng nhập hoặc cung cấp bất kỳ thông tin định danh cá nhân nhạy cảm nào</strong> (như tên thật, số CCCD, địa chỉ, số điện thoại). 
</p>
<p>Tuy nhiên, để bảo đảm ứng dụng có thể ghi nhớ "tiến trình học" một cách mượt mà và phục vụ các phân tích tối ưu nội dung, chúng tôi thu thập các "Thông tin phi cá nhân" thụ động sau:</p>
<ul>
    <li><strong>Dữ liệu trình duyệt:</strong> Loại trình duyệt (Chrome, Safari...), loại thiết bị (Mobile, PC), Độ phân giải ưu tiên.</li>
    <li><strong>Dữ liệu phiên:</strong> Số điểm thi đạt được, lịch sử câu hỏi bạn hay làm sai (tất cả được lưu trữ cục bộ - Local Storage - trên thiết bị của chính bạn).</li>
    <li><strong>Địa chỉ IP:</strong> Được thu thập độc lập bởi các hệ thống Google Analytics ở dạng ẩn danh nhằm mục đích chống tấn công mạng (DDoS) và đo lường lưu lượng địa lý.</li>
</ul>

<h2>2. Mục đích sử dụng dữ liệu</h2>
<p>Dữ liệu thụ động thu thập được sử dụng tuyệt đối cho các mục đích thiết thực với trải nghiệm của chính bạn:</p>
<ul>
    <li>🔥 Lịch sử bộ câu hỏi giúp tính năng "Ôn lại các câu hay sai" hoạt động chính xác.</li>
    <li>🔥 Phân tích Google Analytics giúp chúng tôi biết chuyên đề nào học viên đang gặp khó khăn để biên soạn thêm bài Blog hướng dẫn thực chiến.</li>
    <li>🔥 Nâng cấp UI/UX: Giúp chúng tôi điều chỉnh giao diện thân thiện với dòng điện thoại phổ biến.</li>
</ul>

<h2>3. Vấn đề Cookie và Tích hợp Bên thứ ba (Google AdSense)</h2>
<p>
Đây là một website phi lợi nhuận dành cho cộng đồng. Do đó, để có chi phí duy trì máy chủ, chúng tôi sử dụng <strong>Google AdSense</strong> để hiển thị quảng cáo.
</p>
<p>
Google và các mạng lưới quảng cáo đối tác sử dụng <strong>Cookie (bao gồm Cookie DART)</strong> để nhận diện thiết bị của bạn nhằm phục vụ các biểu ngữ quảng cáo phù hợp (cá nhân hóa) dựa trên những website khác mà bạn đã ghé thăm trên Internet. 
</p>
<p>
Bạn có toàn quyền kiểm soát việc này. Nếu bạn từ chối kịch bản Quảng Cáo Dựa Trên Sở Thích, bạn có thể dễ dàng vô hiệu hóa hoặc quản lý nó thông qua <a href="https://adssettings.google.com" target="_blank" rel="nofollow" style="color: #0ea5e9; font-weight: 600;">Cài đặt quảng cáo Google</a>.
</p>

<h2>4. Chia sẻ thông tin</h2>
<p>
Chúng tôi cam đoan <strong>KHÔNG BÁN, KHÔNG CHO THUÊ</strong> hoặc chia sẻ bất kỳ thông tin nội bộ nào của học viên với các bên thứ ba vì mục đích thương mại. Thông tin chỉ được phép cung cấp nếu có yêu cầu pháp lý chính thức từ cơ quan chức năng nhà nước theo pháp luật Việt Nam.
</p>

<h2>5. Tính năng lưu trữ bằng EmailJS</h2>
<p>
Riêng tính năng <strong>Phản Hồi (Feedback / Contact)</strong>, khi bạn điền vào form liên hệ, dịch vụ <code>EmailJS</code> sẽ chuyển tiếp tin nhắn qua đường dẫn bảo mật mã hóa HTTPS đến Hộp thư của Quản trị viên. Điều này hoàn toàn phụ thuộc vào sự tự nguyện chia sẻ địa chỉ email liên hệ của bạn để chúng tôi có thể gửi thư phúc đáp.
</p>

<h2>Cập nhật Chính sách</h2>
<p>
Chính sách này có thể được điều chỉnh đôi chút để phù hợp với quy định của Pháp luật Việt Nam hoặc chính sách khắt khe của Mạng hiển thị Google. Bản cập nhật sẽ luôn được công khai trực tiếp tại đường dẫn URL hiện tại.
</p>

<p style="text-align: right; margin-top: 40px; color: #94a3b8; font-size: 0.9rem;">
    <em>Chính sách bảo mật được Ban Quản Trị Hệ Thống cập nhật lần cuối vào tháng 04/2026.</em>
</p>
"""

if pattern.search(c):
    c = pattern.sub(new_content + r'\n\2', c)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("Replaced privacy.html successfully")
else:
    print("Pattern not found in privacy.html")
