if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener("load", function(){
  window.scrollTo(0,0);
});

// URLParams
const urlParams = new URLSearchParams(window.location.search);
let license = urlParams.get('license') || 'a1';
license = license.toLowerCase();

const isA1 = license === 'a1';
const PASSING_SCORE = isA1 ? 21 : 23;
const EXAM_DURATION = 19 * 60; // 19 minutes
const RECENT_KEY = `moto_exam_recent_${license}`;
const HISTORY_KEY = `moto_exam_history_${license}`;

let _manager = null;
let allQuestionsRaw = null;
let allExplanationsRaw = null;

let quiz = []; // Array of global newIds (1 to total) from manager
let userAns = []; // User answers index
let current = 0; // 0 to 24
let timeLeft = 0;
let timerInterval = null;
let isSubmitted = false;

// Format title
document.addEventListener("DOMContentLoaded", () => {
    document.title = `Thi Đề 25 Câu GPLX Hạng ${license.toUpperCase()} Online | thigplx.site`;
    const label = document.getElementById("pageTitleLabel");
    if(label) label.textContent = `Thi Thử Sát Hạch Hạng ${license.toUpperCase()}`;
});

async function loadData() {
    try {
        const [qRes, eRes] = await Promise.all([
            fetch('questions600.json'),
            fetch('questions600explain.json')
        ]);
        allQuestionsRaw = await qRes.json();
        allExplanationsRaw = await eRes.json();
        
        // Use 'a1' mode for both A1 and A to get the 250 questions set
        _manager = createQuestionManager('a1', allQuestionsRaw, allExplanationsRaw, license);
        
        startExam();
    } catch (err) {
        console.error('Failed to load exam data:', err);
        alert("Lỗi tải dữ liệu đề thi!");
    }
}

window.addEventListener("load", loadData);

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function generateMotoExam() {
    let recentIds = [];
    try {
        recentIds = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    } catch(e) {}

    const ch1 = _manager.getQuestionsByChapter(1);
    const ch2 = _manager.getQuestionsByChapter(2);
    const ch3 = _manager.getQuestionsByChapter(3);
    const ch4 = _manager.getQuestionsByChapter(4);
    const ch5 = _manager.getQuestionsByChapter(5);

    const criticalPool = ch1.filter(id => _manager.isCritical(id));
    const ch1NonCritical = ch1.filter(id => !_manager.isCritical(id));

    const filterRecent = (arr) => arr.filter(id => !recentIds.includes(id));

    let poolCrit = filterRecent(criticalPool);
    let poolCh1 = filterRecent(ch1NonCritical);
    let poolCh2 = filterRecent(ch2);
    let poolCh3 = filterRecent(ch3);
    let poolCh4 = filterRecent(ch4);
    let poolCh5 = filterRecent(ch5);

    if (poolCrit.length < 1 || poolCh1.length < 8 || poolCh2.length < 1 || poolCh3.length < 1 || poolCh4.length < 8 || poolCh5.length < 6) {
        recentIds = [];
        poolCrit = criticalPool;
        poolCh1 = ch1NonCritical;
        poolCh2 = ch2;
        poolCh3 = ch3;
        poolCh4 = ch4;
        poolCh5 = ch5;
    }

    quiz = [
        ...shuffle(poolCrit).slice(0, 1),
        ...shuffle(poolCh1).slice(0, 8),
        ...shuffle(poolCh2).slice(0, 1),
        ...shuffle(poolCh3).slice(0, 1),
        ...shuffle(poolCh4).slice(0, 8),
        ...shuffle(poolCh5).slice(0, 6)
    ];

    quiz = shuffle(quiz);

    recentIds.push(...quiz);
    
    if (recentIds.length > 125) {
        recentIds = [...quiz];
    }
    
    recentIds = [...new Set(recentIds)];
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentIds));
}

