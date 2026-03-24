// Hạng C1: 35 câu, 22 phút, Đạt >= 32/35, không sai câu điểm liệt

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener("load", function(){
  window.scrollTo(0,0);
});

// ===== CONSTANTS =====
const EXAM_TOTAL = 35;
const PASSING_SCORE = 32;
const EXAM_DURATION = 22 * 60; // 22 minutes
const RECENT_KEY = 'c1_exam_recent';
const HISTORY_KEY = 'c1_exam_history';

// Chapter ranges for the 600-question default mode
const CHAPTER_RANGES = {
  1: { min: 1, max: 180 },
  2: { min: 181, max: 205 },
  3: { min: 206, max: 263 },
  4: { min: 264, max: 300 },
  5: { min: 301, max: 485 },
  6: { min: 486, max: 600 }
};

// Exam generation rule (C1):
// 10 Ch1 + 1 Ch2 + 2 Ch3 + 1 Ch4 + 10 Ch5 + 10 Ch6 + 1 critical = 35
const EXAM_RULE = {
  ch1NonCrit: 10,
  ch2: 1,
  ch3: 2,
  ch4: 1,
  ch5: 10,
  ch6: 10,
  critical: 1
};

// Max unique questions across 5 exams = 35 * 5 = 175
const RECENT_MAX = 175;

let _manager = null;
let allQuestionsRaw = null;
let allExplanationsRaw = null;

let quiz = []; 
let userAns = [];
let current = 0;
let timeLeft = 0;
let timerInterval = null;
let isSubmitted = false;

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
    document.title = `Thi Đề 35 Câu GPLX Hạng C1 Online | thigplx.site`;
    const label = document.getElementById("pageTitleLabel");
    if (label) label.textContent = `Thi Thử Sát Hạch Hạng C1`;
});

async function loadData() {
    try {
        const [qRes, eRes] = await Promise.all([
            fetch('questions600.json'),
            fetch('questions600explain.json')
        ]);
        allQuestionsRaw = await qRes.json();
        allExplanationsRaw = await eRes.json();

        // Use 'default' (600-question) mode for Hạng C1
        _manager = createQuestionManager('default', allQuestionsRaw, allExplanationsRaw, 'c1');

        startExam();
    } catch (err) {
        console.error('Failed to load C1-exam data:', err);
        alert("Lỗi tải dữ liệu đề thi!");
    }
}

window.addEventListener("load", loadData);

// ===== HELPERS =====
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ===== EXAM GENERATION =====
function generateC1Exam() {
    let recentIds = [];
    try {
        recentIds = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    } catch(e) {}

    const allIds = Array.from({ length: _manager.total }, (_, i) => i + 1);

    const critPool = allIds.filter(id => _manager.isCritical(id));
    const ch1AllIds = allIds.filter(id => {
        const m = _manager.getMapping(id);
        return m && m.chapterId === 1;
    });
    const ch1NonCrit = ch1AllIds.filter(id => !_manager.isCritical(id));
    const ch2 = allIds.filter(id => { const m = _manager.getMapping(id); return m && m.chapterId === 2; });
    const ch3 = allIds.filter(id => { const m = _manager.getMapping(id); return m && m.chapterId === 3; });
    const ch4 = allIds.filter(id => { const m = _manager.getMapping(id); return m && m.chapterId === 4; });
    const ch5 = allIds.filter(id => { const m = _manager.getMapping(id); return m && m.chapterId === 5; });
    const ch6 = allIds.filter(id => { const m = _manager.getMapping(id); return m && m.chapterId === 6; });

    const filterRecent = (arr) => arr.filter(id => !recentIds.includes(id));

    let pCrit = filterRecent(critPool);
    let pCh1 = filterRecent(ch1NonCrit);
    let pCh2 = filterRecent(ch2);
    let pCh3 = filterRecent(ch3);
    let pCh4 = filterRecent(ch4);
    let pCh5 = filterRecent(ch5);
    let pCh6 = filterRecent(ch6);

    const { ch1NonCrit: n1, ch2: n2, ch3: n3, ch4: n4, ch5: n5, ch6: n6, critical: nc } = EXAM_RULE;

    // Reset if any pool is too small
    if (pCrit.length < nc || pCh1.length < n1 || pCh2.length < n2 ||
        pCh3.length < n3 || pCh4.length < n4 || pCh5.length < n5 || pCh6.length < n6) {
        recentIds = [];
        pCrit = critPool;
        pCh1 = ch1NonCrit;
        pCh2 = ch2;
        pCh3 = ch3;
        pCh4 = ch4;
        pCh5 = ch5;
        pCh6 = ch6;
    }

    quiz = shuffle([
        ...shuffle(pCrit).slice(0, nc),
        ...shuffle(pCh1).slice(0, n1),
        ...shuffle(pCh2).slice(0, n2),
        ...shuffle(pCh3).slice(0, n3),
        ...shuffle(pCh4).slice(0, n4),
        ...shuffle(pCh5).slice(0, n5),
        ...shuffle(pCh6).slice(0, n6)
    ]);

    recentIds.push(...quiz);
    if (recentIds.length > RECENT_MAX) recentIds = [...quiz];
    recentIds = [...new Set(recentIds)];
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentIds));
}

