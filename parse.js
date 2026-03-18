const fs = require("fs");
const mammoth = require("mammoth");

function getChapter(id) {
  if (id >= 1 && id <= 180) return 1;
  if (id <= 205) return 2;
  if (id <= 263) return 3;
  if (id <= 300) return 4;
  if (id <= 485) return 5;
  return 6;
}

async function run() {
  const result = await mammoth.extractRawText({
    path: "600_questions.docx"
  });

  let text = result.value;

  // 🔥 normalize
  text = text.replace(/\r/g, "");
  text = text.replace(/\n+/g, "\n");

  // 🔥 tách câu bằng "Câu X."
  const blocks = text.split(/(?=Câu\s*\d+[\.\:])/i);

  const questions = [];

  blocks.forEach(block => {
    block = block.trim();
    if (!block) return;

    const match = block.match(/^Câu\s*(\d+)[\.\:]\s*(.*
    if (!match) return;

    const id = parseInt(match[1]);
    const content = match[2];

    const lines = content
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    let questionLines = [];
    let options = [];

    lines.forEach(line => {
      // detect đáp án kiểu 1. 2. 3.
      if (/^\d+\./.test(line)) {
        options.push({
          text: line.replace(/^\d+\.\s*/, ""),
          is_correct: false
        });
      } else {
        questionLines.push(line);
      }
    });

    // lấy đáp án cuối
    if (options.length > 0) {
      options[options.length - 1].is_correct = true;
    }

    questions.push({
      id,
      chapter: getChapter(id),
      question: questionLines.join(" "),
      options
    });
  });

  console.log("\n--- VALIDATION ---");
  console.log("Total:", questions.length);

  questions.forEach(q => {
    if (q.options.length === 0) {
      console.log(`❌ Câu ${q.id} không có đáp án`);
    }
  });

  fs.writeFileSync("questions600.json", JSON.stringify(questions, null, 2));

  console.log("\n✅ DONE → questions.json");
}

run();