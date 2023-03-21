class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
      
    this._cardSelector = cardSelector;
    this._cardData = cardData;
  }
  
  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => this._handleLikeButton())
    this._element.querySelector('#card-delete-button').addEventListener('click', () => this._handleDeleteButton())
    this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardImageModal())
  }
        
  _handleLikeButton() {
    this._element.querySelector('.card__like-button').classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _handleCardImageModal() {
    modalImage.src = this._link;
    modalImage.alt = this._name;
    modalCaption.textContent = this._name;
    openPopUp(cardImageModal);
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement
  }
  
  renderCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
  
    return this._element;
  }
}
  
export default Card;