export const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErroClass: "modal__error_input_type",
  errorClas: "modal__error_visible",
}

export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector("#profile-description-input");

export const cardAddModal = document.querySelector("#card-add-modal");
export const cardAddButton = document.querySelector(".profile__add-button");

export const avatarEditModal = document.querySelector("#profile-image-edit-modal");
export const profileAvatar = document.querySelector(".profile__image");
export const avatarButton = document.querySelector(".profile__avatar-edit");