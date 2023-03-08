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

    _handleCardImageModal(cardData) {
        modalImage.src = cardData.link;
        modalImage.alt = cardData.name;
        modalCaption.textContent = cardData.name;
        openPopUp(cardImageModal);
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
  