import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {    
    super({ popupSelector });

    this._popupForm = this._popupElement.querySelector('.modal__form');
    this._handleFormSubmit = handleFormSubmit ? handleFormSubmit.bind(this) : null;
    this._formInputs = this._popupElement.querySelectorAll('.modal__form-input');
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputValues = {};
    
    this._formInputs.forEach((input) => {
        inputValues[input.name] = input.value;
    });
    return inputValues;
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

export default PopupWithForm;
