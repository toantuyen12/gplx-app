const fs = require('fs');
const https = require('https');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const delayTime = OPENAI_API_KEY ? 1500 : 1; // Fast mock if no key

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function askOpenAI(prompt, retries = 3) {
  return new Promise((resolve) => {
    if (!OPENAI_API_KEY) {
      if (retries > 0) return resolve(askOpenAI(prompt, retries - 1));
      return resolve("");
    }

    const data = JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
      temperature: 0.7
    });

    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(responseBody);
            resolve(parsed.choices[0].message.content.trim());
          } catch (e) {
            if (retries > 0) resolve(askOpenAI(prompt, retries - 1));
            else resolve(""); 
          }
        } else {
          if (retries > 0) resolve(askOpenAI(prompt, retries - 1));
          else resolve("");
        }
      });
    });

    req.on('error', (e) => {
      if (retries > 0) resolve(askOpenAI(prompt, retries - 1));
      else resolve("");
    });
    req.write(data);
    req.end();
  });
}

async function main() {
  const inputFile = 'questions600.json';
  const outputFile = 'questions_full.json';
  
  const questions = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

  for (let q of questions) {
    if (q.explanation === undefined) {
      let correctOpt = q.options.find(o => o.id === q.correct_answer);
      let correctAnswerText = correctOpt ? correctOpt.text : "";
      
      let prompt = `Provide a short and clear explanation for a driving theory question.\n\nQuestion: ${q.question}\nCorrect Answer: ${correctAnswerText}\n\nRequirements:\n\n* Easy to understand\n* Focus on logic\n* Maximum 3-4 lines`;
      
      q.explanation = await askOpenAI(prompt);
      await delay(delayTime); // Add delay 1-2 seconds between API calls to avoid rate limit
    }
  }

  // Preserve all existing fields, add explanation, save valid JSON
  fs.writeFileSync(outputFile, JSON.stringify(questions, null, 2), 'utf8');
  console.log("DONE");
}

main().catch(console.error);
