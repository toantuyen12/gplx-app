const fs = require('fs');
const mammoth = require('mammoth');

async function main() {
  const result = await mammoth.convertToHtml(
    { path: '600_questions.docx' },
    { styleMap: [ 'u => u' ] }
  );

  let html = result.value;

  // Fix inline options for edge cases where multiple options are on the same line (like Q352)
  html = html.replace(/(\s|&nbsp;){3,}([2-4])\.\s+/g, '</p><p>$2. ');

  // Split into paragraphs based on </p> or similar
  let paragraphs = html.split(/<\/p>|<br\s*\/?>|<\/h[1-6]>/i);

  let questions = [];
  let currentQuestion = null;
  let currentOption = null;

  for (let p of paragraphs) {
    p = p.trim();
    if (!p) continue;

    // Decodes basic html entities
    let textStr = p.replace(/<[^>]+>/g, '').trim();
    textStr = textStr.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    
    if (!textStr) continue;

    // Check if new question
    let matchQ = textStr.match(/^Câu\s*(\d+)[\.\:]\s*(.*)/i);
    if (matchQ) {
      if (currentQuestion) {
         if (currentOption) {
            currentQuestion.options.push(currentOption);
         }
         questions.push(currentQuestion);
      }
      currentQuestion = {
         id: parseInt(matchQ[1]),
         chapter: getChapter(parseInt(matchQ[1])),
         question: matchQ[2].trim(),
         options: [],
         correct_answer: null,
         is_critical: isCritical(parseInt(matchQ[1])),
         image: getImage(parseInt(matchQ[1]))
      };
      currentOption = null;
    } else {
      if (!currentQuestion) continue;

      let matchOptStrict = textStr.match(/^(\d+)[\.\)]\s*(.*)/);

      if (matchOptStrict && parseInt(matchOptStrict[1]) > 0 && parseInt(matchOptStrict[1]) <= 6) {
         // Likely an option, typically from 1 to 4
         if (currentOption) {
            currentQuestion.options.push(currentOption);
         }
         currentOption = {
            id: parseInt(matchOptStrict[1]),
            text: matchOptStrict[2].trim()
         };
         // Determine if underlined
         if (p.includes('<u>')) {
            currentQuestion.correct_answer = currentOption.id;
         }
      } else {
         // Continuation of text
         if (currentOption) {
            currentOption.text += ' ' + textStr;
            if (p.includes('<u>')) currentQuestion.correct_answer = currentOption.id;
         } else {
            currentQuestion.question += (currentQuestion.question ? '\n' : '') + textStr;
         }
      }
    }
  }

  if (currentQuestion) {
     if (currentOption) {
        currentQuestion.options.push(currentOption);
     }
     questions.push(currentQuestion);
  }

  let errors = [];
  if (questions.length !== 600) {
     errors.push("Count mismatch: Found " + questions.length + " questions.");
  }
  let missingIds = [];
  let foundIds = questions.map(q => q.id);
  for(let i=1; i<=600; i++) {
     if(!foundIds.includes(i)) missingIds.push(i);
  }
  if (missingIds.length > 0) {
     errors.push("Missing question IDs: " + missingIds.join(", "));
  }

  for (let q of questions) {
     if (!q.correct_answer) {
        errors.push(`Question ${q.id} missing correct answer`);
     }
     if (q.options.length < 2) {
        errors.push(`Question ${q.id} has less than 2 options: ${q.options.length}`);
     }
  }

  if (errors.length) {
     console.error("VALIDATION FAILED! Check these errors:");
     console.error(errors.slice(0, 50).join("\n"));
     if(errors.length > 50) console.error("...and more errors");
  } else {
     console.log("Validation passed! Extracted 600 questions.");
  }

  fs.writeFileSync('questions600.json', JSON.stringify(questions, null, 2), 'utf8');
  console.log("DONE");
}

function getChapter(id) {
  if (id <= 180) return 1;
  if (id <= 205) return 2;
  if (id <= 263) return 3;
  if (id <= 300) return 4;
  if (id <= 485) return 5;
  return 6;
}

function isCritical(id) {
  const c = [
    12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,
    30, 32, 34, 35, 47, 48, 52, 53, 55, 58,
    63,64,65,66,67,68, 70,71,72,73,74,
    85,86,87,88,89,90,91,92,93,
    97, 98, 102, 117, 163, 165, 167, 197, 198,
    206, 215, 226, 234, 245, 246, 252, 253, 254, 255, 260
  ];
  return c.includes(id);
}

function getImage(id) {
  if (id === 36 || id === 37) return `q${id}.webp`;
  if (id >= 227 && id <= 231) return `q${id}.webp`;
  if (id >= 286 && id <= 290) return `q${id}.webp`;
  if (id >= 295 && id <= 600) return `q${id}.webp`;
  return null;
}

main().catch(console.error);