function startExam() {
    isSubmitted = false;
    generateMotoExam();
    userAns = new Array(25).fill(null);
    current = 0;
    
    timeLeft = EXAM_DURATION;
    startTimer();
    
    document.getElementById("loadingDiv").style.display = "none";
    document.getElementById("motoExamRoot").style.display = "block";
    
    renderGrid();
    renderQuestion();
}

window.exitHome = function() {
    window.location.href = `class-${license}-menu.html`;
};

function getImageSrc(imageName) {
    if(!imageName || imageName === 'null') return '';
    return `images/images600/${imageName}`;
}

function renderGrid() {
    const grid = document.getElementById('motoGrid');
    if (!grid) return;

    if (isSubmitted) {
        // Result Page Mode for Grid
        let html = '';
        quiz.forEach((qId, idx) => {
            let user = userAns[idx];
            let q = _manager.getQuestion(qId);
            
            let cls = 's600-grid-btn';
            if (idx === current) cls += ' s600-grid-current';
            else if (user === q.correct_answer) cls += ' s600-grid-correct';
            else cls += ' s600-grid-wrong';
            
            let iconHTML = '';
            if (q.is_critical) {
                cls += ' s600-grid-critical';
            }
            html += `<button class="${cls}" onclick="jumpTo(event, ${idx})">${idx + 1}${iconHTML}</button>`;
        });
        grid.innerHTML = html;
        return;
    }

    // Normal Exam Mode for Grid
    grid.innerHTML = quiz.map((qId, idx) => {
        let cls = 's600-grid-btn';
        if (idx === current) cls += ' s600-grid-current';
        else if (userAns[idx] !== null) cls += ' s600-grid-correct'; // Just differently colored to show answered
        
        let iconHTML = '';
        const q = _manager.getQuestion(qId);
        if (q && q.is_critical) {
            cls += ' s600-grid-critical';
        }
        return `<button class="${cls}" onclick="jumpTo(event, ${idx})">${idx + 1}${iconHTML}</button>`;
    }).join('');
    
    const currentBtn = grid.querySelector('.s600-grid-current');
    if (currentBtn) {
        currentBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
}

function renderQuestion() {
    const area = document.getElementById('motoQuestionArea');
    if (!area) return;

    const qId = quiz[current];
    const q = _manager.getQuestion(qId);
    if (!q) return;

    const ans = userAns[current];

    const imgHtml = q.image && q.image !== 'null'
        ? `<div class="s600-q-img-wrap"><img src="${getImageSrc(q.image)}" alt="Hình câu ${q.displayId}" loading="lazy"></div>`
        : '';

    let optionsHtml = '';
    
    if (!isSubmitted) {
        // Exam mode - no feedback
        optionsHtml = q.options.map((opt, i) => {
            let cls = 's600-ans-btn';
            let style = (ans === opt.id) ? 'box-shadow: 0 0 0 3px #1d4ed8; border-color:#1d4ed8; background-color:#dbeafe; font-weight:600; color:#1e3a8a;' : '';

            return `<button class="${cls}" style="${style}" onclick="choose(${opt.id})">
                <span class="s600-ans-num">${i + 1}.</span>
                <span class="s600-ans-text">${opt.text}</span>
            </button>`;
        }).join('');
    } else {
        // Result mode - feedback
        optionsHtml = q.options.map((opt, i) => {
            let cls = 's600-ans-btn';
            if (opt.id === q.correct_answer) {
                 cls += ' s600-ans-correct';
            } else if (opt.id === ans && opt.id !== q.correct_answer) {
                 cls += ' s600-ans-wrong';
            }
            return `<button class="${cls}" style="cursor:default;">
                <span class="s600-ans-num">${i + 1}.</span>
                <span class="s600-ans-text">${opt.text}</span>
            </button>`;
        }).join('');
    }

    let explHtml = '';
    if (isSubmitted) {
        const isCorrect = ans === q.correct_answer;
        let explClass = isCorrect ? 's600-expl-correct' : 's600-expl-wrong';
        let title = isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng';
        
        if (q.is_critical) {
            if (isCorrect) {
                 explClass = 's600-expl-critical-correct';
                 title = '✅ Đúng (Câu điểm liệt)';
            } else {
                 explClass = 's600-expl-critical-wrong';
                 title = '⚠️ Sai câu điểm liệt';
            }
        }
    
        let userOption = q.options.find(opt => opt.id === ans);
        let correctOption = q.options.find(opt => opt.id === q.correct_answer);
        let userText = userOption ? userOption.text : "Chưa chọn";
        let correctText = correctOption ? correctOption.text : "Không xác định";

        explHtml = `<div class="s600-explanation ${explClass}">
            <div class="s600-expl-header">${title}</div>
            ${q.is_critical && !isCorrect 
                ? `<div style="font-weight:700; color:#e11d48; margin-bottom:10px; font-size:15px;">Câu điểm liệt sai! Áp dụng trượt trực tiếp toàn bộ bài thi.</div>` 
                : ''}
            <div style="margin-bottom: 15px; font-size: 15px; line-height: 1.6; border-bottom: 1px dashed rgba(0,0,0,0.1); padding-bottom: 10px;">
                <div><b>Bạn chọn:</b> ${userText}</div>
                <div><b style="color: #16a34a;">Đáp án đúng:</b> ${correctText}</div>
            </div>
            <div class="s600-expl-body"><b>Giải thích:</b> ${q.explanation || 'Không có giải thích.'}</div>
           </div>`;
    }

    const criticalBadge = q.is_critical ? `<span class="s600-critical-badge">⚠️ CÂU ĐIỂM LIỆT</span>` : '';

    area.innerHTML = `
        <div class="s600-q-header">
            <div class="s600-q-header-left">
                <span class="s600-q-index">Câu ${current + 1} / 25</span>
                <span style="font-weight:normal; font-size:14px; color:#64748b; margin-left:10px;">(Tương ứng: Câu ${q.displayId}/${_manager.total})</span>
                ${criticalBadge}
            </div>
        </div>
        <div class="s600-q-text ${q.is_critical ? 's600-q-text-critical' : ''}">
            <span class="s600-q-num">Câu ${current + 1}:</span> ${q.question.replace(/^Câu \d+:\s*/,"")}
        </div>
        ${imgHtml}
        <div class="s600-answers">${optionsHtml}</div>
        ${explHtml}
        <div class="s600-nav-btns" style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap;">
            <button class="s600-nav-btn" onclick="prev()" ${current === 0 ? 'disabled' : ''}>← Câu trước</button>
            <button class="s600-nav-btn s600-nav-next" style="flex:1;" onclick="next()" ${current === quiz.length - 1 ? 'disabled' : ''}>Câu tiếp →</button>
            ${!isSubmitted ? `<button class="s600-nav-btn" style="background-color:#ef4444; color:#fff;" onclick="submit()">Nộp Bài</button>` : ''}
        </div>
    `;

    // Only if result mode show summary at top of index 0
    if (isSubmitted && current === 0) {
        document.getElementById("examResultSummary").style.display = 'block';
    } else if (isSubmitted) {
        // Keep it displayed or scroll to it
        document.getElementById("examResultSummary").style.display = 'block';
    }
}

function choose(optId) {
    if (isSubmitted) return;
    userAns[current] = optId;
    renderGrid();
    renderQuestion();
}

function jumpTo(e, i) {
    if (e) e.preventDefault();
    current = i;
    renderGrid();
    renderQuestion();
}

function next() {
    if (current < quiz.length - 1) {
        current++;
        renderGrid();
        renderQuestion();
    }
}

function prev() {
    if (current > 0) {
        current--;
        renderGrid();
        renderQuestion();
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("⏰ Hết thời gian!");
            submit();
            return;
        }
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        let el = document.getElementById("timerText");
        if (el) {
            el.innerText = minutes + ":" + seconds.toString().padStart(2, "0");
        }
    }, 1000);
}

