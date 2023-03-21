import FormValidator from "../scripts/FormValidator.js";
import Popup from "../scripts/Popup.js";
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
const editFormPopup = new Popup({ popupSelector: "#profile-edit-modal" });

const addFormPopup = new Popup({ popupSelector: "#card-add-modal" });


const imagePopup = new Popup({popupSelector: "#card-image-modal" });
imagePopup.setEventListeners(() => {
  handleImageClick();
});

const userInfo = new UserInfo (
  {
    nameSelector: "#profile-title",
    jobSelector: "#profile-description",
  });

const section = new Section();

/* Event Listeners */
initialCards.forEach((items) => {
  section.renderer(items, cardListElement);
})

profileEditButton.addEventListener('click',() => {
  userInfo.getUserInfo();
  editFormPopup.open(profileEditModal);
});
  
profileCloseButton.addEventListener('click', () => {
  editFormPopup.close(profileEditModal);
});

cardAddButton.addEventListener('click',() => {
  addFormPopup.open(cardAddModal);
});

cardCloseButton.addEventListener('click', () => {
  addFormPopup.close(cardAddModal);
});
	
cardImageModalClose.addEventListener('click', () => { 
  imagePopup.close(cardImageModal);
});

profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo();
  editFormPopup.close(profileEditModal);
});

cardAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = evt.target.title.value;
  const link = evt.target.link.value;

  addFormPopup.close(cardAddModal);
  section.renderer({ name, link }, cardListElement);
  cardAddForm.reset();
})