// ===== EXAM STATE =====
function startExam() {
    isSubmitted = false;
    generateC1Exam();
    userAns = new Array(EXAM_TOTAL).fill(null);
    current = 0;
    timeLeft = EXAM_DURATION;
    startTimer();

    document.getElementById("loadingDiv").style.display = "none";
    document.getElementById("c1ExamRoot").style.display = "block";

    renderGrid();
    renderQuestion();
}

window.exitHome = function() {
    window.location.href = 'class-c1-menu.html';
};

function getImageSrc(imageName) {
    if (!imageName || imageName === 'null') return '';
    return `images/images600/${imageName}`;
}

// ===== RENDER GRID =====
function renderGrid() {
    const grid = document.getElementById('c1ExamGrid');
    if (!grid) return;

    if (isSubmitted) {
        let html = '';
        quiz.forEach((qId, idx) => {
            const q = _manager.getQuestion(qId);
            const user = userAns[idx];
            let cls = 's600-grid-btn';
            if (idx === current) cls += ' s600-grid-current';
            else if (user === q.correct_answer) cls += ' s600-grid-correct';
            else cls += ' s600-grid-wrong';
            if (q.is_critical) cls += ' s600-grid-critical';
            html += `<button class="${cls}" onclick="jumpTo(event, ${idx})">${idx + 1}</button>`;
        });
        grid.innerHTML = html;
        return;
    }

    grid.innerHTML = quiz.map((qId, idx) => {
        const q = _manager.getQuestion(qId);
        let cls = 's600-grid-btn';
        if (idx === current) cls += ' s600-grid-current';
        else if (userAns[idx] !== null) cls += ' s600-grid-answered';
        if (q && q.is_critical) cls += ' s600-grid-critical';
        return `<button class="${cls}" onclick="jumpTo(event, ${idx})">${idx + 1}</button>`;
    }).join('');

    const cur = grid.querySelector('.s600-grid-current');
    if (cur) cur.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

// ===== RENDER QUESTION =====
function renderQuestion() {
    const area = document.getElementById('c1ExamQuestionArea');
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
        optionsHtml = q.options.map((opt, i) => {
            const selected = ans === opt.id;
            const style = selected
                ? 'box-shadow: 0 0 0 3px #1d4ed8; border-color:#1d4ed8; background-color:#dbeafe; font-weight:600; color:#1e3a8a;'
                : '';
            return `<button class="s600-ans-btn" style="${style}" onclick="choose(${opt.id})">
                <span class="s600-ans-num">${i + 1}.</span>
                <span class="s600-ans-text">${opt.text}</span>
            </button>`;
        }).join('');
    } else {
        optionsHtml = q.options.map((opt, i) => {
            let cls = 's600-ans-btn';
            if (opt.id === q.correct_answer) cls += ' s600-ans-correct';
            else if (opt.id === ans && opt.id !== q.correct_answer) cls += ' s600-ans-wrong';
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
            if (isCorrect) { explClass = 's600-expl-critical-correct'; title = '✅ Đúng (Câu điểm liệt)'; }
            else { explClass = 's600-expl-critical-wrong'; title = '⚠️ Sai câu điểm liệt'; }
        }
        const userOpt = q.options.find(o => o.id === ans);
        const corrOpt = q.options.find(o => o.id === q.correct_answer);
        explHtml = `<div class="s600-explanation ${explClass}">
            <div class="s600-expl-header">${title}</div>
            ${q.is_critical && !isCorrect ? `<div style="font-weight:700;color:#e11d48;margin-bottom:10px;font-size:15px;">Câu điểm liệt sai! Áp dụng trượt trực tiếp toàn bộ bài thi.</div>` : ''}
            <div style="margin-bottom:15px;font-size:15px;line-height:1.6;border-bottom:1px dashed rgba(0,0,0,0.1);padding-bottom:10px;">
                <div><b>Bạn chọn:</b> ${userOpt ? userOpt.text : 'Chưa chọn'}</div>
                <div><b style="color:#16a34a;">Đáp án đúng:</b> ${corrOpt ? corrOpt.text : 'Không xác định'}</div>
            </div>
            <div class="s600-expl-body"><b>Giải thích:</b> ${q.explanation || 'Không có giải thích.'}</div>
        </div>`;
    }

    const critBadge = q.is_critical ? `<span class="s600-critical-badge">⚠️ CÂU ĐIỂM LIỆT</span>` : '';

    area.innerHTML = `
        <div class="s600-q-header">
            <div class="s600-q-header-left">
                <span class="s600-q-index">Câu ${current + 1} / ${EXAM_TOTAL}</span>
                <span style="font-weight:normal;font-size:14px;color:#64748b;margin-left:10px;">(Câu ${q.displayId}/600)</span>
                ${critBadge}
            </div>
        </div>
        <div class="s600-q-text ${q.is_critical ? 's600-q-text-critical' : ''}">
            <span class="s600-q-num">Câu ${current + 1}:</span> ${q.question.replace(/^Câu \d+:\s*/, "")}
        </div>
        ${imgHtml}
        <div class="s600-answers">${optionsHtml}</div>
        ${explHtml}
        <div class="s600-nav-btns" style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap;">
            <button class="s600-nav-btn" onclick="prev()" ${current === 0 ? 'disabled' : ''}>← Câu trước</button>
            <button class="s600-nav-btn s600-nav-next" style="flex:1;" onclick="next()" ${current === quiz.length - 1 ? 'disabled' : ''}>Câu tiếp →</button>
            ${!isSubmitted ? `<button class="s600-nav-btn" style="background-color:#ef4444;color:#fff;" onclick="submit()">Nộp Bài</button>` : ''}
        </div>
    `;

    if (isSubmitted) {
        document.getElementById("examResultSummary").style.display = 'block';
    }
}

// ===== CONTROLS =====
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
    if (current < quiz.length - 1) { current++; renderGrid(); renderQuestion(); }
}

