import Card from "../scripts/Card.js";

export default class Section {
  constructor (items, renderer) {
    this._items = items;
    this._renderer = renderer;
  }
  
  renderer(items, cardListElement) {
    const card = new Card(items, '#card');
    cardListElement.prepend(card.renderCard());
  };
}
