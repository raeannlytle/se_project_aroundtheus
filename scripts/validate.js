// enabling validation by calling enableValidation()
// pass all the settings on call

function setEventListeners(formElement, options) {
  const inputElements = [...formElement.querySelectorAll(options.inputSelector)];

}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
    formElements.forEach((formElements) => {
      formElements.addEventListener("submit", (e) => {
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