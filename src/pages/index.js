import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import "../pages/index.css"

import {
  profileEditButton,
  profileEditModal,
  profileCloseButton,
  profileTitleInput,
  profileDescriptionInput,
  cardAddModal,
  cardAddButton,
  cardCloseButton,
  profileEditForm,
  cardListElement,
  cardAddForm,
  cardImageModal,
  cardImageModalClose,
  modals,
  cardSelector,
  initialCards,
} from '../utils/constants.js';

/* Validation */
export const options = {
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
const editFormPopup = new PopupWithForm("#profile-edit-modal");
editFormPopup.setEventListeners(() => {
  const inputValues = editFormPopup.getInputValues();
  submitEditProfile(inputValues);
});

const addFormPopup = new PopupWithForm("#card-add-modal");
addFormPopup.setEventListeners(() => {
  const inputValues = addFormPopup.getInputValues();
  submitAddCard(inputValues);
});


const imagePopup = new PopupWithImage("#card-image-modal");
imagePopup.setEventListeners(() => {
  handleImageClick();
});

const userInfo = new UserInfo (
  {
    nameSelector: "#profile-title",
    jobSelector: "#profile-description",
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
function submitEditProfile(evt) {
  evt.preventDefault();
  const title = profileTitleInput.value;
  const description = profileDescriptionInput.value;
  userInfo.setUserInfo({
    name: title,
    job: description,
  });
  editFormPopup.close();
}

function openProfileEditForm() {
  const profileInfo = userInfo.getUserInfo();
  profileTitleInput.value = profileInfo.name;
  profileDescriptionInput.value = profileInfo.job;
  editFormValidator.resetValidation();
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