if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener("load", function(){
  window.scrollTo(0,0);
});

// URLParams
const urlParams = new URLSearchParams(window.location.search);
const license = urlParams.get('license') || 'a1'; // 'a1' or 'a'

const isA1 = license === 'a1';
const PASSING_SCORE = isA1 ? 21 : 23;
const EXAM_DURATION = 19 * 60; // 19 minutes
const RECENT_KEY = `moto_exam_recent_${license}`;
const HISTORY_KEY = `moto_exam_history_${license}`;

// UI Setup based on License
document.addEventListener("DOMContentLoaded", () => {
    document.title = `Thi Đề 25 Câu GPLX Hạng ${license.toUpperCase()} Online | thigplx.site`;
    document.getElementById("pageTitle").textContent = `Thi Thử Sát Hạch GPLX Hạng ${license.toUpperCase()} Online`;
    const bcMenu = document.getElementById("bc-menu");
    bcMenu.textContent = `Thi Thử GPLX Hạng ${license.toUpperCase()}`;
    bcMenu.href = `class-${license}-menu.html`;
});

let quiz = []; // Array of global IDs mapping to questions600
let userAns = [];
let current = 0;
let timeLeft = 0;
let timerInterval = null;
let questionsExplain = {}; // dict of id -> explanation

// Pre-fetch explanations
fetch("questions600explain.json")
    .then(r => r.json())
    .then(data => {
        data.forEach(item => {
            questionsExplain[item.id] = item.explanation;
        });
    })
    .catch(err => console.error("Could not load explanations", err));

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

    // Chapters setup from questionMode.js (CHAPTERS_A1)
    // CRITICAL_IDS = [19, 20, 21, 22, 24, 26, 27, 28, 30, 47, 48, 52, 53, 63, 64, 65, 68, 70, 71, 72];
    const ch1 = CHAPTERS_A1[0].questionIds;
    const ch2 = CHAPTERS_A1[1].questionIds;
    const ch3 = CHAPTERS_A1[2].questionIds;
    const ch4 = CHAPTERS_A1[3].questionIds;
    const ch5 = CHAPTERS_A1[4].questionIds;

    const criticalPool = CRITICAL_IDS.filter(id => ch1.includes(id));
    const ch1NonCritical = ch1.filter(id => !CRITICAL_IDS.includes(id));

    // Exclude recent ones
    const filterRecent = (arr) => arr.filter(id => !recentIds.includes(id));

    let poolCrit = filterRecent(criticalPool);
    let poolCh1 = filterRecent(ch1NonCritical);
    let poolCh2 = filterRecent(ch2);
    let poolCh3 = filterRecent(ch3);
    let poolCh4 = filterRecent(ch4);
    let poolCh5 = filterRecent(ch5);

    // If any pool is missing elements, reset recent list
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

    // Filter to retain only unique items across all runs for latest 125 limit
    recentIds.push(...quiz);
    // If recentIds > 125, it means we ran 5 tests. the prompt says "Nếu danh sách > 125: Reset lại danh sách (bắt đầu vòng mới)."
    // So we just keep the newest 25 if it exceeds 125, or simply clear it before pushing if length > 125?
    // Let's just keep exactly the latest 125 (5 exams of 25).
    if (recentIds.length >= 125) { // Reset since > 125 will be reached. Actually > 125 means after 5 tests it reaches 125. The 6th test makes it 150.
        // Wait, "Nếu danh sách > 125: Reset lại danh sách (bắt đầu vòng mới)."
        // So we reset and start fresh with just these 25
        recentIds = [...quiz];
    }
    
    // Safety ensuring uniqueness
    recentIds = [...new Set(recentIds)];
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentIds));
}

function startExam() {
    generateMotoExam();
    userAns = new Array(25);
    current = 0;
    
    timeLeft = EXAM_DURATION;
    startTimer();
    
    document.getElementById("home").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    render();
}

window.exitHome = function() {
    window.location.href = `class-${license}-menu.html`;
};

window.addEventListener("load", function() {
    startExam();
});

function getLocal250Index(globalId) {
    // Map the global 1-600 ID into its 1-250 position for A1.
    // We already have CHAPTERS_A1 logic inside questionMode.js:
    let acc = 1;
    for (let c of CHAPTERS_A1) {
        for (let qId of c.questionIds) {
            if (qId === globalId) return acc;
            acc++;
        }
    }
    return globalId; // Fallback
}

