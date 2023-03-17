export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscapeClose);
    document.addEventListener("mousedown", this._handleOverlay);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.addEventListener("keydown", this._handleEscapeClose);
    document.addEventListener("mousedown", this._handleOverlay);
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOverlay = (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal__close")) {
        this.close();
      }
    });
  }
}