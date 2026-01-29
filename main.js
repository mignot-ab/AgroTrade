let search = document.querySelector('.search-box')
 document.querySelector('#search-icon').onclick = () =>{
  search.classList.toggle('active')
  navbar.classList.remove('active')
 }
 let navbar = document.querySelector('.navbar')
 document.querySelector('#menu-icon').onclick = () =>{
  navbar.classList.toggle('active')
  search.classList.remove('active')
 }
 window.onscroll = () =>{
  navbar.classList.remove('active')
  search.classList.remove('active')
 }

const learnMore = document.getElementById("learnMore");
const overlay = document.getElementById("agriOverlay");
const closeOverlay = document.getElementById("closeOverlay");

// Open overlay
learnMore.addEventListener("click", function(e) {
  e.preventDefault();
  overlay.classList.add("active");
});

// Close overlay with X
closeOverlay.addEventListener("click", function() {
  overlay.classList.remove("active");
});

// Close overlay by clicking outside modal
overlay.addEventListener("click", function(e) {
  if (e.target === overlay) {
    overlay.classList.remove("active");
  }
});

// Close overlay with ESC key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    overlay.classList.remove("active");
  }
});
let header = document.querySelector('header')
window.addEventListener('scroll',() => {
  header.classList.toggle('shadow',window.scrollY > 0);
})