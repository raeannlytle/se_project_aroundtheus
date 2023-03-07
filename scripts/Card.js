class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector;
  }

  _setEventListeners() {
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle("card__like-button_active");
    });
      
      cardDeleteButton.addEventListener('click', deleteCard);
    
      cardImageElement.addEventListener('click', () => { 
        handleCardImageModal(cardData)

      })
    }

  _getTemplate() {
    return document
    .querySelector(this._cardSelector)
    .content.querySelector('.card')
    .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners 
  }
}

export default Card;