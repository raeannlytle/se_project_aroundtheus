import Popup from "./Popup.js"

export default class PopupImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector("#card-modal-image");
    this._caption = this._popupElement.querySelector("#card-modal-caption");
  }

  open(name, link) {
    this._caption.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}