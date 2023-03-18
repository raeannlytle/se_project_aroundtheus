import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
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
const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector ('#profile-description-input');

const cardAddModal = document.querySelector("#card-add-modal");
const cardAddButton = document.querySelector("#profile-add-button");

const cardCloseButton = cardAddModal.querySelector('#card-add-close');

const profileEditForm = profileEditModal.querySelector('#profile-edit-form');
const cardListElement = document.querySelector('.cards__list');

const cardAddForm = cardAddModal.querySelector("#card-add-form");

const cardImageModal = document.querySelector("#card-image-modal");
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

const editFormValidator = new FormValidator(options, document.querySelector("#profile-edit-form"));
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(options, document.querySelector("#card-add-form"));
addFormValidator.enableValidation();

/* Classes */
const editFormPopup = new PopupWithForm("#profile-edit-modal", submitEditProfile);
editFormPopup.setEventListeners();

const addFormPopup = new PopupWithForm("#card-add-modal", submitAddCard);
addFormPopup.setEventListeners();

const imagePopup = new PopupWithImage("#card-image-modal", handleImageClick);
imagePopup.setEventListeners();

const userInfo = new UserInfo (
  {
    nameSelector: "#profile-title-input",
    jobSelector: "#profile-description-input",
  });

const section = new Section (
  {
    items: initialCards,
    renderer: renderCard,
  },
  
  cardListElement,
);

section.renderItems();

/* Functions */
function renderCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick).renderCard();
  section.addItem(card);
}

  
/* Event Handler */
function submitEditProfile(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.title,
    job: inputValues.description,
  });
}

function openProfileEditForm() {
  const profileInfo = userInfo.getUserInfo();
  profileTitleInput.value = profileInfo.name;
  profileDescriptionInput.value = profileInfo.job;
  editFormValidator.resetvalidation();
  editFormPopup.open()
}

function submitAddCard(inputValues) {
  renderCard({
    name: inputValues.title,
    link: inputValues.url,
  })
}

function handleImageClick (name, link) {
  imagePopup.open(name, link);
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
  openProfileEditForm();
});
  
profileCloseButton.addEventListener('click', () => {
  closePopUp(profileEditModal);
});
  
profileEditForm.addEventListener('submit', submitEditProfile);

cardAddButton.addEventListener('click',() => {
  addFormValidator.resetValidation();
  addFormPopup.open();
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
  const cardData = { name, link };
  renderCard(cardData, cardListElement);
  closePopUp(cardAddModal);
  cardAddForm.reset();
});