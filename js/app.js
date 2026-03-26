if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener("load", function(){
  window.scrollTo(0,0);
});

const TOTAL=500;

let quiz=[];
let userAns=[];
let current=0;
let mode="";
let timeLeft = 0;
let timerInterval = null;
let candType = "C";
let passingScore = 28;
let isSubmitted = false;

/* ===== START ===== */

function start500(){
mode="500";
quiz=[...Array(TOTAL).keys()].map(i=>i+1);
userAns=new Array(TOTAL);
current=0;
openQuiz();
}

function start30(){
    const urlParams = new URLSearchParams(window.location.search);
    candType = (urlParams.get('type') || 'C').toUpperCase();
    
    if (candType === 'B') {
        passingScore = 26;
    } else {
        passingScore = 28;
    }

    mode = "30";
    isSubmitted = false;
    quiz = generateCANDExam();
    userAns = new Array(30).fill(null);
    current = 0;
    timeLeft = 20 * 60;

    // Update Titles and Hero
    const titleText = candType === 'B' 
        ? "Thi Thử GPLX Hạng B Online CAND – 30 Câu Hỏi Sát Hạch" 
        : "Thi Thử GPLX Hạng C Online CAND – 30 Câu Hỏi Sát Hạch";
    const heroTitle = candType === 'B' 
        ? "Thi Thử GPLX Hạng B CAND Online" 
        : "Thi Thử GPLX Hạng C CAND Online";
    
    document.title = titleText + " | thigplx.site";
    const heroEl = document.getElementById("heroTitle");
    if (heroEl) heroEl.textContent = heroTitle;

    const passingScoreHero = document.getElementById("passingScoreHero");
    if (passingScoreHero) passingScoreHero.textContent = `${passingScore}/30`;

    startTimer();
    openQuiz();
}

function generateCANDExam() {
    let all = [...Array(500).keys()].map(i => i + 1);
    let picked = [];
    for(let i=0; i<30; i++){
        let randIdx = Math.floor(Math.random()*all.length);
        picked.push(all.splice(randIdx,1)[0]);
    }
    return picked;
}



function openQuiz(){
  const home = document.getElementById("home");
  if (home) home.style.display="none";
  
  const quizEl = document.getElementById("quiz");
  if (quizEl) quizEl.style.display="block";

  // Hide Loading when quiz starts
  const loading = document.getElementById("loadingDiv");
  if (loading) loading.style.display = "none";

  render();
}

/* ===== HIỂN THỊ ===== */

