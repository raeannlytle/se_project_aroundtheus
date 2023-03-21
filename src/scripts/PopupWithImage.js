import Popup from "./Popup.js"

export default class PopupImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(){
    super.open();
  }
}
