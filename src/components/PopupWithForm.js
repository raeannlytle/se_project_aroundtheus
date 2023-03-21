import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {    
    super({ popupSelector });

    this._popupForm = this._popupElement.querySelector('.modal__form');
    this._handleFormSubmit = handleFormSubmit
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.form__input');

    this._formValues = {};

    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });

    return this._formValues;
}


  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();


    if (this._popupForm && this._handleFormSubmit){
      this._popupForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const inputValues = this._getInputValues();
        this._handleFormSubmit(inputValues);
        this.close();
      });
    }
  }
}