function render() {
    let qGlobalId = quiz[current];
    let data = questions[qGlobalId - 1]; // questions array is 0-indexed
    let isCriticalPoint = CRITICAL_IDS.includes(qGlobalId);
    let localQIndex = getLocal250Index(qGlobalId);
    let html = "";
    
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    html += `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin:0;">CÂU HỎI THI: ${current + 1}/${quiz.length}</h3>
        <div style="font-size:18px;font-weight:bold;color:#ef4444; background: #fee2e2; padding: 8px 15px; border-radius: 8px;">
            ⏰ <span id="timerText">${minutes}:${seconds.toString().padStart(2,"0")}</span>
        </div>
    </div>
    `;

    // NAV BAR
    html += `<div class="q-nav-bar">`;
    for(let i=0; i<quiz.length; i++){
        let statusCls = "";
        if (i === current) statusCls = "current";
        else if (userAns[i] != null) statusCls = "answered";
        
        // Highlight critical if user is on it or it is a critical question
        let critIcon = CRITICAL_IDS.includes(quiz[i]) ? `<span style="position:absolute; top:-4px; right:-4px; font-size:10px; color:red;">★</span>` : '';
        html += `<div class="q-nav-btn ${statusCls}" style="position:relative;" onclick="jumpTo(${i})">${i + 1}${critIcon}</div>`;
    }
    html += `</div>`;

    let critWarning = isCriticalPoint ? `<div style="background:#fef2f2; color:#b91c1c; border:1px solid #fca5a5; padding:8px 12px; border-radius:6px; font-size:14px; margin-bottom:15px; font-weight:bold;">⚠️ Câu điểm liệt</div>` : "";

    html += `
    <div class="question-layout">
       <div class="question-left">
           ${critWarning}
           <h3><span style="color:#64748b; font-size:0.9em; font-weight:normal;">(Câu ${localQIndex}/250)</span> ${data.question.replace(/^Câu \d+:\s*/,"")}</h3>
           ${data.img ? `<picture><source srcset="${data.img}" type="image/webp"><img src="${data.img.replace('.webp', '.png')}" loading="lazy" decoding="async"></picture>` : ""}
       </div>
       <div class="question-right">
    `;

    data.options.forEach((o, i) => {
        let cls = "";
        if (userAns[current] === i) cls = "selected";
        
        html += `
        <div class="option ${cls}"
        onclick="choose(${i})"
        ontouchstart="handleOptionTouchStart(event)"
        ontouchmove="handleOptionTouchMove(event)"
        ontouchend="handleOptionTouchEnd(event, ${i})">
        <b>${i+1}.</b> ${o}
        </div>`;
    });

    html += `
       </div>
    </div>
    <div class="nav-buttons">
        <button class="secondary-btn" onclick="prev()">⬅ Câu trước</button>
        <button class="secondary-btn" onclick="next()">Câu sau ➡</button>
        <button class="danger-btn" onclick="submit()">📝 Nộp bài</button>
    </div>
    `;
    
    document.getElementById("quiz").innerHTML = html;
}

function choose(i) {
    userAns[current] = i;
    
    const options = document.querySelectorAll('.option');
    options.forEach((opt, idx) => {
        opt.classList.remove('selected');
        if (idx === i) opt.classList.add('selected');
    });

    const navBtns = document.querySelectorAll('.q-nav-btn');
    if (navBtns[current] && !navBtns[current].classList.contains('answered')) {
        navBtns[current].classList.add('answered');
    }
}

// Touch handling
let touchStartX = 0;
let touchStartY = 0;
let isScrolling = false;

function handleOptionTouchStart(e) {
    if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isScrolling = false;
    }
}
function handleOptionTouchMove(e) {
    if (!e.touches || e.touches.length === 0) return;
    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;
    let diffX = Math.abs(currentX - touchStartX);
    let diffY = Math.abs(currentY - touchStartY);
    if (diffX > 10 || diffY > 10) isScrolling = true;
}
function handleOptionTouchEnd(e, index) {
    if (!isScrolling) choose(index);
    isScrolling = false;
}

function jumpTo(i) {
    current = i;
    render();
}

function next() {
    if (current < quiz.length - 1) {
        current++;
        requestAnimationFrame(render);
    }
}

