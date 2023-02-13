function enableValidation(options) {
  const { formSelector } = options;
  const formElements = [...document.querySelectorAll(formSelector)];
    formElements.forEach((formElement) => {
      formElement.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

function showInputError (formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError (formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = " ";
  errorMessageElement.classList.remove(errorClass);
}


function checkInputValidity (formElement, inputElement, options) {
  if(!inputElement.validity.valid){
    return showInputError(formElement, inputElement, options);
  } 
    hideInputError(formElement, inputElement, options);
  }


function enableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = false;
}

function disableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = true;
}

function toggleButtonState (inputElements, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;
  
  inputElements.forEach(inputElement => {
    if(!inputElement.validity.valid) {
        foundInvalid = true;
    }
  });

  if(foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formElement, options) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);

  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputElement, submitButton, options);
    });
  });
  
  inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, options);
        toggleButtonState(inputElements, submitButton, options);
    });
  });
}

profileCloseButton.addEventListener("keydown", closeKeyHandler);

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

enableValidation(config);