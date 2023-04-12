import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  options,
  profileEditButton,
  profileEditModal,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  cardAddModal,
  cardAddButton,
  avatarEditModal,
  profileAvatar,
  avatarButton,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "f3893e14-4f9e-48a1-abc0-0d253e595072",
    "Content-Type": "application/json",
  }
})

const editFormValidator = new FormValidator(options, profileEditModal);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(options, cardAddModal);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(options, avatarEditModal);
avatarFormValidator.enableValidation();

const userInfo = new UserInfo({
  userName: profileTitle,
  userJob: profileDescription,
  userAvatar: profileAvatar,
})

function openProfileEditForm() {
  const { name, about } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = about;
  profilePopup.open();
}

profileEditButton.addEventListener("click", openProfileEditForm);

const profilePopup = new PopupWithForm("#profile-edit-modal", (values) => {
  profilePopup.renderLoading(true);
  api
    .updateProfileInfo(values)
    .then((data) => {
      userInfo.setUserInfo(data);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.renderLoading(false, "Save");
    });
});

profilePopup.setEventListeners();
editFormValidator.disableButton();
avatarButton.addEventListener("click", () => avatarPopup.open());

const avatarPopup = new PopupWithForm("#profile-image-edit-modal", (value) => {
  avatarPopup.renderLoading(true);
  api
    .updateProfileAvatar(value.avatar)
    .then((value) => {
      userInfo.setAvatar(value.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false, "Save");
    });
});

avatarPopup.setEventListeners();
avatarFormValidator.disableButton();


const previewPopup = new PopupWithImage("#card-image-modal");
previewPopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#delete-confirm-modal");
let cardSection;
let userId;

deleteCardPopup.setEventListeners();


function createCard(cardData) {
  const card = new Card(
    cardData,
    userId,
    '#card-template',
    (cardName, cardLink) => {
      previewPopup.open(cardName, cardLink);
    },

    (cardId) => { 
      deleteCardPopup.open(); 
      deleteCardPopup.setSubmitAction(() => { 
        deleteCardPopup.renderLoading(true);
        api
          .deleteUserCard(cardId)
          .then(() => { 
            card.deleteCard(); 
            deleteCardPopup.renderLoading(false);
            deleteCardPopup.close(); 
          }); 
      }); 
    },
    

    (cardId) => {
      if (card.isLiked()) {
        api
          .removeCardLikes(cardId)
          .then((data) => {
            card.updateLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api 
          .addCardLikes(cardId)
          .then((data) => {
            card.updateLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  );
  return card;
}

api 
  .getAPIInfo()
  .then(([userData, userCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);
    cardSection = new Section(
      {
        items: userCards,
        renderer: (cardData) => {
          const newCard = createCard(cardData);
          cardSection.addItem(newCard.getView());
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })  .catch((err) => {
    console.log(err);
  });

const addCardPopup = new PopupWithForm("#card-add-modal", (values) => {
  addCardPopup.renderLoading(true);
  api
    .addNewCard(values)
    .then((cardData) => {
      const addCard = createCard(cardData);
      addCardPopup.close();
      cardSection.addItem(addCard.getView());
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false, "Create");
    });
  });
  
cardAddButton.addEventListener("click", () => {
  addFormValidator.disableButton();
  addCardPopup.open()
});

addCardPopup.setEventListeners();