function prev() {
    if (current > 0) {
        current--;
        requestAnimationFrame(render);
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
    if (typeof timerInterval !== 'undefined') clearInterval(timerInterval);

    let score = 0;
    let wrongCritical = false;

    quiz.forEach((qGlobalId, i) => {
        let user = userAns[i];
        let correct = answers[qGlobalId];
        if (user === correct) {
            score++;
        } else if (CRITICAL_IDS.includes(qGlobalId)) {
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

    let html = `
    <div class="result-summary" style="text-align:center; padding: 20px; background: #f8fafc; border-radius: 12px; margin-bottom: 25px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #1e293b; margin-top: 0; margin-bottom: 15px; font-size: 24px;">KẾT QUẢ THI LÝ THUYẾT HẠNG ${license.toUpperCase()}</h2>
      <div style="font-size: 16px; line-height: 1.8; max-width: 320px; margin: 0 auto; text-align: left; background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <div style="display: flex; justify-content: space-between;"><b>Số câu hỏi:</b> <span>25</span></div>
        <div style="display: flex; justify-content: space-between;"><b>Số câu đúng:</b> <span style="color: #16a34a; font-weight: bold;">${score}</span></div>
        <div style="display: flex; justify-content: space-between;"><b>Số câu sai/bỏ qua:</b> <span style="color: #dc2626; font-weight: bold;">${wrong}</span></div>
        ${wrongCritical ? `<div style="color:#dc2626; font-weight:bold; font-size:14px; text-align:center; margin-top:10px;">Bạn đã trả lời sai câu điểm liệt!</div>` : ''}
        <div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #cbd5e1; font-size: 20px; text-align: center;">
          <b>Kết quả:</b> <span style="color: ${isPass ? '#16a34a' : '#dc2626'}; font-weight: bold; margin-left: 5px;">${isPass ? 'ĐẠT' : 'KHÔNG ĐẠT'}</span>
        </div>
      </div>
    </div>
    `;

    // GRID
    html += `<div class="q-nav-bar" style="margin-bottom: 25px; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">`;
    quiz.forEach((qGlobalId, i) => {
        let user = userAns[i];
        let correct = answers[qGlobalId];
        let isCorrect = user === correct;
        let bgColor = isCorrect ? '#4ade80' : '#f87171';
        let textColor = isCorrect ? '#064e3b' : '#7f1d1d';
        html += `<div class="q-nav-btn" style="background-color: ${bgColor}; color: ${textColor}; border-color: ${bgColor}; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 8px; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" onclick="document.getElementById('res-q-${i}').scrollIntoView({behavior: 'smooth'})">${i+1}</div>`;
    });
    html += `</div>`;

    // DETAILS
    quiz.forEach((qGlobalId, i) => {
        let user = userAns[i];
        let correct = answers[qGlobalId];
        let isCorrect = user === correct;
        let qData = questions[qGlobalId - 1];
        let localQIndex = getLocal250Index(qGlobalId);
        let explanation = questionsExplain[qGlobalId] || "Không có giải thích cho câu hỏi này.";
        
        html += `
        <div id="res-q-${i}" style="margin-bottom:25px;padding:20px;border:1px solid #e2e8f0;border-radius:12px;background:#fff;text-align:left; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <h4 style="margin-top:0; color: #334155; font-size: 18px; display: flex; align-items: center; gap: 8px;">
                Câu ${i+1}
                <span style="font-size: 14px; padding: 3px 8px; border-radius: 6px; background: ${isCorrect ? '#dcfce7' : '#fee2e2'}; color: ${isCorrect ? '#166534' : '#991b1b'};">
                    ${isCorrect ? "✅ Đúng" : "❌ Sai"}
                </span>
                ${CRITICAL_IDS.includes(qGlobalId) ? `<span style="font-size: 12px; padding: 2px 6px; border-radius: 4px; background: #fef2f2; color: #b91c1c; border: 1px solid #fca5a5;">Câu điểm liệt</span>` : ''}
            </h4>
            <p style="font-size: 16px; font-weight: 600; color: #0f172a; margin: 10px 0 20px 0; line-height: 1.5;">
                <span style="color:#64748b; font-size:0.9em; font-weight:normal;">(Câu ${localQIndex}/250)</span> 
                ${qData.question.replace(/^Câu \d+:\s*/,"")}
            </p>
            ${qData.img ? `<div style="text-align:center; margin-bottom: 20px;"><picture><source srcset="${qData.img}" type="image/webp"><img src="${qData.img.replace('.webp', '.png')}" style="max-width:100%; height:auto; border-radius:8px;" loading="lazy" decoding="async"></picture></div>` : ""}
            
            <div class="result-options" style="display:flex; flex-direction:column; gap:10px; margin-bottom: 20px;">
        `;
        
        qData.options.forEach((opt, optIdx) => {
            let isOptCorrect = optIdx === correct;
            let isOptUser = optIdx === user;
            
            let bg = "#f8fafc";
            let border = "#e2e8f0";
            let color = "#334155";
            let fw = "normal";
            let icon = "";
            
            if (isOptCorrect) {
                bg = "#dcfce7";
                border = "#22c55e";
                color = "#166534";
                fw = "bold";
                icon = "✓";
            } else if (isOptUser && !isOptCorrect) {
                bg = "#fee2e2";
                border = "#ef4444";
                color = "#991b1b";
                fw = "bold";
                icon = "✗";
            }
            
            html += `
                <div style="padding: 12px 15px; border: 1px solid ${border}; border-radius: 8px; background: ${bg}; color: ${color}; font-weight: ${fw}; display: flex; gap: 10px;">
                    <b style="min-width: 25px;">${["A","B","C","D"][optIdx] || (optIdx+1)}.</b> 
                    <span>${opt} ${icon ? `<span style="margin-left:5px; font-weight:bold;">${icon}</span>` : ''}</span>
                </div>
            `;
        });
        
        html += `</div>`;
        
        let userLabel = user != null ? `<b>Bạn chọn:</b> ${["A","B","C","D"][user] || (user+1)} - ${qData.options[user]}` : "<b>Bạn chưa chọn đáp án</b>";
        let correctLabel = `<b>Đáp án đúng:</b> ${["A","B","C","D"][correct] || (correct+1)} - ${qData.options[correct]}`;
        
        // Explain block matching questions600explain.json
        html += `
            <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 15px; line-height: 1.6; border-left: 4px solid ${isCorrect ? '#22c55e' : '#ef4444'}; margin-bottom: 15px;">
                <div style="color: ${isCorrect ? '#166534' : '#991b1b'}; margin-bottom: 8px;">${userLabel}</div>
                <div style="color: #166534;">${correctLabel}</div>
            </div>
            
            <div style="background: #e0f2fe; border: 1px solid #bae6fd; border-radius: 8px; padding: 15px;">
                <h5 style="color: #0369a1; margin: 0 0 8px 0; font-size: 15px;"><i class="fa-solid fa-lightbulb"></i> Giải thích đáp án:</h5>
                <div style="color: #0c4a6e; font-size: 14.5px; line-height: 1.6;">
                    ${explanation}
                </div>
            </div>
        </div>
        `;
    });

    html += `
    <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 30px; margin-bottom: 20px; justify-content: center;">
        <button onclick="retryExam()" style="padding: 14px 24px; font-size: 16px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; flex: 1; min-width: 200px; box-shadow: 0 2px 4px rgba(59,130,246,0.3); outline: none;">🔄 Làm Lại Đề Này</button>
        <button onclick="startExam()" style="padding: 14px 24px; font-size: 16px; background: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; flex: 1; min-width: 200px; box-shadow: 0 2px 4px rgba(16,185,129,0.3); outline: none;">📝 Thi Đề Ngẫu Nhiên Khác</button>
        <button onclick="exitHome()" style="padding: 14px 24px; font-size: 16px; background: #64748b; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; flex: 1; min-width: 200px; box-shadow: 0 2px 4px rgba(100,116,139,0.3); outline: none;">🏠 Về Màn Hình Chính</button>
    </div>
    `;

    document.getElementById("quiz").innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function retryExam() {
    userAns = new Array(25);
    current = 0;
    timeLeft = EXAM_DURATION;
    startTimer();
    render();
}

// Keydown listeners for navigation/options
document.addEventListener("keydown", function(event) {
    if (document.getElementById("quiz").style.display === "none") return;
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
        // make sure there's actually an option
        let data = questions[quiz[current] - 1];
        if(index < data.options.length) {
            choose(index);
        }
    }
});
