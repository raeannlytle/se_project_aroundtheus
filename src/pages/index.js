import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import "../pages/index.css"

import {
  profileEditButton,
  profileCloseButton,
  profileTitleInput,
  profileDescriptionInput,
  cardAddButton,
  cardCloseButton,
  profileEditForm,
  cardListElement,
  cardAddForm,
  cardImageModalClose,
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
  imagePopup.open();
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
  const card = new Card({
    cardData, 
    handleImageClick: (cardData) => {
      const image = {
        name: cardData.name,
        link: cardData.src,
      }
      imagePopup.open(image.name, image.link);
    }
  }, cardSelector).renderCard();
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

/* Event Listener */ 
profileEditButton.addEventListener('click',() => {
  openProfileEditForm();
});
  
profileCloseButton.addEventListener('click', () => {
  editFormPopup.close();
});
  
profileEditForm.addEventListener('submit', submitEditProfile);

cardAddButton.addEventListener('click',() => {
  addFormValidator.resetValidation();
  addFormPopup.open();
});

cardCloseButton.addEventListener('click', () => {
  addFormPopup.close();
});
	
cardImageModalClose.addEventListener('click', () => { 
  imagePopup.close();
});
	
cardAddForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;	
  const cardData = { name, link };
  renderCard(cardData, cardListElement);
  addFormPopup.close();
  cardAddForm.reset();
});