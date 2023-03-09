import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openPopUp, closePopUp } from "./utils.js";

const initialCards = [
	{
		name: "Yosemite Valley",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
	
	},
	{
		name: "Lake Louise",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",

	},
	{
		name: "Bald Mountains",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
	
	},
	{
		name: "Latemar",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
	
	},
	{
		name: "Vanoise National Park",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
	
	},
	{
		name: "Lago di Braies",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
	}
];

/* Elements */
const profileEditButton = document.querySelector('#profile-edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal'); 
const profileCloseButton = document.querySelector('#modal-close-button');
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector ('#profile-description-input');

const cardAddModal = document.querySelector("#card-add-modal");
const cardAddButton = document.querySelector("#profile-add-button");
const cardTitle = document.querySelector('#card-title');
const cardImage = document.querySelector('#card-image');
const cardTitleInput = document.querySelector('#card-title-input');
const cardImageInput = document.querySelector('#card-image-input');
const cardCloseButton = cardAddModal.querySelector('#card-add-close');

const profileEditForm = profileEditModal.querySelector('#profile-edit-form');
const cardListElement = document.querySelector('.cards__list');
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

const cardAddForm = cardAddModal.querySelector("#card-add-form");

const cardImageModalClose = document.querySelector("#card-image-close");

const modals = document.querySelectorAll('.modal');

const cardSelector = "#card-template";

/* Validation */
const options = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
}

const editFormValidator = new FormValidator(options, document.querySelector(".modal__form"));
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(options, document.querySelector('.modal__form'));
addFormValidator.enableValidation();

const addCardValidator = new FormValidator(options, document.querySelector(".modal__form"));
addCardValidator.enableValidation();

/* Functions */
function renderCard(cardData, container) {
  container.prepend(cardData);
}
  
function deleteCard(e) {
  e.target.closest(".card").remove();
}
  
function createCard(cardData) {
  const card = new Card(cardData, cardSelector)
  return card.getView();
}

/* Event Handler */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  cardTitle.textContent = cardTitleInput.value;
  cardImage.src = cardImageInput.value;
  cardImage.alt = cardImageInput.value;
  closePopUp(cardAddModal);
}

function handleCardImageModal(cardData) {
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalCaption.textContent = cardData.name;
  openPopUp(cardImageModal);
}

/* Event Listener */ 
modals.forEach((modal) => {
  modal.addEventListener('mousedown', (e) => {
    if(e.target.classList.contains('modal')) {
      closePopUp(modal);
    };
  });
}); 

profileEditButton.addEventListener('click',() => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});
  
profileCloseButton.addEventListener('click', () => {
  closePopUp(profileEditModal);
});
  
profileEditForm.addEventListener('submit', handleProfileEditSubmit);

cardAddButton.addEventListener('click',() => {
  openPopUp(cardAddModal);
});
  
cardCloseButton.addEventListener('click', () => {
  closePopUp(cardAddModal);
});
	
cardImageModalClose.addEventListener('click', () => { 
  closePopUp(cardImageModal);
});
	
cardAddForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;	
  const cardView = getCardView({name, link});
  renderCard(cardView, cardListElement);
  closePopUp(cardAddModal);
  cardAddForm.reset();
});
	
initialCards.forEach((cardData) => {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListElement);
})