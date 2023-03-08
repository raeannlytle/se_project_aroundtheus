class Card {
    constructor(cardData, cardSelector) {
      this._name = cardData.name;
      this._link = cardData.link;
      
      this._cardSelector = cardSelector;
      this._cardData = cardData;

      this._deleteCard = '.card__delete-button';
      this._handleCardImageModal = '.card__image';
    }
  
    _setEventListeners() {
      const likeButton = this._element.querySelector(".card__like-button");
      const cardDeleteButton = this._element.querySelector(this._deleteCard);
      const cardImageElement = this._element.querySelector(this._handleCardImageModal);
      }
        
    _likeButton() {
      likeButton.addEventListener('click', () => {
        likeButton.classList.toggle("card__like-button_active");
      })
    }

    _cardDeleteButton() {
      cardDeleteButton.addEventListener('click', deleteCard);
    }

    _cardImageElement() {
      cardImageElement.addEventListener('click', () => { 
        handleCardImageModal(cardData)
      })
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector('.card')
        .cloneNode(true);

      return cardElement
    }
  
    getView() {
      this._element = this._getTemplate();
      this._setEventListeners();
      return this._element;
    }
  }
  
  export default Card;
  