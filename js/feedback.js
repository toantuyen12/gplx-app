function openFeedback(){
document.getElementById("feedbackModal").style.display = "flex";
}

function closeFeedback(){
document.getElementById("feedbackModal").style.display = "none";
}

let rating = 0;

function rate(star){
rating = star;

document.querySelectorAll(".star").forEach((s,i)=>{
s.classList.toggle("active", i < star);
});
}

document.addEventListener("submit", function(e){

if(e.target.id === "feedbackForm"){

e.preventDefault();

let data = {
type: document.getElementById("type").value,
title: document.getElementById("title").value,
message: document.getElementById("message").value,
email: document.getElementById("email").value,
rating: rating
};

emailjs.send(
"service_08hnt39",
"template_auvcrkf",
data,
"Gn37aooYVlLuKdN9j"
)

.then(function(){

alert("Cảm ơn bạn đã góp ý!");

document.getElementById("feedbackForm").reset();

rating = 0;

document.querySelectorAll(".star").forEach(function(s){
s.classList.remove("active");
});

closeFeedback();

})

.catch(function(error){

console.log("EmailJS error:", error);
alert("Gửi góp ý thất bại!");

});

}

});

window.addEventListener("click", function(e){

let modal = document.getElementById("feedbackModal");

if(e.target === modal){
closeFeedback();
}

});