function render() {
    let qId = quiz[current];
    let data = questions[qId - 1];

    let html = "";
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // START LAYOUT
    html += `<div class="s600-layout">`;

    // LEFT PANEL: Question Grid (Sticky)
    html += `
    <div class="s600-left-panel">
        <div class="s600-panel-title">${mode === "30" ? "DANH SÁCH 30 CÂU" : "DANH SÁCH 500 CÂU"}</div>
        <div class="s600-grid">
    `;
    
    for (let i = 0; i < quiz.length; i++) {
        let statusCls = "s600-grid-btn";
        if (i === current) {
            statusCls += " s600-grid-current";
        } else {
            // Check if answered
            const hasAnswered = userAns[i] != null;
            if (hasAnswered) {
                if (mode === "500") {
                    // Immediate feedback in 500 mode
                    const qData = questions[quiz[i] - 1];
                    const correctIdx = answers[qData.id];
                    if (userAns[i] === correctIdx) statusCls += " s600-grid-correct";
                    else statusCls += " s600-grid-wrong";
                } else {
                    // Exam mode: just show "answered" (blue/gray) unless submitted
                    if (isSubmitted) {
                        const qData = questions[quiz[i] - 1];
                        const correctIdx = answers[qData.id];
                        if (userAns[i] === correctIdx) statusCls += " s600-grid-correct";
                        else statusCls += " s600-grid-wrong";
                    } else {
                        statusCls += " s600-grid-answered";
                    }
                }
            }
        }
        
        // Critical badge hint in grid
        const qData = questions[quiz[i] - 1];
        if (qData.is_critical) {
            statusCls += " s600-grid-critical";
        }

        html += `<button class="${statusCls}" onclick="jumpTo(${i})">${i + 1}</button>`;
    }
    
    html += `
        </div>
        <div class="s600-legend">
            <span class="s600-legend-item"><span class="s600-dot dot-current"></span>Hiện tại</span>
            <span class="s600-legend-item"><span class="s600-dot" style="background:#3b82f6;"></span>Đã làm</span>
            ${(mode === "500" || isSubmitted) ? `
                <span class="s600-legend-item"><span class="s600-dot dot-correct"></span>Đúng</span>
                <span class="s600-legend-item"><span class="s600-dot dot-wrong"></span>Sai</span>
            ` : ""}
        </div>
    </div>
    `;

    // RIGHT PANEL: Question Content
    html += `<div class="s600-right-panel">`;

    // Header with Timer/Status
    html += `
    <div class="s600-q-header">
        <div class="s600-q-header-left">
            <span class="s600-q-index">Câu ${current + 1} / ${quiz.length}</span>
            ${data.is_critical ? `<span class="s600-critical-badge">⚠️ CÂU ĐIỂM LIỆT</span>` : ""}
        </div>
    `;
    
    if (mode === "30") {
        html += `
        <div style="font-size:18px; font-weight:bold; color:#ef4444; background:#fee2e2; padding:4px 12px; border-radius:6px;">
            ⏰ <span id="timerText">${minutes}:${seconds.toString().padStart(2, "0")}</span>
        </div>
        `;
    } else {
        let percent = Math.round(((current + 1) / quiz.length) * 100);
        html += `
        <div class="right-status" style="display:flex; align-items:center; gap:15px;">
            ${mode === "30" ? `<span style="font-size:13px; font-weight:700; color:#475569; background:#f1f5f9; padding:4px 10px; border-radius:6px; border:1px solid #e2e8f0;">Điều kiện đạt: ${passingScore}/30</span>` : ""}
            <div class="mini-progress" style="width:100px; height:8px; background:#e2e8f0; border-radius:4px; overflow:hidden;">
                <div class="mini-fill" style="width:${percent}%; height:100%; background:#4f46e5;"></div>
            </div>
            <span style="font-size:13px; font-weight:600; color:#64748b;">${percent}%</span>
        </div>
        `;
    }
    html += `</div>`;

    let qText = data.question.replace(/^Câu \d+:\s*/, "");

    html += `
    <div class="s600-q-text">
        <span class="s600-q-num">Câu ${current + 1}:</span> ${qText}
    </div>
    `;

    if (data.img) {
        html += `
        <div class="s600-q-img-wrap">
            <picture>
                <source srcset="${data.img}" type="image/webp">
                <img src="${data.img.replace('.webp', '.png')}" alt="Hình câu ${current + 1}" loading="lazy" decoding="async">
            </picture>
        </div>
        `;
    }

    html += `<div class="s600-answers">`;
    data.options.forEach((opt, i) => {
        let cls = 's600-ans-btn';
        let style = '';
        
        // Logic for feedback
        const showFeedback = mode === "500" ? (userAns[current] != null) : isSubmitted;
        const correctIdx = answers[data.id];

        if (!showFeedback) {
            if (userAns[current] === i) {
                style = 'box-shadow: 0 0 0 3px #1d4ed8; border-color:#1d4ed8; background-color:#dbeafe; font-weight:600; color:#1e3a8a;';
            }
        } else {
            if (i === correctIdx) cls += ' s600-ans-correct';
            else if (i === userAns[current] && i !== correctIdx) cls += ' s600-ans-wrong';
            style = 'cursor: default;';
        }

        html += `
            <button class="${cls}" style="${style}" onclick="choose(${i})">
                <span class="s600-ans-num">${i + 1}.</span>
                <span class="s600-ans-text">${opt}</span>
            </button>
        `;
    });
    html += `</div>`;

    // Explanation area
    const showExplanation = (mode === "30" && isSubmitted);
    if (showExplanation) {
        const correctIdx = answers[data.id];
        const isCorrect = userAns[current] === correctIdx;
        const explClass = isCorrect ? 's600-expl-correct' : 's600-expl-wrong';
        const title = isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng';
        const userText = userAns[current] != null ? data.options[userAns[current]] : 'Chưa chọn';
        const correctText = data.options[correctIdx];

        html += `
            <div class="s600-explanation ${explClass}" style="margin-top: 20px;">
                <div class="s600-expl-header">${title}</div>
                <div style="margin-bottom:15px; font-size:15px; line-height:1.6; border-bottom:1px dashed rgba(0,0,0,0.1); padding-bottom:10px;">
                    <div><b>Bạn chọn:</b> ${userText}</div>
                    <div style="color:#16a34a;"><b>Đáp án đúng:</b> ${correctText}</div>
                </div>
                <div class="s600-expl-body"><b>Giải thích:</b> ${data.explanation || 'Không có giải thích.'}</div>
            </div>
        `;
    }

    html += `
    <div class="s600-nav-btns" style="margin-top: 30px; display:flex; gap:12px; align-items:center;">
        <button class="s600-nav-btn" onclick="prev()" ${current === 0 ? 'disabled' : ''}>← Câu trước</button>
        ${(mode === "30" && !isSubmitted) ? `<button class="s600-nav-btn" style="background-color:#ef4444; color:#fff; border-color:#ef4444; flex:1;" onclick="submit()">Nộp Bài</button>` : ""}
        ${(mode === "500") ? `<button class="s600-nav-btn" style="background-color:#4b5563; color:#fff; border-color:#4b5563;" onclick="exitHome()">Thoát</button>` : ""}
        <button class="s600-nav-btn s600-nav-next" style="flex:${(mode === "30" && !isSubmitted) ? "0" : "1"};" onclick="next()" ${current === quiz.length - 1 ? 'disabled' : ''}>Câu tiếp →</button>
    </div>
    `;

    html += `</div>`; // End s600-right-panel
    html += `</div>`; // End s600-layout

    let target = document.getElementById("quiz");
    if (isSubmitted && mode === "30" && document.getElementById("reviewContent")) {
        target = document.getElementById("reviewContent");
    }
    
    if (target) {
        target.innerHTML = html;
    }

    // Fix scroll issue: scroll current question into view in the sidebar
    setTimeout(() => {
        const gridBtn = document.querySelector('.s600-grid-current');
        if (gridBtn) {
            gridBtn.scrollIntoView({ behavior: 'auto', block: 'nearest' });
        }
    }, 0);
}

