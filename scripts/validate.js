function showInputError (formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError (formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = '';
  errorMessageElement.classList.remove(errorClass);
}


function checkInputValidity (formElement, inputElement, options) {
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
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
  const { inputSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector('.modal__button');
  formElement.addEventListener('reset', () => {
    disableButton(submitButton, inactiveButtonClass);
  });
  
  inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', (e) => {
        checkInputValidity(formElement, inputElement, options);
        toggleButtonState(inputElements, submitButton, options);
    })
  })
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
    formElements.forEach((formElement) => {
      formElement.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

enableValidation(config);