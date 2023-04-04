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
  baseUrl: "https://around.nomoreparties.co/v1/group-12/",
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
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  profilePopup.open();
}

profileEditButton.addEventListener("click", openProfileEditForm);

const profilePopup = new PopupWithForm("#profile-edit-modal", (values) => {
  profilePopup.isLoadingButtonState(true);
  api
    .updateProfileInfo(values)
    .then((data) => {
      userInfo.setUserInfo(data);
      profilePopup.close();
    })
    .finally(() => {
      profilePopup.isLoadingButtonState(false, "Save");
    });
});

profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm("#profile-image-edit-modal", (values) => {
  avatarPopup.isLoadingButtonState(true);
  api
    .updateProfileAvatar(values.avatar)
    .then((data) => {
      userInfo.setUserInfo(data);
      avatarPopup.close();
    })
    .finally(() => {
      avatarPopup.isLoadingButtonState(false, "Save");
    });

  avatarButton.addEventListener("click", () => avatarPopup.open());

  avatarPopup.setEventListeners();
});


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
        api
          .deleteUserCard(cardId)
          .then(() => {
            card.deleteCard();
            deleteCardPopup.close();
          });
      });
    },

    (cardId) => {
      if (card.checkCardLikeState()) {
        api
          .removeCardLikes(cardId)
          .then((data) => {
            card.removeCardLike();
            card.setLikesCounter(data.likes.length);
          });
      } else {
        api 
          .addCardLikes(cardId)
          .then((data) => {
            card.addCardLike();
            card.setLikesCounter(data.likes.length);
          });
      }
    },

    (cardData) => {
      cardData.forEach((cardObject) => {
        if (cardObject._id === userId) {
          card.addCardLike();
        }
      });
    }
  );
  return card;
}

api 
  .getAPIInfo()
  .then(([userData, userCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
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
  });

const addCardPopup = new PopupWithForm("#card-add-modal", (values) => {
  addCardPopup.isLoadingButtonState(true);
  api
    .addNewCard(values)
    .then((data) => {
      const addCard = createCard(data);
      addCardPopup.close();
      cardSection.addItem(addCard.getView());
    })
    .finally(() => {
      addCardPopup.isLoadingButtonState(false, "Create");
    });
  });
  
cardAddButton.addEventListener("click", () => addCardPopup.open());
addCardPopup.setEventListeners();