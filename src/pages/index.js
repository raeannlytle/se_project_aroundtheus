import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
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
  editFormPopup.open();
});

const addFormPopup = new PopupWithForm("#card-add-modal");
addFormPopup.setEventListeners(() => {
  addFormPopup.open();
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

const setUserForm = ({ name, job }) => {
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
}

/*Profile Form Event Listeners*/
profileEditButton.addEventListener('click',() => {
  const { name, job } = userInfo.getUserInfo();
  setUserForm({ name, job }); 
  editFormPopup.open();
  editFormValidator.resetValidation();
});

profileEditForm.addEventListener('submit', () => {
  const title = profileTitleInput.value;
  const description = profileDescriptionInput.value;
  userInfo.setUserInfo({
    name: title,
    job: description,
  })
  editFormPopup.close();
});

/*Card Form Event Listener*/
cardAddButton.addEventListener('click',() => {
  addFormValidator.resetValidation();
  addFormPopup.open();
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


