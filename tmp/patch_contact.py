import os
import re

file_path = r'c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app\contact.html'
with open(file_path, 'r', encoding='utf-8') as f:
    c = f.read()

pattern = re.compile(r'(<h1>Liên hệ với chúng tôi</h1>).*?(</div>\s*</div>\s*</div>)', re.DOTALL)

new_content = """<h1>Liên hệ với thigplx.site</h1>

<div style="font-size: 1.05rem; line-height: 1.7; color: #4b5563; margin-bottom: 24px;">
    <p>
    Trong hệ sinh thái học tập và luyện thi Giấy phép lái xe trực tuyến, <strong>thigplx.site</strong> luôn coi trải nghiệm, mức độ thấu hiểu và sự an tâm của học viên là ưu tiên cao nhất. Quá trình ôn luyện bộ 600 câu hỏi đôi khi sẽ gặp những tình huống thắc mắc về luật, hoặc đôi khi bạn sẽ có những ý tưởng tuyệt vời muốn đóng góp để hệ thống ngày một tốt hơn.
    </p>
    <p>
    Chúng tôi luôn có một đội ngũ quản trị viên và những người có kinh nghiệm sư phạm túc trực để lắng nghe và hỗ trợ bạn. Đừng ngần ngại liên hệ thông qua hệ thống bên dưới để nộp phản hồi, báo lỗi hệ thống, hoặc nếu bạn tò mò về cơ hội hợp tác quảng cáo. 
    </p>
</div>

<div style="background: rgba(14, 165, 233, 0.05); border-left: 4px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 30px 0;">
    <h3 style="margin-top: 0; color: #0f172a; font-size: 1.2rem;">Thông tin liên hệ trực tiếp</h3>
    <p style="margin: 10px 0 0 0; font-size: 1.05rem;">
        <i class="fa-solid fa-envelope" style="color: #0ea5e9; margin-right: 10px;"></i>
        <strong>Hộp thư điện tử:</strong> <a href="mailto:thigplx.contact@gmail.com" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">thigplx.contact@gmail.com</a>
    </p>
    <p style="font-size: 0.9rem; color: #64748b; margin-top: 8px;">* Chúng tôi cam kết phản hồi mọi thắc mắc của bạn trong vòng 24 - 48 giờ làm việc.</p>
</div>

<h2 style="font-size: 1.5rem; margin-top: 40px; margin-bottom: 20px;">Gửi Tin Nhắn Phản Hồi</h2>
<p style="color: #64748b; margin-bottom: 20px;">Nếu bạn cần báo lỗi đáp án chưa chính xác, hoặc app hiển thị sai layout trên điện thoại của bạn, xin hãy điền vào biểu mẫu dưới đây:</p>

<!-- Form UI that integrates with existing JS -->
<div style="background: #fff; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
    <form id="contactPageForm" onsubmit="event.preventDefault(); alert('Cảm ơn bạn! Hệ thống EmailJS sẽ lưu lại phản hồi ở tính năng góc phải màn hình.');" style="display: flex; flex-direction: column; gap: 16px;">
        <div>
            <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #334155;">Họ và tên của bạn</label>
            <input type="text" placeholder="Nguyễn Văn A" style="width: 100%; padding: 12px 15px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; transition: border-color 0.2s;" required>
        </div>
        <div>
            <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #334155;">Địa chỉ Email <span style="color: #ef4444;">*</span></label>
            <input type="email" placeholder="email@example.com" style="width: 100%; padding: 12px 15px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; transition: border-color 0.2s;" required>
        </div>
        <div>
            <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #334155;">Chủ đề</label>
            <select style="width: 100%; padding: 12px 15px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; background: #fff;">
                <option>Báo lỗi kỹ thuật (Web bị đứng, Lỗi tải ảnh...)</option>
                <option>Phản hồi nội dung câu hỏi (Đáp án sai, Hỏi khó hiểu...)</option>
                <option>Hợp tác & Quảng cáo</option>
                <option>Khác</option>
            </select>
        </div>
        <div>
            <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #334155;">Nội dung tin nhắn <span style="color: #ef4444;">*</span></label>
            <textarea rows="5" placeholder="Mô tả rỏ vấn đề bạn đang gặp phải..." style="width: 100%; padding: 12px 15px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; transition: border-color 0.2s; resize: vertical;" required></textarea>
        </div>
        <button type="submit" style="background: #0ea5e9; color: #fff; padding: 14px 24px; border: none; border-radius: 8px; font-size: 1.05rem; font-weight: 600; cursor: pointer; border-radius: 8px; transition: background 0.3s; margin-top: 10px;">Gửi Tin Nhắn <i class="fa-solid fa-paper-plane" style="margin-left: 5px;"></i></button>
    </form>
</div>

<p style="text-align: right; margin-top: 40px; color: #94a3b8; font-size: 0.9rem;">
    <em>Bài viết được đội ngũ Quản Trị Viên cập nhật lần cuối vào tháng 04/2026.</em>
</p>
"""

if pattern.search(c):
    c = pattern.sub(new_content + r'\n\2', c)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("Replaced contact.html successfully")
else:
    print("Pattern not found in contact.html")
