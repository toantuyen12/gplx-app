const questions = [
  {
    "id": 1,
    "question": "Câu 1: Trong Luật TTATGTĐB, \"đường ưu tiên\" được quy định như thế nào?",
    "options": [
      "Đường ưu tiên là đường chỉ dành cho một số loại phương tiện tham gia giao thông, được cắm biển báo hiệu đường ưu tiên.",
      "Đường ưu tiên là đường mà trên đó phương tiện tham gia giao thông đường bộ phải nhường đường cho các phương tiện đến từ hướng khác khi qua nơi giao nhau, có thể được cắm biển báo hiệu đường ưu tiên.",
      "Đường ưu tiên là đường mà trên đó phương tiện tham gia giao thông đường bộ được các phương tiện tham gia giao thông đường bộ đến từ hướng khác nhường đường khi qua nơi đường giao nhau, được cắm biển báo hiệu đường ưu tiên."
    ]
  },
  {
    "id": 2,
    "question": "Câu 2: Trong Luật TTATGTĐB, \"làn đường\" được quy định như thế nào?",
    "options": [
      "Là phần của đường bộ được sử dụng cho phương tiện giao thông đi lại.",
      "Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có đủ chiều rộng cho xe chạy an",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 3,
    "question": "Câu 3: Trong Luật TTATGTĐB, \"người tham gia giao thông đường bộ\" gồm những thành phần nào?",
    "options": [
      "Người điều khiển, người được chở trên phương tiện tham gia giao thông đường bộ.",
      "Người điều khiển, dẫn dắt vật nuôi trên đường bộ.",
      "Người đi bộ trên đường bộ.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 4,
    "question": "Câu 4: Trong Luật TTATGTĐB, \"người lái xe\" được quy định như thế nào?",
    "options": [
      "Là người điều khiển xe cơ giới.",
      "Là người điều khiển xe thô sơ.",
      "Là người điều khiển xe máy chuyên dùng."
    ]
  },
  {
    "id": 5,
    "question": "Câu 5: Trong Luật TTATGTĐB, \"người điều khiển giao thông đường bộ\" gồm những thành phần nào?",
    "options": [
      "Người điều khiển phương tiện tham gia giao thông.",
      "Cảnh sát giao thông và người được giao nhiệm vụ hướng dẫn giao thông trên đường bộ."
    ]
  },
  {
    "id": 6,
    "question": "Câu 6: Người tham gia giao thông ngoài việc phải chấp hành các quy định của pháp luật về trật tự, an toàn giao thông đường bộ và quy định khác của pháp luật có liên quan, còn có trách nhiệm gì?",
    "options": [
      "Giữ an toàn cho mình.",
      "Giữ an toàn cho người khác.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 7,
    "question": "Câu 7: Mọi hành vi vi phạm pháp luật về trật tự, an toàn giao thông đường bộ phải được phát hiện, ngăn chặn kịp thời và phải bị xử lý nghiêm minh theo quy định của pháp luật là đúng hay sai?",
    "options": [
      "Sai.",
      "Đúng.",
      "Tùy trường hợp."
    ]
  },
  {
    "id": 8,
    "question": "Câu 8: Luật TTATGTĐB có nghiêm cấm người điều khiển phương tiện tham gia giao thông đường bộ mà trong máu hoặc hơi thở có nồng độ cồn không?",
    "options": [
      "Nghiêm cấm.",
      "Không nghiêm cấm.",
      "Cấm người điều khiển phương tiện giao thông mà trong máu có nồng độ cồn vượt quá 50 miligam/100 mililít máu hoặc vượt quá 0,25 miligam/1lít khí thở."
    ]
  },
  {
    "id": 9,
    "question": "Câu 9: Luật TTATGTĐB có nghiêm cấm người điều khiển phương tiện tham gia giao thông đường bộ mà trong cơ thể có chất ma túy không?",
    "options": [
      "Không nghiêm cấm.",
      "Nghiêm cấm.",
      "Nghiêm cấm tùy từng trường hợp."
    ]
  },
  {
    "id": 10,
    "question": "Câu 10: Hành vi nào dưới đây bị nghiêm cấm trong Luật TTATGTĐB?",
    "options": [
      "Điều khiển phương tiện tham gia giao thông đường bộ lạng lách, đánh võng, rú ga liên tục",
      "Đua xe,tổ chức đua xe, xúi giục, giúp sức, cổ vũ đua xe trái phép.",
      "Xúc phạm, đe dọa, cản trở, chống đối hoặc không chấp hành hiệu lệnh, hướng dẫn, yêu cầu kiểm tra, kiểm soát của người thi hành công vụ về bảo đảm trật tự, an toàn giao thông đường bộ.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 11,
    "question": "Câu 11: Luật TTATGTĐB có nghiêm cấm người lái xe dùng tay cầm và sử dụng điện thoại khi điều khiển phương tiện tham gia giao thông đang di chuyển trên đường bộ không?",
    "options": [
      "Không nghiêm cấm.",
      "Nghiêm cấm tùy từng trường hợp.",
      "Nghiêm cấm."
    ]
  },
  {
    "id": 12,
    "question": "Câu 12: Luật TTATGTĐB có nghiêm cấm hành vi giao xe ô tô cho người không đủ điều kiện theo định của pháp luật để điều khiển xe tham gia giao thông đường bộ không?",
    "options": [
      "Không nghiêm cấm.",
      "Nghiêm cấm.",
      "Nghiêm cấm tùy từng trường hợp."
    ]
  },
  {
    "id": 13,
    "question": "Câu 13: Luật TTATGTĐB có nghiêm cấm hành vi đưa xe cơ giới không bảo đảm quy định của pháp luật về an toàn kỹ thuật và bảo vệ môi trường để tham gia giao thông đường bộ không?",
    "options": [
      "Nghiêm cấm.",
      "Nghiêm cấm tùy từng trường hợp.",
      "Không nghiêm cấm."
    ]
  },
  {
    "id": 14,
    "question": "Câu 14: Luật TTATGTĐB có nghiêm cấm hành vi cải tạo các xe ô tô loại khác thành xe ô tô chở người để kinh doanh vận tải không?",
    "options": [
      "Không nghiêm cấm.",
      "Nghiêm cấm.",
      "Nghiêm cấm tùy từng trường hợp."
    ]
  },
  {
    "id": 15,
    "question": "Câu 15: Hành vi nào dưới đây bị nghiêm cấm trong Luật TTATGTĐB?",
    "options": [
      "Cố ý can thiệp làm sai lệch chỉ số trên đồng hồ báo quãng đường đã chạy của xe ô tô.",
      "Cắt, hàn, tẩy xóa, đục sửa, đóng lại trái phép số khung, số động cơ của xe cơ giới.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 16,
    "question": "Câu 16: Luật TTATGTĐB có nghiêm cấm hành vi thuê, mượn phụ tùng xe cơ giới chỉ để thực hiện việc kiểm định không?",
    "options": [
      "Nghiêm cấm.",
      "Không nghiêm cấm.",
      "Nghiêm cấm tùy từng trường hợp."
    ]
  },
  {
    "id": 17,
    "question": "Câu 17: Hành vi nào dưới đây bị nghiêm cấm?",
    "options": [
      "Chở hàng hóa vượt quá khối lượng toàn bộ, tải trọng trục, kích thước cho phép của xe hoặc vượt quá tải trọng, kích thước giới hạn cho phép của đường bộ khi chưa được cơ quan quản lý cấp phép hoặc không đảm bảo yêu cầu theo quy định của Luật TTATGTĐB.",
      "Chở quá số người theo quy định của pháp luật.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 18,
    "question": "Câu 18: Luật TTATGTĐB có nghiêm cấm hành vi chuyển tải, xuống khách nhằm trốn tránh phát hiện xe chở quá tải, quá số người quy định không?",
    "options": [
      "Nghiêm cấm.",
      "Không nghiêm cấm.",
      "Nghiêm cấm tùy từng trường hợp."
    ]
  },
  {
    "id": 19,
    "question": "Câu 19: Luật TTATGTĐB có nghiêm cấm hành vi lắp đặt, sử dụng thiết bị âm thanh, ánh sáng trên xe cơ giới gây mất trật tự, an toàn giao thông đường bộ không?",
    "options": [
      "Không nghiêm cấm.",
      "Nghiêm cấm.",
      "Nghiêm cấm tùy từng trường hợp."
    ]
  },
  {
    "id": 20,
    "question": "Câu 20: Luật TTATGTĐB có nghiêm cấm hành vi sản xuất, sử dụng, mua, bán trái phép biển số xe không?",
    "options": [
      "Nghiêm cấm.",
      "Không nghiêm cấm.",
      "Nghiêm cấm tùy từng trường hợp."
    ]
  },
  {
    "id": 21,
    "question": "Câu 21: Luật TTATGTĐB nghiêm cấm hành vi nào dưới đây?",
    "options": [
      "Sản xuất, sử dụng, mua, bán trái phép biển số xe.",
      "Điều khiển xe cơ giới gắn biển số xe không do cơ quan nhà nước có thẩm quyền cấp, gắn biển số xe không đúng vị trí.",
      "Bẻ cong, che lấp biển số xe; làm thay đổi chữ, số, màu sắc, hình dạng, kích thước của biển số xe.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 22,
    "question": "Câu 22: Luật TTATGTĐB nghiêm cấm các hành vi nào sau đây?",
    "options": [
      "Đặt, để chướng ngại vật, vật cản khác trái phép trên đường bộ; rải vật sắc nhọn, đổ chất gây trơn trượt trên đường bộ.",
      "Làm rơi vãi đất đá, hàng hóa, vật liệu xây dựng, phế thải trên đường bộ.",
      "Đổ, xả thải, làm rơi vãi hóa chất, chất thải gây toàn giao thông đường bộ.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 23,
    "question": "Câu 23: Luật TTATGTĐB nghiêm cấm hành vi nào dưới đây?",
    "options": [
      "Lắp đặt, sử dụng thiết bị phát tín hiệu ưu tiên không đúng theo quy định của pháp luật.",
      "Sử dụng quyền của xe ưu tiên khi không thực hiện nhiệm vụ theo quy định của pháp luật.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 24,
    "question": "Câu 24: Hành vi nào dưới đây của người lái xe bị nghiêm cấm khi bị phát hiện vi phạm pháp luật về TTATGTĐB?",
    "options": [
      "Không khai báo, khai báo gian dối.",
      "Cung cấp thông tin, tài liệu không đúng sự thật để trốn tránh trách nhiệm.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 25,
    "question": "Câu 25: Luật TTATGTĐB nghiêm cấm các hành vi nào dưới đây?",
    "options": [
      "Bỏ trốn sau khi gây tai nạn giao thông đường bộ để trốn tránh trách nhiệm.",
      "Khi có điều kiện mà cố ý không cứu giúp người bị tai |nạn giao thông đường bộ.",
      "Lợi dụng việc xảy ra tai nạn giao thông đường bộ để hành hung, đe dọa, xúi giục, gây sức ép, làm mất trật tự, cản trở việc xử lý tai nạn giao thông đường bộ.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 26,
    "question": "Câu 26: Người tham gia giao thông đường bộ phải chấp hành những quy tắc nào dưới đây?",
    "options": [
      "Phải đi bên phải theo chiều đi của mình, đi đúng làn đường và phải chấp hành hệ thống báo hiệu đường bộ.",
      "Phải đi bên phải theo chiều đi của mình, đi đúng làn đường, phần đường quy định, chấp hành báo hiệu đường bộ và các quy tắc giao thông đường bộ khác.",
      "Phải đi bên phải theo chiều đi của mình và phải chấp hành hệ thống báo hiệu đường bộ."
    ]
  },
  {
    "id": 27,
    "question": "Câu 27: Khi chở trẻ em dưới 10 tuổi và chiều cao dưới 1,35 mét trên xe ô tô người lái xe phải chấp hành quy tắc nào?",
    "options": [
      "Không được cho trẻ em ngồi cùng hàng ghế với người lái xe, trừ loại xe ô tô chỉ có một hàng ghế.",
      "Phải sử dụng, hướng dẫn sử dụng thiết bị an toàn phù hợp cho trẻ em.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 28,
    "question": "Câu 28: Khi hiệu lệnh của người điều khiển giao thông trái với tín hiệu đèn giao thông, biển báo hiệu đường bộ, người tham gia giao thông đường | bộ phải chấp hành như thế nào?",
    "options": [
      "Hiệu lệnh của người điều khiển giao thông.",
      "Tín hiệu đèn giao thông.",
      "Biển báo hiệu đường bộ."
    ]
  },
  {
    "id": 29,
    "question": "Câu 29: Khi người điều khiển giao thông ra hiệu lệnh: \"tay bên phải giơ thẳng đứng\", người tham gia giao thông phải thực hiện như thế nào?",
    "options": [
      "Người tham gia giao thông ở phía trước và ở phía sau người điều khiển giao thông phải dừng lại; người tham gia giao thông ở phía bên phải và bên trái người điều khiển được đi.",
      "Người tham gia giao thông ở phía trước và ở phía sau người điều khiển giao thông được đi thẳng; người tham gia giao thông ở phía bên phải và bên trái người điều khiển được đi thẳng và rẽ phải.",
      "Người tham gia giao thông đường bộ ở tất cả các hướng phải dừng lại."
    ]
  },
  {
    "id": 30,
    "question": "Câu 30: Khi người điều khiển giao thông ra hiệu lệnh: \"hai tay hoặc một tay dang ngang\", người tham gia giao thông phải thực hiện như thế nào?",
    "options": [
      "Người tham gia giao thông đường bộ ở phía trước và ở phía sau người điều khiển giao thông phải dừng lại; người tham gia giao thông đường bộ ở phía bên phải và bên trái người điều khiển giao thông được đi.",
      "Người tham gia giao thông ở phía trước và ở phía sau người điều khiển giao thông được rẽ trái; người tham gia giao thông ở phía bên phải và bên trái của người điều khiển giao thông được đi thẳng và rẽ phải."
    ]
  },
  {
    "id": 31,
    "question": "Câu 31: Khi người điều khiển giao thông ra hiệu lệnh: \"tay phải giơ về phía trước\", người tham gia giao thông đường bộ phải thực hiện như thế",
    "options": [
      "Người tham gia giao thông đường bộ ở phía sau và bên phải người điều khiển giao thông phải dừng lại; người đi bộ qua đường phải đi sau lưng người điều khiển giao thông.",
      "Người tham gia giao thông đường bộ ở phía bên trái người điều khiển giao thông được đi tất cả các hướng.",
      "Người tham gia giao thông đường bộ ở phía trước người điều khiển giao thông được rẽ phải.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 32,
    "question": "Câu 32: Tại nơi đường giao nhau khi đèn điều khiển giao thông có tín hiệu màu vàng, người tham gia giao thông đường bộ phải thực hiện thế nào?",
    "options": [
      "Người điều khiển phương tiện nhanh chóng cho xe vượt qua vạch dừng để đi qua đường giao nhau.",
      "Trong trường hợp tín hiệu vàng nhấp nháy là được đi nhưng phải giảm tốc độ và cho xe vượt qua vạch dừng để đi qua đường giao nhau.",
      "Phải dừng lại trước vạch dừng; trường hợp đang đi trên vạch dừng hoặc đã đi qua vạch dừng mà tín hiệu đèn màu vàng thì được đi tiếp; trường hợp tín hiệu đèn màu vàng nhấp nháy, người điều khiển phương tiện tham gia giao thông đường bộ được đi nhưng phải quan sát, giảm tốc độ hoặc dừng lại nhường đường cho người đi bộ, xe lăn của người khuyết tật qua đường hoặc các phương tiện khác."
    ]
  },
  {
    "id": 33,
    "question": "Câu 33: Luật TTATGTĐB quy định có bao nhiêu nhóm biển báo hiệu đường bộ?",
    "options": [
      "Ba nhóm: Biển báo cấm, biển báo nguy hiểm và biển hiệu lệnh.",
      "Bốn nhóm: Biển báo cấm, biển báo nguy hiểm, biển hiệu lệnh và biển phụ.",
      "Năm nhóm: Biển báo cấm, biển báo nguy hiểm, biển hiệu lệnh, biển chỉ dẫn, biển phụ."
    ]
  },
  {
    "id": 34,
    "question": "Câu 34: Tác dụng của biển báo cấm?",
    "options": [
      "Để biểu thị các điều cấm. Người tham gia giao thông đường bộ phải chấp hành những điều cấm mà biển đã báo.",
      "Để biểu thị các điều cấm. Người tham gia giao thông có thể không phải chấp hành những điều cấm mà biển đã"
    ]
  },
  {
    "id": 35,
    "question": "Câu 35: Tác dụng của biển báo nguy hiểm?",
    "options": [
      "Dùng để báo cho người tham gia giao thông đường bộ biết trước tính chất của sự nguy hiểm hoặc các điều cần chú ý phòng ngừa trên tuyến đường.",
      "Khi gặp biển báo nguy hiểm người tham gia giao thông đường bộ phải giảm tốc độ đến mức cần thiết, chú ý quan sát và chuẩn bị sẵn sàng xử lý những tình huống có thể xảy ra để phòng ngừa tai nạn.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 36,
    "question": "Câu 36: Tác dụng của biển hiệu lệnh?",
    "options": [
      "Là biển báo cho người tham gia giao thông đường bộ biết hiệu lệnh phải thi hành.",
      "Là biển báo cho người tham gia giao thông đường bộ biết hiệu lệnh có thể phải thi hành."
    ]
  },
  {
    "id": 37,
    "question": "Câu 37: Trong Luật TTATGTĐB, \"vạch kẻ đường\" được quy định như thế nào?",
    "options": [
      "Vạch kẻ đường là vạch chỉ sự phân biệt vị trí dừng đỗ trên đường.",
      "Vạch kẻ đường là vạch chỉ sự phân chia làn đường, vị trí hoặc hướng đi, vị trí dừng lại.",
      "Vạch kẻ đường là vạch dùng để phân chia dòng",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 38,
    "question": "Câu 38: Khi ở một vị trí vừa có biển báo hiệu đặt cố định vừa có biển báo hiệu tạm thời mà hai biển có ý nghĩa khác nhau, người tham gia giao thông đường bộ phải chấp hành hiệu lệnh của biển báo",
    "options": [
      "Biển báo hiệu cố định.",
      "Biển báo hiệu tạm thời."
    ]
  },
  {
    "id": 39,
    "question": "Câu 39: Tại nơi có vạch kẻ đường hoặc tại nơi mà người đi bộ, xe lăn của người khuyết tật đang qua đường, người điều khiển phương tiện tham gia giao thông phải thực hiện như thế nào?",
    "options": [
      "Giảm tốc độ và nhường đường cho người đi bộ, xe lăn của người khuyết tật qua đường đảm bảo an toàn.",
      "Quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn cho người đi bộ, xe lăn của người khuyết tật đang qua đường.",
      "Quan sát, tăng tốc độ và điều khiển phương tiện nhanh chóng đi qua."
    ]
  },
  {
    "id": 40,
    "question": "Câu 40: Trường hợp nào dưới đây người điều khiển phương tiện tham gia giao thông đường bộ phải quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn?",
    "options": [
      "Có biển báo cấm vượt.",
      "Có biển cấm dừng xe, đỗ xe.",
      "Có báo hiệu cảnh báo nguy hiểm hoặc có chướng ngại vật trên đường.",
      "Có biển báo cấm quay đầu xe."
    ]
  },
  {
    "id": 41,
    "question": "Câu 41: Trường hợp nào dưới đây người điều khiển phương tiện tham gia giao thông đường bộ phải quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn?",
    "options": [
      "Khu vực đang tổ chức kiểm soát giao thông đường bộ.",
      "Có vật nuôi đi trên đường hoặc chăn thả ở ven đường.",
      "Điểm dừng xe, đỗ xe trên đường bộ có khách đang lên, xuống xe.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 42,
    "question": "Câu 42: Khi qua khu vực đông dân cư, chợ, khu vực đang thi công trên đường bộ người điều khiển phương tiện tham gia giao thông đường bộ phải làm gì?",
    "options": [
      "Phải quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn.",
      "Phải quan sát, giảm tốc độ và dừng lại để bảo đảm an toàn."
    ]
  },
  {
    "id": 43,
    "question": "Câu 43: Luật TTATGTĐB quy định phương tiện tham gia giao thông đường bộ di chuyển với tốc độ thấp hơn phải đi về bên phải theo chiều đi của mình có đúng không?",
    "options": [
      "Đúng.",
      "Sai."
    ]
  },
  {
    "id": 44,
    "question": "Câu 44: Trên đường có nhiều làn đường cho xe đi cùng chiều được phân biệt bằng vạch kẻ phân làn đường, người điều khiển phương tiện tham gia giao thông đường bộ phải tuân theo quy tắc nào? 1. Phải cho xe đi trong một làn đường và chỉ được chuyển làn đường ở những nơi cho phép.",
    "options": [
      "Mỗi lần chuyển làn đường chỉ được phép chuyển sang một làn đường liền kề.",
      "Khi chuyển làn đường phải có tín hiệu báo trước; phải quan sát bảo đảm khoảng cách an toàn với xe phía trước, phía sau và hai bên mới được chuyển làn.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 45,
    "question": "Câu 45: Người điều khiển xe thô sơ, xe cơ giới và xe máy chuyên dùng phải đi như thế nào trên đường một chiều có vạch kẻ phân làn đường?",
    "options": [
      "Xe thô sơ phải đi trên làn đường bên phải trong cùng xe cơ giới, xe máy chuyên dùng đi trên làn đường bên trái",
      "Xe thô sơ phải đi trên làn đường bên trái trong cùng, xe cơ giới, xe máy chuyên dùng đi trên làn đường bên phải.",
      "Xe thô sơ đi trên làn đường phù hợp không gây cản trở giao thông, xe cơ giới, xe máy chuyên dùng đi trên làn đường bên phải."
    ]
  },
  {
    "id": 46,
    "question": "Câu 46: Luật TTATGTĐB quy định vượt bên phải xe khác trong trường hợp nào?",
    "options": [
      "Khi xe phía trước có tín hiệu rẽ trái hoặc đang rẽ trái.",
      "Khi xe chuyên dùng đang làm việc trên đường mà không thể vượt bên trái.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 47,
    "question": "Câu 47: Luật TTATGTĐB quy định chỉ được vượt xe khi nào?",
    "options": [
      "Không có chướng ngại vật ở phía trước, không có xe chạy ngược chiều trong đoạn đường định vượt.",
      "Xe chạy trước không có tín hiệu vượt xe khác, đã có tín hiệu rẽ phải và tránh về bên phải.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 48,
    "question": "Câu 48: Khi có xe xin vượt, người điều khiển phương tiện tham gia giao thông đường bộ phía trước phải làm gì?",
    "options": [
      "Quan sát phần đường phía trước, nếu đủ điều kiện an toàn thì phải giảm tốc độ, có tín hiệu rẽ phải và đi sát về bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua.",
      "Không được cản trở đối với xe xin vượt.",
      "Nếu không đủ điều kiện an toàn thì có tín hiệu rẽ trái.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 49,
    "question": "Câu 49: Khi có xe xin vượt, nếu thấy không đủ điều kiện an toàn thì người điều khiển phương tiện tham gia giao thông đường bộ phía trước có tín hiệu rẽ trái để báo hiệu cho người điều khiển phương tiện phía sau biết là chưa được vượt có đúng không?",
    "options": [
      "Đúng.",
      "Sai.",
      "Tùy trường hợp."
    ]
  },
  {
    "id": 50,
    "question": "Câu 50: Trường hợp nào dưới đây người lái xe không được vượt xe khác?",
    "options": [
      "Trên cầu hẹp có một làn đường; đường cong có tầm nhìn bị hạn chế.",
      "Khi gặp xe ưu tiên",
      "Khi điều kiện thời tiết hoặc đường không bảo đảm an toàn cho việc vượt.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 51,
    "question": "Câu 51: Người lái xe có được vượt xe khác ở phần đường dành cho người đi bộ qua đường không?",
    "options": [
      "Có được vượt.",
      "Không được vượt."
    ]
  },
  {
    "id": 52,
    "question": "Câu 52: Trước khi chuyển hướng, người lái xe phải làm gì?",
    "options": [
      "Quan sát, bảo đảm khoảng cách an toàn với xe phía sau, giảm tốc độ và có tín hiệu báo hướng rẽ, chuyển dần sang làn gần nhất với hướng rẽ.",
      "Tín hiệu báo hướng rẽ phải sử dụng liên tục trong quá trình chuyển hướng.",
      "Bảo đảm an toàn, không gây trở ngại cho người và phương tiện khác mới được chuyển hướng.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 53,
    "question": "Câu 53: Khi chuyển hướng, người lái xe phải làm gì?",
    "options": [
      "Phải giảm tốc độ và có tín hiệu báo hướng rẽ.",
      "Phải nhường quyền đi trước cho người đi bộ, người đi xe đạp đang đi trên phần đường dành riêng cho họ.",
      "Phải nhường đường cho người đi bộ, xe thô sơ, xe đi ngược chiều và chỉ chuyển hướng khi không gây trở ngại hoặc nguy hiểm cho người, phương tiện khác.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 54,
    "question": "Câu 54: Nơi nào cấm quay đầu xe?",
    "options": [
      "Ở phần đường dành cho người đi bộ qua đường.",
      "Trên cầu, đầu cầu, gầm cầu vượt, ngầm, trong hầm đường bộ, đường cao tốc, tại nơi đường bộ giao nhau cùng mức với đường sắt.",
      "Đường hẹp, đường dốc, đoạn đường cong tầm nhìn bị che khuất.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 55,
    "question": "Câu 55: Trên đường một chiều, đường hẹp người lái xe được phép quay đầu xe trong trường hợp nào?",
    "options": [
      "Có hiệu lệnh của người điều khiển giao thông.",
      "Chỉ dẫn của biển báo hiệu tạm thời.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 56,
    "question": "Câu 56: Khi xe đang đi trên cầu, gầm cầu vượt, ngầm, tại nơi đường bộ giao nhau cùng mức với đường sắt, người lái xe có được quay đầu xe không?",
    "options": [
      "Không được quay đầu xe.",
      "Lợi dụng chỗ rộng và có người làm tín hiệu sau xe để đảm bảo an toàn.",
      "Lợi dụng chỗ rộng có thể quay đầu xe an toàn."
    ]
  },
  {
    "id": 57,
    "question": "Câu 57: Luật TTATGTĐB quy định khi lùi xe, người lái xe phải làm gì?",
    "options": [
      "Phải quan sát hai bên và phía sau xe, có tín hiệu lùi và chỉ lùi xe khi bảo đảm an toàn.",
      "Phải quan sát phía sau xe và có tín hiệu lùi."
    ]
  },
  {
    "id": 58,
    "question": "Câu 58: Trường hợp nào dưới đây không được lùi xe?",
    "options": [
      "Đường một chiều, trên đường cao tốc.",
      "Trên phần đường dành cho người đi bộ qua đường.",
      "Nơi đường bộ giao nhau, nơi tầm nhìn bị che khuất, trong hầm đường bộ.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 59,
    "question": "Câu 59: Người điều khiển phương tiện tham gia giao thông đường bộ phải làm gì khi tránh xe đi ngược chiều trên đường không phân chia thành hai chiều xe chạy riêng biệt?",
    "options": [
      "Có tín hiệu rẽ phải và cho xe đi về bên phải theo chiều xe chạy của mình.",
      "Giảm tốc độ và cho xe đi về bên phải theo chiều xe chạy của mình.",
      "Giảm tốc độ."
    ]
  },
  {
    "id": 60,
    "question": "Câu 60: Người điều khiển phương tiện tham gia giao thông đường bộ phải nhường đường tránh xe đi ngược chiều như thế nào?",
    "options": [
      "Xe xuống dốc phải nhường đường cho xe lên dốc.",
      "Xe có chướng ngại vật phía trước phải nhường đường cho xe không có chướng ngại vật phía trước.",
      "Nơi đường hẹp chỉ đủ cho một xe chạy và có chỗ tránh xe thì xe nào ở gần chỗ tránh hơn phải vào vị trí tránh nhường đường cho xe đi ngược chiều.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 61,
    "question": "Câu 61: Trong Luật TTATGTĐB, \"dừng xe\" được quy định như thế nào?",
    "options": [
      "Dừng xe là trạng thái đứng yên của phương tiện giao thông để cho người lên, xuống phương tiện đó.",
      "Dừng xe là trạng thái đứng yên tạm thời của xe trong một khoảng thời gian cần thiết đủ để cho người lên xe, xuống xe, xếp dỡ hàng hóa, kiểm tra kỹ thuật xe hoặc hoạt động khác.",
      "Dừng xe là trạng thái đứng yên của phương tiện giao thông để xếp dỡ hàng hóa hoặc thực hiện công việc khác.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 62,
    "question": "Câu 62: Khi dừng xe, người điều khiển phương tiện tham gia giao thông đường bộ có được tắt máy và rời khỏi vị trí lái không?",
    "options": [
      "Được tắt máy và được rời khỏi vị trí lái khi thực hiện biện pháp an toàn.",
      "Không được tắt máy và không được rời khỏi vị trí lái.",
      "Không được tắt máy và không được rời khỏi vị trí lái; chỉ được rời khỏi vị trí lái để đóng, mở cửa xe, xếp dỡ hàng hóa, kiểm tra kỹ thuật xe nhưng phải sử dụng phanh đỗ xe hoặc thực hiện biện pháp an toàn khác."
    ]
  },
  {
    "id": 63,
    "question": "Câu 63: Trong Luật TTATGTĐB, \"đỗ xe\" được quy định như thế nào?",
    "options": [
      "Đỗ xe là trạng thái đứng yên của xe không giới hạn thời gian.",
      "Đỗ xe là trạng thái đứng yên của xe có giới hạn trong một khoảng thời gian cần thiết đủ để cho người lên, xuống phương tiện đó.",
      "Đỗ xe là trạng thái đứng yên của xe có giới hạn trong một khoảng thời gian cần thiết đủ để xếp dỡ hàng hóa hoặc thực hiện công việc khác.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 64,
    "question": "Câu 64: Khi đỗ xe, người điều khiển phương tiện tham gia giao thông đường bộ chỉ được rời khỏi xe khi nào?",
    "options": [
      "Đã sử dụng phanh tay.",
      "Đã sử dụng phanh đỗ xe hoặc thực hiện biện pháp an toàn khác. Xe đỗ trên đoạn đường dốc phải đánh lái về phía lề đường, chèn bánh.",
      "Tùy từng trường hợp có thể sử dụng phanh đỗ."
    ]
  },
  {
    "id": 65,
    "question": "Câu 65: Khi dừng xe, đỗ xe trên đường người điều khiển phương tiện phải thực hiện những quy định nào dưới đây?",
    "options": [
      "Có tín hiệu báo cho người điều khiển phương tiện tham gia giao thông đường bộ khác biết khi ra, vào vị trí dừng xe, đỗ xe.",
      "Không làm ảnh hưởng đến người đi bộ và các phương tiện tham gia giao thông đường bộ.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 66,
    "question": "Câu 66: Người điều khiển phương tiện có được dừng, đỗ xe bên trái đường một chiều không?",
    "options": [
      "Không được dừng xe, đỗ xe.",
      "Được dừng, đỗ xe tùy từng trường hợp cụ thể nhưng phải đảm bảo an toàn.",
      "Được dừng xe, không được đỗ xe."
    ]
  },
  {
    "id": 67,
    "question": "Câu 67: Các vị trí nào dưới đây, người điều khiển phương tiện tham gia giao thông không được dừng xe, đỗ xe?",
    "options": [
      "Song song cùng chiều với một xe khác đang dừng, đỗ trên đường.",
      "Che khuất biển báo hiệu đường bộ, đèn tín hiệu giao thông.",
      "Trước cổng và trong phạm vi 05 mét hai bên cổng trụ sở cơ quan, tổ chức có bố trí đường cho xe ra, vào.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 68,
    "question": "Câu 68: Trên đường bộ, người điều khiển phương tiện tham gia giao thông chỉ được dừng xe,đỗ xe ở những nơi nào?",
    "options": [
      "Nơi có lề đường rộng hoặc khu đất ở bên ngoài phần đường xe chạy.",
      "Trường hợp lề đường hẹp hoặc không có lề đường thì chỉ được dừng xe, đỗ xe sát mép đường phía bên phải theo chiều đi của mình.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 69,
    "question": "Câu 69: Trên đường phố, người điều khiển phương tiện giao thông đường bộ khi dừng xe, xe phải tuân theo quy tắc nào?",
    "options": [
      "Chỉ được dừng xe, đỗ xe sát theo lề đường, vỉa hè phía bên phải theo chiều đi của mình.",
      "Bánh xe gần nhất không được cách xa lề đường, vỉa hè quá 0,25 mét và không gây cản trở, nguy hiểm cho người và phương tiện tham gia giao thông đường bộ.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 70,
    "question": "Câu 70: Người điều khiển phương tiện tham gia giao thông đường bộ khi mở cửa xe phải tuân theo quy tắc nào?",
    "options": [
      "Chỉ được mở cửa xe khi xe đã dừng, đỗ.",
      "Trước khi mở cửa xe, người mở cửa phải quan sát phía trước, phía sau và bên phía mở cửa xe, khi thấy an toàn mới được mở cửa xe, ra khỏi xe.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 71,
    "question": "Câu 71: Người lái xe tham gia giao thông đường bộ phải bật đèn chiếu sáng phía trước khi nào?",
    "options": [
      "Khi có sương mù, khói, bụi, trời mưa, thời tiết xấu làm hạn chế tầm nhìn.",
      "Trong thời gian từ 18 giờ ngày hôm trước đến 06 giờ ngày hôm sau.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 72,
    "question": "Câu 72: Người lái xe tham gia giao thông đường bộ phải tắt đèn chiếu xa, bật đèn chiếu gần trong trường hợp nào dưới đây?",
    "options": [
      "Khi đi trên các đoạn đường qua khu đông dân cư có hệ thống chiếu sáng đang hoạt động.",
      "Khi gặp xe đi ngược chiều, trừ trường hợp dải phân cách có khả năng chống chói.",
      "Khi gặp người đi bộ qua đường; khi chuyển hướng xe tại nơi đường giao nhau.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 73,
    "question": "Câu 73: Trường hợp nào dưới đây người lái xe được phép sử dụng tín hiệu còi?",
    "options": [
      "Báo hiệu cho người tham gia giao thông đường bộ khi xuất hiện tình huống có thể mất an toàn giao thông.",
      "Báo hiệu chuẩn bị vượt xe.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 74,
    "question": "Câu 74: Hành vi nào dưới đây của người điều khiển phương tiện tham gia giao thông đường bộ bị cấm?",
    "options": [
      "Sử dụng còi liên tục.",
      "Sử dụng còi có âm lượng không đúng quy định.",
      "Sử dụng còi trong thời gian từ 22 giờ ngày hôm trước đến 05 giờ ngày hôm sau trong khu đông dân cư, khu vực cơ sở khám bệnh, chữa bệnh, trừ xe ưu tiên.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 75,
    "question": "Câu 75: Tại nơi đường giao nhau giữa đường không ưu tiên với đường ưu tiên hoặc giữa đường nhánh với đường chính, người lái xe đi từ đường không ưu tiên hoặc đường nhánh phải nhường đường như thế nào?",
    "options": [
      "Phải nhường đường cho xe đi đến từ bên phải.",
      "Phải nhường đường cho xe đi đến từ bên trái.",
      "Nhường đường cho xe đi trên đường ưu tiên hoặc đường chính từ bất kỳ hướng nào tới."
    ]
  },
  {
    "id": 76,
    "question": "Câu 76: Tại nơi đường giao nhau không có báo hiệu đi theo vòng xuyến, người điều khiển phương tiện tham gia giao thông đường bộ phải nhường đường như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Phải nhường đường cho xe đi đến từ bên phải.",
      "Phải nhường đường cho xe đi đến từ bên trái."
    ]
  },
  {
    "id": 77,
    "question": "Câu 77: Tại nơi đường giao nhau có báo hiệu đi theo vòng xuyến, người điều khiển phương tiện tham gia giao thông đường bộ phải nhường đường như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Phải nhường đường cho xe đi đến từ bên phải.",
      "Phải nhường đường cho xe đi đến từ bên trái."
    ]
  },
  {
    "id": 78,
    "question": "Câu 78: Thứ tự xuống phà như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe thô sơ, người đi bộ xuống phà trước, xe cơ giới, xe máy chuyên dùng xuống phà sau.",
      "Xe cơ giới, xe máy chuyên dùng xuống phà trước, xe thô sơ, người đi bộ xuống phà sau.",
      "Xe cơ giới, xe thô sơ xuống phà trước, xe máy chuyên dùng, người đi bộ xuống phà sau."
    ]
  },
  {
    "id": 79,
    "question": "Câu 79: Tại nơi đường bộ giao nhau cùng mức với đường sắt không có người gác, chắn đường bộ, chuông, đèn tín hiệu, người tham gia giao thông đường bộ phải thực hiện như thế nào?",
    "options": [
      "Phải dừng lại về bên phải đường của mình, trước vạch dừng xe và quan sát hai phía, khi không có phương tiện giao thông đường sắt tới mới được đi qua.",
      "Nếu thấy có phương tiện đường sắt đang đi tới thì phải dừng lại và giữ khoảng cách tối thiểu 5 mét tính từ ray gần nhất và chỉ khi phương tiện giao thông đường sắt đã đi qua mới được đi.",
      "Cả hai ý trên"
    ]
  },
  {
    "id": 80,
    "question": "Câu 80: Khi điều khiển xe vào đường cao tốc người lái xe phải tuân thủ quy tắc giao thông nào?",
    "options": [
      "Phải có tín hiệu xin vào và phải nhường đường cho xe đang chạy trên đường.",
      "Quan sát xe phía sau bảo đảm khoảng cách an toàn mới cho xe nhập vào làn đường sát bên phải.",
      "Nếu có làn đường tăng tốc thì phải cho xe chạy trên làn đường đó trước khi nhập vào làn đường của đường cao tóc.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 81,
    "question": "Câu 81: Khi điều khiển xe ra khỏi đường cao tốc người lái xe phải tuân thủ quy tắc giao thông nào?",
    "options": [
      "Phải thực hiện chuyển dần sang làn đường phía bên phải, nếu có làn đường giảm tốc thì phải cho xe chạy trên làn đường đó trước khi rời khỏi đường cao tốc.",
      "Phải quan sát biển báo hiệu chỉ dẫn, thực hiện chuyển dần sang làn đường sát bên phải, nếu có làn đường giảm tốc thì phải cho xe di chuyển trên làn đường đó trước khi ra khỏi đường cao tốc."
    ]
  },
  {
    "id": 82,
    "question": "Câu 82: Trên đường cao tốc người lái xe chỉ được 2 dừng, đỗ xe trong trường hợp nào?",
    "options": [
      "Chỉ được dừng xe, đỗ xe ở nơi quy định;",
      "Trường hợp gặp sự cố kỹ thuật hoặc bất khả kháng khác buộc phải dừng xe, đỗ xe thì được dừng xe,",
      "Trường hợp xe không thể di chuyển được vào làn dừng khẩn cấp, phải có báo hiệu bằng đèn khẩn cấp và đặt biển hoặc đèn cảnh báo về phía sau xe khoảng cách tối thiểu 150 mét, nhanh chóng báo cho cơ quan Cảnh sát giao thông thực hiện nhiệm vụ bảo đảm trật tự, an toàn giao thông trên tuyên hoặc cơ quan quản lý đường cao tốc",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 83,
    "question": "Câu 83: Người lái xe khi tham gia giao thông trong hầm đường bộ phải tuân thủ quy tắc nào dưới đây?",
    "options": [
      "Phải bật đèn chiếu gần.",
      "Không dừng xe, đỗ xe trong hầm đường bộ; trường hợp gặp sự cố kỹ thuật hoặc bất khả kháng khác buộc phải dừng xe, đỗ xe, người lái xe phải đưa xe vào vị trí dừng xe, đỗ xe khẩn cấp, nếu không di chuyển được, phải có báo hiệu bằng đèn khẩn cấp và đặt biển hoặc đèn cảnh báo về phía sau xe khoảng cách bảo đảm an toàn, nhanh chóng báo cho cơ quan Cảnh sát giao thông thực hiện nhiệm vụ bảo đảm trật tự, an toàn giao thông trên tuyến hoặc cơ quan quản lý hầm đường bộ.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 84,
    "question": "Câu 84: Khi gặp xe ưu tiên phát tín hiệu, người tham gia giao thông phải tuân theo quy tắc giao thông nào?",
    "options": [
      "Phải dừng lại nhường đường cho xe ưu tiên.",
      "Phải giảm tốc độ, đi sát lề đường bên phải hoặc dừng lại để nhường đường.",
      "Phải quan sát, đi sát lề đường bên phải."
    ]
  },
  {
    "id": 85,
    "question": "Câu 85: Trường hợp nào xe ô tô chở hàng được phép chở người?",
    "options": [
      "Chở người đi làm nhiệm vụ cứu nạn; chở người bị nạn đi cấp cứu.",
      "Chở người đi thực hành lái xe trên xe tập lái; chở người dự sát hạch lái xe trên xe sát hạch.",
      "Chở người thuộc lực lượng vũ trang nhân dân đi làm nhiệm vụ khẩn cấp.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 86,
    "question": "Câu 86: Khi kéo xe phải đảm bảo các quy định nào dưới đây?",
    "options": [
      "Xe được kéo phải có người điều khiển và hệ thống lái của xe đó phải còn hiệu lực.",
      "Xe kéo nối với xe được kéo phải bảo đảm chắc chắn, an toàn; trường hợp hệ thống hãm của xe được kéo không còn hiệu lực thì xe kéo nhau phải nối bằng thanh nối cứng.",
      "Phía trước của xe kéo và phía sau của xe được kéo phải có biển báo hiệu, có đèn cảnh báo nhấp nháy màu vàng.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 87,
    "question": "Câu 87: Tại nơi đường bộ giao nhau cùng mức với đường sắt, quyền ưu tiên thuộc về phương tiện nào?",
    "options": [
      "Xe nào bên phải không bị vướng thì được quyền đi trước.",
      "Xe nào ra tín hiệu xin đường trước thì xe được đi trước.",
      "Quyền ưu tiên thuộc về các phương tiện đường sắt."
    ]
  },
  {
    "id": 88,
    "question": "Câu 88: Xe ô tô chở người từ 08 chỗ trở lên (không kể chỗ của người lái xe) kinh doanh vận tải, xe ô tô đầu kéo, xe cứu thương phải lắp thiết bị giám sát hành trình và thiết bị ghi nhận hình ảnh người lái xe?",
    "options": [
      "Không bắt buộc.",
      "Bắt buộc.",
      "Tùy trường hợp cụ thể"
    ]
  },
  {
    "id": 89,
    "question": "Câu 89: Trách nhiệm của cá nhân đứng tên trong giấy chứng nhận đăng ký xe như thế nào khi chưa thực hiện thu hồi chứng nhận đăng ký xe, biển số xe khi đã chuyển nhượng, trao đổi, tặng, cho xe?",
    "options": [
      "Tiếp tục chịu trách nhiệm của chủ xe.",
      "Không chịu trách nhiệm."
    ]
  },
  {
    "id": 90,
    "question": "Câu 90: Cá nhân vi phạm pháp luật về trật tự, an toàn giao thông đường bộ mà chưa thực hiện xong yêu cầu của cơ quan nhà nước có thẩm quyền về giải quyết vụ việc vi phạm hành chính có được giải quyết việc đăng ký, đăng kiểm phương tiện vi phạm không?",
    "options": [
      "Chưa được giải quyết.",
      "Được giải quyết.",
      "Tùy trường hợp."
    ]
  },
  {
    "id": 91,
    "question": "Câu 91: Việc vận chuyển hành khách bằng xe ô tô phải tuân thủ quy định nào dưới đây?",
    "options": [
      "Đón, trả hành khách đúng nơi quy định; vận chuyển hành khách đúng lịch trình, lộ trình đã đăng ký.",
      "Không chở quá số người quy định; không chở hàng hóa trong khoang chở hành khách.",
      "Không chở hàng hóa nguy hiểm, hàng lậu.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 92,
    "question": "Câu 92: Luật TTATGTĐB quy định xe ô tô kinh doanh vận tải chở trẻ em mầm non, học sinh phải có thiết bị ghi nhận hình ảnh trẻ em, mầm non, học sinh và thiết bị có chức năng cảnh báo, chống bỏ quên trẻ em trên xe có đúng không?",
    "options": [
      "Đúng.",
      "Sai."
    ]
  },
  {
    "id": 93,
    "question": "Câu 93: Khi vận chuyển hàng rời, vật liệu xây dựng bằng xe ô tô, chiều cao tối đa của hàng hóa so với thành thùng xe được quy định như thế nào?",
    "options": [
      "Phải thấp hơn mép trên thành thùng xe tối thiểu 05 cm.",
      "Phải thấp hơn mép trên thành thùng xe tối thiểu 10 cm.",
      "Phải thấp hơn mép trên thành thùng xe tối thiểu 15 cm.",
      "Phải thấp hơn mép trên thành thùng xe tối thiểu 20 cm."
    ]
  },
  {
    "id": 94,
    "question": "Câu 94: Xe ô tô vận chuyển hàng hoá nguy hiểm phải đảm bảo điều kiện nào dưới đây?",
    "options": [
      "Phải có giấy phép vận chuyển.",
      "Phải dán biểu trưng nhận diện hàng hóa",
      "Phải lắp đèn, tín hiệu cảnh báo.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 95,
    "question": "Câu 95: Xe cơ giới dưới đây, xe nào là xe quá khổ giới hạn?",
    "options": [
      "Xe có kích thước bao ngoài vượt quá kích thước giới hạn cho phép của xe theo quy chuẩn kỹ thuật quốc gia về xe cơ giới.",
      "Xe có kích thước bao ngoài quá khổ giới hạn của đường bộ.",
      "Xe khi chở hàng hóa có kích thước bao ngoài của xe và hàng hóa vượt quá kích thước giới hạn cho phép xếp hàng hóa của xe hoặc quá khổ giới hạn của đường bộ.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 96,
    "question": "Câu 96: Xe cơ giới dưới đây, xe nào là xe quá tải trọng?",
    "options": [
      "Xe có khối lượng toàn bộ vượt quá khối lượng cho phép của xe hoặc vượt quá tải trọng của đường bộ.",
      "Xe có khối lượng toàn bộ phân bổ lên trục xe, cụm trục xe vượt quá tải trọng của trục xe, cụm trục xe hoặc vượt |quá tải trọng của đường bộ.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 97,
    "question": "Câu 97: Hàng siêu trường, siêu trọng là hàng không thể chia nhỏ, tháo rời, khi vận chuyển trên đường bộ làm cho phương tiện hoặc tổ hợp phương tiện bị vượt quá giới hạn cho phép tham gia giao thông đường bộ về kích thước, khối lượng theo quy định của pháp luật, đúng hay sai?",
    "options": [
      "Đúng.",
      "Sai."
    ]
  },
  {
    "id": 98,
    "question": "Câu 98: Người lái xe khi tham gia giao thông đường bộ phải mang theo các loại giấy tờ gì?",
    "options": [
      "Chứng nhận đăng ký xe hoặc bản sao Chứng nhận đăng ký xe có chứng thực kèm bản gốc giấy tờ xác nhận của tổ chức tín dụng, chi nhánh ngân hàng nước ngoài còn hiệu lực trong trường hợp xe đang được thế chấp tại tổ chức tín dụng, chi nhánh ngân hàng nước ngoài.",
      "Giấy phép lái xe phù hợp với loại xe đang điều khiển; chứng nhận bảo hiểm bắt buộc trách nhiệm dân sự của chủ xe cơ giới.",
      "Chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường đối với xe cơ giới theo quy định của pháp luật.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 99,
    "question": "Câu 99: Người tập lái xe ô tô khi tham gia giao thông đường bộ phải đáp ứng điều kiện nào dưới đây?",
    "options": [
      "Phải thực hành trên xe tập lái, trên tuyến đường tập lái và có giáo viên dạy lái bảo trợ tay lái.",
      "Phải thực hành trên xe tập lái và có giáo viên dạy lái.",
      "Phải thực hành trên xe tập lái, trên tuyến đường tập lái và có người bảo trợ tay lái."
    ]
  },
  {
    "id": 100,
    "question": "Câu 100: Người có giấy phép lái xe hạng B được điều khiển loại xe nào dưới đây?",
    "options": [
      "Xe ô tô chở người đến 08 chỗ (không kể chỗ của người lái xe).",
      "Xe ô tô tải có khối lượng toàn bộ theo thiết kế đến 3.500 kg.",
      "Các loại xe ô tô quy định cho giấy phép lái xe hạng B có kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 101,
    "question": "Câu 101: Người có giấy phép lái xe hạng C1 được điều khiển loại xe nào dưới đây?",
    "options": [
      "Xe ô tô tải có khối lượng toàn bộ theo thiết kế trên 3.500kg đến 7.500 kg; các loại xe quy định cho giấy phép lái xe hạng B.",
      "Xe ô tô tải có khối lượng toàn bộ theo thiết kế trên 7.500 kg."
    ]
  },
  {
    "id": 102,
    "question": "Câu 102: Người có giấy phép lái xe hạng D2 được điều khiển loại xe nào dưới đây?",
    "options": [
      "Xe ô tô chở người trên 16 chỗ đến 29 chỗ (không kể chỗ của người lái xe); các loại xe quy định cho giấy phép lái xe các hạng B, C1, C, D1.",
      "Xe ô tô chở người (kể cả xe buýt) trên 29 chỗ (không kể chỗ của người lái xe); xe ô tô chở người giường nằm."
    ]
  },
  {
    "id": 103,
    "question": "Câu 103: Người có giấy phép lái xe hạng C1E được điều khiển loại xe nào dưới đây?",
    "options": [
      "Xe ô tô quy định cho giấy phép lái xe hạng C kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg; xe ô tô đầu kéo kéo sơ mi rơ moóc.",
      "Xe ô tô quy định cho giấy phép lái xe hạng C1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg."
    ]
  },
  {
    "id": 104,
    "question": "Câu 104: Người có giấy phép lái xe hạng DE được điều khiển loại xe nào?",
    "options": [
      "Xe ô tô quy định cho giấy phép lái xe hạng D kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg;",
      "Xe ô tô chở khách nối toa.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 105,
    "question": "Câu 105: Giấy phép lái xe không còn hiệu lực trong trường hợp nào?",
    "options": [
      "Giấy phép lái xe hết thời hạn sử dụng; giấy phép lái xe bị thu hồi theo quy định.",
      "Giấy phép lái xe bị trừ điểm.",
      "Giấy phép lái xe bị trừ điểm hết điểm và chưa phục hồi điểm giấy phép lái xe.",
      "Ý 1 và ý 3."
    ]
  },
  {
    "id": 106,
    "question": "Câu 106: Người có giấy phép lái xe bị trừ hết điểm có được phép điều khiển phương tiện tham gia giao thông đường bộ không?",
    "options": [
      "Không được phép.",
      "Được phép.",
      "Tùy trường hợp."
    ]
  },
  {
    "id": 107,
    "question": "Câu 107: Người có giấy phép lái xe đã bị trừ hết điểm phải làm gì để phục hồi điểm giấy phép lái xe?",
    "options": [
      "Trong thời gian 12 tháng kể từ ngày bị trừ hết điểm không vi phạm pháp luật TTATGTĐB được phục hồi đủ 12 điểm.",
      "Sau thời hạn ít nhất là 06 tháng kể từ ngày bị trừ hết điểm, người có giấy phép lái xe được tham gia kiểm tra nội dung kiến thức pháp luật về trật tự, an toàn giao thông đường bộ và có kết quả đạt yêu cầu thì được phục hồi đủ 12 điểm.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 108,
    "question": "Câu 108: Theo Luật TTATGTĐB, người đủ bao nhiêu tuổi trở lên được cấp giấy phép lái xe hạng A1, A, B1, B, C1?",
    "options": [
      "16 tuổi.",
      "18 tuổi.",
      "20 tuổi."
    ]
  },
  {
    "id": 109,
    "question": "Câu 109: Theo quy định của Bộ Công an, người đủ bao nhiêu tuổi trở lên được cấp giấy phép lái xe hạng C?",
    "options": [
      "18 tuổi.",
      "20 tuổi.",
      "21 tuổi."
    ]
  },
  {
    "id": 110,
    "question": "Câu 110: Theo Luật TTATGTĐB, người đủ bao nhiêu tuổi trở lên được cấp giấy phép lái xe hạng D, D1E, D2E, DE?",
    "options": [
      "24 tuổi.",
      "27 tuổi.",
      "21 tuổi."
    ]
  },
  {
    "id": 111,
    "question": "Câu 111: Người vi phạm trật tự, an toàn giao thông đường bộ chưa thực hiện xong yêu cầu của cơ quan nhà nước có thẩm quyền về giải quyết vụ việc vi phạm hành chính trong lĩnh vực trật tự, an toàn giao thông đường bộ có được cấp, đổi, cấp lại giấy phép lái xe không?",
    "options": [
      "Chưa được cấp, đổi, cấp lại giấy phép lái xe.",
      "Có được cấp, đổi, cấp lại giấy phép lái xe.",
      "Tùy từng trường hợp."
    ]
  },
  {
    "id": 112,
    "question": "Câu 112: Luật TTATGTĐB quy định trường hợp nào dưới đây bị thu hồi giấy phép lái xe?",
    "options": [
      "Người được cấp giấy phép lái xe không đủ điều kiện sức khỏe theo kết luận của cơ sở khám bệnh, chữa bệnh đối với từng hạng giấy phép lái xe.",
      "Giấy phép lái xe được cấp sai quy định.",
      "Giấy phép lái xe đã quá thời hạn tạm giữ hoặc hết thời hiệu thi hành quyết định xử phạt vi phạm hành chính nếu người vi phạm không đến nhận mà không có lý do chính đáng.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 113,
    "question": "Câu 113: Luật TTATGTĐB quy định thời gian làm việc của người lái xe ô tô kinh doanh vận tải như thế nào?",
    "options": [
      "Không quá 10 giờ trong một ngày và không quá 48 giờ trong một tuần; lái xe liên tục không quá 04 giờ.",
      "Không quá 08 giờ trong một ngày và không quá 40 giờ trong một tuần; lái xe liên tục không quá 04 giờ.",
      "Không quá 10 giờ trong một ngày và không quá 40 giờ trong một tuần; lái xe liên tục không quá 06 giờ."
    ]
  },
  {
    "id": 114,
    "question": "Câu 114: Luật TTATGTĐB quy định người lái xe gây tai nạn giao thông đường bộ được rời khỏi hiện trường tai nạn trong trường hợp nào?",
    "options": [
      "Đi cấp cứu, đưa người bị nạn đi cấp cứu.",
      "Xét thấy bị đe dọa đến tính mạng, sức khỏe nhưng phải trình báo ngay cơ quan Công an, Ủy ban nhân dân nơi gần nhất.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 115,
    "question": "Câu 115: Người lái xe khi đi qua nơi xảy ra vụ tai nạn giao thông đường bộ có trách nhiệm chở người bị thương đi cấp cứu (không bắt buộc đối với xe ưu tiên, xe chở người được hưởng quyền ưu đãi, miễn trừ ngoại giao), đúng hay sai?",
    "options": [
      "Đúng.",
      "Sai."
    ]
  },
  {
    "id": 116,
    "question": "Câu 116: Trong khu vực đông dân cư, tốc độ tối đa cho phép đối với xe ô tô tham gia giao thông trên đường đôi; đường một chiều có từ hai làn xe cơ giới trở lên là bao nhiêu?",
    "options": [
      "30 km/h.",
      "40 km/h.",
      "50 km/h.",
      "60 km/h."
    ]
  },
  {
    "id": 117,
    "question": "Câu 117: Trong khu vực đông dân cư, tốc độ tối đa cho phép đối với xe ô tô tham gia giao thông trên đường hai chiều; đường một chiều có một làn xe cơ giới là bao nhiêu?",
    "options": [
      "30 km/h.",
      "40 km/h.",
      "50 km/h.",
      "60 km/h."
    ]
  },
  {
    "id": 118,
    "question": "Câu 118: Ngoài khu vực đông dân cư (trừ đường cao tốc), loại xe cơ giới nào tham gia giao thông trên đường đôi; đường một chiều có từ hai làn xe cơ giới trở lên được phép chạy với tốc độ tối đa là 90 km/h?",
    "options": [
      "Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.",
      "Ô tô chở người trên 28 chỗ (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).",
      "Ô tô buýt; ô tô đầu kéo sơ mi rơ moóc; xe môtô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông).",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông, ô tô xi téc."
    ]
  },
  {
    "id": 119,
    "question": "Câu 119: Ngoài khu vực đông dân cư (trừ đường cao tốc), loại xe cơ giới nào tham gia giao thông trên đường hai chiều; đường một chiều có một làn xe cơ giới được phép chạy với tốc độ tối đa là 80 km/h?",
    "options": [
      "Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.",
      "Ô tô chở người trên 28 chỗ (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).",
      "Ô tô buýt; ô tô đầu kéo sơ mi rơ moóc; xe môtô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông).",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông, ô tô xi téc"
    ]
  },
  {
    "id": 120,
    "question": "Câu 120: Ngoài khu vực đông dân cư (trừ đường cao tốc), loại xe cơ giới nào tham gia giao thông trên đường đôi; đường một chiều có từ hai làn xe cơ giới trở lên được phép chạy với tốc độ tối đa là 80 km/h?",
    "options": [
      "Xe ô tô con, xe ô tô chở người đến 28 chỗ (trừ xe buýt); ô tô tải có trọng tải nhỏ hơn hoặc bằng 3,5 tấn.",
      "Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).",
      "Ô tố buýt; ô tô đầu kéo sơ mi rơ moóc; xe môtô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông).",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông, ô tô xi téc."
    ]
  },
  {
    "id": 121,
    "question": "Câu 121: Ngoài khu vực đông dân cư (trừ đường cao tốc), loại xe cơ giới nào tham gia giao thông trên đường hai chiều; đường một chiều có một làn xe cơ giới được phép chạy với tốc độ tối đa là 70 km/h?",
    "options": [
      "Xe ô tô con, xe ô tô chở người đến 28 chỗ (trừ xe buýt); ô tô tải có trọng tải nhỏ hơn hoặc bằng 3,5 tấn.",
      "Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).",
      "Ô tô buýt; ô tô đầu kéo sơ mi rơ moóc; xe môtô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông).",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông, ô tô xi téc."
    ]
  },
  {
    "id": 122,
    "question": "Câu 122: Ngoài khu vực đông dân cư (trừ đường cao tốc), loại xe cơ giới nào tham gia giao thông trên đường đôi; đường một chiều có từ hai làn xe cơ giới trở lên được phép chạy với tốc độ tối đa là 70 km/h?",
    "options": [
      "Xe ô tô con, xe ô tô chở người đến 28 chỗ (trừ xe buýt); ô tô tải có trọng tải nhỏ hơn hoặc bằng 3,5 tấn.",
      "Ô tô chở người trên 28 chỗ (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).",
      "Xe buýt; ô tổ đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông, ô tô xi téc."
    ]
  },
  {
    "id": 123,
    "question": "Câu 123: Ngoài khu vực đông dân cư (trừ đường cao tốc), loại xe cơ giới nào tham gia giao thông trên đường hai chiều; đường một chiều có một làn xe cơ giới được phép chạy với tốc độ tối đa là 60 km/h?",
    "options": [
      "Xe ô tô con, xe ô tô chở người đến 28 chỗ (trừ xe buýt); ô tô tải có trọng tải nhỏ hơn hoặc bằng 3,5 tấn.",
      "Ô tô chở người trên 28 chỗ (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).",
      "Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông, ô tô xi téc."
    ]
  },
  {
    "id": 124,
    "question": "Câu 124: Ngoài khu vực đông dân cư (trừ đường cao tốc), loại xe cơ giới nào tham gia giao thông trên đường đôi; đường một chiều có từ hai làn xe cơ giới trở lên được phép chạy với tốc độ tối đa là 60 km/h?",
    "options": [
      "Xe ô tô con, xe ô tô chở người đến 28 chỗ (trừ xe buýt); ô tô tải có trọng tải nhỏ hơn hoặc bằng 3,5 tấn.",
      "Ô tô chở người trên 28 chỗ (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).",
      "Ô tô buýt; ô tô đầu kéo sơ mi rơ moóc; xe môtô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông).",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc)."
    ]
  },
  {
    "id": 125,
    "question": "Câu 125: Ngoài khu vực đông dân cư (trừ đường cao tốc), loại xe cơ giới nào tham gia giao thông trên đường hai chiều; đường một chiều có một làn xe cơ giới được phép chạy với tốc độ tối đa là 50 km/h?",
    "options": [
      "Xe ô tô con, xe ô tô chở người đến 28 chỗ (trừ xe buýt); ô tô | tải có trọng tải nhỏ hơn hoặc bằng 3,5 tấn.",
      "Ô tô chở người trên 28 chỗ (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).",
      "Ô tô buýt; ô tô đầu kéo sơ mi rơ moóc; xe môtô; ô tô chuyên | dùng (trừ ô tô trộn vữa, ô tô trộn bê tông).",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc)."
    ]
  },
  {
    "id": 126,
    "question": "Câu 126: Khi tham gia giao thông trên đường bộ, mặt đường khô ráo, không có sương mù, mặt đường không trơn trượt, địa hình bằng phẳng, đường thẳng, tầm nhìn bảo đảm người điều khiển xe cơ giới chạy với tốc độ 60 km/h phải giữ khoảng cách an toàn tối thiểu đối với xe chạy liền trước xe của mình là bao nhiêu?",
    "options": [
      "35 m.",
      "40 m.",
      "50 m.",
      "55 m."
    ]
  },
  {
    "id": 127,
    "question": "Câu 127: Khi tham gia giao thông trên đường bộ, mặt đường khô ráo, không có sương mù, mặt đường không trơn trượt, địa hình bằng phẳng, đường thẳng, tầm nhìn bảo đảm người điều khiển xe cơ giới chạy với tốc độ trên 60 km/h đến 80 km/h phải giữ khoảng cách an toàn tối thiểu đối với xe chạy liền trước xe của mình là bao nhiêu?",
    "options": [
      "50 m.",
      "55 m.",
      "65 m.",
      "70 m."
    ]
  },
  {
    "id": 128,
    "question": "Câu 128: Khi tham gia giao thông trên đường bộ, mặt đường khô ráo, không có sương mù, mặt đường không trơn trượt, địa hình bằng phẳng, đường thẳng, tầm nhìn bảo đảm người điều khiển xe cơ giới chạy với tốc độ trên 80 km/h đến 100 km/h phải giữ khoảng cách an toàn tối thiểu đối với xe chạy liền trước xe của mình là bao nhiêu?",
    "options": [
      "50 m.",
      "55 m.",
      "65 m.",
      "70 m."
    ]
  },
  {
    "id": 129,
    "question": "Câu 129: Khi tham gia giao thông trên đường bộ, mặt đường khô ráo, không có sương mù, mặt đường không trơn trượt, địa hình bằng phẳng, đường thẳng, tầm nhìn bảo đảm người điều khiển xe cơ giới chạy với tốc độ trên 100 km/h đến 120 km/h phải giữ khoảng cách an toàn tối thiểu đối với xe chạy liền trước xe của mình là bao nhiêu?",
    "options": [
      "100 m.",
      "95 m.",
      "90 m.",
      "80 m."
    ]
  },
  {
    "id": 130,
    "question": "Câu 130: Niên hạn sử dụng của xe ô tô chở người trên 9 chỗ ngồi, trừ xe ô tô của quân đội, công an phục vụ mục đích quốc phòng, an ninh (tính từ năm sản xuất) là bao nhiêu năm?",
    "options": [
      "15 năm.",
      "20 năm.",
      "21 năm.",
      "25 năm."
    ]
  },
  {
    "id": 131,
    "question": "Câu 131: Biển nào báo hiệu đường dành cho xe thô sơ",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q131.webp"
  },
  {
    "id": 132,
    "question": "Câu 132: Gặp biển này, các loại xe (cơ giới và thô sơ) kể cả xe ưu tiên theo quy định, có độ dài toàn bộ kể cả xe và hàng lớn hơn trị số ghi trên biển có được phép đi vào không?",
    "options": [
      "Không được phép.",
      "Được phép."
    ],
    "img": "images/q132.webp"
  },
  {
    "id": 133,
    "question": "Câu 133: Gặp biển này, các loại xe cơ giới kéo theo rơ moóc kể cả ô tô sơ mi rơ moóc và các loại xe được ưu tiên kéo theo moóc theo quy định, có độ dài toàn bộ kể cả xe, moóc và hàng lớn hơn trị số ghi trên biển có được phép đi vào không?",
    "options": [
      "Được phép.",
      "Không được phép."
    ],
    "img": "images/q133.webp"
  },
  {
    "id": 134,
    "question": "Câu 134: Biển nào cấm máy kéo?",
    "options": [
      "Biển 1.",
      "Biển 1 và 2.",
      "Biển 2.",
      "Biển 2 và 3."
    ],
    "img": "images/q134.webp"
  },
  {
    "id": 135,
    "question": "Câu 135: Biển nào không có hiệu lực đối với ô tô tải không kéo rơ moóc?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Cả ba biển."
    ],
    "img": "images/q135.webp"
  },
  {
    "id": 136,
    "question": "Câu 136: Biển nào cấm máy kéo kéo theo rơ moóc?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Cả hai biển."
    ],
    "img": "images/q136.webp"
  },
  {
    "id": 137,
    "question": "Câu 137: Khi gặp các biển này xe ưu tiên theo quy định (có tải trọng hay chiều cao toàn bộ vượt quá chỉ số ghi trên biển) có được phép đi qua hay không?",
    "options": [
      "Được phép.",
      "Không được phép."
    ],
    "img": "images/q137.webp"
  },
  {
    "id": 138,
    "question": "Câu 138: Biển nào báo cấm tất cả các loại phương tiện đi lại cả hai hướng trừ các xe được ưu tiên theo luật định (nếu đường vẫn cho xe chạy được)?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Cả hai biển."
    ],
    "img": "images/q138.webp"
  },
  {
    "id": 139,
    "question": "Câu 139: Biển nào báo hiệu khoảng cách thực tế từ nơi đặt biển đến nơi cần giữ cự ly tối thiểu giữa hai xe?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Cả hai biển."
    ],
    "img": "images/q139.webp"
  },
  {
    "id": 140,
    "question": "Câu 140: Biển nào cấm đi ngược chiều?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Cả ba biển."
    ],
    "img": "images/q140.webp"
  },
  {
    "id": 141,
    "question": "Câu 141: Biển nào xe được phép quay đầu?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3.",
      "Biển 1 và 2."
    ],
    "img": "images/q141.webp"
  },
  {
    "id": 142,
    "question": "Câu 142: Biển nào cấm quay đầu xe?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Cả hai biển."
    ],
    "img": "images/q142.webp"
  },
  {
    "id": 143,
    "question": "Câu 143: Biển nào cấm các loại xe cơ giới vượt nhau (kể cả xe được ưu tiên theo quy định) nhưng được phép vượt xe mô tô, xe gắn máy?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q143.webp"
  },
  {
    "id": 144,
    "question": "Câu 144: Biển nào cấm xe ô tô tải vượt?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3.",
      "Biển 2 và 3."
    ],
    "img": "images/q144.webp"
  },
  {
    "id": 145,
    "question": "Câu 145: Ba biển này có ý nghĩa như thế nào?",
    "options": [
      "Cấm các loại xe ở biển phụ đi vào.",
      "Cấm các loại xe cơ giới đi vào trừ loại xe ở biển phụ."
    ],
    "img": "images/q145.webp"
  },
  {
    "id": 146,
    "question": "Câu 146: Biển nào xe mô tô hai bánh được đi vào?",
    "options": [
      "Biển 1 và 2.",
      "Biển 1 và 3.",
      "Biển 2 và 3."
    ],
    "img": "images/q146.webp"
  },
  {
    "id": 147,
    "question": "Câu 147: Khi gặp biển nào thì xe mô tô hai bánh được đi vào?",
    "options": [
      "Không biển nào.",
      "Biển 2.",
      "Biển 2 và 3."
    ],
    "img": "images/q147.webp"
  },
  {
    "id": 148,
    "question": "Câu 148: Biển nào báo hiệu cấm xe mô tô ba bánh",
    "options": [
      "Biển 1.",
      "Biển 1 và 2.",
      "Biển 2 và 3."
    ],
    "img": "images/q148.webp"
  },
  {
    "id": 149,
    "question": "Câu 149: Biển nào báo hiệu phải nhường đường cho xe cơ giới đi ngược chiều qua đường hẹp?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q149.webp"
  },
  {
    "id": 150,
    "question": "Câu 150: Biển nào cấm xe ô tô tải?",
    "options": [
      "Cả ba biển.",
      "Biển 2.",
      "Biển 1 và 3.",
      "Biển 1 và 2."
    ],
    "img": "images/q150.webp"
  },
  {
    "id": 151,
    "question": "Câu 151: Biển nào cấm mọi loại xe cơ giới đi vào, trừ xe gắn máy, xe mô tô hai bánh và các loại xe ưu tiên theo luật định?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 1 và 3.",
      "Cả ba biển."
    ],
    "img": "images/q151.webp"
  },
  {
    "id": 152,
    "question": "Câu 152: Biển nào cấm người đi bộ?",
    "options": [
      "Biển 1.",
      "Biển 1 và 3.",
      "Biển 2.",
      "Biển 2 và 3."
    ],
    "img": "images/q152.webp"
  },
  {
    "id": 153,
    "question": "Câu 153: Biển nào báo đường cấm các xe chở hàng nguy hiểm?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3.",
      "Biển 1 và 3."
    ],
    "img": "images/q153.webp"
  },
  {
    "id": 154,
    "question": "Câu 154: Trong các biển dưới đây, biển nào báo đường cấm xe ba bánh loại có động cơ?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3.",
      "Biển 2 và 3."
    ],
    "img": "images/q154.webp"
  },
  {
    "id": 155,
    "question": "Câu 155: Biển nào cấm xe ô tô rẽ trái nhưng được phép quay đầu?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Không biển nào."
    ],
    "img": "images/q155.webp"
  },
  {
    "id": 156,
    "question": "Câu 156: Biển nào báo hiệu hết tất cả các lệnh cấm?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3.",
      "Cả ba biển."
    ],
    "img": "images/q156.webp"
  },
  {
    "id": 157,
    "question": "Câu 157: Biển nào báo hiệu hết hạn chế tốc độ tối thiểu?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3.",
      "Cả ba biển."
    ],
    "img": "images/q157.webp"
  },
  {
    "id": 158,
    "question": "Câu 158: Biển này có ý nghĩa gì?",
    "options": [
      "Biển ghép tốc độ tối đa cho phép trên từng làn đường.",
      "Biển ghép tốc độ tối đa cho phép theo phương tiện, trên từng làn đường.",
      "Biển làn đường dành riêng cho từng loại xe."
    ],
    "img": "images/q158.webp"
  },
  {
    "id": 159,
    "question": "Câu 159: Biển nào báo hiệu hết hạn chế tốc độ tối đa cho phép theo biển ghép?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Cả 2 biển."
    ],
    "img": "images/q159.webp"
  },
  {
    "id": 160,
    "question": "Câu 160: Gặp biển nào người lái xe không được đỗ xe ngày lẻ?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 1 và 2.",
      "Biển 3."
    ],
    "img": "images/q160.webp"
  },
  {
    "id": 161,
    "question": "Câu 161: Biển nào báo cấm xe công nông và các loại xe tương tự?",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q161.webp"
  },
  {
    "id": 162,
    "question": "Câu 162: Gặp biển nào xe ô tô được phép rẽ trái nhưng không được phép quay đầu?",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q162.webp"
  },
  {
    "id": 163,
    "question": "Câu 163: Khi gặp biển này, người lái xe ô tô chở khách và các loại xe ô tô tải trừ xe ưu tiên theo quy định có được phép đi qua không?",
    "options": [
      "Được phép.",
      "Không được phép."
    ],
    "img": "images/q163.webp"
  },
  {
    "id": 164,
    "question": "Câu 164: Biển này có ý nghĩa gì?",
    "options": [
      "Biển ghép tốc độ tối đa cho phép trên từng làn đường.",
      "Biển ghép tốc độ tối đa cho phép theo phương tiện, trên từng làn đường.",
      "Biển hết hạn chế tốc độ tối đa cho phép theo biển ghép."
    ],
    "img": "images/q164.webp"
  },
  {
    "id": 165,
    "question": "Câu 165: Khi gặp biển này, các loại phương tiện vận tải có phải dừng lại để làm thủ tục kiểm tra, kiểm soát theo quy định không?",
    "options": [
      "Không phải dừng.",
      "Phải dừng."
    ],
    "img": "images/q165.webp"
  },
  {
    "id": 166,
    "question": "Câu 166: Khi gặp biển nào người lái xe ô tô không được phép rẽ trái và quay đầu?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Cả hai biển."
    ],
    "img": "images/q166.webp"
  },
  {
    "id": 167,
    "question": "Câu 167: Trong khoảng thời gian ghi trên biển, người điều khiển phương tiện tham gia giao thông (trừ một số trường hợp ưu tiên được quy định) có được vượt quá giá trị tốc độ ghi trên biển không?",
    "options": [
      "Có.",
      "Không."
    ],
    "img": "images/q167.webp"
  },
  {
    "id": 168,
    "question": "Câu 168: Biển nào cấm máy kéo?",
    "options": [
      "Biển 3.",
      "Biển 1 và 3.",
      "Cả ba biển."
    ],
    "img": "images/q168.webp"
  },
  {
    "id": 169,
    "question": "Câu 169: Biển nào báo hiệu chú ý chướng ngại vật?",
    "options": [
      "Biển 1.",
      "Biển 2 và 3.",
      "Cả 3 biển."
    ],
    "img": "images/q169.webp"
  },
  {
    "id": 170,
    "question": "Câu 170: Biển nào báo hiệu đoạn đường hay xảy ra tai nạn?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 2 và 3."
    ],
    "img": "images/q170.webp"
  },
  {
    "id": 171,
    "question": "Câu 171: Biển nào báo hiệu giao nhau với đường hai chiều?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Bien 3."
    ],
    "img": "images/q171.webp"
  },
  {
    "id": 172,
    "question": "Câu 172: Biển nào báo hiệu đường hầm?",
    "options": [
      "Cả ba biển.",
      "Biển 2 và 3.",
      "Biển 2."
    ],
    "img": "images/q172.webp"
  },
  {
    "id": 173,
    "question": "Câu 173: Biển nào báo hiệu đường đôi?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q173.webp"
  },
  {
    "id": 174,
    "question": "Câu 174: Biển nào báo hiệu đường hai chiều?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q174.webp"
  },
  {
    "id": 175,
    "question": "Câu 175: Biển nào báo hiệu giao nhau với đường không ưu tiên?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q175.webp"
  },
  {
    "id": 176,
    "question": "Câu 176: Biển nào báo trước sắp đến nơi giao nhau cùng mức của các tuyến đường cùng cấp?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q176.webp"
  },
  {
    "id": 177,
    "question": "Câu 177: Biển nào báo hiệu giao nhau với đường ưu tiên?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3.",
      "Cả ba biển"
    ],
    "img": "images/q177.webp"
  },
  {
    "id": 178,
    "question": "Câu 178: Khi gặp biển nào, người lái xe phải giảm tốc độ, chú ý xe đi ngược chiều, xe đi ở chiều đường bị hẹp phải nhường đường cho xe đi ngược chiều?",
    "options": [
      "Biển 1.",
      "Biển 2 và 3.",
      "Cả ba biển."
    ],
    "img": "images/q178.webp"
  },
  {
    "id": 179,
    "question": "Câu 179: Biển nào báo trước sắp đến một đoạn đường bị thu hẹp đột ngột?",
    "options": [
      "Biển 1.",
      "Biển 2 và 3.",
      "Cả ba biển."
    ],
    "img": "images/q179.webp"
  },
  {
    "id": 180,
    "question": "Câu 180: Biển nào báo hiệu, chỉ dẫn xe đi trên đường này được quyền ưu tiên qua nơi giao nhau?",
    "options": [
      "Biển 1 và 2.",
      "Biển 1.",
      "Cả ba biển."
    ],
    "img": "images/q180.webp"
  },
  {
    "id": 181,
    "question": "Câu 181: Biển nào báo hiệu của chui?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q181.webp"
  },
  {
    "id": 182,
    "question": "Câu 182: Biển nào báo hiệu đường bộ giao nhau với đường sắt không có rào chắn?",
    "options": [
      "Biển 1 và 2.",
      "Biển 2 và 3.",
      "Biển 1 và 3."
    ],
    "img": "images/q182.webp"
  },
  {
    "id": 183,
    "question": "Câu 183: Biển nào báo hiệu nguy hiểm giao nhau với đường sắt?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3.",
      "Cả 3 biển"
    ],
    "img": "images/q183.webp"
  },
  {
    "id": 184,
    "question": "Câu 184: Biển nào báo hiệu giao nhau có tín hiệu đèn?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3.",
      "Cả 3 biển"
    ],
    "img": "images/q184.webp"
  },
  {
    "id": 185,
    "question": "Câu 185: Biển nào báo hiệu sắp đến chỗ giao nhau với đường sắt có rào chắn?",
    "options": [
      "Biển 1.",
      "Biển 2 và 3.",
      "Biển 3."
    ],
    "img": "images/q185.webp"
  },
  {
    "id": 186,
    "question": "Câu 186: Biển nào báo hiệu sắp đến chỗ giao nhau nguy hiểm?",
    "options": [
      "Biển 1 và 2.",
      "Biển 2 và 3.",
      "Biển 2.",
      "Cả ba biển."
    ],
    "img": "images/q186.webp"
  },
  {
    "id": 187,
    "question": "Câu 187: Gặp biển nào người lái xe phải giảm tốc độ, nhường ưu tiên cho người đi bộ?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3.",
      "Biển 1 và 3."
    ],
    "img": "images/q187.webp"
  },
  {
    "id": 188,
    "question": "Câu 188: Biển nào báo hiệu đoạn đường hay xảy ra ùn tắc giao thông?",
    "options": [
      "Biển 1.",
      "Biển 2",
      "Biển 3."
    ],
    "img": "images/q188.webp"
  },
  {
    "id": 189,
    "question": "Câu 189: Biển nào cảnh báo chỗ ngoặt nguy hiểm liên tiếp?",
    "options": [
      "Biển 1 và 2.",
      "Biển 2 và 3.",
      "Biển 3 và 4.",
      "Biển 2 và 4."
    ],
    "img": "images/q189.webp"
  },
  {
    "id": 190,
    "question": "Câu 190: Biển này có ý nghĩa gì?",
    "options": [
      "Chỗ ngoặt nguy hiểm có nguy cơ lật xe.",
      "Chỗ ngoặt nguy hiểm có nguy cơ lật xe bên phải.",
      "Chỗ ngoặt nguy hiểm có nguy cơ lật xe bên trái.",
      "Chỗ ngoặt nguy hiểm liên tiếp."
    ],
    "img": "images/q190.webp"
  },
  {
    "id": 191,
    "question": "Câu 191: Biển nào cảnh báo đường ngầm có nguy",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q191.webp"
  },
  {
    "id": 192,
    "question": "Câu 192: Biển nào cảnh báo vách núi nguy hiểm?",
    "options": [
      "Biển 1 và 2.",
      "Biển 2 và 4.",
      "Biển 3 và 4.",
      "Biển 1 và 3."
    ],
    "img": "images/q192.webp"
  },
  {
    "id": 193,
    "question": "Câu 193: Biển nào báo trước gần đến đoạn đường thường có trẻ em đi ngang qua hoặc tụ tập trên đường?",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q193.webp"
  },
  {
    "id": 194,
    "question": "Câu 194: Biển này có ý nghĩa gì?",
    "options": [
      "Chiều dài của đoạn đường có đá lở bất ngờ gây nguy hiểm cho xe cộ và người đi đường.",
      "Chiều dài của đoạn đường có vách núi nguy hiểm.",
      "Khoảng cách từ điểm đặt biển đến đoạn đường có đá lở bất ngờ gây nguy hiểm cho xe cộ và người đi đường."
    ],
    "img": "images/q194.webp"
  },
  {
    "id": 195,
    "question": "Câu 195: Biển nào cảnh báo lề đường nguy hiêm khi xe đi vào dễ gây văng đất đá hoặc bánh xe quay tại chỗ?",
    "options": [
      "Biển 1.",
      "Biển 2",
      "Biển 3."
    ],
    "img": "images/q195.webp"
  },
  {
    "id": 196,
    "question": "Câu 196: Biển nào báo nơi có kết cấu mặt đường rời rạc, khi phương tiện đi qua làm cho đá, sỏi văng lên gây nguy hiểm và mất an toàn cho người và phương tiện tham gia giao thông?",
    "options": [
      "Biển 1.",
      "Biển 2",
      "Biển 3."
    ],
    "img": "images/q196.webp"
  },
  {
    "id": 197,
    "question": "Câu 197: Biển này có ý nghĩa gì?",
    "options": [
      "Cảnh báo những đoạn nền đường yếu, đoạn đường đang theo dõi lún mà việc vận hành xe ở tốc độ cao có thể gây nguy hiểm.",
      "Cảnh báo đường ngầm thường xuyên có nguy cơ lũ quét."
    ],
    "img": "images/q197.webp"
  },
  {
    "id": 198,
    "question": "Câu 198: Biển nào báo trước đoạn đường có gồ giảm tốc?",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q198.webp"
  },
  {
    "id": 199,
    "question": "Câu 199: Biển nào cảnh báo sắp tới những vị trí có kè chắn vực sâu hoặc sông suối ở phía trước?",
    "options": [
      "Biển 1.",
      "Biển 2",
      "Biển 3."
    ],
    "img": "images/q199.webp"
  },
  {
    "id": 200,
    "question": "Câu 200: Biển nào báo trước đến bến phà?",
    "options": [
      "Biển 1.",
      "Biển 2",
      "Biển 3."
    ],
    "img": "images/q200.webp"
  },
  {
    "id": 201,
    "question": "Câu 201: Biển này có ý nghĩa gì?",
    "options": [
      "Dốc xuống nguy hiểm.",
      "Dốc lên nguy hiểm.",
      "Báo trước chiều dài đoạn đường dốc xuống nguy hiểm.",
      "Báo trước chiều dài đoạn đường dốc lên nguy hiểm."
    ],
    "img": "images/q201.webp"
  },
  {
    "id": 202,
    "question": "Câu 202: Biển nào để cảnh báo các loại xe ô tô, máy kéo, rơ moóc hoặc sơ mi rơ moóc được kéo | bởi xe ô tô hoặc ô tô đầu kéo, xe máy chuyên dùng | đang đỗ chiếm một phần đường xe chạy?",
    "options": [
      "Biển 1.",
      "Biển 2"
    ],
    "img": "images/q202.webp"
  },
  {
    "id": 203,
    "question": "Câu 203: Biển này có ý nghĩa gì?",
    "options": [
      "Để báo trước nơi giao nhau có bố trí đảo an toàn ở giữa nút giao.",
      "Các loại xe qua nút giao phải đi vòng xuyến quanh đảo an toàn theo chiều mũi tên.",
      "Cả hai ý trên."
    ],
    "img": "images/q203.webp"
  },
  {
    "id": 204,
    "question": "Câu 204: Khi gặp biển nào người lái xe phải cho xe dừng lại trong mọi trường hợp?",
    "options": [
      "Biển 1.",
      "Biển 2",
      "Biển 3."
    ],
    "img": "images/q204.webp"
  },
  {
    "id": 205,
    "question": "Câu 205: Biển nào báo hiệu tuyến đường cầu vượt cắt qua?",
    "options": [
      "Biển 1 và 2.",
      "Biển 1 và 3.",
      "Biển 2 và 3."
    ],
    "img": "images/q205.webp"
  },
  {
    "id": 206,
    "question": "Câu 206: Biển này có ý nghĩa gì?",
    "options": [
      "Chỉ hướng đi.",
      "Biển báo hiệu cho người tham gia giao thông biết số lượng làn đường trên mặt đường và hướng đi trên mỗi làn đường theo vạch kẻ đường.",
      "Chỉ hướng đường."
    ],
    "img": "images/q206.webp"
  },
  {
    "id": 207,
    "question": "Câu 207: Biển nào đặt sau nơi đường giao nhau và có hiệu lực trước mặt biển?",
    "options": [
      "Biển 1.",
      "Biển 2",
      "Biển 3."
    ],
    "img": "images/q207.webp"
  },
  {
    "id": 208,
    "question": "Câu 208: Biển nào không cho phép rẽ phải?",
    "options": [
      "Biển 1.",
      "Biển 2",
      "Biển 3.",
      "Biển 1 và 3."
    ],
    "img": "images/q208.webp"
  },
  {
    "id": 209,
    "question": "Câu 209: Biển nào báo hiệu bắt đầu đường dành cho các loại xe ô tô, xe máy đi lại?",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q209.webp"
  },
  {
    "id": 210,
    "question": "Câu 210: Biển nào báo hiệu bắt đầu đường dành cho ô tô?",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q210.webp"
  },
  {
    "id": 211,
    "question": "Câu 211: Biển nào báo tên đường cho các tuyến đường đối ngoại",
    "options": [
      "Biển 1 và 2.",
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q211.webp"
  },
  {
    "id": 212,
    "question": "Câu 212: Biển nào báo hiệu hết cấm đỗ xe theo giờ trong khu vực?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q212.webp"
  },
  {
    "id": 213,
    "question": "Câu 213: Biển nào báo hiệu hướng đi phải theo?",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q213.webp"
  },
  {
    "id": 214,
    "question": "Câu 214: Biển nào báo hiệu hết hạn chế tốc độ tối đa trong khu vực",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q214.webp"
  },
  {
    "id": 215,
    "question": "Câu 215: Biển nào báo làn đường dành cho các loại xe ô tô?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Cả 2 biển."
    ],
    "img": "images/q215.webp"
  },
  {
    "id": 216,
    "question": "Câu 216: Biển nào chỉ đường dành cho người đi bộ, các loại xe không được đi vào khi gặp biển này?",
    "options": [
      "Biển 1.",
      "Biển 1 và 3.",
      "Biển 3.",
      "Cả ba biển."
    ],
    "img": "images/q216.webp"
  },
  {
    "id": 217,
    "question": "Câu 217: Biển nào báo hiệu cầu vượt liên thông?",
    "options": [
      "Biển 1.",
      "Biển 1 và 2.",
      "Biển 1 và 3."
    ],
    "img": "images/q217.webp"
  },
  {
    "id": 218,
    "question": "Câu 218: Biển nào báo hiệu nơi đỗ xe dành cho người khuyết tật?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q218.webp"
  },
  {
    "id": 219,
    "question": "Câu 219: Biển nào báo hiệu đường một chiều?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Cả hai biển."
    ],
    "img": "images/q219.webp"
  },
  {
    "id": 220,
    "question": "Câu 220: Biển nào chỉ dẫn được ưu tiên qua đường hẹp?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3.",
      "Biển 2 và 3."
    ],
    "img": "images/q220.webp"
  },
  {
    "id": 221,
    "question": "Câu 221: Biển nào báo hiệu Hết đoạn đường ưu tiên?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q221.webp"
  },
  {
    "id": 222,
    "question": "Câu 222: Biển nào báo hiệu đường phía trước có làn đường dành cho ô tô khách?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q222.webp"
  },
  {
    "id": 223,
    "question": "Câu 223: Biển nào báo hiệu rẽ ra đường có làn đường dành cho ô tô khách?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q223.webp"
  },
  {
    "id": 224,
    "question": "Câu 224: Biển nào báo hiệu hết đường cao tốc?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3."
    ],
    "img": "images/q224.webp"
  },
  {
    "id": 225,
    "question": "Câu 225: Biển nào chỉ dẫn nơi bắt đầu đoạn đường dành cho người đi bộ?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3.",
      "Biển 4."
    ],
    "img": "images/q225.webp"
  },
  {
    "id": 226,
    "question": "Câu 226: Những biển nào đặt ở nơi đường bộ giao nhau chỉ có một địa danh và khu dân cư trên hướng đường cần phải chỉ dẫn?",
    "options": [
      "Biển 1 và 3.",
      "Biển 2 và 4.",
      "Biển 1 và 2.",
      "Biển 3 và 4."
    ],
    "img": "images/q226.webp"
  },
  {
    "id": 227,
    "question": "Câu 227: Những biển nào đặt ở nơi đường bộ giao nhau có từ hai địa danh, khu dân cư cần phải chỉ dẫn trên biển?",
    "options": [
      "Biển 1 và 3.",
      "Biển 2 và 4.",
      "Biển 1 và 2.",
      "Biển 3 và 4."
    ],
    "img": "images/q227.webp"
  },
  {
    "id": 228,
    "question": "Câu 228: Biển nào đặt trước các đường giao nhau, để chỉ dẫn lối đi đường tránh, đường vòng trong trường hợp đường chính bị tắc hoặc đường chính cấm một số loại xe đi qua?",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q228.webp"
  },
  {
    "id": 229,
    "question": "Câu 229: Biển nào chỉ hướng đường phải đi cho từng loại xe?",
    "options": [
      "Biển 1.",
      "Biển 2.",
      "Biển 3.",
      "Biển 4."
    ],
    "img": "images/q229.webp"
  },
  {
    "id": 230,
    "question": "Câu 230: Biển nào chỉ dẫn làn đường cứu nạn hay làn thoát xe khẩn cấp?",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q230.webp"
  },
  {
    "id": 231,
    "question": "Câu 231: Biển này có ý nghĩa gì?",
    "options": [
      "Cấm dừng xe về hướng bên phải.",
      "Cấm dừng và đỗ xe theo hướng bên phải."
    ],
    "img": "images/q231.webp"
  },
  {
    "id": 232,
    "question": "Câu 232: Biển này có ý nghĩa gì?",
    "options": [
      "Báo khoảng cách đến nơi cấm sử dụng còi.",
      "Chiều dài đoạn đường cấm sử dụng còi từ nơi đặt biển.",
      "Báo cấm dùng còi có độ vang xa 500m."
    ],
    "img": "images/q232.webp"
  },
  {
    "id": 233,
    "question": "Câu 233: Biển này có ý nghĩa gì?",
    "options": [
      "Cấm xe cơ giới (trừ xe ưu tiên theo Luật định) đi thẳng.",
      "Cấm xe ô tô và xe máy (trừ xe ưu tiên theo Luật định) đi về bên trái và bên phải.",
      "Hướng trái và phải không cấm xe cơ giới."
    ],
    "img": "images/q233.webp"
  },
  {
    "id": 234,
    "question": "Câu 234: Biển nào chỉ dẫn khoảng cách đến nút giao với đường dẫn vào đường cao tốc?",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q234.webp"
  },
  {
    "id": 235,
    "question": "Câu 235: Biển này có ý nghĩa gì?",
    "options": [
      "Chỉ dẫn khoảng cách đến lối vào đường cao tốc.",
      "Chỉ dẫn lối vào đường cao tốc."
    ],
    "img": "images/q235.webp"
  },
  {
    "id": 236,
    "question": "Câu 236: Biển này có ý nghĩa gì?",
    "options": [
      "Biển chỉ dẫn lối vào đường cao tốc.",
      "Biển chỉ dẫn bắt đầu đường cao tốc."
    ],
    "img": "images/q236.webp"
  },
  {
    "id": 237,
    "question": "Câu 237: Biển nào chỉ dẫn người lái xe đi được cả hai hướng?",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q237.webp"
  },
  {
    "id": 238,
    "question": "Câu 238: Biển này có ý nghĩa gì?",
    "options": [
      "Chỉ dẫn chướng ngại vật phía trước để cảnh báo phía trước có sự cản trở lưu thông bình thường (nằm bên trong phần xe chạy hay ngay sát phần đường xe chạy) và chỉ dẫn hướng đi qua đó cần đặt biển.",
      "Chỉ dẫn hướng rẽ để nhắc người điều khiển phương tiện chuẩn bị đổi hướng đi khi sắp vào đường cong nguy hiểm, có bán kính cong nhỏ."
    ],
    "img": "images/q238.webp"
  },
  {
    "id": 239,
    "question": "Câu 239: Biển nào chỉ dẫn khoảng cách đến vị trí nhập làn xe?",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q239.webp"
  },
  {
    "id": 240,
    "question": "Câu 240: Biển nào chỉ dẫn khoảng cách đến các lối ra tiếp theo?",
    "options": [
      "Biển 1.",
      "Biển 2."
    ],
    "img": "images/q240.webp"
  },
  {
    "id": 241,
    "question": "Câu 241: Việc bảo dưỡng thường xuyên đối với xe ô tô có tác dụng gì?",
    "options": [
      "Bảo dưỡng thường xuyên làm cho xe ô tô luôn có tính năng kỹ thuật tốt, giảm cường độ hao mòn của các chi tiết.",
      "Ngăn ngừa và phát hiện kịp thời các hư hỏng và sai lệch kỹ thuật để khắc phục, giữ gìn được hình thức bên |ngoài.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 242,
    "question": "Câu 242: Phương pháp kiểm tra mức dầu bôi trơn động cơ?",
    "options": [
      "Kiểm tra que thăm dầu trên các-te. Quan sát vệt dầu trên que thăm, mức dầu này phải nằm ở mức tối đa được thể hiện trên que thăm.",
      "Rút que thăm dầu trên các-te. Quan sát vệt dầu trên que thăm, mức dầu này phải nằm ở mức tối thiểu được thể hiện trên que thăm.",
      "Rút que thăm dầu trên các-te, lau sạch que thăm sau đó cắm vào các-te và rút ra quan sát vệt dầu trên que thăm, mức dầu phải nằm trong khoảng vạch mức tối thiểu và tối đa được thể hiện trên que thăm."
    ]
  },
  {
    "id": 243,
    "question": "Câu 243: Trình tự thay lốp dự phòng xe ô tô?",
    "options": [
      "Đỗ xe ở vị trí an toàn, đủ chỗ trống để tiến hành thao tác lắp bánh xe thuận tiện nhất, có cảnh báo nguy hiểm trước và sau vị trí dừng xe, tắt máy, kéo phanh tay, vào số 1 với xe ô tô loại chuyển số cơ khí hoặc P với ô tô loại chuyển số tự động.",
      "Bật đèn báo hiệu sự cố hoặc mở nắp capo để cảnh báo lái xe khác biết. Trước khi kích xe lên, nới lỏng ốc, theo cách nới chéo các ốc đối diện nhau trước, tuần tự hình ngôi sao.",
      "Kích xe đúng theo vị trí hướng dẫn, nâng bánh xe lên khỏi mặt đất một khoảng nhất định để tháo lốp hỏng ra khỏi xe, thay lốp dự phòng vào, siết chéo các ốc đối diện nhau trước cho đến khi thấy nặng tay, hạ kích xuống đến khi bánh xe tỳ xuống mặt đường, sau đó siết chặt cho đủ lực.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 244,
    "question": "Câu 244: Thế nào là động cơ 4 kỳ?",
    "options": [
      "Là loại động cơ: để hoàn thành một chu trình công tác của động cơ, pít tông thực hiện hai hành trình, trong đó có một lần sinh công.",
      "Là loại động cơ: để hoàn thành một chu trình công tác của động cơ, pít tông thực hiện bốn hành trình, trong đó có một lần sinh công."
    ]
  },
  {
    "id": 245,
    "question": "Câu 245: Hãy nêu công dụng của động cơ đốt trong?",
    "options": [
      "Khi làm việc, nhiệt năng được biến đổi thành cơ năng và truyền đến các bánh xe chủ động tạo ra chuyển động tịnh tiến cho ô tô.",
      "Khi làm việc, cơ năng được biến đổi thành điện năng và truyền đến các bánh xe chủ động tạo ra chuyển động tịnh tiến cho ô tô.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 246,
    "question": "Câu 246: Hãy nêu công dụng ly hợp của ô tô?",
    "options": [
      "Dùng để truyền mô men xoắn giữa các trục không cùng nằm trên một đường thẳng và góc lệch trục luôn thay đổi trong quá trình xe ô tô chuyển động.",
      "Dùng để truyền hoặc ngắt truyền động từ động cơ đến hộp số của xe ô tô trong những trường hợp cần thiết, bảo vệ an toàn cho động cơ và hệ thống truyền lực khi bị quá tải.",
      "Dùng để truyền truyền động từ hộp số đến bánh xe chủ động của xe ô tô."
    ]
  },
  {
    "id": 247,
    "question": "Câu 247: Hãy nêu công dụng hộp số của ô tô?",
    "options": [
      "Truyền và tăng mô men xoắn giữa các trục vuông góc nhau, đảm bảo cho các bánh xe chủ động quay với tốc độ khác nhau khi sức cản chuyển động ở bánh hai bên không bằng nhau.",
      "Truyền và thay đổi mô men xoắn giữa các trục không cùng nằm trên một đường thẳng và góc lệch trục luôn thay đổi trong quá trình xe ô tô chuyển động, chuyển số êm dịu dễ điều khiển.",
      "Truyền công suất từ động cơ đến bánh xe chủ động, thay đổi tỷ số truyền và mô men xoắn, cho phép xe ô tô chuyển động lùi, dừng tại chỗ mà không cần tắt máy hoặc cắt ly hợp."
    ]
  },
  {
    "id": 248,
    "question": "Câu 248: Hãy nêu công dụng của hệ thống lái của ô tô?",
    "options": [
      "Dùng để thay đổi mô men từ động cơ tới các bánh xe chủ động khi ô tô chuyển động theo hướng xác định.",
      "Dùng để thay đổi mô men giữa các trục vuông góc nhau khi ô tô chuyển động theo hướng xác định.",
      "Dùng để thay đổi hướng chuyển động hoặc giữ cho ô tô chuyển động theo hướng xác định."
    ]
  },
  {
    "id": 249,
    "question": "Câu 249: Hãy nêu công dụng của hệ thống phanh?",
    "options": [
      "Dùng để giảm tốc độ, dừng chuyển động của ô tô và giữ cho ô tô đứng yên trên dốc.",
      "Dùng để thay đổi hướng chuyển động hoặc giữ cho ô tô chuyển động ổn định theo hướng xác định.",
      "Dùng để truyền hoặc ngắt truyền động từ động cơ đến bánh xe chủ động của ô tô."
    ]
  },
  {
    "id": 250,
    "question": "Câu 250: Hãy nêu công dụng hệ thống truyền lực của ô tô?",
    "options": [
      "Dùng để làm giảm tốc độ, dừng chuyển động của ô tô.",
      "Dùng để thay đổi hướng chuyển động hoặc giữ cho ô tô chuyển động theo hướng xác định.",
      "Dùng để truyền mô men quay từ động cơ tới các bánh xe chủ động của ô tô."
    ]
  },
  {
    "id": 251,
    "question": "Câu 251: Hãy nêu yêu cầu của hệ thống lái xe ô tô?",
    "options": [
      "Đảm bảo các bánh xe dẫn hướng quay vòng lăn không trượt, giảm lực va đập truyền từ bánh xe lên vành tay lái.",
      "Đảm bảo xe ô tô chuyển động thẳng ổn định, bán kinh quay vòng nhỏ.",
      "Điều khiển nhẹ nhàng và tiện lợi.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 252,
    "question": "Câu 252: Hãy nêu công dụng của hệ thống phanh ABS?",
    "options": [
      "Chống cho các bánh xe không bị khóa cứng khi phanh khẩn cấp, xe không bị mất lái và giảm thiểu được tai nạn xảy ra.",
      "Chống cho các bánh xe không bị khóa cứng khi phanh khẩn cấp."
    ]
  },
  {
    "id": 253,
    "question": "Câu 253: Hãy nêu công dụng của hệ thống điện xe ô tô?",
    "options": [
      "Sử dụng để bật tia lửa điện ở các bugi để đốt cháy nhiên liệu.",
      "Cung cấp điện cho các nguồn tiêu thụ khác như: máy khởi động, đèn chiếu sáng, tín hiệu các đồng hồ đo.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 254,
    "question": "Câu 254: Hãy nêu cấu tạo chung của động cơ?",
    "options": [
      "Cơ cấu trục khuỷu thanh truyền, cơ cấu phân phối khí.",
      "Hệ thống cung cấp nhiên liệu, hệ thống bôi trơn, hệ thống làm mát.",
      "Hệ thống điện.",
      "Ý 1 và ý 2."
    ]
  },
  {
    "id": 255,
    "question": "Câu 255: Hãy nêu công dụng của hệ thống bôi trơn?",
    "options": [
      "Đưa dầu tới các bề mặt ma sát để bôi trơn, lọc sạch tạp chất lẫn trong dầu nhờn và tẩy rửa các bề mặt ma sát, làm mát các bề mặt ma sát và làm mát dầu nhờn.",
      "Đưa dầu tới các bề mặt ma sát để bôi trơn, lọc sạch tạp chất lẫn trong dầu nhờn và tẩy rửa các bề mặt ma sát, làm mát các bề mặt ma sát và làm mát dầu nhờn, giảm các va đập sinh ra trong khi xe ô tô chuyển động.",
      "Đưa dầu tới các bề mặt ma sát để bôi trơn, lọc sạch tạp chất lẫn trong dầu nhờn và tẩy rửa các bề mặt ma sát, làm mát các bề mặt ma sát và làm mát dầu nhờn, làm cho xe ô tô chuyển động êm dịu.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 256,
    "question": "Câu 256: Hãy nêu công dụng của hệ thống treo?",
    "options": [
      "Hệ thống treo dùng để nối đàn hồi khung hoặc vỏ ô tô với hệ thống chuyển động.",
      "Giảm các va đập sinh ra trong khi ô tô chuyển động.",
      "Làm cho ô tô chuyển động êm dịu khi đi qua các mặt đường gồ ghề không bằng phẳng.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 257,
    "question": "Câu 257: Chỉ số phát thải CO2 của xe điện trong quá trình sử dụng là bao nhiêu?",
    "options": [
      "0g/km.",
      "10g/km.",
      "20g/km.",
      "Tùy thuộc vào chế độ lái của người dùng."
    ]
  },
  {
    "id": 258,
    "question": "Câu 258: Hãy nêu cấu tạo của hệ thống phanh ABS?",
    "options": [
      "Cảm biến tốc độ, cảm biến giảm tốc, bộ chấp hành ABS và bộ điều khiển ABS.",
      "ECU điều khiển trượt, bộ chấp hành của phanh, cảm biến tốc độ, guốc phanh."
    ]
  },
  {
    "id": 259,
    "question": "Câu 259: Thế nào là động cơ hybrid?",
    "options": [
      "Là động cơ điện dùng năng lượng ắc quy.",
      "Là động cơ đốt trong.",
      "Là sự kết hợp giữa động cơ đốt trong thông thường với động cơ điện dùng năng lượng ắc quy."
    ]
  },
  {
    "id": 260,
    "question": "Câu 260: Hãy nêu cấu tạo của gầm ô tô?",
    "options": [
      "Hệ thống truyền lực, hệ thống chuyển động.",
      "Hệ thống truyền lực, hệ thống chuyển động, hệ thống điều khiển.",
      "Hệ thống truyền lực, hệ thống chuyển động, hệ thống điều khiển, hệ thống điện."
    ]
  },
  {
    "id": 261,
    "question": "Câu 261: Nêu ưu điểm của động cơ diesel so với động cơ xăng?",
    "options": [
      "Lượng nhiên liệu tiêu thụ của động cơ diesel ít hơn động cơ xăng.",
      "Động cơ diesel có công suất lớn hơn và ít hỏng vặt hơn",
      "Nhiên liệu diesel ít gây ra nguy hiểm hơn xăng.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 262,
    "question": "Câu 262: Hãy nêu các phương pháp bôi trơn động cơ 4 kỳ?",
    "options": [
      "Phương pháp bôi trơn vung té.",
      "Phương pháp bôi trơn cưỡng bức.",
      "Kết hợp giữa phương pháp bôi trơn vung té và bôi trơn cưỡng bức."
    ]
  },
  {
    "id": 263,
    "question": "Câu 263: Hãy nêu yêu cầu cơ bản đối với dung dịch làm mát động cơ ô tô?",
    "options": [
      "Truyền dẫn nhiệt tốt, có tính chống kết cặn cao, không có những chất bẩn tạp chất, ăn mòn các chi tiết.",
      "Truyền dẫn nhiệt tốt, có tính chống kết cặn cao, không có những chất bẩn tạp chất, tạo thành bọt khí trong hệ thống.",
      "Truyền dẫn nhiệt tốt, có tính chống kết cặn cao, không có những chất bẩn tạp chất.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 264,
    "question": "Câu 264: Theo Anh (chị), khi xe Hybrid đang chạy trên đường mà pin Hybrid bị hỏng, xe có tiếp tục di chuyển được không ?",
    "options": [
      "Không thể tiếp tục di chuyển.",
      "Vẫn di chuyển bình thường bằng động cơ đốt trong.",
      "Vẫn có thể di chuyển nhưng ở chế độ dự phòng và với tốc độ hạn chế."
    ]
  },
  {
    "id": 265,
    "question": "Câu 265: Ưu điểm của động cơ Hybrid so với động cơ đốt trong?",
    "options": [
      "Khả năng tiết kiệm nhiên liệu.",
      "Giảm thiểu khí thải.",
      "Vận hành êm ái, mượt mà.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 266,
    "question": "Câu 266: Trước khi cho xe ô tô khởi hành, người lái xe phải kiểm tra những bộ phận cơ bản nào?",
    "options": [
      "Hệ thống đèn, phanh, khoang động cơ.",
      "Gương, gạt nước.",
      "Lốp, cốp xe.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 267,
    "question": "Câu 267: Để đảm bảo lên xe ô tô đúng kỹ thuật và an toàn, người lái xe phải làm gì?",
    "options": [
      "Quan sát tình trạng giao thông xung quanh xe nếu thấy an toàn, dùng tay trái mở cửa xe ở mức đủ rộng để đưa người vào; đưa chân phải vào trước, tay phải nắm vô lăng, tay trái nắm cánh cửa, sau đó đưa toàn bộ thân người ngồi vào ghế và đóng cửa.",
      "Quan sát tình trạng giao thông, dùng tay trái mở cửa xe rộng để người mình vào; tay phải nắm vô lăng, tay trái nắm cánh cửa, sau đó đưa toàn bộ thân người ngồi vào ghế và đóng cửa."
    ]
  },
  {
    "id": 268,
    "question": "Câu 268: Để đảm bảo tư thế lái xe chuẩn, người lái xe phải thực hiện như thế nào?",
    "options": [
      "Điều chỉnh khoảng cách ghế sao cho đầu gối của người lái có độ chùng khi đạp bàn đạp ly hợp, ga và phanh hết hành trình.",
      "Điều chỉnh tựa lưng ghế sao cho khuỷu tay có độ chùng khi hai cánh tay đặt trên đỉnh vô lăng, dây đai an toàn vòng qua phần hông và giữa vai để dây không bị xoắn hoặc chèn vào cổ gẫy nghẹt thở.",
      "Điều chỉnh tựa đầu sao cho mắt và tai ở vị trí ngang điểm giữa của tựa đầu.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 269,
    "question": "Câu 269: Phương pháp điều khiển vô lăng khi chuyển hướng?",
    "options": [
      "Khi muốn cho xe ô tô chuyển sang hướng nào thì quay vô lăng sang hướng đó, mức độ quay vô lăng phụ thuộc vào mức yêu cầu chuyển hướng, khi xe đã chuyển hướng xong, phải trả vô lăng kịp thời để ổn định theo hướng chuyển động mới.",
      "Khi muốn cho xe ô tô chuyển sang hướng nào thì đánh hết lái nhanh sang hướng cần chuyển, chuyển hướng xong phải trả lái nhanh theo hướng chuyển động mới."
    ]
  },
  {
    "id": 270,
    "question": "Câu 270: Khi đang điều khiển xe ô tô loại chuyển só cơ khí, muốn đỗ xe, người lái xe phải thực hiện như thế nào?",
    "options": [
      "Giảm tốc độ, giảm số, quan sát, xác định điểm đỗ từ xa, kiểm tra an toàn qua gương chiếu hậu.",
      "Bật đèn xi nhan phải, từ từ cho xe chuyển vào làn trong cùng bên phải; chuyển bàn đạp chân ga sang bàn đạp phanh, rà phanh giảm tốc độ, đánh lái cho xe song song và sát với lề đường.",
      "Đạp hết hành trình bàn đạp ly hợp, tăng lực bàn đạp phanh để dừng xe; về số 0; kéo phanh tay và tắt máy.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 271,
    "question": "Câu 271: Muốn chuyển từ làn đường có tốc độ cao sang làn đường có tốc độ thấp, người lái xe phải xử lý như thế nào?",
    "options": [
      "Quan sát qua gương chiếu hậu bên phải, bật xi nhan phải, giảm tốc độ, khi đảm bảo an toàn, đánh lái phải để chuyển dần sang làn đường có tốc độ thấp.",
      "Quan sát hông bên phải xe qua gương chiếu hậu, nếu không có chướng ngại vật bật xi nhan phải để báo hiệu cho các xe đi sau biết. Khi đảm bảo an toàn đánh lái nhanh sang phải để chuyển làn đường, giữ tốc độ của xe."
    ]
  },
  {
    "id": 272,
    "question": "Câu 272: Muốn chuyển từ làn đường có tốc độ thấp sang làn đường có tốc độ cao, người lái xe phải xử lý như thế nào?",
    "options": [
      "Quan sát hông bên trái xe qua gương chiếu hậu, bật xi nhan trái; tăng tốc độ đánh lái nhanh sang trái vào làn đường cần chuyển.",
      "Quan sát qua gương chiếu hậu bên trái, bật xi nhan trái, khi đảm bảo an toàn, đánh lái trái để chuyển dần sang làn đường có tốc độ cao."
    ]
  },
  {
    "id": 273,
    "question": "Câu 273: Muốn vượt xe trên đường hai chiều, mỗi bên chỉ có một làn đường tại nơi được phép vượt, người lái xe phải xử lý như thế nào?",
    "options": [
      "Giữ khoảng cách an toàn với xe phía trước, quan sát an toàn bên trái của xe và xe đi ngược chiều đảm bảo không bị khuất tầm nhìn; bật xi nhan trái, có thể kết hợp còi, đèn để xin vượt.",
      "Khi xe phía trước giảm tốc độ, đã có tín hiệu rè phải và tránh về bên phải, tăng tốc độ của xe ở mức cho phép đồng thời đánh lái sang trái để vượt; khi đã vượt được một khoảng cách an toàn, bật xi nhan phải để trở về làn đường của mình.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 274,
    "question": "Câu 274: Khi động cơ ô tô đã khởi động, muốn điều chỉnh ghế của người lái, người lái xe phải điều chỉnh cần số ở vị trí nào?",
    "options": [
      "Vị trí N hoặc số 0.",
      "Vị trí D hoặc số 1.",
      "Vị trí P hoặc số 0.",
      "Ý 1 và ý 3."
    ]
  },
  {
    "id": 275,
    "question": "Câu 275: Khi khởi hành ô tô loại chuyển số cơ khí trên đường bằng, người lái xe cần thực hiện các thao tác theo trình tự nào dưới đây?",
    "options": [
      "Kiểm tra an toàn xung quanh xe; nhả từ từ đến 1/2 hành trình bàn đạp ly hợp và giữ trong khoảng 3 giây; vào số 1; nhả hết phanh tay, báo hiệu bằng còi, đèn trước khi xuất phát; tăng ga đủ để xuất phát, sau đó vừa tăng ga vừa nhả hết ly hợp để cho xe ô tô chuyển động.",
      "Kiểm tra an toàn xung quanh xe; đạp bàn đạp ly hợp hết hành trình, vào số 1; nhả hết phanh tay, báo hiệu bằng còi, đèn trước khi xuất phát, nhả từ từ 1/2 hành trình bàn đạp ly hợp, tăng ga nhẹ và giữ trong khoảng 3 giây, sau đó vừa tăng ga vừa nhả hết ly hợp để cho xe ô tô chuyển động."
    ]
  },
  {
    "id": 276,
    "question": "Câu 276: Để đảm bảo an toàn khi mở cửa xuống xe, người lái xe phải thực hiện các thao tác nào dưới đây ?",
    "options": [
      "Mở hết cửa và nhanh chóng ra khỏi ô tô.",
      "Mở hé cánh cửa và quan sát tình hình giao thông phía trước, nếu bảo đảm an toàn thì mở cửa ở mức cần thiết để xuống xe.",
      "Quan sát tình hình giao thông ở phía trước và phía sau, mở hé cánh cửa, nếu bảo đảm an toàn thì mở cửa ở mức cần thiết để xuống xe."
    ]
  },
  {
    "id": 277,
    "question": "Câu 277: Điểm mù của xe ô tô là gì?",
    "options": [
      "Điểm mù là vùng không gian bên ngoài xe bị che khuất và không nằm trong tầm nhìn của người điều khiển. Người điều khiển có thể quan sát được qua gương chiếu hậu hoặc nhìn trực tiếp.",
      "Điểm mù là vùng không gian bên ngoài xe bị che khuất, không nằm trong tầm nhìn của người điều khiển và không quan sát được qua gương."
    ]
  },
  {
    "id": 278,
    "question": "Câu 278: Để đảm bảo an toàn khi lùi xe, người lái xe xử lý như thế nào?",
    "options": [
      "Lợi dụng nơi đường giao nhau đủ chiều rộng để lùi.",
      "Quan sát phía sau và cho xe lùi ngay.",
      "Quan sát phía trước, phía sau của xe qua gương chiếu hậu (có thể quay đầu lại phía sau để quan sát), có tín hiệu cần thiết và chỉ khi nào thấy không nguy hiểm mới được"
    ]
  },
  {
    "id": 279,
    "question": "Câu 279: Xe ô tô tham gia giao thông phải bảo đảm các điều kiện nào?",
    "options": [
      "Có đủ hệ thống hãm và hệ thống chuyển hướng có hiệu lực, tay lái của xe ô tô ở bên trái, trường hợp xe ô tô của người nước ngoài đăng ký tại nước ngoài có tay lái ở bên phải tham gia giao thông tại Việt Nam thực hiện theo quy | định của Chính phủ.",
      "Có đủ đèn chiếu sáng gần và xa, đèn soi biển số, đèn báo hãm, đèn tín hiệu; có đủ gương và các trang thiết bị khác bảo đảm tầm nhìn cho người điều khiển.",
      "Kính chắn gió, kính cửa phải là loại kính an toàn, có còi với âm lượng đúng quy chuẩn kỹ thuật; có đủ bộ phận giảm thanh, giảm khói, các kết cấu phải đủ độ bền và bảo | đảm tính năng vận hành ổn định.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 280,
    "question": "Câu 280: Khi nhả phanh tay, người lái xe cần phải thực hiện các thao tác nào?",
    "options": [
      "Dùng lực tay phải kéo cần phanh tay về phía sau hết hành trình, nếu khóa hãm bị kẹt cứng phải đây mạnh phanh tay về phía trước, sau đó bóp khóa hãm.",
      "Dùng lực tay phải bóp khóa hãm đẩy cần phanh tay về phía trước hết hành trình, nếu khóa hãm bị kẹt cứng phải kéo cần phanh tay về phía sau đồng thời bóp khóa hãm.",
      "Dùng lực tay phải đẩy cần phanh tay về phía trước hết hành trình, nếu khóa hãm bị kẹt cứng phải đẩy mạnh cần phanh tay về phía trước, sau đó bóp khóa hãm."
    ]
  },
  {
    "id": 281,
    "question": "Câu 281: Khi điều khiển xe ô tô trong khu vực đông dân cư, người lái xe xử lý như thế nào?",
    "options": [
      "Giảm tốc độ, chú ý quan sát, xử lý linh hoạt giữa bàn đạp ga, phanh, ly hợp (xe loại chuyển số cơ khí) và tay lái; nghiêm chỉnh chấp hành pháp luật giao thông đường bộ.",
      "Quan sát rộng, nhanh từ các hướng để xử lý các tình huống cho phù hợp.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 282,
    "question": "Câu 282: Khi điều khiển xe tránh nhau qua đường hẹp, người lái xe phải xử lý như thế nào?",
    "options": [
      "Nơi có đường hẹp chỉ đủ cho một xe chạy và có chỗ tránh xe thì xe nào ở gần chỗ tránh hơn phải vào vị trí tránh, nhường đường cho xe đi ngược chiều.",
      "Xe xuống dốc phải nhường đường cho xe đang lên dốc.",
      "Xe nào có chướng ngại vật phía trước phải nhường đường cho xe không có chướng ngại vật đi trước.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 283,
    "question": "Câu 283: Tránh xe đi ngược chiều trên đường không phân chia thành hai chiều xe chạy riêng biệt, người lái xe phải xử lý như thế nào?",
    "options": [
      "Giảm tốc độ.",
      "Giảm tốc độ và cho xe đi về bên phải theo chiều chuyển động của xe.",
      "Giảm tốc độ và cho xe đi về bên trái theo chiều xe chạy của mình."
    ]
  },
  {
    "id": 284,
    "question": "Câu 284: Trên đường đôi muốn vượt xe kéo rơ moóc phía trước, người lái xe phải xử lý như thế nào?",
    "options": [
      "Giữ khoảng cách an toàn, tránh đi vào vị trí điểm mù của xe kéo rơ moóc, bật xi nhan trái đồng thời kết hợp đèn, còi xin vượt.",
      "Khi xe kéo rơ moóc đã có tín hiệu cho vượt (không có chướng ngại vật phía trước và xe đi ngược chiều), thấy đủ điều kiện an toàn thì vượt dứt khoát; không di chuyển song song bên cạnh xe kéo rơ moóc.",
      "Khi vượt qua, phải quan sát gương chiếu hậu bên phải nếu có khoảng trống an toàn mới được cho xe chạy vào làn của mình, tắt xi nhan và tiếp tục hành trình.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 285,
    "question": "Câu 285: Người lái xe phải thực hiện như thế nào khi điều khiển xe ô tô vào ban đêm, gặp xe chạy ngược chiều?",
    "options": [
      "Chuyển từ đèn chiếu xa sang đèn chiếu gần, nhìn chếch sang phía bên phải theo chiều chuyển động của xe.",
      "Chuyển từ đèn chiếu gần sang đèn chiếu xa, không nhìn thẳng vào đèn của xe chạy ngược chiều mà nhìn chech sang phía bên phải theo chiều chuyển động của xe.",
      "Chuyển từ đèn chiếu xa sang đèn chiếu gần, nhìn thẳng vào đèn của xe chạy ngược chiều để tránh xe đảm bảo an toàn."
    ]
  },
  {
    "id": 286,
    "question": "Câu 286: Người lái xe phải xử lý như thế nào khi lái xe chuyển hướng tại nơi đường giao nhau?",
    "options": [
      "Xác định hướng rẽ sớm trước khi tới nơi đường giao nhau, bật xi nhan báo chuyển hướng, quan sát an toàn trước và sau, từ từ cho xe chuyển hướng.",
      "Xác định hướng rẽ sớm trước khi tới nơi đường giao nhau, bật xi nhan chuyển hướng, quan sát an toàn trước và sau, chuyển ngay sang làn đường ở hướng cần rẽ."
    ]
  },
  {
    "id": 287,
    "question": "Câu 287: Người lái xe cần thực hiện thao tác gì khi điều khiển xe ô tô rẽ phải?",
    "options": [
      "Giảm tốc độ, bật xi nhan phải; quan sát phía trước, bên phải và phía sau; khi thấy an toàn cho xe từ từ rẽ phải.",
      "Giảm tốc độ và bật xi nhan phải; quan sát an toàn phía bên phải và phía sau; điều khiển xe đi sang làn phía bên trái đường để điều khiển xe qua nơi đường giao nhau.",
      "Giảm tốc độ và bật xi nhan trái; quan sát an toàn phía bên phải và phía sau; điều khiển xe đi sát vào phía bên phải đường để điều khiển xe qua nơi đường giao nhau."
    ]
  },
  {
    "id": 288,
    "question": "Câu 288: Người lái xe cần thực hiện thao tác gì khi điều khiển xe ô tô rẽ trái?",
    "options": [
      "Giảm tốc độ, bật xi nhan trái; quan sát phía trước, bên trái và phía sau; khi thấy an toàn cho xe từ từ rẽ trái.",
      "Giảm tốc độ và bật xi nhan trái; quan sát an toàn phía bên phải và phía sau; điều khiển xe rẽ ngay sang làn phía bên trái.",
      "Giảm tốc độ và bật xi nhan trái; quan bên trái và phía sau; điều khiển xe đi sát vào phía bên trái đường."
    ]
  },
  {
    "id": 289,
    "question": "Câu 289: Khi tiến hoặc lùi xe ô tô loại chuyển số tự động, người lái xe phải thực hiện các thao tác như thế nào?",
    "options": [
      "Đạp bàn đạp phanh chân hết hành trình, vào số, kiểm tra đúng số tiến (số D) hoặc số lùi (số R), nhả hết phanh đỗ, báo hiệu bằng còi, đèn và quan sát các phía trước khi cho xe di chuyển.",
      "Đạp bàn đạp ga để tăng ga với mức độ phù hợp, vào số và kiểm tra lại xem có bị nhầm số không rồi mới cho xe di chuyển.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 290,
    "question": "Câu 290: Khi tiến hoặc lùi xe ô tô loại chuyển số cơ khí, người lái xe phải thực hiện các thao tác |như thế nào?",
    "options": [
      "Kiểm tra an toàn xung quanh xe; đạp bàn đạp ly hợp hết hành trình; vào số 1 hoặc số lùi (số R); nhả hết phanh tay, báo hiệu bằng còi, đèn; nhả từ từ đến 1/2 hành trình bàn đạp ly hợp và giữ trong khoảng 3 giây, kết hợp tăng ga và nhả bàn đạp ly hợp để cho xe di chuyển.",
      "Đạp bàn đạp ly hợp và tăng ga với mức độ phù hợp, vào số và kiểm tra lại xem có bị nhầm số không rồi mới cho xe di chuyển.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 291,
    "question": "Câu 291: Khởi hành ô tô loại chuyển số cơ khí khi xuống dốc, người lái xe cần thực hiện các thao tác theo trình tự nào dưới đây?",
    "options": [
      "Kiểm tra an toàn xung quanh xe; nhả từ từ đến 1/2 hành trình bàn đạp ly hợp và giữ trong khoảng 3 giây; vào số 1; nhả hết phanh tay, báo hiệu bằng còi, đèn trước khi xuất phát; tăng ga đủ để xuất phát, sau đó vừa tăng ga vừa nhả hết ly hợp để cho xe ô tô di chuyển.",
      "Kiểm tra an toàn xung quanh xe; đạp bàn đạp ly hợp hết hành trình, vào số 1; báo hiệu bằng còi, đèn trước khi xuất phát, nhả từ từ 1/2 hành trình bàn đạp ly hợp, giữ trong khoảng 3 giây, nhả hết phanh tay và kết hợp với sử dụng phanh chân để hạn chế tốc độ sau đó nhả hết bàn đạp ly hợp để cho xe ô tô di chuyển."
    ]
  },
  {
    "id": 292,
    "question": "Câu 292: Khi điều khiển xe ô tô loại chuyển số tự động xuống dốc cao và dài, người lái xe phải thực hiện các thao tác nào để đảm bảo an toàn?",
    "options": [
      "Về số thấp, kết hợp phanh chân để kiểm soát tốc độ.",
      "Giữ nguyên vị trí D và kết hợp phanh tay để giảm tốc độ.",
      "Về số N (số 0), kết hợp phanh chân để giảm tốc độ."
    ]
  },
  {
    "id": 293,
    "question": "Câu 293: Khi tăng số, người lái xe cần chú ý những điểm gì?",
    "options": [
      "Không được nhìn xuống buồng lái, nhả hết bàn đạp ga, đạp bàn đạp ly hợp hết hành trình, cần phải tăng số thứ tự từ thấp đến cao, phối hợp các động tác phải nhịp nhàng, chính xác.",
      "Nhìn xuống kiểm tra buồng lái, tăng thứ tự từ thấp đến cao, phối hợp các động tác phải nhịp nhàng, và ga phải phù hợp với tốc độ."
    ]
  },
  {
    "id": 294,
    "question": "Câu 294: Khi giảm số, người lái xe cần chú ý những điểm gì?",
    "options": [
      "Không được nhìn xuống buồng lái, nhả bàn đạp ga, đạp bàn đạp ly hợp, giảm số, phối hợp các động tác phải nhịp nhàng chính xác.",
      "Không được nhìn xuống buồng lái, nhả hết bàn đạp ga, đạp bàn đạp ly hợp hết hành trình, giảm số theo thứ tự từ cao xuống thấp, phối hợp các động tác phải nhịp nhàng, chính xác."
    ]
  },
  {
    "id": 295,
    "question": "Câu 295: Khi điều khiển xe ô tô lên dốc cao, người lái xe cần thực hiện các thao tác nào?",
    "options": [
      "Điều chỉnh ga cho xe đi từ từ lên dốc; đến gần đỉnh dốc phải tăng ga để xe nhanh chóng qua dốc; về sổ thấp; đi sát về phía bên phải đường, có tín hiệu (còi, đèn) để báo cho người lái xe đi ngược chiều biết.",
      "Về số thấp, điều chỉnh ga cho xe đi từ từ lên dốc; đến gần đỉnh dốc phải đi chậm, đi sát về phía bên phải theo chiều xe chạy, có tín hiệu còi, đèn để báo cho người lái xe |đi ngược chiều biết.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 296,
    "question": "Câu 296: Khi điều khiển xe ô tô loại chuyển số tự động dừng đèn đỏ, người lái xe thao tác như thế nào?",
    "options": [
      "Nhả bàn đạp ga, khi đến vị trí dừng đèn đỏ đạp phanh chân cho xe dừng hẳn, nếu thời gian khoảng 15 giây thì nên giữ nguyên phanh chân đợi đến khi đèn tín hiệu chuyển màu xanh, nhả bàn đạp phanh chân, tăng ga cho xe tiếp tục di chuyển.",
      "Nếu thời gian trên 15 giây thì nên chuyển cần số về vị trí N, có thể giữ nguyên phanh chân hoặc có thể sử dụng phanh đỗ. Khi đèn tín hiệu chuyển màu xanh, chuyển cần số về vị trí D cho xe tiếp tục di chuyển.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 297,
    "question": "Câu 297: Khi xuống dốc, muốn dừng xe, người lái xe cần thực hiện thao tác nào?",
    "options": [
      "Bật xi nhan phải, giảm tốc độ, quan sát an toàn, điều khiển xe sát vào lề đường bên phải, đạp phanh sớm và mạnh hơn lúc dừng xe trên đường bằng để xe đi với tốc độ chậm đến mức dễ dàng dừng lại được; về số 1, khi xe đến chỗ dừng thì đồng thời đạp ly hợp và phanh, về số 0, sử dụng phanh đỗ.",
      "Bật xi nhan phải, giảm tốc độ, quan sát an toàn điều khiển xe sát vào lề đường bên phải; đạp hết hành trình bàn đạp ly hợp và nhả bàn đạp ga để đi với tốc độ chậm đến mức dễ dàng dừng lại được chỗ dùng; khi xe đã dừng, đạp và giữ phanh chân."
    ]
  },
  {
    "id": 298,
    "question": "Câu 298: Khi quay đầu xe, người lái xe cần phải quan sát và thực hiện các thao tác nào?",
    "options": [
      "Quan sát biển báo hiệu để biết nơi được phép quay đầu, sát kỹ địa hình nơi chọn để quay đầu, lựa chọn quỹ đạo quay đâu xe cho thích hợp, bật xi nhan trái và quay đầu xe với tốc độ thấp; nếu quay đầu xe ở nơi nguy hiểm thì đưa đầu xe về phía nguy hiểm đưa đuôi xe về phía an toàn.",
      "Quan sát biển báo hiệu để biết nơi được phép quay đầu, quan sát kỹ địa hình nơi chọn để quay đầu, lựa chọn quỹ đạo quay đầu xe cho thích hợp, quay đầu xe với tốc độ nhỏ nhất; nếu quay đầu xe ở nơi nguy hiểm thì đưa đuổi xe về phía nguy hiểm và đầu xe về phía an toàn."
    ]
  },
  {
    "id": 299,
    "question": "Câu 299: Khi điều khiển xe trên đường vòng, người lái xe thực hiện như thế nào?",
    "options": [
      "Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng còi, đèn, giảm tốc độ tới mức cần thiết, về số thấp và đánh lái phù hợp với bán kính đường vòng.",
      "Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng 1 còi, đèn, tăng tốc để nhanh chóng qua đường vòng."
    ]
  },
  {
    "id": 300,
    "question": "Câu 300: Khi điều khiển xe vượt qua rãnh cắt ngang mặt đường, người lái xe cần thực hiện các thao tác nào?",
    "options": [
      "Về số 1 và từ từ cho hai bánh xe trước xuống rãnh, tăng ga cho hai bánh xe trước vượt lên khỏi rãnh, tăng số, tăng tốc độ để bánh xe sau vượt rãnh.",
      "Tăng ga, tăng số để hai bánh xe trước và bánh xe sau vượt qua khỏi rãnh và chạy bình thường.",
      "Giảm tốc độ, về số 1 và từ từ cho hai bánh xe trước xuống rãnh, tăng ga cho hai bánh xe trước vượt lên khỏi rãnh, tiếp tục để bánh xe sau từ từ xuống rãnh rồi tăng dần cho xe ô tô lên khỏi rãnh."
    ]
  },
  {
    "id": 301,
    "question": "Câu 301: Khi vượt xe khác cùng chiều, người lái xe cần lưu ý những vấn đề gì?",
    "options": [
      "Quan sát kỹ trước khi vượt để đảm bảo an toàn.",
      "Không vượt một lúc nhiều xe, không nối đuôi xe khác đang vượt, nên vượt dứt khoát.",
      "Không vượt khi xe trước đi tốc độ tối đa.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 302,
    "question": "Câu 302: Khi điều khiển xe ô tô qua đường sắt không có rào chắn, không có người điều khiển giao thông, người lái xe xử lý như thế nào?",
    "options": [
      "Giảm tốc độ, dừng lại trước vạch dừng, quan sát cả hai phía, nếu không có tàu đi tới, tăng ga nhẹ vượt qua đường sắt.",
      "Nếu thấy có tàu đi tới thì dừng lại trước vạch dừng, chỉ khi tàu đi qua mới được đi.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 303,
    "question": "Câu 303: Khi điều khiển xe ô tô qua đường sắt có độ dốc cao, người lái xe cần thực hiện những thao tác cơ bản nào?",
    "options": [
      "Về số 1, tăng ga phù hợp để tránh động cơ chết máy.",
      "Không đổi số và đi chếch tránh kẹt bánh xe vào đường sắt.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 304,
    "question": "Câu 304: Khi tầm nhìn hạn chế bởi sương mù, người lái xe điều khiển xe như thế nào để đảm bảo an toàn giao thông?",
    "options": [
      "Tăng tốc độ, chạy gần xe trước, nhìn đèn chiếu hậu để định hướng.",
      "Giảm tốc độ, bật đèn sương mù, đi đúng làn đường và giữ khoảng cách an toàn với xe phía trước.",
      "Tăng tốc độ, bật đèn pha vượt qua xe chạy trước."
    ]
  },
  {
    "id": 305,
    "question": "Câu 305: Khi điều khiển xe ô tô gặp mưa to, người lái xe phải làm gì?",
    "options": [
      "Bật đèn chiếu gần, sử dụng cần gạt nước, giảm tốc độ và giữ khoảng cách an toàn với xe phía trước; có thể tìm chỗ an toàn dừng xe, bật đèn dừng khẩn cấp để báo hiệu cho các xe khác biết.",
      "Bật đèn chiếu xa, điều khiển gạt nước, tăng tốc độ điều  khiển ô tô qua khỏi khu vực mưa to."
    ]
  },
  {
    "id": 306,
    "question": "Câu 306: Khi điều khiển xe chuyển làn trên đường cao tốc, người lái xe phải làm gì?",
    "options": [
      "Quan sát chướng ngại vật phía trước, phía sau qua gương chiếu hậu; bật xi nhan xin chuyển làn đường để xe khác biết, khi thấy an toàn cho xe chuyển dần sang làn đường liền kề.",
      "Quan sát góc chết (góc không nhìn được qua gương); quan sát xe chạy sau và chướng ngại vật phía trước, bật xi nhan xin chuyển làn đường để xe khác biết, chuyên ngay sang làn đường cần đổi."
    ]
  },
  {
    "id": 307,
    "question": "Câu 307: Khi điều khiển xe trên đường cao tốc, người lái xe phải chú ý những điểm gì?",
    "options": [
      "Chạy đúng tốc độ quy định, giữ khoảng cách an toàn, chú ý đèn tín hiệu và hướng di chuyển của xe phía trước.",
      "Trước khi chuyển làn đường, lái xe phải quan sát tất cả gương chiếu hậu để đảm bảo an toàn phía sau, bật tín hiệu xin chuyển hướng và chuyển dần sang làn đường liền kề.",
      "Nếu muốn ra khỏi đường cao tốc, phải bật tín hiệu chuyển hướng và chuyển dần sang làn đường phía lối ra.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 308,
    "question": "Câu 308: Khi điều khiển xe ô tô trên đường chỉ có một làn xe chạy, biết có xe sau xin vượt nếu đủ điều kiện an toàn người lái xe phải làm gì?",
    "options": [
      "Giảm tốc độ và ra hiệu cho xe sau vượt. Không được gây trở ngại cho xe sau vượt.",
      "Cho xe tránh về bên phải mình và ra hiệu cho xe sau vượt. Nếu có chướng ngại vật phía trước hoặc thiếu điều | kiện an toàn chưa cho vượt được phải ra hiệu cho xe sau biết. Cấm xe bị vượt gây cản trở cho xe xin vượt.",
      "Chủ động giảm tốc độ, bật tín hiệu rẽ phải và đi sát về phía bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua, không được gây trở ngại đối với xe xin vượt."
    ]
  },
  {
    "id": 309,
    "question": "Câu 309: Khi lái xe ô tô đi trên đường ngập nước, người lái xe xử lý như thế nào để đảm bảo an",
    "options": [
      "Nếu mặt đường rộng cho xe đi xiên góc theo hướng nước chảy, mặt đường trung bình lái xe đi song song mép đường phía thượng lưu ngay từ đầu.",
      "Cho xe qua đường ngầm nên đi số 1.",
      "Giữ vững tay lái, đi đều ga, tránh không để xe chết máy giữa dòng, không nên dừng xe trên đường ngập nước.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 310,
    "question": "Câu 310: Khi điều khiển xe ô tô loại chuyển số cơ khí đi vào đường trơn trượt, người lái xe phải xử |lý như thế nào?",
    "options": [
      "Nên đi vào vệt bánh xe đã đi qua.",
      "Giữ vững tay lái, hạn chế đánh lái.",
      "Đi ở số thấp, tốc độ chậm, không phanh gấp.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 311,
    "question": "Câu 311: Khi điều khiển xe ô tô loại chuyển số tự động, người lái xe sử dụng chân như thế nào là đúng?",
    "options": [
      "Chân trái điều khiển bàn đạp phanh, chân phải điều khiển bàn đạp ga.",
      "Sử dụng chân phải để điều khiển bàn đạp phanh và bàn đạp ga.",
      "Sử dụng chân trái để điều khiển bàn đạp phanh và bàn đạp ga."
    ]
  },
  {
    "id": 312,
    "question": "Câu 312: Khi đỗ xe ô tô loại chuyển số tự động, người lái xe phải thực hiện các thao tác như thế nào?",
    "options": [
      "Chân phải đạp bàn đạp phanh chân hết hành trình, chuyển cần số về vị trí P, sử dụng phanh đỗ và nhả bàn đạp phanh chân.",
      "Chân trái đạp bàn đạp phanh chân, tay phải cầm cần số đẩy cần số hết về phía trước, kéo phanh tay.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 313,
    "question": "Câu 313: Khi lái xe ô tô trên mặt đường lồi lõm, người lái xe phải thực hiện thao tác như thế nào?",
    "options": [
      "Tăng tốc độ cho xe lướt qua nhanh.",
      "Giảm tốc độ, về số thấp và giữ đều ga.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 314,
    "question": "Câu 314: Khi lái xe ô tô loại chuyển số cơ khí lên dốc muốn dừng xe, người lái xe cần thực hiện thao tác nào?",
    "options": [
      "Bật xi nhan, đi sát vào lề bên trái hoặc bên phải; nhả bàn đạp ga; đạp nhẹ phanh và lái xe vào chỗ định dừng; về số 1, khi xe đã dừng, đạp phanh chân, kéo phanh tay và chèn bánh xe chắc chắn an toàn.",
      "Bật xi nhan phải, đi sát lề đường bên phải; đạp hết hành trình bàn đạp ly hợp và phanh cho xe dừng hẳn, kéo hết hành trình phanh tay, về về số 0, có thể sử dụng chèn bánh xe để đảm bảo an toàn.",
      "Bật xi nhan phải, đi sát vào lề đường bên phải; đạp phanh sớm và mạnh hơn lúc dừng xe trên đường bằng để đi với tốc độ chậm đến mức dễ dàng dừng lại được; về số 0 để xe đi đến chỗ dừng, khi xe đã dừng, kéo phanh tay."
    ]
  },
  {
    "id": 315,
    "question": "Câu 315: Khi lái xe ô tô vào ban đêm, người lái xe phải xử lý như thế nào?",
    "options": [
      "Di chuyển với tốc độ phù hợp, giữ khoảng cách an toàn; sử dụng hợp lý chế độ đèn chiếu sáng (xa, gần); không nhìn trực diện vào đèn của xe ngược chiều; dừng xe nghỉ ngơi khi cảm thấy mệt mỏi.",
      "Di chuyển với tốc độ phù hợp, giữ khoảng cách an toàn; sử dụng hợp lý chế độ đèn chiếu sáng (xa, gần); quan sát trực diện vào đèn của xe ngược chiều; dừng xe nghỉ ngơi khi cảm thấy mệt mỏi."
    ]
  },
  {
    "id": 316,
    "question": "Câu 316: Muốn vượt xe khác trong khu đô thị, người lái xe phải xử lý như thế nào?",
    "options": [
      "Chỉ được vượt ở đoạn đường cho phép vượt.",
      "Bật xi nhan trái, có thể sử dụng còi (từ 22 giờ đến 5 giờ chỉ được báo hiệu xin vượt bằng đèn).",
      "Chỉ được vượt khi không có chướng ngại vật phía trước, không có xe chạy ngược chiều; xe chạy trước đã có tín hiệu rẽ phải, tránh về bên phải và không có tín hiệu vượt xe khác.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 317,
    "question": "Câu 317: Khi điều khiển xe ô tô lên, xuống phà, người lái xe phải xử lý như thế nào?",
    "options": [
      "Trước khi điều khiển ô tô xuống phà, người lái xe phải yêu cầu mọi người xuống xe, trừ trẻ em, phụ nữ mang thai, người già yếu, người khuyết tật, người bệnh; khi điều khiển ô tô lên, xuống phà phải tuân thủ theo hướng dẫn của người điều khiển giao thông.",
      "Nên sử dụng cách lái chéo xe khi lên, xuống phà.",
      "Sử dụng cách đỗ xe trên đường khi xe ô tô ở trên phà.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 318,
    "question": "Câu 318: Các biện pháp tiết kiệm nhiên liệu khi chạy xe?",
    "options": [
      "Bảo dưỡng xe theo định kỳ và có kế hoạch lộ trình trước khi chạy xe.",
      "Kiểm tra áp suất lốp theo tiêu chuẩn, chạy xe với tốc độ phù hợp tình trạng mặt đường và mật độ giao thông trên đường.",
      "Chở đúng số người và tải trọng theo thiết kế của xe.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 319,
    "question": "Câu 319: Khi lái xe ô tô vào ban đêm trên đoạn đường đèo dốc, người lái xe phải làm gì?",
    "options": [
      "Kiểm tra an toàn kỹ thuật xe trước khi vào đoạn đường đèo dốc.",
      "Giảm tốc độ, về số thấp, giữ khoảng cách an toàn với xe phía trước; sử dụng hợp lý chế độ đèn chiếu sáng (xa, gần); không nhìn trực diện vào đèn của xe ngược chiều.",
      "Chú ý tín hiệu đèn, còi của xe đi ngược chiều và hệ thống báo hiệu đường bộ; xe xuống dốc phải nhường đường cho xe lên dốc.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 320,
    "question": "Câu 320: Khi điều khiển xe ô tô loại chuyển số tự động đi vào đoạn đường trơn trượt, người lái xe phải xử lý như thế nào?",
    "options": [
      "Về số thấp, kết hợp phanh chân để giảm tốc độ.",
      "Giữ nguyên số D, kết hợp phanh tay để giảm tốc độ.",
      "Về số N, kết hợp phanh chân để giảm tốc độ."
    ]
  },
  {
    "id": 321,
    "question": "Câu 321: Trong những trường hợp nào dưới đây, người lái xe phải cho xe giảm tốc độ để có thể dừng lại một cách an toàn?",
    "options": [
      "Qua cầu, cống hẹp, khi xuống dốc, mặt đường trơn trượt, lầy lội, có nhiều đất, đá, cát bụi.",
      "Qua khu vực trường học vào giờ học sinh đến trường hoặc tan trường, khu vực đông dân cư, nhà máy, công sở tập trung bên đường.",
      "Khi có người đi bộ, xe lăn của người khuyết tật qua đường.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 322,
    "question": "Câu 322: Khi điều khiển xe ô tô xuống dốc trong điều kiện đường trơn trượt, người lái xe phải làm thế nào?",
    "options": [
      "Giảm tốc độ, về số thấp; đi vào vệt bánh xe trước; hạn chế đánh lái, phanh gấp; giữ khoảng cách an toàn với xe phía trước; nếu dốc quá dài phải dừng xe, tắt máy xe để giảm nhiệt độ cho động cơ và cơ cấu phanh.",
      "Về số thấp, tăng ga, giữ khoảng cách với xe phía trước, phanh gấp và đánh lái; nếu dốc quá dài phải dừng xe, tắt động cơ để giảm nhiệt độ cho động cơ và cơ cấu phanh."
    ]
  },
  {
    "id": 323,
    "question": "Câu 323: Khi điều khiển xe ô tô tránh nhau ở đường nhỏ hoặc vào cua mà bánh xe bị chệch khỏi đường, người lái xe cần phải thao tác như thế nào?",
    "options": [
      "Giảm tốc độ, đánh lái một góc nhỏ để từ từ đưa xe trở lại làn đường.",
      "Tăng ga, đánh hết lái để nhanh chóng đưa xe trở về làn đường quy định."
    ]
  },
  {
    "id": 324,
    "question": "Câu 324: Khi xe ô tô cùng chiều phía trước có tín hiệu rẽ phải, người lái xe phải xử lý như thế nào?",
    "options": [
      "Giảm tốc độ, giữ khoảng cách và nhường đường cho xe cùng chiều rẽ phải.",
      "Quan sát nếu thấy có khoảng trống thì nhanh chóng tăng tốc độ đi qua."
    ]
  },
  {
    "id": 325,
    "question": "Câu 325: Tại ngã tư giao nhau không có tín hiệu đèn, muốn cho xe đi thẳng, người lái xe phải xử lý như thế nào?",
    "options": [
      "Giảm tốc độ, chú ý quan sát phương tiện tới từ các hướng, khi thấy an toàn cho xe di chuyển qua nút giao, chú ý nhường đường cho người đi bộ.",
      "Tăng tốc độ, nhanh chóng cho xe qua nơi giao nhau, chú ý nhường đường cho người bộ.",
      "Báo hiệu bằng đèn, còi, tăng tốc độ, nhanh chóng cho xe qua nơi giao nhau, chú ý nhường đường cho người bộ."
    ]
  },
  {
    "id": 326,
    "question": "Câu 326: Khi muốn quay đầu xe tại nơi đường đôi, người lái xe cần xử lý như thế nào?",
    "options": [
      "Chú ý quan sát các phương tiện tới gần phía trước và phía sau, đảm bảo an toàn, bật xi nhan trái, duy trì tốc độ chậm và đánh lái sang trái để quay đầu xe.",
      "Nhìn về phía trước, trả dần lái trước khi xe song song với làn đường, tăng dần tốc độ và đi đúng làn đường theo quy định.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 327,
    "question": "Câu 327: Khi xe gặp sự cố kỹ thuật trên đường cao tốc, người lái xe phải xử lý như thế nào?",
    "options": [
      "Bật tín hiệu đèn khẩn cấp, kiểm tra an toàn xung quanh xe, nếu đủ điều kiện nhanh chóng đưa xe vào làn khẩn cấp.",
      "Sử dụng các thiết bị cảnh báo như chóp nón, biển báo... đặt phía sau xe để cảnh báo các phương tiện.",
      "Gọi số điện thoại khẩn cấp của đường cao tốc để được hỗ trợ khi xe không thể di chuyển.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 328,
    "question": "Câu 328: Khi đi từ đường nhánh ra đường chính, người lái xe phải xử lý như thế nào là đúng?",
    "options": [
      "Giảm tốc độ, chú ý quan sát, bật đèn tín hiệu báo hướng rẽ, nhường đường cho xe trên đường chính từ bất kỳ hướng nào tới.",
      "Nháy đèn, bấm còi để xe đi trên đường chính biết và tăng tốc độ cho xe đi ra đường chính.",
      "Quan sát xe đang đi trên đường chính, nếu là xe có kích thước lớn hơn thì nhường đường, xe có kích thước nhỏ hơn thì tăng tốc độ cho xe đi ra đường"
    ]
  },
  {
    "id": 329,
    "question": "Câu 329: Người lái xe phải xử lý như thế nào khi xe ô tô bị nổ lốp trên đường?",
    "options": [
      "Giữ bình tĩnh, hạn chế phanh gấp, giảm tốc độ từ từ và tìm cách di chuyển xe vào lề đường.",
      "Bật tín hiệu cảnh báo, sử dụng các thiết bị cảnh báo an toàn như chóp nón, biển báo...đặt phía sau xe để cảnh báo các phương tiện.",
      "Thay thế lốp dự phòng hoặc gọi người trợ giúp.",
      "Cả 3 ý trên"
    ]
  },
  {
    "id": 330,
    "question": "Câu 330: Khi đang lái xe ô tô, nếu có nhu cầu sử dụng điện thoại, người lái xe phải thực hiện như thế nào?",
    "options": [
      "Giảm tốc độ để đảm bảo an toàn với xe phía trước và sử dụng điện thoại liên lạc.",
      "Giảm tốc độ để dừng xe ở nơi cho phép, sau đó sử dụng điện thoại.",
      "Tăng tốc độ để cách xa xe phía sau và sử dụng điện thoại để liên lạc."
    ]
  },
  {
    "id": 331,
    "question": "Câu 331: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng như hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Hệ thống túi khí an toàn gặp sự cố.",
      "Phanh đỗ đang hãm hoặc thiếu dầu phanh.",
      "Phanh đỗ đang hãm.",
      "Cảnh báo bật hệ thống hỗ trợ đổ đèo."
    ],
    "img": "images/q331.webp"
  },
  {
    "id": 332,
    "question": "Câu 332: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Hệ thống túi khí an toàn gặp sự cố.",
      "Nhiệt độ nước làm mát quá mức cho phép.",
      "Đang sử dụng phanh đỗ.",
      "Cửa xe đang mở."
    ],
    "img": "images/q332.webp"
  },
  {
    "id": 333,
    "question": "Câu 333: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Áp suất dầu ở mức thấp.",
      "Thiếu dầu phanh.",
      "Nhiệt độ nước làm mát quá mức cho phép.",
      "Phanh tay đang hãm."
    ],
    "img": "images/q333.webp"
  },
  {
    "id": 334,
    "question": "Câu 334: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Cửa xe đóng chưa chặt.",
      "Cảnh báo nhiệt độ quá nóng.",
      "Bộ nạp ắc quy gặp sự cố kỹ thuật.",
      "Dầu bôi trơn bị thiếu."
    ],
    "img": "images/q334.webp"
  },
  {
    "id": 335,
    "question": "Câu 335: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Thiếu dầu phanh, phanh tay đang hãm.",
      "Hệ thống túi khí an toàn gặp sự cố.",
      "Chưa thắt dây an toàn.",
      "Cửa xe đóng chưa chặt hoặc có cửa chưa đóng."
    ],
    "img": "images/q335.webp"
  },
  {
    "id": 336,
    "question": "Câu 336: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Báo hiệu thiếu dầu phanh.",
      "Áp suất lốp không đủ.",
      "Đang hãm phanh tay.",
      "Sắp hết nhiên liệu."
    ],
    "img": "images/q336.webp"
  },
  {
    "id": 337,
    "question": "Câu 337: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Cảnh báo hệ thống túi khí an toàn gặp sự cố.",
      "Bộ nạp ắc quy gặp sự cố kỹ thuật.",
      "Cảnh báo đến thời gian cần bảo dưỡng xe.",
      "Cảnh báo nhiệt độ động cơ quá nóng."
    ],
    "img": "images/q337.webp"
  },
  {
    "id": 338,
    "question": "Câu 338: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Hệ thống túi khí gặp sự cố.",
      "Chưa thắt dây an toàn.",
      "Cảnh báo đến thời hạn cần bảo dưỡng.",
      "Cửa đóng chưa chặt, có cửa chưa đóng."
    ],
    "img": "images/q338.webp"
  },
  {
    "id": 339,
    "question": "Câu 339: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Thiếu dầu phanh.",
      "Phanh tay đang hãm.",
      "Cảnh báo hệ thống chống bó cứng phanh bị lỗi.",
      "Cảnh báo nhiệt độ khi động cơ quá nóng."
    ],
    "img": "images/q339.webp"
  },
  {
    "id": 340,
    "question": "Câu 340: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Cảnh báo nhiệt độ động cơ quá nóng.",
      "Cảnh báo hệ thống túi khí gặp sự cố.",
      "Chưa thắt dây an toàn.",
      "Cảnh báo đến thời gian cần bảo dưỡng."
    ],
    "img": "images/q340.webp"
  },
  {
    "id": 341,
    "question": "Câu 341: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Cảnh báo đến thời gian cần bảo dưỡng xe.",
      "Cảnh báo nhiệt độ động cơ quá nóng.",
      "Cảnh báo hệ thống phanh bị lỗi.",
      "Cảnh báo lỗi hộp loại chuyển số tự động."
    ],
    "img": "images/q341.webp"
  },
  {
    "id": 342,
    "question": "Câu 342: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Hệ thống túi khí gặp sự cố.",
      "Cảnh báo khóa vô lăng.",
      "Cảnh báo lỗi hệ thống phanh.",
      "Cảnh báo đến thời gian cần bảo dưỡng."
    ],
    "img": "images/q342.webp"
  },
  {
    "id": 343,
    "question": "Câu 343: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Báo hiệu hệ thống túi khí đã bật.",
      "Báo hiệu đèn chiếu sáng xa đã bật.",
      "Báo hiệu chế độ lái tiết kiệm nhiên liệu đã bật.",
      "Báo hiệu đèn cảnh báo khoảng cách đã bật."
    ],
    "img": "images/q343.webp"
  },
  {
    "id": 344,
    "question": "Câu 344: Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?",
    "options": [
      "Cảnh báo ắc quy gặp sự cố.",
      "Cảnh báo động cơ gặp sự cố.",
      "Cảnh báo áp suất dầu ở mức thấp."
    ],
    "img": "images/q344.webp"
  },
  {
    "id": 345,
    "question": "Câu 345: Nút bấm biểu tượng như hình vẽ trên xe ô tô có ý nghĩa như thế nào?",
    "options": [
      "Báo hiệu xin đường cho xe đi thẳng.",
      "Báo hiệu hệ thống phanh bị lỗi.",
      "Báo hiệu xe đang ở tình huống nguy hiểm.",
      "Báo hiệu đến thời gian cần bảo dưỡng"
    ],
    "img": "images/q345.webp"
  },
  {
    "id": 346,
    "question": "Câu 346: Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô tải, xe ô tô con, xe mô tô.",
      "Xe ô tô con, xe ô tô tải, xe mô tô.",
      "Xe mô tô, xe ô tô con, xe ô tô tải.",
      "Xe ô tô con, xe mô tô, xe ô tô tải."
    ],
    "img": "images/q346.webp"
  },
  {
    "id": 347,
    "question": "Câu 347: Xe nào phải nhường đường trong trường hợp này?",
    "options": [
      "Xe ô tô con.",
      "Xe ô tô tải."
    ],
    "img": "images/q347.webp"
  },
  {
    "id": 348,
    "question": "Câu 348: Trong trường hợp này xe nào được quyền đi trước?",
    "options": [
      "Xe mô tô.",
      "Xe ô tô con."
    ],
    "img": "images/q348.webp"
  },
  {
    "id": 349,
    "question": "Câu 349: Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô con màu đỏ, xe cứu thương, xe ô tô con màu xanh.",
      "Xe cứu thương, xe ô tô con màu đỏ, xe ô tô con màu xanh.",
      "Xe ô tô con màu đỏ, xe ô tô con màu xanh, xe cứu thương."
    ],
    "img": "images/q349.webp"
  },
  {
    "id": 350,
    "question": "Câu 350: Xe nào phải nhường đường trong trường hợp này?",
    "options": [
      "Xe ô tô con.",
      "Xe của Anh (chị).",
      "Xe ô tô tải."
    ],
    "img": "images/q350.webp"
  },
  {
    "id": 351,
    "question": "Câu 351: Xe nào phải nhường đường đi cuối cùng qua nơi giao nhau này?",
    "options": [
      "Xe ô tô khách.",
      "Xe ô tô tải.",
      "Xe ô tô con."
    ],
    "img": "images/q351.webp"
  },
  {
    "id": 352,
    "question": "Câu 352: Xe ô tô tải phía trước có tín hiệu xin chuyển làn đường, anh (chị) xử lý như thế nào?",
    "options": [
      "Bật tín hiệu chuyển sang làn đường bên trái để vượt xe ô tô tải.",
      "Bấm còi báo hiệu và vượt xe ô tô tải trên làn đường của mình.",
      "Giảm tốc độ, nhường đường cho xe ô tô tải."
    ],
    "img": "images/q352.webp"
  },
  {
    "id": 353,
    "question": "Câu 353: Theo tín hiệu đèn, xe nào được phép đi?",
    "options": [
      "Xe ô tô con và xe ô tô khách.",
      "Xe mô tô."
    ],
    "img": "images/q353.webp"
  },
  {
    "id": 354,
    "question": "Câu 354: Theo tín hiệu đèn, xe nào phải dừng lại là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô khách, xe mô tô.",
      "Xe ô tô tải, xe mô tô.",
      "Xe ô tô con, xe ô tô tải."
    ],
    "img": "images/q354.webp"
  },
  {
    "id": 355,
    "question": "Câu 355: Theo tín hiệu đèn, xe ô tô tải đi theo hướng nào là đúng quy tắc giao thông?",
    "options": [
      "Hướng 2, 3 và 4.",
      "Hướng 1.",
      "Hướng 1 và 2.",
      "Hướng 3 và 4."
    ],
    "img": "images/q355.webp"
  },
  {
    "id": 356,
    "question": "Câu 356: Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",
    "options": [
      "Xe ô tô khách, xe ô tô tải, xe mô tô.",
      "Xe ô tô tải, xe ô tô con, xe mô tô.",
      "Xe ô tô khách, xe ô tô con, xe mô tô."
    ],
    "img": "images/q356.webp"
  },
  {
    "id": 357,
    "question": "Câu 357: Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô khách, xe ô tô tải, xe mô tô, xe ô tô con.",
      "Xe ô tô con, xe ô tô khách, xe ô tô tải, xe mô tô.",
      "Xe mô tô, xe ô tô tải, xe ô tô khách, xe ô tô con.",
      "Xe mô tô, xe ô tô tải, xe ô tô con, xe ô tô khách."
    ],
    "img": "images/q357.webp"
  },
  {
    "id": 358,
    "question": "Câu 358: Theo hướng mũi tên, những hướng nào xe gắn máy đi được?",
    "options": [
      "Cả 3 hướng.",
      "Hướng 1 và 3.",
      "Hướng 1."
    ],
    "img": "images/q358.webp"
  },
  {
    "id": 359,
    "question": "Câu 359: Theo hướng mũi tên, hướng nào xe không được phép đi?",
    "options": [
      "Hướng 2 và 5.",
      "Hướng 1."
    ],
    "img": "images/q359.webp"
  },
  {
    "id": 360,
    "question": "Câu 360: Theo hướng mũi tên, những hướng nào xe ô tô không được phép đi?",
    "options": [
      "Hướng 1 và 2.",
      "Hướng 3.",
      "Hướng 1 và 4.",
      "Hướng 2 và 3."
    ],
    "img": "images/q360.webp"
  },
  {
    "id": 361,
    "question": "Câu 361: Xe nào được quyền đi trước trong trường hợp này?",
    "options": [
      "Xe ô tô con.",
      "Xe xích lô."
    ],
    "img": "images/q361.webp"
  },
  {
    "id": 362,
    "question": "Câu 362: Theo hướng mũi tên, những hướng nào xe ô tô con được phép đi?",
    "options": [
      "Hướng 1.",
      "Hướng 1, 3 và 4.",
      "Hướng 2, 3 và 4.",
      "Cả bốn hướng."
    ],
    "img": "images/q362.webp"
  },
  {
    "id": 363,
    "question": "Câu 363: Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô (A), xe mô tô, xe ô tô (B), xe đạp.",
      "Xe ô tô (B), xe đạp, xe mô tô, xe ô tô (A).",
      "Xe ô tô (A), xe ô tô (B), xe mô tô + xe đạp.",
      "Xe mô tô + xe đạp, xe ô tô (A), xe ô tô (B)."
    ],
    "img": "images/q363.webp"
  },
  {
    "id": 364,
    "question": "Câu 364: Theo hướng mũi tên, những hướng nào xe ô tô tải được phép đi?",
    "options": [
      "Hướng 1.",
      "Hướng 1, 3 và 4.",
      "Hướng 1, 2 và 3.",
      "Cả bốn hướng."
    ],
    "img": "images/q364.webp"
  },
  {
    "id": 365,
    "question": "Câu 365: Những hướng nào xe ô tô tải được phép đi?",
    "options": [
      "Hướng 1.",
      "Hướng 1 và 4.",
      "Hướng 1 và 5.",
      "Hướng 1, 4 và 5."
    ],
    "img": "images/q365.webp"
  },
  {
    "id": 366,
    "question": "Câu 366: Những hướng nào xe ô tô tải được phép di?",
    "options": [
      "Cả bốn hướng.",
      "Trừ hướng 2.",
      "Hướng 2, 3 và 4.",
      "Trừ hướng 4."
    ],
    "img": "images/q366.webp"
  },
  {
    "id": 367,
    "question": "Câu 367: Xe ô tô con đi theo chiều mũi tên có vi phạm quy tắc giao thông không?",
    "options": [
      "Không vi phạm.",
      "Vi phạm."
    ],
    "img": "images/q367.webp"
  },
  {
    "id": 368,
    "question": "Câu 368: Theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",
    "options": [
      "Xe ô tô khách.",
      "Xe mô tô.",
      "Xe ô tô con.",
      "Xe ô tô con và xe mô tô."
    ],
    "img": "images/q368.webp"
  },
  {
    "id": 369,
    "question": "Câu 369: Theo hiệu lệnh của người điều khiển giao thông, các xe đi như thế nào là đúng?",
    "options": [
      "Các xe ở phía tay phải và tay trái của người điều khiển được phép đi thẳng.",
      "Cho phép các xe ở mọi hướng được rẽ phải.",
      "Tất cả các xe phải đứng lại trước ngã tư, trừ những xe đã ở trong ngã tư được phép tiếp tục đi."
    ],
    "img": "images/q369.webp"
  },
  {
    "id": 370,
    "question": "Câu 370: Theo hiệu lệnh của người điều khiển giao thông, xe nào được phép đi?",
    "options": [
      "Xe mô tô, xe ô tô con.",
      "Xe ô tô con, xe ô tô tải.",
      "Xe mô tô, xe ô tô tải.",
      "Cả ba xe."
    ],
    "img": "images/q370.webp"
  },
  {
    "id": 371,
    "question": "Câu 371: Xe ô tô con vượt xe ô tô tải như trường hợp này có đúng không?",
    "options": [
      "Đúng.",
      "Không đúng."
    ],
    "img": "images/q371.webp"
  },
  {
    "id": 372,
    "question": "Câu 372: Đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",
    "options": [
      "Xe chữa cháy đi làm nhiệm vụ.",
      "Xe ô tô tải.",
      "Cả 2 xe đều đúng."
    ],
    "img": "images/q372.webp"
  },
  {
    "id": 373,
    "question": "Câu 373: Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô khách, xe ô tô tải, xe ô tô con.",
      "Xe ô tô con và xe ô tô tải, xe ô tô khách.",
      "Xe ô tô tải, xe ô tô khách, xe ô tô con."
    ],
    "img": "images/q373.webp"
  },
  {
    "id": 374,
    "question": "Câu 374: Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô khách và xe ô tô tải, xe ô tô con.",
      "Xe ô tô tải, xe ô tô khách, xe ô tô con.",
      "Xe ô tô con, xe ô tô khách, xe ô tô tải."
    ],
    "img": "images/q374.webp"
  },
  {
    "id": 375,
    "question": "Câu 375: Những hướng nào xe ô tô tải được phép",
    "options": [
      "Cả bốn hướng.",
      "Hướng 1 và 2.",
      "Trừ hướng 4."
    ],
    "img": "images/q375.webp"
  },
  {
    "id": 376,
    "question": "Câu 376: Những hướng nào xe ô tô tải được phép",
    "options": [
      "Cả bốn hướng.",
      "Hướng 1, 2 và 3.",
      "Hướng 1, 3 và 4."
    ],
    "img": "images/q376.webp"
  },
  {
    "id": 377,
    "question": "Câu 377: Theo tín hiệu đèn, xe nào chấp hành đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô khách, xe mô tô.",
      "Xe ô tô tải, xe mô tô.",
      "Xe ô tô con, xe ô tô tải.",
      "Tất cả các loại xe trên."
    ],
    "img": "images/q377.webp"
  },
  {
    "id": 378,
    "question": "Câu 378: Theo hướng mũi tên, những hướng nào xe mô tô được phép đi?",
    "options": [
      "Cả ba hướng.",
      "Hướng 1 và 2.",
      "Hướng 1 và 3.",
      "Hướng 2 và 3."
    ],
    "img": "images/q378.webp"
  },
  {
    "id": 379,
    "question": "Câu 379: Theo tín hiệu đèn, xe nào phải dừng lại là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô khách, xe mô tô.",
      "Xe ô tô tải, xe mô tô.",
      "Xe ô tô con, xe ô tô tải."
    ],
    "img": "images/q379.webp"
  },
  {
    "id": 380,
    "question": "Câu 380: Xe nào phải nhường đường là đúng quy",
    "options": [
      "Xe ô tô tải.",
      "Xe ô tô khách.",
      "Xe ô tô con."
    ],
    "img": "images/q380.webp"
  },
  {
    "id": 381,
    "question": "Câu 381: Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",
    "options": [
      "Xe ô tô con.",
      "Xe ô tô tải.",
      "Xe ô tô con, xe ô tô tải."
    ],
    "img": "images/q381.webp"
  },
  {
    "id": 382,
    "question": "Câu 382: Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",
    "options": [
      "Xe ô tô tải, xe ô tô con.",
      "Xe ô tô khách, xe ô tô con.",
      "Xe ô tô khách, xe ô tô tải."
    ],
    "img": "images/q382.webp"
  },
  {
    "id": 383,
    "question": "Câu 383: Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",
    "options": [
      "Xe ô tô con, xe ô tô tải, xe ô tô khách.",
      "Xe ô tô tải, xe ô tô khách, xe mô tô.",
      "Xe ô tô khách, xe mô tô, xe ô tô con.",
      "Cả 4 xe."
    ],
    "img": "images/q383.webp"
  },
  {
    "id": 384,
    "question": "Câu 384: Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",
    "options": [
      "Xe ô tô khách, xe ô tô tải.",
      "Xe ô tô khách, xe ô tô con.",
      "Xe ô tô con, xe ô tô tải.",
      "Xe ô tô khách, xe ô tô tải, xe ô tô con."
    ],
    "img": "images/q384.webp"
  },
  {
    "id": 385,
    "question": "Câu 385: Các xe đi theo hướng mũi tên, xe nào chấp hành quy tắc giao thông?",
    "options": [
      "Xe ô tô tải, xe mô tô.",
      "Xe ô tô khách, xe mô tô.",
      "Xe ô tô tải, xe ô tô con.",
      "Xe mô tô, xe ô tô con."
    ],
    "img": "images/q385.webp"
  },
  {
    "id": 386,
    "question": "Câu 386: Trong hình dưới, những xe nào vi phạm quy tắc giao thông?",
    "options": [
      "Xe ô tô con (1), xe ô tô con (2), xe ô tô tải (4).",
      "Xe ô tô tải (4), xe ô tô con (5), xe buýt (6).",
      "Xe ô tô tải (4), xe ô tô con (2).",
      "Xe ô tô con (2), xe ô tô con (3)."
    ],
    "img": "images/q386.webp"
  },
  {
    "id": 387,
    "question": "Câu 387: Theo tín hiệu đèn, xe nào phải dừng lại à đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô khách, xe mô tô.",
      "Xe ô tô tải, xe mô tô.",
      "Xe ô tô con, xe ô tô tải."
    ],
    "img": "images/q387.webp"
  },
  {
    "id": 388,
    "question": "Câu 388: Xe ô tô con quay đầu xe đi ngược lại như hình vẽ dưới có vi phạm quy tắc giao thông không?",
    "options": [
      "Không vi phạm.",
      "Vi phạm."
    ],
    "img": "images/q388.webp"
  },
  {
    "id": 389,
    "question": "Câu 389: Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe công an, xe ô tô khách, xe ô tô tải, xe ô tô con.",
      "Xe công an, xe ô tô con, xe ô tô tải, xe ô tô khách.",
      "Xe ô tô khách, xe công an, xe ô tô con, xe ô tô tải.",
      "Xe công an, xe ô tô con, xe ô tô khách, xe ô tô tải."
    ],
    "img": "images/q389.webp"
  },
  {
    "id": 390,
    "question": "Câu 390: Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe chữa cháy, xe cứu thương, xe ô tô con.",
      "Xe chữa cháy, xe ô tô con, xe cứu thương.",
      "Xe cứu thương, xe chữa cháy, xe ô tô con."
    ],
    "img": "images/q390.webp"
  },
  {
    "id": 391,
    "question": "Câu 391: Xe nào phải nhường đường là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô con.",
      "Xe ô tô tải."
    ],
    "img": "images/q391.webp"
  },
  {
    "id": 392,
    "question": "Câu 392: Xe nào được quyền đi trước?",
    "options": [
      "Xe ô tô tải.",
      "Xe ô tô con (A).",
      "Xe ô tô con (B)."
    ],
    "img": "images/q392.webp"
  },
  {
    "id": 393,
    "question": "Câu 393: Những hướng nào xe ô tô tải được phép đi?",
    "options": [
      "Hướng 2 và 3.",
      "Hướng 2.",
      "Cả 3 hướng."
    ],
    "img": "images/q393.webp"
  },
  {
    "id": 394,
    "question": "Câu 394: Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe công an, xe ô tô con, xe ô tô tải, xe ô tô khách.",
      "Xe ô tô con, xe ô tô khách và xe công an, xe ô tô tải.",
      "Xe công an, xe ô tô con, xe ô tô khách, xe ô tô tải.",
      "Xe ô tô con, xe ô tô tải, xe ô tô khách, xe công an."
    ],
    "img": "images/q394.webp"
  },
  {
    "id": 395,
    "question": "Câu 395: Xe nào được quyền đi trước trong trường hợp này?",
    "options": [
      "Xe công an đi làm nhiệm vụ.",
      "Xe chữa cháy đi làm nhiệm vụ."
    ],
    "img": "images/q395.webp"
  },
  {
    "id": 396,
    "question": "Câu 396: Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô tải, xe mô tô, xe ô tô khách, xe ô tô con.",
      "Xe ô tô tải, xe ô tô khách, xe ô tô con, xe mô tô.",
      "Xe ô tô khách, xe ô tô tải, xe ô tô con, xe mô tô.",
      "Xe mô tô, xe ô tô khách, xe ô tô con, xe ô tô tải."
    ],
    "img": "images/q396.webp"
  },
  {
    "id": 397,
    "question": "Câu 397: Trong trường hợp này xe nào được quyền đi trước?",
    "options": [
      "Xe công an đi làm nhiệm vụ.",
      "Xe quân sự đi làm nhiệm vụ."
    ],
    "img": "images/q397.webp"
  },
  {
    "id": 398,
    "question": "Câu 398: Trong trường hợp này, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe công an đi làm nhiệm vụ, xe quân sự đi làm nhiệm vụ, xe ô tô + xe mô tô.",
      "Xe quân sự đi làm nhiệm vụ, xe công an đi làm nhiệm vụ, xe ô tô + xe mô tô.",
      "Xe ô tô + xe mô tô, xe quân sự đi làm nhiệm vụ, xe công an đi làm nhiệm vụ."
    ],
    "img": "images/q398.webp"
  },
  {
    "id": 399,
    "question": "Câu 399: Anh (chị) điều khiển xe chạy theo hướng nào là đúng quy tắc giao thông?",
    "options": [
      "Hướng 2.",
      "Hướng 1 và 2.",
      "Tất cả các hướng trừ hướng 3.",
      "Tất cả các hướng trừ hướng 4."
    ],
    "img": "images/q399.webp"
  },
  {
    "id": 400,
    "question": "Câu 400: Xe nào phải nhường là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô màu vàng (1).",
      "Xe ô tô màu xanh (2)."
    ],
    "img": "images/q400.webp"
  },
  {
    "id": 401,
    "question": "Câu 401: Xe nào đi trước là đúng quy tắc giao thông?",
    "options": [
      "Xe của anh (chị).",
      "Xe ô tô con."
    ],
    "img": "images/q401.webp"
  },
  {
    "id": 402,
    "question": "Câu 402: Trong trường hợp này, anh (chị) có thể quay đầu xe như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Quay đầu theo hướng A.",
      "Quay đầu theo hướng B."
    ],
    "img": "images/q402.webp"
  },
  {
    "id": 403,
    "question": "Câu 403: Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô con và xe ô tô tải, xe của anh (chị).",
      "Xe của anh (chị), xe ô tô tải, xe ô tô con.",
      "Xe của anh (chị) và xe ô tô con, xe ô tô tải.",
      "Xe của anh (chị), xe ô tô tải + xe ô tô con."
    ],
    "img": "images/q403.webp"
  },
  {
    "id": 404,
    "question": "Câu 404: Khi muốn vượt xe ô tô tải, anh (chị) phải làm gì là đúng quy tắc giao thông?",
    "options": [
      "Tăng tốc cho xe chạy vượt qua.",
      "Bật tín hiệu báo hiệu bằng đèn hoặc còi, khi đủ điều kiện an toàn, tăng tốc cho xe chạy vượt qua.",
      "Đánh lái ; làn bên trái và tăng tốc cho xe chạy vượt qua."
    ],
    "img": "images/q404.webp"
  },
  {
    "id": 405,
    "question": "Câu 405: Trong hình dưới đây, những xe nào vi phạm quy tắc giao thông?",
    "options": [
      "Xe ô tô khách (1), xe mô tô (3).",
      "Xe ô tô con (4), xe mô tô (3).",
      "Xe ô tô tải (2), xe mô tô (5).",
      "Xe ô tô tải (2), xe ô tô khách (1)."
    ],
    "img": "images/q405.webp"
  },
  {
    "id": 406,
    "question": "Câu 406: Anh (chị) có được vượt xe phía trước trong ngã tư để đi thẳng hay không?",
    "options": [
      "Được vượt.",
      "Cấm vượt."
    ],
    "img": "images/q406.webp"
  },
  {
    "id": 407,
    "question": "Câu 407: Xe của anh (chị) có được phép vượt xe mô tô phía trước không?",
    "options": [
      "Được vượt.",
      "Không được vượt."
    ],
    "img": "images/q407.webp"
  },
  {
    "id": 408,
    "question": "Câu 408: Anh (chị) dừng xe tại vị trí nào là đúng quy tắc giao thông?",
    "options": [
      "Vị trí A và B.",
      "Vị trí A và C.",
      "Vị trí B và C.",
      "Cả 3 vị trí."
    ],
    "img": "images/q408.webp"
  },
  {
    "id": 409,
    "question": "Câu 409: Xe của anh (chị) được đỗ ở vị trí nào trong tình huống này?",
    "options": [
      "Được phép đỗ ở vị trí 1.",
      "Được phép đỗ ở vị trí 1 và 2.",
      "Được phép đỗ ở vị trí 2.",
      "Không được phép đỗ ở vị trí 1 và 2."
    ],
    "img": "images/q409.webp"
  },
  {
    "id": 410,
    "question": "Câu 410: Trong hình dưới, những xe nào vi phạm quy tắc giao thông?",
    "options": [
      "Xe ô tô con (2), xe mô tô (3).",
      "Xe ô tô con (1), xe mô tô (3).",
      "Xe ô tô con (5), xe mô tô (4).",
      "Tất cả các loại xe trên."
    ],
    "img": "images/q410.webp"
  },
  {
    "id": 411,
    "question": "Câu 411: Anh (chị) phải điều khiển xe rẽ trái như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Rẽ trái ngay trước xe ô tô tải.",
      "Nhường đường cho xe buýt.",
      "Nhường đường cho xe ô tô tải và xe buýt."
    ],
    "img": "images/q411.webp"
  },
  {
    "id": 412,
    "question": "Câu 412: Khi xe phía trước đang lùi ra khỏi nơi đỗ, anh (chị) xử lý như thế nào?",
    "options": [
      "Chuyển sang nửa đường bên trái để tiếp tục đi.",
      "Bấm còi, nháy đèn báo hiệu để tiếp tục đi.",
      "Giảm tốc độ, dừng lại và nhường đường."
    ],
    "img": "images/q412.webp"
  },
  {
    "id": 413,
    "question": "Câu 413: Xe nào vượt đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô tải.",
      "Cả hai xe.",
      "Xe ô tô con."
    ],
    "img": "images/q413.webp"
  },
  {
    "id": 414,
    "question": "Câu 414: Khi điều khiển xe trên đường, gặp chướng ngại vật (xe hỏng phía trước), anh (chị) phải làm gì?",
    "options": [
      "Đánh lái sang trái cho xe vượt qua.",
      "Giảm tốc độ, quan sát phía trước, phía sau, khi đủ điều kiện an toàn, bật tín hiệu bằng đèn, còi rồi cho xe chạy vượt qua.",
      "Cấm vượt."
    ],
    "img": "images/q414.webp"
  },
  {
    "id": 415,
    "question": "Câu 415: Trong trường hợp này, anh (chị) xử lý như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Nhường đường cho xe đạp và xe ô tô khách.",
      "Nhường đường cho xe đạp và đi trước xe ô tô khách.",
      "Nhường đường cho xe ô tô khách và đi trước xe đạp."
    ],
    "img": "images/q415.webp"
  },
  {
    "id": 416,
    "question": "Câu 416: Xe kéo nhau trong trường hợp này đúng quy định không?",
    "options": [
      "Không đúng.",
      "Đúng."
    ],
    "img": "images/q416.webp"
  },
  {
    "id": 417,
    "question": "Câu 417: Xe nào phải nhường đường trong trường hợp này?",
    "options": [
      "Xe ô tô khách.",
      "Xe ô tô tải."
    ],
    "img": "images/q417.webp"
  },
  {
    "id": 418,
    "question": "Câu 418: Xe kéo nhau như hình dưới đây có vi phạm quy tắc giao thông không?",
    "options": [
      "Không.",
      "Vi phạm."
    ],
    "img": "images/q418.webp"
  },
  {
    "id": 419,
    "question": "Câu 419: Trong tình huống này, anh (chị) xử lý như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Giảm tốc độ, rẽ phải sau xe ô tô tải và xe đạp.",
      "Tăng tốc độ, rẽ phải trước xe ô tô tải và xe đạp.",
      "Tăng tốc độ, rẽ phải trước xe đạp."
    ],
    "img": "images/q419.webp"
  },
  {
    "id": 420,
    "question": "Câu 420: Xe của anh (chị) được đi theo những hướng nào trong trường hợp này?",
    "options": [
      "Chuyển sang làn đường bên phải và rẽ phải.",
      "Dừng lại trước vạch dừng và rẽ phải khi đèn xanh.",
      "Dừng lại trước vạch dừng và đi thẳng hoặc rẽ trái khi đèn xanh."
    ],
    "img": "images/q420.webp"
  },
  {
    "id": 421,
    "question": "Câu 421: Theo hướng mũi tên, gặp biển hướng đi phải theo đặt trước ngã tư, những hướng nào xe được phép đi?",
    "options": [
      "Hướng 2 và 3.",
      "Hướng 1, 2 và 3.",
      "Hướng 1 và 3."
    ],
    "img": "images/q421.webp"
  },
  {
    "id": 422,
    "question": "Câu 422: Xe nào vượt đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô khách.",
      "Xe ô tô con.",
      "Cả hai xe đều đúng.",
      "Cả hai xe đều không đúng."
    ],
    "img": "images/q422.webp"
  },
  {
    "id": 423,
    "question": "Câu 423: Xe ô tô tải kéo xe mô tô ba bánh như hình này có đúng quy tắc giao thông không?",
    "options": [
      "Đúng.",
      "Không đúng."
    ],
    "img": "images/q423.webp"
  },
  {
    "id": 424,
    "question": "Câu 424: Xe nào đỗ vi phạm quy tắc giao thông?",
    "options": [
      "Xe mô tô.",
      "Xe ô tô tải.",
      "Cả ba xe.",
      "Xe mô tô và xe ô tô tải."
    ],
    "img": "images/q424.webp"
  },
  {
    "id": 425,
    "question": "Câu 425: Xe nào đỗ vi phạm quy tắc giao thông?",
    "options": [
      "Cả hai xe.",
      "Xe mô tô.",
      "Xe ô tô tải.",
      "Không xe nào vi phạm."
    ],
    "img": "images/q425.webp"
  },
  {
    "id": 426,
    "question": "Câu 426: Phía trước có xe ô tô màu xanh đang vượt xe ô tô màu vàng, anh (chị) xử lý như thế",
    "options": [
      "Bấm còi, nháy đèn báo hiệu, giữ nguyên tốc độ và đi tiếp.",
      "Giảm tốc độ và đi sát vào lề đường bên phải.",
      "Giảm tốc độ và đi sát vào lề đường bên trái."
    ],
    "img": "images/q426.webp"
  },
  {
    "id": 427,
    "question": "Câu 427: Trong trường hợp này xe nào đỗ vi phạm quy tắc giao thông?",
    "options": [
      "Xe ô tô tải.",
      "Xe ô tô con và xe mô tô.",
      "Cả 3 xe.",
      "Xe ô tô con và xe ô tô tải."
    ],
    "img": "images/q427.webp"
  },
  {
    "id": 428,
    "question": "Câu 428: Trong tình huống dưới đây, xe ô tô màu vàng vượt xe ô tô màu đỏ là đúng quy tắc giao thông hay không?",
    "options": [
      "Đúng.",
      "Không đúng."
    ],
    "img": "images/q428.webp"
  },
  {
    "id": 429,
    "question": "Câu 429: Trong tình huống này, xe ô tô con muốn quay đầu thì phải xử lý thế nào?",
    "options": [
      "Nhường xe mô tô và xe ô tô tải đi thẳng sau đó quay đầu xe.",
      "Thực hiện quay đầu ngay.",
      "Cấm quay đầu."
    ],
    "img": "images/q429.webp"
  },
  {
    "id": 430,
    "question": "Câu 430: Anh (chị) xử lý như thế nào trong trường hợp này?",
    "options": [
      "Tăng tốc độ cho xe lấn sang phần đường bên trái.",
      "Giảm tốc độ cho xe lấn sang phần đường bên trái.",
      "Giảm tốc độ cho xe đi sát phần đường bên phải."
    ],
    "img": "images/q430.webp"
  },
  {
    "id": 431,
    "question": "Câu 431: Xe container đang rẽ phải, các phương tiện phía sau đi như thế nào để đảm bảo an toàn?",
    "options": [
      "Vượt về phía bên phải để đi tiếp.",
      "Giảm tốc độ chờ xe container rẽ xong rồi tiếp tục đi.",
      "Vượt về phía bên trái để đi tiếp."
    ],
    "img": "images/q431.webp"
  },
  {
    "id": 432,
    "question": "Câu 432: Xe nào vi phạm quy tắc giao thông?",
    "options": [
      "Xe ô tô con.",
      "Xe mô tô.",
      "Không xe nào vi phạm."
    ],
    "img": "images/q432.webp"
  },
  {
    "id": 433,
    "question": "Câu 433: Các xe đi như thế nào là đúng quy tắc giao thông đường bộ?",
    "options": [
      "Xe ô tô con, xe ô tô tải, xe của bạn.",
      "Xe của bạn, xe ô tô tải, xe ô tô con.",
      "Xe ô tô tải, xe của bạn, xe ô tô con.",
      "Xe của bạn, xe ô tô con, xe ô tô tải."
    ],
    "img": "images/q433.webp"
  },
  {
    "id": 434,
    "question": "Câu 434: Khi gặp xe ngược chiều bật đèn pha trong tình huống dưới đây, anh (chị) xử lý như thế nào?",
    "options": [
      "Bật đèn chiếu xa, tăng tốc độ vượt xe cùng chiều.",
      "Giữ nguyên đèn chiếu gần, giảm tốc độ, đi sau xe phía trước.",
      "Giữ nguyên đèn chiếu gần, tăng tốc độ vượt xe cùng chiều."
    ],
    "img": "images/q434.webp"
  },
  {
    "id": 435,
    "question": "Câu 435: Anh (chị) điều khiển xe như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Quan sát nếu không có tàu thì tăng tốc cho xe vượt qua.",
      "Dừng lại trước trước vạch dừng xe.",
      "Ra tín hiệu cho người gác chắn tàu kéo chậm rào chắn để đi qua"
    ],
    "img": "images/q435.webp"
  },
  {
    "id": 436,
    "question": "Câu 436: Tình huống này, để điều khiển cho xe đi thẳng anh (chị) phải làm gì là đúng quy tắc giao thông?",
    "options": [
      "Nhường xe ô tô con rẽ trái trước.",
      "Không nhường đường, đi thẳng."
    ],
    "img": "images/q436.webp"
  },
  {
    "id": 437,
    "question": "Câu 437: Theo tín hiệu đèn của xe cơ giới, xe nào vi phạm quy tắc giao thông?",
    "options": [
      "Cả hai xe.",
      "Xe mô tô.",
      "Xe ô tô con.",
      "Không xe nào vi phạm."
    ],
    "img": "images/q437.webp"
  },
  {
    "id": 438,
    "question": "Câu 438: Xe nào phải nhường đường là đúng quy tắc giao thông?",
    "options": [
      "Xe A.",
      "Xe B."
    ],
    "img": "images/q438.webp"
  },
  {
    "id": 439,
    "question": "Câu 439: Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "Xe của anh (chị), xe mô tô, xe ô tô con.",
      "Xe mô tô, xe ô tô con, xe của anh (chị).",
      "Xe mô tô, xe của anh (chị), xe ô tô con."
    ],
    "img": "images/q439.webp"
  },
  {
    "id": 440,
    "question": "Câu 440: Trong tình huống này, xe ô tô con màu đỏ nhập đường cao tốc theo hướng mũi tên là đúng hay sai?",
    "options": [
      "Đúng.",
      "Sai."
    ],
    "img": "images/q440.webp"
  },
  {
    "id": 441,
    "question": "Câu 441: Trong trường hợp này, xe nào phải dừng lại là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô con.",
      "Xe của anh (chị).",
      "Cả hai xe."
    ],
    "img": "images/q441.webp"
  },
  {
    "id": 442,
    "question": "Câu 442: Xe của anh (chị) được đi theo hướng nào trong trường hợp này?",
    "options": [
      "Đi thẳng.",
      "Rẽ phải.",
      "Đi thẳng hoặc rẽ trái.",
      "Đi thẳng hoặc rẽ phải."
    ],
    "img": "images/q442.webp"
  },
  {
    "id": 443,
    "question": "Câu 443: Anh (chị) xử lý như thế nào trong trường hợp này?",
    "options": [
      "Tăng tốc độ, rẽ phải trước xe ô tô màu xanh và người đi bộ.",
      "Giảm tốc độ, nhường đường cho người đi bộ qua đường và rẽ phải sau xe ô tô màu xanh.",
      "Giảm tốc độ, để người đi bộ qua đường và rẽ phải trước xe ô tô màu xanh."
    ],
    "img": "images/q443.webp"
  },
  {
    "id": 444,
    "question": "Câu 444: Xe nào phải nhường đường trong trường hợp này?",
    "options": [
      "Xe đi ngược chiều.",
      "Xe của anh (chị)."
    ],
    "img": "images/q444.webp"
  },
  {
    "id": 445,
    "question": "Câu 445: Anh (chị) xử lý như thế nào khi muốn vượt qua đoàn người đi xe đạp có tổ chức?",
    "options": [
      "Tăng tốc độ, chuyển sang làn đường phía bên trái để vượt.",
      "Không được vượt."
    ],
    "img": "images/q445.webp"
  },
  {
    "id": 446,
    "question": "Câu 446: Trong tình huống này, xe ô tô màu đỏ hay xe ô tô màu trắng phải nhường đường là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô màu đỏ.",
      "Xe ô tô màu trắng."
    ],
    "img": "images/q446.webp"
  },
  {
    "id": 447,
    "question": "Câu 447: Trong tình huống này, xe ô tô con màu đỏ có được phép vượt khi xe ô tô con màu xanh đang vượt xe ô tô tải không?",
    "options": [
      "Được vượt.",
      "Không được vượt."
    ],
    "img": "images/q447.webp"
  },
  {
    "id": 448,
    "question": "Câu 448: Xe nào phải nhường đường trong trường hợp này?",
    "options": [
      "Xe ô tô con.",
      "Xe của bạn."
    ],
    "img": "images/q448.webp"
  },
  {
    "id": 449,
    "question": "Câu 449: Trong trường hợp này, xe ô tô con rẽ phải vào làn đường nào là đúng?",
    "options": [
      "Làn đường 1.",
      "Làn đường 2.",
      "Ý 1 và ý 2."
    ],
    "img": "images/q449.webp"
  },
  {
    "id": 450,
    "question": "Câu 450: Trong tình huống này, xe ô tô con có đi đúng quy tắc giao thông không?",
    "options": [
      "Đúng.",
      "Không đúng."
    ],
    "img": "images/q450.webp"
  },
  {
    "id": 451,
    "question": "Câu 451: Trong trường hợp này, xe ô tô con có được vượt xe ô tô khách không?",
    "options": [
      "Không được vượt.",
      "Được vượt."
    ],
    "img": "images/q451.webp"
  },
  {
    "id": 452,
    "question": "Câu 452: Các xe đi theo thứ tự nào là đúng quy tắc giao thông?",
    "options": [
      "Xe ô tô con, xe ô tô tải, xe của bạn.",
      "Xe ô tô tải, xe ô tô con, xe của bạn.",
      "Xe ô tô tải, xe của bạn, xe ô tô con."
    ],
    "img": "images/q452.webp"
  },
  {
    "id": 453,
    "question": "Câu 453: Xe của anh (chị) có được phép vượt xe ô tô tải trong trường hợp này không?",
    "options": [
      "Được phép.",
      "Không được phép.",
      "Được phép nhưng phải đảm bảo an toàn."
    ],
    "img": "images/q453.webp"
  },
  {
    "id": 454,
    "question": "Câu 454: Trong tình huống này, xe ô tô màu đen phải xử lý như thế nào?",
    "options": [
      "Phải cho xe dừng lại.",
      "Nhường đường cho người đi bộ sau đó rẽ phải.",
      "Được phép rẽ phải ngay."
    ],
    "img": "images/q454.webp"
  },
  {
    "id": 455,
    "question": "Câu 455: Trong trường hợp này, xe ô tô có được phép vượt xe mô tô không?",
    "options": [
      "Được phép.",
      "Không được phép."
    ],
    "img": "images/q455.webp"
  },
  {
    "id": 456,
    "question": "Câu 456: Văn hóa giao thông được hiểu như thế nào là đúng?",
    "options": [
      "Văn hóa giao thông là sự hoàn thiện hệ thống pháp luật điều chỉnh các mối quan hệ trong hoạt động giao thông vận tải.",
      "Văn hóa giao thông là ý thức chấp hành các quy định pháp luật về trật tự, an toàn giao thông.",
      "Có thái độ ứng xử đúng mực khi tham gia giao thông và trong thực thi pháp luật bảo đảm trật tự, an toàn giao thông.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 457,
    "question": "Câu 457: Văn hóa giao thông của người lái xe Công an nhân dân gồm những tiêu chí gì?",
    "options": [
      "Gương mẫu trong chấp hành pháp luật về giao thông đường bộ, trong giao tiếp ứng xử đúng mực, thân thiện. Chủ động đảm bảo chất lượng an toàn phương tiện để sẵn sàng phục vụ cho các tình huống chiến đấu, công tác.",
      "Có tinh thần ham học hỏi, nâng cao trình độ chuyên môn nghiệp vụ, ứng phó linh hoạt, kịp thời các tình huống xảy ra để đạt hiệu quả tốt nhất.",
      "Luôn sẵn sàng khắc phục khó khăn, gian khổ, nguy hiểm để hoàn thành nhiệm vụ.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 458,
    "question": "Câu 458: Người lái xe phục vụ chiến đấu trọng Công an nhân dẫn cần phải đáp ứng những yêu cầu cơ bản",
    "options": [
      "Có sức khỏe, đạo đức, năng lực công tác, kỹ năng điều khiển phương tiện bảo đảm an toàn khi tham gia giao thông.",
      "Sẵn sàng tham gia chiến đấu; chủ động, tự giác thực hiện nhiệm vụ; linh hoạt, khẩn trương xử lý tình huống phức tạp.",
      "Sử dụng được đa dạng các loại xe.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 459,
    "question": "Câu 459: Người lái xe phục vụ lãnh đạo trong Công an nhân dân phải đảm bảo những yêu cầu nào?",
    "options": [
      "Có sức khỏe, đạo đức, năng lực công tác, kỹ năng điều khiển phương tiện bảo đảm an toàn khi tham gia giao thông. Kiên trì nhẫn nại, khắc phục khó khăn; chủ động thực thi công vụ; bí mật thông tin; nâng cao năng lực, trình độ bản thân.",
      "Kiên trì nhẫn nại, khắc phục khó khăn; không nghe, không thấy, không biết các thông tin không thuộc phạm vi nhiệm vụ của mình, nhất là nội dung có tính bí mật.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 460,
    "question": "Câu 460: Trách nhiệm của người lái xe khi thực hiện nhiệm vụ dẫn đoàn là gì?",
    "options": [
      "Sử dụng triệt để các quyền ưu tiên theo quy định khi tình huống khẩn cấp xảy ra; đảm bảo tuyệt đối bí mật về thời gian, địa điểm, các biện pháp chiến thuật, nghiệp vụ, thông tin liên lạc; nhanh chóng, kịp thời thực hiện theo chương trình kế hoạch hoặc chỉ đạo của cấp trên; đảm bảo tuyệt đối an toàn, vận hành thông suốt, phối hợp nhịp nhàng giữa các lực lượng.",
      "Kịp thời thực hiện theo chương trình kế hoạch hoặc chỉ đạo của cấp trên; đảm bảo tuyệt đối bí mật về thời gian, địa điểm, các biện pháp chiến thuật, nghiệp vụ; nhanh chóng, đảm bảo tuyệt đối an toàn, vận hành thông suốt, phối hợp nhịp nhàng giữa các lực lượng.",
      "Sử dụng triệt để các quyền ưu tiên; đảm bảo tuyệt đối bí mật về thời gian, địa điểm; nhanh chóng, kịp thời thực hiện theo chương trình kế hoạch; đảm bảo tuyệt đối an toàn, vận hành thông suốt, phối hợp nhịp nhàng giữa các lực lượng."
    ]
  },
  {
    "id": 461,
    "question": "Câu 461: Yêu cầu đối với người lái xe khi thực hiện nhiệm vụ cảnh vệ, dẫn đoàn, lễ tân ngoại giao là gì?",
    "options": [
      "Có hiểu biết về giao thông, được đào tạo chuyên sâu nắm vững quy trình dẫn đoàn, công tác cảnh vệ, kinh nghiệm xử lý tình huống khi thực hiện nhiệm vụ.",
      "Có bản lĩnh chính trị vững vàng, được đào tạo chuyên sâu nắm vững quy trình dẫn đoàn, công tác cảnh vệ, có kiến thức nghi lễ Nhà nước, nghi thức ngoại giao, am hiểu ngoại ngữ, kỹ năng lái xe và kinh nghiệm xử lý tình huống khi thực hiện nhiệm vụ.",
      "Nắm vững quy trình dẫn đoàn, công tác cảnh vệ, có kiến thức nghi lễ Nhà nước, nghi thức ngoại giao, am hiểu ngoại ngữ, kỹ năng lái xe và kinh nghiệm xử lý tình huống khi thực hiện nhiệm vụ."
    ]
  },
  {
    "id": 462,
    "question": "Câu 462: Theo thống kê, phân tích của các cơ quan chức năng, nguyên nhân nào chiếm đa số các vụ tai nạn giao thông đường bộ?",
    "options": [
      "Phương tiện giao thông không bảo đảm tiêu chuẩn an toàn kỹ thuật.",
      "Sự cố của đường bộ.",
      "Lỗi của người tham gia giao thông."
    ]
  },
  {
    "id": 463,
    "question": "Câu 463: Mục đích tuyên truyền, phổ biến, giáo dục pháp luật về TTATGTĐB là gì?",
    "options": [
      "Đưa các chủ trương, chính sách của Đảng, pháp luật của Nhà nước đến với các tầng lớp Nhân dân.",
      "Đưa các chủ trương, chính sách của Đảng, pháp luật của Nhà nước đến với đội ngũ cán bộ, viên chức, công chức.",
      "Đưa các chủ trương, chính sách của Đảng, pháp luật của Nhà nước đến với đội ngũ lái xe."
    ]
  },
  {
    "id": 464,
    "question": "Câu 464: Tiêu chí văn hoá giao thông đường bộ do Bộ Văn hoá, Thể thao và Du lịch ban hành quy định tiêu chí cụ thể cho những đổi tượng nào dưới đây?",
    "options": [
      "Cơ quan quản lý nhà nước về giao thông; lực lượng |làm nhiệm vụ bảo đảm trật tự, an toàn giao thông.",
      "Người tham gia giao thông; chủ phương tiện tham gia giao thông.",
      "Cư dân sinh sống bên đường giao thông.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 465,
    "question": "Câu 465: Tiêu chí Văn hóa giao thông đường bộ do Bộ Văn hóa, Thể thao và Du lịch quy định những tiêu chí chung nào?",
    "options": [
      "Tự giác chấp hành pháp luật về giao thông đường bộ; thực hiện nghiêm nhiệm vụ, tác phong chuẩn mực, văn minh; tôn trọng, nhường nhịn, giúp đỡ mọi người khi tham gia giao thông.",
      "Có trách nhiệm với bản thân và cộng đồng khi tham gia giao thông; có ý thức văn hóa xây dựng môi trường giao thông thân thiện, an toàn.",
      "Tuân thủ pháp luật khi xử lý và bị xử lý các hành vi vi phạm trật tự, an toàn giao thông; thực hiện nghiêm nhiệm vụ, tác phong chuẩn mực, văn minh; tạo dựng kết cấu hạ tầng giao thông chuẩn mực an toàn.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 466,
    "question": "Câu 466: Tiêu chí văn hóa giao thông đối với lực lượng chức năng làm nhiệm vụ bảo đảm trật tự, an toàn giao thông là gì?",
    "options": [
      "Nhanh nhạy, linh hoạt trong giải quyết các tình huống |ùn tắc, tai nạn giao thông và các tình huống khác phát  sinh trong khi thi hành công vụ.",
      "Ứng xử văn minh, không sách nhiễu, tiêu cực khi thi hành công vụ.",
      "Hướng dẫn, giúp đỡ người tham gia giao thông, đặc biệt là người tàn tật, người cao tuổi, trẻ em và phụ nữ.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 467,
    "question": "Câu 467: Để góp phần xây dựng văn hóa giao thông, người lái xe không được thực hiện hành vi nào sau đây?",
    "options": [
      "Bấm còi, rú ga liên tục.",
      "Tích cực sử dụng phương tiện giao thông công cộng.",
      "Tham gia giải tỏa vi phạm hành lang giao thông.",
      "Tất cả các ý trên."
    ]
  },
  {
    "id": 468,
    "question": "Câu 468: Người có Giấy phép lái xe do ngành Công an cấp khi không phục vụ trong ngành Công an phải thực hiện quy định nào dưới đây?",
    "options": [
      "Tiếp tục sử dụng Giấy phép lái xe do ngành Công an cấp",
      "Phải đến cơ quan quản lý Giấy phép lái xe thuộc ngành giao thông vận tải, quân đội để làm thủ tục đổi Giấy phép lái xe."
    ]
  },
  {
    "id": 469,
    "question": "Câu 469: Người tham gia giao thông phải đảm bảo những tiêu chí văn hóa giao thông nào dưới đây?",
    "options": [
      "Không vi phạm và tiếp tay cho các hành vi vi phạm pháp luật trật tự, an toàn giao thông.",
      "Chấp hành nghiêm túc hệ thống báo hiệu đường bộ, đi đúng phần đường, làn đường quy định; đã uống rượu, bia thì không điều khiển phương tiện tham gia giao thông; không điều khiển xe chạy quá tốc độ quy định.",
      "Có thái độ hợp tác, hành vi ứng xử văn minh, lịch sự khi |xảy ra tai nạn giao thông.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 470,
    "question": "Câu 470: Để xây dựng văn hóa giao thông, người tham gia giao thông cần có ý thức tự giác thực hiện những nội dung gì?",
    "options": [
      "Tăng cường hiểu biết pháp luật về giao thông; chủ động rèn luyện, tạo thói quen tự giác, ứng xử có văn hóa trong chấp hành pháp luật về trật tự, an toàn giao thông đường bộ.",
      "Tôn trọng, nhường nhịn, chia sẻ, giúp đỡ người tham gia giao thông khác, nhất là trong ùn tắc giao thông, khi va chạm, gặp tai nạn giao thông; giúp đỡ người khuyết tật, trẻ em và người cao tuổi; có ý thức trách nhiệm với bản thân và cộng đồng khi tham gia giao thông; biết bảo vệ, bênh vực cái đúng và phê phán cái sai, vui vẻ nhận lỗi khi vi phạm.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 471,
    "question": "Câu 471: Khi lái xe ô tô trên đường, gặp người đi xe đạp bị ngã gần trước đầu xe ô tô của mình, anh (chị) sẽ xử lý như thế nào?",
    "options": [
      "Không dừng lại và tiếp tục hành trình.",
      "Dừng phương tiện, xem xét tình trạng sức khỏe người đi xe đạp, nếu bị thương thì gọi xe cứu thương và thông báo cho người nhà. Nếu người đi xe đạp không có vấn đề gì về sức khỏe thì đỡ người, dắt xe đạp vào lề đường và tiếp tục hành trình."
    ]
  },
  {
    "id": 472,
    "question": "Câu 472: Khi đang lái xe, anh (chị) nhìn thấy xe đi phía trước chở vật liệu xây dựng nhưng bạt phủ đã bị bung, rách gây ô nhiễm môi trường và nguy hiểm cho người, phương tiện tham gia giao thông, anh (chị) sẽ xử lý như thế nào?",
    "options": [
      "Tìm cách để ra tín hiệu thông báo cho người lái xe chở vật liệu xây dựng biết, khắc phục theo đúng quy định của pháp luật.",
      "Tăng tốc vượt qua xe chở vật liệu xây dựng để tiếp tục hành trình của mình.",
      "Ghi nhận và thông báo cho lực lượng Cảnh sát giao thông biết để xử lý.",
      "Ý 1 và ý 3."
    ]
  },
  {
    "id": 473,
    "question": "Câu 473: Khi lái xe ô tô trên đường, phát hiện cửa sau bên phụ xe phía trước đóng không chặt, anh(chị) sẽ xử lý như thế nào?",
    "options": [
      "Bấm còi liên tục và cho xe vượt bên trái xe đó, sau đó tiếp tục hành trình.",
      "Tìm cách ra tín hiệu thông báo để người lái xe phía trước biết vấn đề mất an toàn."
    ]
  },
  {
    "id": 474,
    "question": "Câu 474: Kết thúc buổi liên hoan mà tất cả mọi người đều đã uống bia, rượu, có người trong nhóm lái xe rủ anh (chị) đi cùng, anh (chị ) sẽ xử lý thế nào?",
    "options": [
      "Từ chối không đi và khuyên người bạn nên gửi xe lại do đã uống bia, rượu.",
      "Kiên quyết không đi cùng vì sợ tai nạn.",
      "Đồng ý đi cùng với điều kiện anh (chị) lái xe."
    ]
  },
  {
    "id": 475,
    "question": "Câu 475: Khi lái xe ô tô ở đoạn đường có công trường thi công, phía trước có người đi xe đạp, anh (chị) sẽ xử lý như thế nào?",
    "options": [
      "Giảm tốc độ, giữ khoảng cách, ra tín hiệu cho người đi xe đạp biết sau đó từ từ vượt qua, hạn chế thấp nhất bụi bay lên.",
      "Bấm còi và phóng thật nhanh qua người đi xe đạp."
    ]
  },
  {
    "id": 476,
    "question": "Câu 476: Khi lái xe tham gia giao thông, bị một xe mô tô bất ngờ tạt đầu xe, anh (chị) sẽ làm gì?",
    "options": [
      "Đuổi theo để chèn ép xe mô tô vừa tạt đầu xe mình.",
      "Bình tĩnh xử lý tình huống đảm bảo an toàn và tiếp tục di chuyển.",
      "Đuổi theo để tranh luận phải trái với người đi mô tô."
    ]
  },
  {
    "id": 477,
    "question": "Câu 477: Khi lái xe tham gia giao thông vào ban đêm, gặp xe đi ngược chiều bật đèn chiếu xa, anh (chị) nên làm gì?",
    "options": [
      "Sử dụng đèn chiếu xa để chiếu lại.",
      "Giảm tốc độ và đảm bảo đèn ở phương tiện mình ở chế độ đèn chiếu gần.",
      "Bấm còi hoặc nháy đèn pha để cảnh báo.",
      "Ý 2 và ý 3."
    ]
  },
  {
    "id": 478,
    "question": "Câu 478: Khi lái xe, gặp tình huống người dẫn gia súc vượt qua đường, anh (chị) nên làm gì?",
    "options": [
      "Bấm còi liên tục để thúc giục nhanh chóng thông qua.",
      "Gấp rút tăng tốc lách lên để đi trước khi gia súc đi qua.",
      "Giảm tốc độ, không bấm còi, chờ gia súc đi qua sau đó mới di chuyển tiếp."
    ]
  },
  {
    "id": 479,
    "question": "Câu 479: Lái xe trên đường có vũng nước đọng, đang có người đi xe đạp lưu thông cùng chiều trên đoạn đường đó, anh (chị) xử lý như thế nào?",
    "options": [
      "Bấm còi cảnh báo người đi xe đạp tránh đường.",
      "Giảm tốc độ chạy chậm lại, hạn chế thấp nhất nước bắn lên.",
      "Giữ nguyên tốc độ đi qua vũng nước."
    ]
  },
  {
    "id": 480,
    "question": "Câu 480: Khi điều khiển xe ô tô trên đoạn đường xảy ra ùn tắc, anh (chị), xử lý như thế nào?",
    "options": [
      "Bấm còi liên tục thúc giục các phương tiện phía trước nhường đường.",
      "Lấn sang trái đường để vượt lên xe khác.",
      "Đi đúng phần đường, làn đường, tuân thủ hướng dẫn của người điều khiển giao thông, tín hiệu đèn giao thông, biển báo hiệu đường bộ"
    ]
  },
  {
    "id": 481,
    "question": "Câu 481: Khi thấy người vi phạm pháp luật về TTATGTĐB có hành vi lăng mạ, chửi bới và đe dọa dùng vũ lực với đồng chí Cảnh sát giao thông, anh (chị) xử lý như thế nào?",
    "options": [
      "Vận động người tham gia giao thông cùng phối hợp và hỗ trợ Cảnh sát giao thông, yêu cầu đối tượng chấp hành đúng pháp luật và không được có hành vi lăng mạ, chửi bới và đe dọa dùng vũ lực đối với người thi hành công vụ.",
      "Sử dụng thiết bị ghi âm, ghi hình ghi nhận lại tình hình vụ việc để cung cấp cho lực lượng chức năng xử lý.",
      "Cả hai ý trên."
    ]
  },
  {
    "id": 482,
    "question": "Câu 482: Khi người tham gia giao thông không chấp hành tín hiệu đèn giao thông gây ra những hậu quả nào?",
    "options": [
      "Nguy cơ xảy ra tai nạn giao thông",
      "Nguy cơ dẫn đến tình trạng giao thông hỗn loạn, ùn tắc giao thông",
      "Để lại nhũng ấn tượng không đẹp về tình trạng giao thông ở nước ta với bạn bè quốc tế.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 483,
    "question": "Câu 483: Khi người thân của anh (chị) phơi thóc, rơm rạ, nông sản trên đường bộ, anh (chị) nên làm như thế nào?",
    "options": [
      "Để người thân phơi thóc, rơm rạ, nông sản trên đường bộ do chỉ phơi ít ngày và vẫn còn đường để cho xe đi lại.",
      "Giải thích và nận động người thân không được phơi thóc, rơm nông sản trên đường bộ."
    ]
  },
  {
    "id": 484,
    "question": "Câu 484: Khi tham gia giao thông phát hiện trên đường phố bị đổ nhiều đống phế thải trái quy định gây mất an toàn giao thông, anh (chị) sẽ xử lý thế nào?",
    "options": [
      "Thông tin kịp thời cho cơ quan chức năng để khắc phục, xử lý.",
      "Không quan tâm, vì cho rằng sẽ có người khác báo cơ quan chức năng."
    ]
  },
  {
    "id": 485,
    "question": "Câu 485: Anh (chị) nên làm như thế nào khi người thân mua xe ôtô nhưng chưa làm thủ tục chuyển quyền sở hữu xe theo quy định?",
    "options": [
      "Giải thích, hướng dẫn người thân đi làm thủ tục chuyển quyền sở hữu xe theo quy định.",
      "Không có ý kiến gì để người thân tránh bị xử lý vi phạm qua phương tiện, thiết bị kỹ thuật nghiệp vụ."
    ]
  },
  {
    "id": 486,
    "question": "Câu 486: Điều khiển phương tiện trên đường cao tốc, gặp đoạn ùn tắc, anh (chị) xử lý như thế nào?",
    "options": [
      "Liên tục đánh lái chuyển làn sang làn đường có khoảng trống để di chuyển nhanh hơn;",
      "Đi vào làn đường khẩn cấp nhanh chóng thoát đoạn đường ùn tắt;",
      "Tuân thủ pháp luật giao thông đường bộ; đi đúng phần đường, làn đường; giữ khoảng cách an toàn và chấp hành hiệu lệnh của lực lượng chức năng."
    ]
  },
  {
    "id": 487,
    "question": "Câu 487: Điều khiển phương tiện ô tô trên đường hai chiều, ở chiều đường của mình bị ùn tắc, anh (chị) xử lý như thế nào?",
    "options": [
      "Đi sang làn đường chiều đường ngược lại.",
      "Tiếp tục đi đúng làn đường theo chiều đường của mình."
    ]
  },
  {
    "id": 488,
    "question": "Câu 488: Anh (chị) cho biết ý kiến của mình về hành vi đè lên vạch kênh hoá dòng xe để chuyển hướng phương tiện khi tham gia giao thông đường bộ?",
    "options": [
      "Trường hợp có công việc cần thiết hoặc phương tiện lưu thông đông đức, đi đè lên vạch kênh hóa dòng xe sẽ giúp rút ngắn thời gian di chuyển và giảm ùn tắc giao thông.",
      "Đè lên vạch kênh hoá khi tham gia giao thông là vi phạm pháp luật về trật tự an toàn giao thông đường bộ, bị xử phạt vi phạm hành chính trong lĩnh vực giao thông đường bộ."
    ]
  },
  {
    "id": 489,
    "question": "Câu 489: Khi điều khiển phương tiện tham gia giao thông đường bộ, Cảnh sát giao thông ra hiệu lệnh dừng phương tiện để kiểm tra việc chấp hành các quy định pháp luật về trật tự, an toàn giao thông đường bộ, anh (chị) xử lý như thế nào?",
    "options": [
      "Không chấp hành hiệu lệnh dừng phương tiện, vì cho rằng bản thân không vi phạm pháp luật về trật tự giao thông đường bộ.",
      "Chấp hành hiệu lệnh dừng phương tiện và yêu cầu kiểm tra, kiểm soát.",
      "Dừng phương tiện theo hiệu lệnh nhưng không tắt máy, xuống xe, cự cãi."
    ]
  },
  {
    "id": 490,
    "question": "Câu 490: Sau mưa lớn, một đoạn đường bị sụt, lún gây cản trở, mất an toàn giao thông đường bộ, là một người dân sống gần đó, anh (chị) sẽ xử lý như thế nào?",
    "options": [
      "Thực hiện biện pháp cảnh báo an toàn ngay cho người tham gia giao thông đường bộ biết; báo ngay cho cơ quan Công an nơi gần nhất hoặc cơ quan quản lý đường bộ để có phương án khắc phục kịp thời.",
      "Cảnh báo cho người thân trong gia đình hoặc hàng xóm sống gần đó để cùng tránh đoạn đường này khi lưu thông."
    ]
  },
  {
    "id": 491,
    "question": "Câu 491: Trong các loại bình chữa cháy dưới đây, loại bình nào phù hợp nhất để trang bị và sử dụng trong phòng cháy, chữa cháy đối với phương tiện giao thông cơ giới đường bộ?",
    "options": [
      "Bình chữa cháy dùng chất chữa cháy gốc nước (bình nước chữa cháy) và bình chữa cháy dùng bột chữa cháy loại ABC (bình bột chữa cháy).",
      "Bình chữa cháy dùng bột chữa cháy loại ABC (bình | bột chữa cháy) và bình chữa cháy dùng cacbon đi oxit (bình CO2 chữa cháy).",
      "Bình chữa cháy dùng cacbon đioxit (bình CO2 chữa cháy) và bình chữa cháy dùng chất chữa cháy sạch (bình khí/lỏng sạch chữa cháy)."
    ]
  },
  {
    "id": 492,
    "question": "Câu 492: Theo Anh (chị) có nên sử dụng bình khí Co2 đối với các đám cháy (có kim loại kiềm, kiềm thổ, than cốc, phân đạm, các đám cháy ở nơi trống trải, có gió mạnh) hay không?",
    "options": [
      "Có",
      "Không.",
      "Tùy vào từng điều kiện hoàn cảnh ."
    ]
  },
  {
    "id": 493,
    "question": "Câu 493: Anh (chị) hãy cho biết các nguyên nhân sinh ra nhiệt từ phương tiện giao thông cơ giới đường bộ có thể dẫn đến cháy phương tiện giao thông?",
    "options": [
      "Xe bị cạn nước làm mát (đối với các loại làm mát bằng nước hoặc bị hỏng quạt gió (đối với cá c xe làm mát bằng quạt gió) dẫn đến nóng máy có thể gây cháy xe.",
      "Xe chạy đường dài, máy nóng nhất là các xe không bảo dưỡng, thay dầu thường xuyên, kịp thời hoặc để cạn dầu máy hoặc do bó phanh, xích chùng, kẹt vòng bi.",
      "Nhiệt độ của ống xả cao, đặc biệt là ở cỗ ống xả (nhiều khi nhiệt độ của ống xả, vỏ máy cao hơn rất nhiều so với trị số nhiệt độ tự bốc cháy của xăng là 255-370°C).",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 494,
    "question": "Câu 494: Theo Anh (chị) để hệ thống điện trên phương tiện giao thông cơ giới đường bộ được đảm bảo an toàn không phát sinh tia lửa gây cháy, cần chú ý những gì?",
    "options": [
      "Dây dẫn điện, đầu giắc nối phải đảm bảo chất lượng không bị lão hóa, không hở.",
      "Không lắp thêm các thiết bị điện có công suất lớn, trích nối vào bất cứ nguồn điện nào (từ bình ắc quy, dây đề, dây đèn...).",
      "Sử dụng các linh kiện (IC cầu chì, diot nạp, bình ắc quy) đúng chủng loại, đúng công suất, chất lượng tốt.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 495,
    "question": "Câu 495: Anh (chị) hãy cho biết các biện pháp phòng cháy đối với phương tiện giao thông cơ giới đường bộ?",
    "options": [
      "Không lắp đ ặt thêm thiết bị điện, phụ kiện không đúng theo thiết kế của nhà sản xuất; tuân thủ quy trình vận hành bảo trì bảo dưỡng định kỳ; cần thường xuyên kiểm tra phương tiện khi phát hiện thấy dấu hiệu khác lạ cần khắc phục ngay.",
      "Không mua xăng, dầu ở các điểm bán tự phát, không rõ nguồn gốc; không sử dụng các biện pháp “tiết kiệm nhiên liệu” khi chưa được kiểm chứng về mức độ an toàn có thể gây hỏng xe hoặc dẫn đến nguy cơ xảy cháy cao.",
      "Không để các chất dễ cháy, dễ bắt lửa trong xe, trong khoang động cơ; trong xe cần trang bị bình chữa cháy phù hợp theo qui định của Luật Phòng cháy chữa cháy; ở nơi đỗ xe phải tắt khóa điện, để xa nguồn lửa, nguồn nhiệt.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 496,
    "question": "Câu 496: Anh (chị) cho biết những lưu ý khi tiến hành sơ cứu nạn nhân bị tai nạn giao thông?",
    "options": [
      "Không lấy, bỏ bất cứ một dị vật nào ở da đầu và xương sọ, không dùng tay nâng đầu lên cao làm gập cổ người bị nạn.",
      "Không di chuyển người bị nạn khỏi hiện trường khi chưa cố định xương, cầm máu, không di chuyển người bị nạn bằng xe đạp, xe gắn máy.",
      "Không đưa bất cứ một vật lạ, nước vào miệng người bị nạn và cần phải chuyển nạn nhân tới bệnh viện càng sớm càng tốt.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 497,
    "question": "Câu 497: Khi phát hiện thấy có ngọn lửa, khói hoặc nhiệt độ cao bất thường từ phương tiện giao thông do mình điều khiển, anh (chị) phải làm gì",
    "options": [
      "Bình tĩnh, đưa xe sát vào lề đường, tránh xa nơi có nhiều người nhiều chất dễ cháy và tắt khoá điện, thực hiện các bước chữa cháy.",
      "Hô hoán để mọi người đến trợ giúp chữa cháy, gọi Cảnh sát giao thông và Cảnh sát phòng cháy chữa cháy và cứu nạn cứu hộ, lực lượng Y tế để sẵn sàng hổ trợ cứu người.",
      "Nếu nhiên liệu trào ra ngoài, ngọn lửa chưa cháy dữ dội thì tiếp tục sử dụng nước, hoặc bất kỳ chất, phương tiện chữa cháy có được để dập lửa để tiến hành dập lửa.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 498,
    "question": "Câu 498: Sau khi đã dập tắt ngọn lửa của phương tiện giao thông cơ giới đường bộ bị cháy, vẫn phải tiếp tục phun chất chữa cháy và có biện pháp làm mát các bộ phận của phương tiện để đề phòng xăng, dầu trào ra gặp nhiệt độ cao sẽ cháy lại hoặc gây nổ là đúng hay sai?",
    "options": [
      "Đúng.",
      "Sai."
    ]
  },
  {
    "id": 499,
    "question": "Câu 499: Trường hợp xét thấy không có khả năng tự dập tắt đám cháy trên phương tiện gia o thông cơ giới đường bộ thì anh (chị) nên làm gì trước tiên?",
    "options": [
      "Nên tránh xa phương tiện đang bị cháy để phòng, tránh sự cố nổ bình xăng gây nạn cho bản thân.",
      "Nên gọi công ty bảo hiểm ngay để được ghi nhận kịp thời.",
      "Nên gọi lực lượng Cảnh sát Phòng cháy, chữa cháy.",
      "Cả ba ý trên."
    ]
  },
  {
    "id": 500,
    "question": "Câu 500: Khi gặp nạn nhân bị bỏng trong vụ tai nạn giao thông, anh (chị) cần làm gì?",
    "options": [
      "Gọi số 115 để thông báo về tình trạng tai nạn và yêu cầu hỗ trợ y tế ngay lập tức. Quan sát hiện trường để giúp nạn nhân, đồng thời tránh gây tổn thương cho mình.",
      "Nhanh chóng loại bỏ nguyên nhân gây bỏng bằng cách tách nạn nhân khỏi vật gây cháy, cởi bỏ quần áo nếu bén lửa, ngâm vùng da bị bỏng vào nước sạch hoặc đắp khăn mát, lưu ý không dùng khăn hoặc nước quá lạnh.",
      "Nếu nạn nhân còn tỉnh, cần cho uống bù nước.Trong thời tiết lạnh, cần giữ ấm cho cơ thể nạn nhân, sau đó nhanh chóng đưa đến cơ sở y tế gần nhất.",
      "Cả ba ý trên."
    ]
  }
]