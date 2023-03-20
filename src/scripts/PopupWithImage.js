import Popup from "./Popup.js"

export default class PopupImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__image-card");
    this._caption = this._popupElement.querySelector(".modal__caption-card");
  }

  open(name, link) {
    this._caption.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