function submit() {
    if (isSubmitted) return;
    
    // Confirm logic
    let answered = userAns.filter(a => a !== null).length;
    if (answered < 25 && timeLeft > 0) {
        if (!confirm(`Bạn mới trả lời ${answered}/25 câu. Bạn có chắc chắn muốn nộp bài?`)) return;
    }
    
    isSubmitted = true;
    if (typeof timerInterval !== 'undefined') clearInterval(timerInterval);

    let score = 0;
    let wrongCritical = false;

    quiz.forEach((qId, i) => {
        let user = userAns[i];
        let q = _manager.getQuestion(qId);
        
        if (user === q.correct_answer) {
            score++;
        } else if (q.is_critical) {
            wrongCritical = true;
        }
    });

    let isPass = (score >= PASSING_SCORE) && !wrongCritical;

    // Save History
    let history = [];
    try {
        history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch(e) {}
    let today = new Date();
    let fmtDate = today.getDate().toString().padStart(2, '0') + '/' + (today.getMonth()+1).toString().padStart(2, '0') + '/' + today.getFullYear() + ' ' + today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0');
    history.unshift({
        score: score,
        isPass: isPass,
        date: fmtDate
    });
    if (history.length > 5) history = history.slice(0, 5);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

    renderResult(score, isPass, wrongCritical);
}

function renderResult(score, isPass, wrongCritical) {
    let wrong = quiz.length - score;

    let summaryHtml = `
    <div class="result-summary" style="padding: 20px; background: #fff; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); text-align:center;">
      <h2 style="color: #1e293b; margin-top: 0; margin-bottom: 15px; font-size: 24px;">KẾT QUẢ THI LÝ THUYẾT HẠNG ${license.toUpperCase()}</h2>
      <div style="font-size: 16px; line-height: 1.8; max-width: 320px; margin: 0 auto; text-align: left; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <div style="display: flex; justify-content: space-between;"><b>Số câu hỏi:</b> <span>25</span></div>
        <div style="display: flex; justify-content: space-between;"><b>Số câu đúng:</b> <span style="color: #16a34a; font-weight: bold;">${score}</span></div>
        <div style="display: flex; justify-content: space-between;"><b>Số câu sai/bỏ qua:</b> <span style="color: #dc2626; font-weight: bold;">${wrong}</span></div>
        ${wrongCritical ? `<div style="color:#dc2626; font-weight:bold; font-size:14px; text-align:center; margin-top:10px;">Bạn đã sai câu điểm liệt!</div>` : ''}
        <div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #cbd5e1; font-size: 20px; text-align: center;">
          <b>Kết quả:</b> <span style="color: ${isPass ? '#16a34a' : '#dc2626'}; font-weight: bold; margin-left: 5px;">${isPass ? 'ĐẠT' : 'KHÔNG ĐẠT'}</span>
        </div>
      </div>
      
      <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; justify-content: center;">
        <button onclick="retryExam()" style="padding: 10px 16px; font-size: 15px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">Làm Lại Đề Này</button>
        <button onclick="startExam()" style="padding: 10px 16px; font-size: 15px; background: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">Đề Khác</button>
        <button onclick="exitHome()" style="padding: 10px 16px; font-size: 15px; background: #64748b; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">Về Trang Chủ</button>
      </div>
    </div>
    `;

    document.getElementById("examResultSummary").innerHTML = summaryHtml;
    
    current = 0;
    renderGrid();
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function retryExam() {
    isSubmitted = false;
    userAns = new Array(25).fill(null);
    current = 0;
    timeLeft = EXAM_DURATION;
    startTimer();
    document.getElementById("examResultSummary").style.display = 'none';
    renderGrid();
    renderQuestion();
}

// Keydown listeners for navigation/options
document.addEventListener("keydown", function(event) {
    if (document.getElementById("motoExamRoot").style.display === "none") return;
    if (document.activeElement.tagName === "INPUT") return;

    if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
    }
    if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
    }
    if (["1","2","3","4"].includes(event.key)) {
        let index = parseInt(event.key) - 1;
        let q = _manager.getQuestion(quiz[current]);
        if(index < q.options.length) {
            choose(q.options[index].id);
        }
    }
});
