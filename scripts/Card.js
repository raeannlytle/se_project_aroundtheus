class Card {
    constructor(cardData, cardSelector) {
      this._name = cardData.name;
      this._link = cardData.link;
      this._cardSelector = cardSelector;
      this._cardData = cardData;
    }
  
    _setEventListeners() {
      const likeButton = this._element.querySelector('.card__like-button');
      const cardDeleteButton = this._element.querySelector('.card__delete-button');
      const cardImageElement = this._element.querySelector('.card__image');
      
      likeButton.addEventListener('click', () => {
        likeButton.classList.toggle("card__like-button_active");
      });
        
      cardDeleteButton.addEventListener('click', this._deleteCard);
      
      cardImageElement.addEventListener('click', () => { 
        handleCardImageModal(this._cardData);
      });
    }
  
    _getTemplate() {
      return document
        .querySelector(this._cardSelector)
        .content.querySelector('.card')
        .cloneNode(true);
    }
  
    getView() {
      this._element = this._getTemplate();
      this._setEventListeners();
      return this._element;
    }
  }
  
  export default Card;
  