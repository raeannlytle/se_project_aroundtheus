import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {    
    super({ popupSelector });

    this._popupForm = this._popupElement.querySelector('.modal__form');
    this._handleFormSubmit = handleFormSubmit
  }

  _getInputValues() {
    UserInfo.getUserInfo();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    this.handleFormSubmit.addEventListeners('submit', () => {
      this._getInputValues();
    });
  }
}