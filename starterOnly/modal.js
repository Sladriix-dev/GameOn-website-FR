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
const btnSubmit = document.querySelector(".btn-submit");

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
  // Animation lorsque l'utilisateur quitte la modal
  function handleAnimationEnd() {
    modalbg.style.display = 'none';
    content.classList.remove('modal-closing'); // Retire la classe pour permettre une réouverture propre
    content.removeEventListener('animationend', handleAnimationEnd);
  }

  content.addEventListener('animationend', handleAnimationEnd);
}
// close modal event
closeBtn.addEventListener("click", closeModal);


document.addEventListener('DOMContentLoaded', function() {
  // Restaurer les données du formulaire au chargement de la page
  restoreFormData();

  // Ajouter des écouteurs d'événements pour enregistrer les données dans localStorage
  const formElements = document.querySelectorAll('#reserve input, #reserve select, #reserve textarea');
  formElements.forEach(element => {
    element.addEventListener('input', function() {
      saveFormData();
    });
  });
});

// Sauvegarde les données entrées par le user en local
function saveFormData() {
  const formData = {
    first: document.getElementById('first').value,
    last: document.getElementById('last').value,
    email: document.getElementById('email').value,
    birthdate: document.getElementById('birthdate').value,
    quantity: document.getElementById('quantity').value,
    location: document.querySelector('input[name="location"]:checked')?.value,
    terms: document.getElementById('checkbox1').checked,
    newsletter: document.getElementById('checkbox2').checked
  };

  localStorage.setItem('formData', JSON.stringify(formData));
}

// Restaure les données du formulaire si des données sont save en local
function restoreFormData() {
  const savedData = JSON.parse(localStorage.getItem('formData'));
  if (savedData) {
    document.getElementById('first').value = savedData.first || '';
    document.getElementById('last').value = savedData.last || '';
    document.getElementById('email').value = savedData.email || '';
    document.getElementById('birthdate').value = savedData.birthdate || '';
    document.getElementById('quantity').value = savedData.quantity || '';

    if (savedData.location) {
      document.querySelector(`input[name="location"][value="${savedData.location}"]`).checked = true;
    }

    document.getElementById('checkbox1').checked = savedData.terms;
    document.getElementById('checkbox2').checked = savedData.newsletter;
  }
}

// Ensemble des vérifications pour submit le formulaire
function validate() {
  let isValid = true;

  // Réinitialiser les messages d'erreur précédents
  document.querySelectorAll('.error-message').forEach(e => e.textContent = '');

  // Validation du prénom
  const firstName = document.getElementById('first').value;
  if (firstName.length < 2) {
    document.getElementById('error-first').textContent = 'Le prénom doit contenir au moins 2 caractères.';
    isValid = false;
  }

  // Validation du nom de famille
  const lastName = document.getElementById('last').value;
  if (lastName.length < 2) {
    document.getElementById('error-last').textContent = 'Le nom de famille doit contenir au moins 2 caractères.';
    isValid = false;
  }

  // Validation de l'e-mail
  const email = document.getElementById('email').value;
  if (!email.match(/^\S+@\S+\.\S+$/)) {
    document.getElementById('error-email').textContent = 'Vous devez entrer une adresse e-mail valide.';
    isValid = false;
  }

  // Validation du nombre de tournois
  const quantity = document.getElementById('quantity').value;
  if (isNaN(quantity) || quantity < 0 || quantity === '') {
    document.getElementById('error-quantity').textContent = 'Veuillez entrer un nombre valide.';
    isValid = false;
  }

  // Validation de la sélection du tournoi
  const locationChecked = document.querySelector('input[name="location"]:checked');
  if (!locationChecked) {
    document.getElementById('error-location').textContent = 'Veuillez sélectionner un tournoi.';
    isValid = false;
  }

  // Validation des conditions générales
  const termsChecked = document.getElementById('checkbox1').checked;
  if (!termsChecked) {
    document.getElementById('error-terms').textContent = 'Vous devez accepter les conditions d\'utilisation.';
    isValid = false;
  }

  if (isValid == true) {
    localStorage.removeItem('formData'); // Nettoyer localStorage
    closeModal();
    document.getElementById('confirmation-modal').classList.remove('hidden');
    return false;
  }
  return false;
}

// Ferme la modal de confirmation d'envoie du formulaire
function closeConfirmationModal() {
  document.getElementById('confirmation-modal').classList.add('hidden')
}