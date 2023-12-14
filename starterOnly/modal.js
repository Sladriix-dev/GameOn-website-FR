function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Fonction pour fermer la modale
function closeModal() {
  const content = document.querySelector('.content');
  content.classList.add('modal-closing');
  
  function handleAnimationEnd() {
    modalbg.style.display = 'none';
    content.classList.remove('modal-closing'); // Retire la classe pour permettre une réouverture propre
    content.removeEventListener('animationend', handleAnimationEnd);
  }

  content.addEventListener('animationend', handleAnimationEnd);
}
// close modal event
closeBtn.addEventListener("click", closeModal);