import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {    
    super({ popupSelector });

    this._popupForm = this._popupElement.querySelector('.modal__form');
    this._formInputs = this._popupForm.querySelectorAll('.modal__form-input');
    this._handleFormSubmit = handleFormSubmit
  }

  _getInputValues() {
    const inputValues = {};
    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;    
    });
   return inputValues;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

   this._popupForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const inputvalues = this._getInputValues();
    this._handleFormSubmit(inputvalues);
    this.close();
   })
  }
}
