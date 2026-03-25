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

// Update Hero UI based on type
const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDesc");
const passingScoreHero = document.getElementById("passingScoreHero");

if (candType === 'B') {
    passingScore = 26;
    if (heroTitle) heroTitle.innerText = "Thi Thử GPLX HẠNG B CAND – 30 Câu Hỏi Sát Hạch";
    if (passingScoreHero) passingScoreHero.innerText = "26/30";
} else {
    passingScore = 28;
    if (heroTitle) heroTitle.innerText = "Thi Thử GPLX HẠNG C CAND – 30 Câu Hỏi Sát Hạch";
    if (passingScoreHero) passingScoreHero.innerText = "28/30";
}

// Ensure Hero is visible and loading is still there (though start30 is called on load)
const hero = document.getElementById("examHero");
const loading = document.getElementById("loadingDiv");
if (hero) hero.style.display = "block";
if (loading) loading.style.display = "block";

mode="30";

function rand(min,max){
return Math.floor(Math.random()*(max-min+1))+min;
}

function pick(rangeStart,rangeEnd,count){

let arr=[];

for(let i=rangeStart;i<=rangeEnd;i++){
arr.push(i);
}

arr.sort(()=>0.5-Math.random());

return arr.slice(0,count);
}

/* số câu theo tỉ lệ */

let n1=rand(6,7);
let n2=rand(6,7);
let n3=rand(2,3);
let n4=rand(3,4);
let n5=rand(5,6);
let n6=rand(3,4);
let n7=rand(0,1);

let total=n1+n2+n3+n4+n5+n6+n7;

/* cân chỉnh cho đúng 30 */

while(total>30){
if(n5>5){n5--;total--;continue;}
if(n4>3){n4--;total--;continue;}
if(n6>3){n6--;total--;continue;}
if(n3>2){n3--;total--;continue;}
if(n2>6){n2--;total--;continue;}
if(n1>6){n1--;total--;continue;}
}

while(total<30){
n1++;
total++;
}

/* random từng nhóm */

quiz=[
...pick(1,130,n1),
...pick(131,240,n2),
...pick(241,265,n3),
...pick(266,345,n4),
...pick(346,455,n5),
...pick(456,490,n6),
...pick(491,500,n7)
];

/* shuffle lại */

quiz.sort(()=>0.5-Math.random());

userAns=new Array(30);
current=0;

timeLeft = 20 * 60; // 20 phút
startTimer();

