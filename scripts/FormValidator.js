class FormValidator {
    constructor(settings, formElement) {
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;
      this._form = formElement;
    }

  _showInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }
      
  _hideInputError() {
    const errorMessageElement = this.form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.remove(errorClass);
  }
  
  _toggleButtonState() {
    if (hasInvalidInput(inputElements)) {
        disableSubmitButton(submitButton, { inactiveButtonClass });
    } else {
        enableSubmitButton(submitButton, { inactiveButtonClass });
    }
  }

  _hasInvalidInput() {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  _checkInputValidity() {
    if (!inputElement.validity.valid) {
        return showInputError(this._form, inputElement, options);
      }
    
      hideInputError(this._form, inputElement, options);
    }

  _setEventListeners() {
    this._inputElements = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(this._form, inputElement, options);
        toggleButtonState(inputElements, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
    });
    setEventListeners(formElement, options);
  };
}

const editFormValidator = new FormValidator();
editFormValidator.enableValidation();

export default FormValidator;