function prev() {
    if (current > 0) { current--; renderGrid(); renderQuestion(); }
}

// ===== TIMER =====
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
        const el = document.getElementById("timerText");
        if (el) el.innerText = Math.floor(timeLeft / 60) + ":" + (timeLeft % 60).toString().padStart(2, "0");
    }, 1000);
}

// ===== SUBMIT =====
function submit() {
    if (isSubmitted) return;

    const answered = userAns.filter(a => a !== null).length;
    if (answered < EXAM_TOTAL && timeLeft > 0) {
        if (!confirm(`Bạn mới trả lời ${answered}/${EXAM_TOTAL} câu. Bạn có chắc chắn muốn nộp bài?`)) return;
    }

    isSubmitted = true;
    clearInterval(timerInterval);

    let score = 0;
    let wrongCritical = false;

    quiz.forEach((qId, i) => {
        const q = _manager.getQuestion(qId);
        if (userAns[i] === q.correct_answer) score++;
        else if (q.is_critical) wrongCritical = true;
    });

    const isPass = score >= PASSING_SCORE && !wrongCritical;

    // Save history
    let history = [];
    try { history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch(e) {}
    const now = new Date();
    const fmtDate = now.getDate().toString().padStart(2,'0') + '/' +
        (now.getMonth()+1).toString().padStart(2,'0') + '/' + now.getFullYear() + ' ' +
        now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    history.unshift({ score, isPass, date: fmtDate });
    if (history.length > 5) history = history.slice(0, 5);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

    renderResult(score, isPass, wrongCritical);
}

// ===== RESULT =====
function renderResult(score, isPass, wrongCritical) {
    const wrong = EXAM_TOTAL - score;
    document.getElementById("examResultSummary").innerHTML = `
    <div class="result-summary" style="padding:20px;background:#fff;border-radius:12px;margin-bottom:20px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);text-align:center;">
      <h2 style="color:#1e293b;margin-top:0;margin-bottom:15px;font-size:24px;">KẾT QUẢ THI LÝ THUYẾT HẠNG C1</h2>
      <div style="font-size:16px;line-height:1.8;max-width:320px;margin:0 auto;text-align:left;background:#f8fafc;padding:15px;border-radius:8px;border:1px solid #e2e8f0;">
        <div style="display:flex;justify-content:space-between;"><b>Số câu hỏi:</b> <span>${EXAM_TOTAL}</span></div>
        <div style="display:flex;justify-content:space-between;"><b>Số câu đúng:</b> <span style="color:#16a34a;font-weight:bold;">${score}</span></div>
        <div style="display:flex;justify-content:space-between;"><b>Số câu sai/bỏ qua:</b> <span style="color:#dc2626;font-weight:bold;">${wrong}</span></div>
        ${wrongCritical ? `<div style="color:#dc2626;font-weight:bold;font-size:14px;text-align:center;margin-top:10px;">Bạn đã sai câu điểm liệt!</div>` : ''}
        <div style="margin-top:10px;padding-top:10px;border-top:1px dashed #cbd5e1;font-size:20px;text-align:center;">
          <b>Kết quả:</b> <span style="color:${isPass ? '#16a34a' : '#dc2626'};font-weight:bold;margin-left:5px;">${isPass ? 'ĐẠT' : 'KHÔNG ĐẠT'}</span>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:20px;justify-content:center;">
        <button onclick="retryExam()" style="padding:10px 16px;font-size:15px;background:#3b82f6;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;">Làm Lại Đề Này</button>
        <button onclick="window.location.reload()" style="padding:10px 16px;font-size:15px;background:#10b981;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;">Đề Khác</button>
        <button onclick="exitHome()" style="padding:10px 16px;font-size:15px;background:#64748b;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;">Về Trang Chủ</button>
      </div>
    </div>`;

    current = 0;
    renderGrid();
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function retryExam() {
    isSubmitted = false;
    userAns = new Array(EXAM_TOTAL).fill(null);
    current = 0;
    timeLeft = EXAM_DURATION;
    startTimer();
    document.getElementById("examResultSummary").style.display = 'none';
    renderGrid();
    renderQuestion();
}

// ===== KEYBOARD =====
document.addEventListener("keydown", function(event) {
    if (!document.getElementById("c1ExamRoot") || document.getElementById("c1ExamRoot").style.display === "none") return;
    if (document.activeElement.tagName === "INPUT") return;
    if (event.key === "ArrowRight") { event.preventDefault(); next(); }
    if (event.key === "ArrowLeft") { event.preventDefault(); prev(); }
    if (["1","2","3","4"].includes(event.key)) {
        const idx = parseInt(event.key) - 1;
        const q = _manager.getQuestion(quiz[current]);
        if (q && idx < q.options.length) choose(q.options[idx].id);
    }
});