function gotoQuestion(){

let num = parseInt(document.getElementById("gotoInput").value);

if(isNaN(num) || num<1 || num>quiz.length){
    alert("Số câu không hợp lệ!");
    return;
}

current = num-1;
render();
}

/* ===== CHỌN ===== */

function choose(i) {
    if (isSubmitted) return;
    
    userAns[current] = i;
    
    if (mode === "500") {
        render(); // Immediate feedback for study
        return;
    }

    // Update answer buttons visually (Exam mode only)
    const btns = document.querySelectorAll('.s600-ans-btn');
    btns.forEach((btn, idx) => {
        if (idx === i) {
            btn.style.boxShadow = '0 0 0 3px #1d4ed8';
            btn.style.borderColor = '#1d4ed8';
            btn.style.backgroundColor = '#dbeafe';
            btn.style.fontWeight = '600';
            btn.style.color = '#1e3a8a';
        } else {
            btn.style.boxShadow = '';
            btn.style.borderColor = '';
            btn.style.backgroundColor = '';
            btn.style.fontWeight = '';
            btn.style.color = '';
        }
    });

    // Update Question Nav Grid visually (Exam mode only)
    const gridBtns = document.querySelectorAll('.s600-grid-btn');
    if (gridBtns[current] && !gridBtns[current].classList.contains('s600-grid-answered')) {
        gridBtns[current].classList.add('s600-grid-answered');
    }
}

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
    
    // Calculate distance moved
    let diffX = Math.abs(currentX - touchStartX);
    let diffY = Math.abs(currentY - touchStartY);
    
    // If finger moved more than 10px, consider it a scroll
    if (diffX > 10 || diffY > 10) {
        isScrolling = true;
    }
}

function handleOptionTouchEnd(e, index) {
    // Only select the option if the user didn't scroll
    if (!isScrolling) {
        choose(index);
    }
    // Reset flags
    isScrolling = false;
}

function jumpTo(i){
    current = i;
    render();
}

/* ===== NAV ===== */

function next(){

if(current<quiz.length-1){

current++;

requestAnimationFrame(render);

}

}

function prev(){

if(current>0){

current--;

requestAnimationFrame(render);

}

}

/* ===== NỘP ===== */

function submit() {
    if (isSubmitted) return;

    const answeredCount = userAns.filter(a => a !== null).length;
    if (answeredCount < quiz.length && timeLeft > 0) {
        if (!confirm(`Bạn mới trả lời ${answeredCount}/${quiz.length} câu. Bạn có chắc chắn muốn nộp bài?`)) return;
    }

    isSubmitted = true;
    clearInterval(timerInterval);

    let score = 0;
    quiz.forEach((qIdx, i) => {
        const qData = questions[qIdx - 1];
        const correctIdx = answers[qData.id];
        if (userAns[i] === correctIdx) score++;
    });

    const isPass = score >= passingScore;
    renderResult(score, isPass);
}

