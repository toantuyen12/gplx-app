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

/* ===== START ===== */

function start500(){
mode="500";
quiz=[...Array(TOTAL).keys()].map(i=>i+1);
userAns=new Array(TOTAL);
current=0;
openQuiz();
}

function start30(){

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

openQuiz();
}

function openQuiz(){
document.getElementById("home").style.display="none";
document.getElementById("quiz").style.display="block";
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

let minutes = Math.floor(timeLeft/60);
let seconds = timeLeft % 60;

html+=`
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
    <h3 style="margin:0;">CÂU HỎI THI: ${current+1}/${quiz.length}</h3>
    <div style="font-size:18px;font-weight:bold;color:#ef4444; background: #fee2e2; padding: 8px 15px; border-radius: 8px;">
        ⏰ <span id="timerText">${minutes}:${seconds.toString().padStart(2,"0")}</span>
    </div>
</div>
`;

// QUESTION NAV BAR
html+=`<div class="q-nav-bar">`;
for(let i=0; i<quiz.length; i++){
    let statusCls = "";
    if(i === current) statusCls = "current";
    else if(userAns[i] != null) statusCls = "answered";
    html+=`<div class="q-nav-btn ${statusCls}" onclick="jumpTo(${i})">${i+1}</div>`;
}
html+=`</div>`;

}

html+=`
<div class="question-layout">

   <div class="question-left">

<h3>${data.question}</h3>

${data.img ? `<img src="${data.img}" loading="lazy">` : ""}

</div>

    <div class="question-right">
`;

data.options.forEach((o,i)=>{

let cls="";

if(mode==="500" && userAns[current]!=null){
    if(i===answers[q]) cls="correct";
    else if(i===userAns[current]) cls="wrong";
}

if(mode==="30" && userAns[current]!=null){
    if(i===userAns[current]) cls="selected";
}

html+=`
<div class="option ${cls}"
onclick="choose(${i})"
ontouchstart="choose(${i})">
<b>${i+1}.</b> ${o}
</div>`;
});

html+=`
    </div>
</div>
`;

html+=`
<div class="nav-buttons">
    <button class="secondary-btn" onclick="prev()">⬅ Câu trước</button>
    <button class="secondary-btn" onclick="next()">Câu sau ➡</button>
    <button class="danger-btn" onclick="exitHome()">🏠 Thoát</button>
</div>
`;

if(mode==="30" && current===29){
html+=`
<br>
<button style="background:#2e7d32;color:white"
onclick="submit()">Nộp bài</button>
`;
}

document.getElementById("quiz").innerHTML=html;

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
        const navBtns = document.querySelectorAll('.q-nav-btn');
        if (navBtns[current] && !navBtns[current].classList.contains('answered')) {
            navBtns[current].classList.add('answered');
        }
    }
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
let html="<h2>Kết quả</h2>";

quiz.forEach((q,i)=>{

let user=userAns[i];
let correct=answers[q];
let ok=user===correct;

if(ok) score++;

html+=`
<div style="margin-bottom:25px;padding:15px;border:1px solid #ddd;border-radius:10px;text-align:left">
<h4>Câu ${i+1} ${ok?"✅ Đúng":"❌ Sai"}</h4>

${questions[q-1].img ? `<img src="${questions[q-1].img}" loading="lazy">` : ""}

<p><b>Bạn chọn:</b> ${
user!=null?["1","2","3","4"][user]:"Chưa chọn"
}</p>
`;

if(!ok){
html+=`
<p style="color:green">
<b>Đáp án đúng:</b> ${["1","2","3","4"][correct]}
</p>
`;
}

html+=`</div>`;
});

html+=`
<h3>🎯 Tổng điểm: ${score}/30</h3>
<button onclick="exitHome()">Về màn hình chính</button>
`;

document.getElementById("quiz").innerHTML=html;
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

function toggleMenu() {
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const nav = document.querySelector('.main-nav');
    const toggle = document.querySelector('.menu-toggle');
    if (nav && nav.classList.contains('active')) {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove('active');
        }
    }
});