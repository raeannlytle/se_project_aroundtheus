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

function disableSubmitButton(submitButton, options) {
  submitButton.classList.add(options.inactiveButtonClass);
  submitButton.disabled = true;
}

function enableSubmitButton(submitButton, options) {
  submitButton.classList.remove(options.inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputElements, submitButton, inactiveButtonClass) {
  if(hasInvalidInput(inputElements)) {
    disableSubmitButton(submitButton, inactiveButtonClass);
  } else {
    enableSubmitButton(submitButton, inactiveButtonClass);
  }
}

function setEventListeners(formElement, options) {
  const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
  const submitButton = formElement.querySelector(options.submitButtonSelector);

  inputElements.forEach(inputElement => {
    inputElement.addEventListener("input", (event) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });

    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        toggleButtonState(inputElements, submitButton, options);
      }, 0);
    });
  });
}

function enableValidation(options) {
  const formElements = Array.from(document.querySelectorAll(options.formSelector));
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

enableValidation(options);

 