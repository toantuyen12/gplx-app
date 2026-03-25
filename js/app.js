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
document.getElementById("home").style.display="none";
document.getElementById("quiz").style.display="block";

// Hide Loading when quiz starts (Keep Hero visible)
const heroBoundary = document.getElementById("examHero");
const loading = document.getElementById("loadingDiv");
if (loading) loading.style.display = "none";

render();
}

/* ===== HIỂN THỊ ===== */

function render(){

let q = quiz[current];
let data = questions[q-1];
let html="";

if(mode==="500"){

let percent = Math.round(((current+1)/quiz.length)*100);

html+=`
<div class="header-wrap">

    <div class="search-box">
    <div class="search-input-wrap">
        <span class="search-icon">🔍</span>
        <input type="number"
        id="gotoInput"
        min="1"
        max="${quiz.length}"
        placeholder="Nhập câu..."
        onkeydown="if(event.key==='Enter') gotoQuestion()">
    </div>
    <button class="goto-btn" onclick="gotoQuestion()">Tới</button>
</div>

    <div class="right-status">
        <div class="question-text">
            Câu ${current+1}/${quiz.length}
        </div>

        <div class="mini-progress">
            <div class="mini-fill" style="width:${percent}%"></div>
        </div>
    </div>

</div>
`;

}else{

        let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // START LAYOUT
    html += `<div class="s600-layout">`;

    // LEFT PANEL: Question Grid (Sticky)
    html += `
    <div class="s600-left-panel">
        <div class="s600-panel-title">DANH SÁCH 30 CÂU</div>
        <div class="s600-grid">
    `;
    for (let i = 0; i < quiz.length; i++) {
        let statusCls = "s600-grid-btn";
        if (i === current) {
            statusCls += " s600-grid-current";
        } else if (!isSubmitted) {
            if (userAns[i] != null) statusCls += " s600-grid-answered";
        } else {
            // Result Mode: Grid colors
            const qData = questions[quiz[i]];
            const correctIdx = answers[qData.id];
            if (userAns[i] === correctIdx) statusCls += " s600-grid-correct";
            else statusCls += " s600-grid-wrong";
        }
        html += `<button class="${statusCls}" onclick="jumpTo(${i})">${i + 1}</button>`;
    }
    html += `
        </div>
        <div class="s600-legend">
            <span class="s600-legend-item"><span class="s600-dot dot-current"></span>Hiện tại</span>
            <span class="s600-legend-item"><span class="s600-dot" style="background:#3b82f6;"></span>Đã làm</span>
        </div>
    </div>
    `;

    // RIGHT PANEL: Question Content
    html += `<div class="s600-right-panel">`;

    // Header with Timer and Index
    html += `
    <div class="s600-q-header">
        <div class="s600-q-header-left">
            <span class="s600-q-index">Câu ${current + 1} / ${quiz.length}</span>
        </div>
        <div style="font-size:18px; font-weight:bold; color:#ef4444; background:#fee2e2; padding:4px 12px; border-radius:6px;">
            ⏰ <span id="timerText">${minutes}:${seconds.toString().padStart(2, "0")}</span>
        </div>
    </div>
    `;

    let data = questions[quiz[current]];
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
        
        if (!isSubmitted) {
            if (userAns[current] === i) {
                style = 'box-shadow: 0 0 0 3px #1d4ed8; border-color:#1d4ed8; background-color:#dbeafe; font-weight:600; color:#1e3a8a;';
            }
        } else {
            const correctIdx = answers[data.id];
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

    if (isSubmitted) {
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
    <div class="s600-nav-btns" style="margin-top: 30px;">
        <button class="s600-nav-btn" onclick="prev()" ${current === 0 ? 'disabled' : ''}>← Câu trước</button>
        <div style="flex: 1;"></div>
        <button class="s600-nav-btn s600-nav-next" onclick="next()" ${current === quiz.length - 1 ? 'disabled' : ''}>Câu tiếp →</button>
        ${!isSubmitted ? `<button class="s600-nav-btn" style="background-color:#ef4444; color:#fff; border-color:#ef4444;" onclick="submit()">Nộp Bài</button>` : ''}
    </div>
    `;

    html += `</div>`; // End s600-right-panel
    html += `</div>`; // End s600-layout

    document.getElementById("quiz").innerHTML = html;
}
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
    
    // Update answer buttons visually
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

    // Update Question Nav Grid visually
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
    <div class="result-summary" style="padding:24px; background:#fff; border-radius:16px; margin-bottom:24px; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1); text-align:center; border: 1px solid #e2e8f0; animation: s600FadeUp 0.4s ease-out;">
        <h2 style="color:#1e293b; margin-top:0; margin-bottom:20px; font-size:26px; font-weight:800; letter-spacing:-0.5px;">KẾT QUẢ THI LÝ THUYẾT ${title}</h2>
        
        <div style="font-size:16px; line-height:1.8; max-width:360px; margin:0 auto; text-align:left; background:#f8fafc; padding:20px; border-radius:12px; border:1px solid #e2e8f0;">
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
            <button class="primary-btn" onclick="retryExam()" style="padding:12px 24px; font-size:15px; border:none; border-radius:10px; cursor:pointer; font-weight:700; box-shadow: 0 4px 6px -1px rgba(59,130,246,0.3);"> LÀM LẠI ĐỀ NÀY</button>
            <button class="secondary-btn" onclick="location.reload()" style="padding:12px 24px; font-size:15px; background:#10b981; color:white; border:none; border-radius:10px; cursor:pointer; font-weight:700; box-shadow: 0 4px 6px -1px rgba(16,185,129,0.3);"> ĐỀ KHÁC</button>
            <button class="secondary-btn" onclick="exitHome()" style="padding:12px 24px; font-size:15px; border:none; border-radius:10px; cursor:pointer; font-weight:700; box-shadow: 0 4px 6px -1px rgba(100,116,139,0.3);"> VỀ TRANG CHỦ</button>
        </div>
    </div>
    <div style="text-align:center; margin-bottom:20px; font-weight:700; color:#475569; font-size:16px;">
        <i class="fa-solid fa-arrow-down"></i> XEM CHI TIẾT BÀI THI CỦA BẠN <i class="fa-solid fa-arrow-down"></i>
    </div>
    `

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

