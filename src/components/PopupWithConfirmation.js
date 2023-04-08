import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._confirmButton = document.querySelector("#delete-confirm-button");
    this._saveButton = document.querySelector(".modal__button");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleSubmit();
    });
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    })
  }
}