function renderResult(score, isPass) {
    const wrong = quiz.length - score;
    const title = candType === "B" ? "HẠNG B CAND" : "HẠNG C CAND";
    
    let html = `
    <div class="result-summary" style="padding:24px; background:#fff; border-radius:16px; margin-bottom:24px; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1); text-align:center; border: 1px solid #e2e8f0; animation: s600FadeUp 0.4s ease-out; max-width:800px; margin:0 auto 24px;">
        <h2 style="color:#1e293b; margin-top:0; margin-bottom:20px; font-size:26px; font-weight:800; letter-spacing:-0.5px; text-transform:uppercase;">KẾT QUẢ THI LÝ THUYẾT ${title}</h2>
        
        <div style="font-size:16px; line-height:1.8; max-width:400px; margin:0 auto; text-align:left; background:#f8fafc; padding:20px; border-radius:12px; border:1px solid #e2e8f0;">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <b style="color:#64748b;">Số câu hỏi:</b> 
                <span style="font-weight:700; color:#1e293b;">${quiz.length}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <b style="color:#64748b;">Số câu đúng:</b> 
                <span style="color:#16a34a; font-weight:800;">${score}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                <b style="color:#64748b;">Số câu sai/bỏ qua:</b> 
                <span style="color:#dc2626; font-weight:800;">${wrong}</span>
            </div>
            
            <div style="margin-top:15px; padding-top:15px; border-top:2px dashed #e2e8f0; text-align:center;">
                <div style="font-size:14px; color:#64748b; margin-bottom:4px; text-transform:uppercase; letter-spacing:1px; font-weight:700;">Kết quả chung cuộc</div>
                <div style="font-size:32px; color:${isPass ? '#16a34a' : '#dc2626'}; font-weight:900;">
                    ${isPass ? 'ĐẠT' : 'KHÔNG ĐẠT'}
                </div>
            </div>
        </div>
        
        <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:24px; justify-content:center;">
            <button class="primary-btn" onclick="retryExam()" style="width:auto; padding:12px 24px; font-size:15px; border:none; border-radius:10px; cursor:pointer; font-weight:700; box-shadow: 0 4px 6px -1px rgba(59,130,246,0.3);"> LÀM LẠI ĐỀ NÀY</button>
            <button class="secondary-btn" onclick="location.reload()" style="width:auto; padding:12px 24px; font-size:15px; background:#10b981; color:white; border:none; border-radius:10px; cursor:pointer; font-weight:700; box-shadow: 0 4px 6px -1px rgba(16,185,129,0.3);"> ĐỀ KHÁC</button>
            <button class="secondary-btn" onclick="exitHome()" style="width:auto; padding:12px 24px; font-size:15px; border:none; border-radius:10px; cursor:pointer; font-weight:700; box-shadow: 0 4px 6px -1px rgba(100,116,139,0.3);"> VỀ TRANG CHỦ</button>
        </div>
    </div>
    
    <div style="text-align:center; margin-bottom:20px; font-weight:700; color:#475569; font-size:18px; text-transform: uppercase; letter-spacing: 0.5px;">
        <i class="fa-solid fa-arrow-down"></i> Xem chi tiết bài thi <i class="fa-solid fa-arrow-down"></i>
    </div>
    <div id="reviewContent"></div>
    `;

    document.getElementById("quiz").innerHTML = html;
    current = 0;
    render(); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function retryExam() {
    isSubmitted = false;
    userAns = new Array(quiz.length).fill(null);
    current = 0;
    if (mode === "30") {
        timeLeft = 20 * 60;
        startTimer();
    }
    render();
}

function newExam() {
    location.reload();
}

/* ===== EXIT ===== */

function exitHome(){
location.reload();
}

/* ===== PHÍM MŨI TÊN CHUYỂN CÂU ===== */

document.addEventListener("keydown", function(event){

// Nếu đang ở màn hình Home thì không làm gì
if(document.getElementById("quiz").style.display === "none") return;

// Nếu đang nhập trong input thì không xử lý
if(document.activeElement.tagName === "INPUT") return;

// Mũi tên phải → Câu sau
if(event.key === "ArrowRight"){
    event.preventDefault();
    next();
}

// Mũi tên trái → Câu trước
if(event.key === "ArrowLeft"){
    event.preventDefault();
    prev();
}

// ===== CHỌN ĐÁP ÁN BẰNG 1 2 3 4 =====

if(["1","2","3","4"].includes(event.key)){
    let index = parseInt(event.key) - 1;
    choose(index);
}

});

// ===== TỰ ĐỘNG GIỮ ĐĂNG NHẬP KHI F5 =====

window.addEventListener("load", function(){

if(sessionStorage.getItem("loggedIn")==="true"){

    document.getElementById("loginBox").style.display="none";
    document.getElementById("app").style.display="block";

}

});

function startTimer(){

clearInterval(timerInterval);

timerInterval = setInterval(()=>{

timeLeft--;

if(timeLeft <= 0){

clearInterval(timerInterval);
alert("⏰ Hết thời gian!");
submit();
return;

}

let minutes = Math.floor(timeLeft/60);
let seconds = timeLeft % 60;

let el = document.getElementById("timerText");
if(el){
el.innerText = minutes + ":" + seconds.toString().padStart(2,"0");
}

},1000);

}

