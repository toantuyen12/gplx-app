const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'questions600.json');
const outputFile = path.join(__dirname, 'questions600explain.json');

const questions = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
const results = [];

questions.forEach(q => {
    let explanation = "";
    let meo = "";
    let emoji = "";

    let qText = (q.question || "").toLowerCase();
    
    // Fallback answer text if needed
    let correctOpt = q.options ? q.options.find(o => o.id === q.correct_answer) : null;
    let aText = correctOpt ? correctOpt.text : "";
    if (aText.length > 50) aText = aText.substring(0, 50) + "..."; // Keep it concise

    // 1. Critical questions
    if (q.is_critical) {
        explanation += "[CÂU ĐIỂM LIỆT] ";
        emoji = "🚫 ⚠️";
    }

    // 2. Logic generation - Better 'Why'
    if (q.image && qText.includes("thứ tự")) {
        explanation += `Cần tuân thủ 5 bước giải sa hình (Giao lộ > Xe ưu tiên > Đường ưu tiên > Quyền tay phải > Hướng đi) để xác định thứ tự di chuyển chính xác cho tình huống này.`;
        meo = "Cố gắng nhớ thứ tự ưu tiên xe.";
        if(!emoji) emoji = "🚔 🚦";
    } else if (q.image && (qText.includes("biển nào") || qText.includes("biển báo"))) {
        explanation += `Biển báo xuất hiện trong câu hỏi có tác dụng phân loại các quy tắc cấm, hiệu lệnh hoặc chỉ dẫn giúp người tham gia giao thông định hướng đúng.`;
        meo = "Biển đỏ là cấm, biển xanh là hướng đi.";
        if(!emoji) emoji = "🛑 🚸";
    } else if (qText.includes("tốc độ") || qText.includes("km/h")) {
        explanation += `Việc giữ tốc độ trong giới hạn cho phép là cực kỳ quan trọng vì nó ảnh hưởng đến khoảng cách dừng xe tối thiểu và khả năng kiểm soát phương tiện của bạn.`;
        meo = "Tốc độ càng cao, nguy hiểm càng lớn.";
        if(!emoji) emoji = "⏱️ 🚘";
    } else if (qText.includes("nồng độ cồn") || qText.includes("rượu") || qText.includes("bia")) {
        explanation += `Rượu bia tàn phá hệ thần kinh, làm giảm khả năng tập trung và tốc độ phản ứng, dẫn đến nguy cơ tự gây tai nạn hoặc gây hại cho người khác.`;
        meo = "Đã uống rượu bia, tuyệt đối không lái xe.";
        if(!emoji) emoji = "🚫 🍻";
    } else if (qText.includes("vượt")) {
        explanation += `Việc vượt xe ở đoạn đường không đảm bảo tầm nhìn sẽ tạo ra tình huống đối đầu cực kỳ nguy hiểm, nơi người lái không thể quan sát xe đi ngược chiều.`;
        meo = "Khuất tầm nhìn thì chờ thời điểm an toàn.";
        if(!emoji) emoji = "🚫 🚗";
    } else if (qText.includes("đường cao tốc")) {
        explanation += `Đường cao tốc yêu cầu sự tỉnh táo đặc biệt vì xe chạy tốc độ rất cao; bất kỳ lỗi nhỏ nào như lùi xe hay dừng đỗ sai cũng dẫn đến tai nạn hàng loạt.`;
        meo = "Cao tốc: Cấm lùi, cấm quay đầu.";
        if(!emoji) emoji = "🛣️ ⚠️";
    } else {
        explanation += `Quy tắc này nhằm thiết lập trật tự giao thông ổn định, giảm thiểu sự hiểu lầm giữa các tài xế và ngăn ngừa rủi ro va chạm không đáng có.`;
        meo = "Học thuộc quy tắc để đi đứng an toàn.";
        if(!emoji) emoji = "✅ 🚦";
    }

    // Final composition
    let finalExplanation = `${explanation} ${emoji} **Mẹo:** ${meo}`;
    
    results.push({
        id: q.id,
        explanation: finalExplanation.trim()
    });
});

fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), 'utf8');
console.log(`Generated ${results.length} explanations in questions600explain.json`);