// Hide loading early if questions are ready (usually start30 is sync here)
if (typeof questions !== 'undefined' && questions.length > 0) {
    openQuiz();
} else {
    // If questions load later, wait for them
    let checkInterval = setInterval(() => {
        if (typeof questions !== 'undefined' && questions.length > 0) {
            clearInterval(checkInterval);
            openQuiz();
        }
    }, 100);
}
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
        if (i === current) statusCls += " s600-grid-current";
        else if (userAns[i] != null) statusCls += " s600-grid-answered";
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
        let cls = "";
        if (userAns[current] != null && i === userAns[current]) cls = " s600-ans-correct"; // Using correct style for selection in exam mode
        
        let isSelected = userAns[current] === i;
        let style = isSelected ? 'border-color:#1d4ed8; background-color:#dbeafe; font-weight:600; color:#1e3a8a; box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1);' : '';
        
        html += `
        <button class="s600-ans-btn${isSelected ? ' s600-ans-correct' : ''}" style="${style}" onclick="choose(${i})">
            <span class="s600-ans-num">${i + 1}.</span>
            <span class="s600-ans-text">${opt}</span>
        </button>
        `;
    });
    html += `</div>`;

    html += `
    <div class="s600-nav-btns">
        <button class="s600-nav-btn" onclick="prev()" ${current === 0 ? 'disabled' : ''}>← Câu trước</button>
        <button class="s600-nav-btn s600-nav-next" style="flex:1;" onclick="next()" ${current === quiz.length - 1 ? 'disabled' : ''}>Câu tiếp →</button>
        <button class="s600-nav-btn" style="background-color:#ef4444; color:#fff; border-color:#ef4444;" onclick="submit()">Nộp Bài</button>
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

function choose(i){
    userAns[current] = i;
    
    // Update options visually instead of full re-render to avoid screen jump
    const options = document.querySelectorAll('.option');
    options.forEach((opt, idx) => {
        opt.classList.remove('selected', 'correct', 'wrong');
        
        if (mode === "500") {
            let q = quiz[current];
            if (idx === answers[q]) opt.classList.add('correct');
            else if (idx === i) opt.classList.add('wrong');
        } else if (mode === "30") {
            if (idx === i) opt.classList.add('selected');
        }
    });

    // Update Question Nav Bar visually
    if (mode === "30") {
        const navBtns = document.querySelectorAll('.s600-grid-btn');
        if (navBtns[current] && !navBtns[current].classList.contains('s600-grid-answered')) {
            navBtns[current].classList.add('s600-grid-answered');
        }
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

function submit(){

clearInterval(timerInterval); // DỪNG TIMER

let score=0;
let answered=0;

quiz.forEach((q,i)=>{
    let user=userAns[i];
    let correct=answers[q];
    if(user===correct) score++;
    if(user!=null) answered++;
});

let total = quiz.length;
let wrong = total - score;
let isPass = score >= passingScore; 

    // START LAYOUT FOR RESULTS (2-Column)
    html += `<div class="s600-layout">`;

    // LEFT PANEL: Results Grid (Sticky)
    html += `
    <div class="s600-left-panel">
        <div class="s600-panel-title">KẾT QUẢ 30 CÂU</div>
        <div class="s600-grid">
    `;
    quiz.forEach((q, i) => {
        let user = userAns[i];
        let correct = answers[q];
        let isCorrect = user === correct;
        let statusCls = isCorrect ? 's600-grid-correct' : 's600-grid-wrong';
        html += `<button class="s600-grid-btn ${statusCls}" onclick="document.getElementById('res-q-${i}').scrollIntoView({behavior: 'smooth', block: 'center'})">${i+1}</button>`;
    });
    html += `
        </div>
        <div class="s600-legend">
            <span class="s600-legend-item"><span class="s600-dot dot-correct"></span>Đúng</span>
            <span class="s600-legend-item"><span class="s600-dot dot-wrong"></span>Sai</span>
        </div>
    </div>
    `;

    // RIGHT PANEL: Results Content
    html += `<div class="s600-right-panel">`;

    // Header kết quả
    html += `
    <div class="result-summary" style="padding:24px; background:#fff; border-radius:16px; margin-bottom:25px; border:1px solid #e2e8f0; text-align:center;">
        <h2 style="color:#1e293b; margin:0 0 15px; font-size:22px;">KẾT QUẢ THI SÁT HẠCH CAND</h2>
        <div style="font-size:16px; line-height:1.8; max-width:400px; margin:0 auto; text-align:left; background:#f8fafc; padding:20px; border-radius:12px; border:1px solid #e2e8f0;">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;"><b>Số câu hỏi:</b> <span>${total}</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;"><b>Số câu đúng:</b> <span style="color:#16a34a; font-weight:bold;">${score}</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:15px;"><b>Số câu sai/bỏ qua:</b> <span style="color:#dc2626; font-weight:bold;">${wrong}</span></div>
            <div style="padding-top:15px; border-top:1px dashed #cbd5e1; font-size:22px; text-align:center;">
                <b>Kết quả:</b> <span style="color:${isPass ? '#16a34a' : '#dc2626'}; font-weight:bold; margin-left:8px;">${isPass ? 'ĐẠT' : 'KHÔNG ĐẠT'}</span>
            </div>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:25px; justify-content:center;">
            <button onclick="window.location.reload()" class="s600-nav-btn s600-nav-next">Làm Đề Khác</button>
            <button onclick="exitHome()" class="s600-nav-btn">Về Trang Chủ</button>
        </div>
    </div>
    `;

// Danh sách câu hỏi
quiz.forEach((q, i) => {
    let user = userAns[i];
    let correct = answers[q];
    let isCorrect = user === correct;
    let qData = questions[q-1];
    
    html += `
    <div id="res-q-${i}" style="margin-bottom:25px;padding:20px;border:1px solid #e2e8f0;border-radius:12px;background:#fff;text-align:left; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <h4 style="margin-top:0; color: #334155; font-size: 18px; display: flex; align-items: center; gap: 8px;">
            Câu ${i+1}
            <span style="font-size: 14px; padding: 3px 8px; border-radius: 6px; background: ${isCorrect ? '#dcfce7' : '#fee2e2'}; color: ${isCorrect ? '#166534' : '#991b1b'};">
                ${isCorrect ? "✅ Đúng" : "❌ Sai"}
            </span>
        </h4>
        <p style="font-size: 16px; font-weight: 600; color: #0f172a; margin: 10px 0 20px 0; line-height: 1.5;">${qData.question}</p>
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
    
    html += `
        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 15px; line-height: 1.6; border-left: 4px solid ${isCorrect ? '#22c55e' : '#ef4444'};">
            <div style="color: ${isCorrect ? '#166534' : '#991b1b'}; margin-bottom: 8px;">${userLabel}</div>
            <div style="color: #166534;">${correctLabel}</div>
        </div>
    </div>
    `;
});

html += `
<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 30px; margin-bottom: 20px; justify-content: center;">
    <button onclick="retryExam()" style="padding: 14px 24px; font-size: 16px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; flex: 1; min-width: 200px; box-shadow: 0 2px 4px rgba(59,130,246,0.3); outline: none;">🔄 Làm Lại Đề Này</button>
    <button onclick="newExam()" style="padding: 14px 24px; font-size: 16px; background: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; flex: 1; min-width: 200px; box-shadow: 0 2px 4px rgba(16,185,129,0.3); outline: none;">📝 Thi Đề Ngẫu Nhiên Khác</button>
    <button onclick="exitHome()" style="padding: 14px 24px; font-size: 16px; background: #64748b; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; flex: 1; min-width: 200px; box-shadow: 0 2px 4px rgba(100,116,139,0.3); outline: none;">🏠 Về Màn Hình Chính</button>
</div>
`;
    html += `</div>`; // End s600-right-panel
    html += `</div>`; // End s600-layout

    document.getElementById("quiz").innerHTML = html;
}

function retryExam() {
    userAns = new Array(quiz.length);
    current = 0;
    if (mode === "30") {
        timeLeft = 20 * 60;
        startTimer();
    }
    openQuiz();
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

