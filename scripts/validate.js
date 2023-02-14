function showInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity (formElement, inputElement, options) {
  if(!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }
  
  hideInputError(formElement, inputElement, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function toggleButtonState(inputElements, submitButton) {
  if(hasInvalidInput(inputElements)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classlist.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(".modal__button");

  inputElements.forEach(inputElement => {
    inputElement.addEventListener("input", (inputElement) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton);
    });
  });
}

function enableValidation(options) {
  const formElements = document.querySelectorAll(options.formSelector);
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  });
    setEventListeners(formElement, options);
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

enableValidation(config);
 