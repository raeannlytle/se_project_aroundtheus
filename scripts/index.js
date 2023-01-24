const initialCards = [
	{
		name: "Yosemite Valley",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
	
	},
	{
		name: "Lake Louise",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",

	},
	{
		name: "Bald Mountains",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
	
	},
	{
		name: "Latemar",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
	
	},
	{
		name: "Vanoise National Park",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
	
	},
	{
		name: "Lago di Braies",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
	}
];
/* Elements */
const profileEditButton = document.querySelector('#profile-edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal'); 
const profileCloseButton = document.querySelector('#modal-close-button');
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector ('#profile-description-input');

const cardAddModal = document.querySelector("#card-add-modal");
const cardAddButton = document.querySelector("#profile-add-button");
const cardTitle = document.querySelector('#card-title');
const cardImage = document.querySelector('#card-image');
const cardTitleInput = document.querySelector('#card-title-input');
const cardImageInput = document.querySelector('#card-image-input');
const cardCloseButton = cardAddModal.querySelector('#modal-close-button');

const profileEditForm = profileEditModal.querySelector('#profile-edit-form');
const cardListElement = document.querySelector('.cards__list');
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

const cardAddForm = cardAddModal.querySelector("#card-add-form");

/* Functions */

function closePopUp(popUp) {
  popUp.classList.remove('modal_opened');
}

function openPopUp (popUp) {
  popUp.classList.add('modal_opened');
}

function renderCard(cardElement, container) {
  container.prepend(cardElement);
}

function getCardView(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
  return cardElement;
}


function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
  return cardElement;
}

/* Event Handler */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleCardAddSubmit(e) {
	e.preventDefault();
	cardTitle.textContent = cardTitleInput.value;
	cardImage.src = cardImageInput.value;
	closePopUp(cardAddModal);
}

/* Event Listener */ 

profileEditButton.addEventListener('click',() => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});

cardAddButton.addEventListener('click',() => {
  openPopUp(cardAddModal);
});

profileCloseButton.addEventListener('click', () => {
	closePopUp(profileEditModal);
});

profileEditForm.addEventListener('submit', handleProfileEditSubmit);

cardCloseButton.addEventListener('click', () => {
	closePopUp(cardAddModal);
});

cardAddForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const link = e.target.link.value;	
  getCardView({
	name: title,
	link: link,
  });
  closePopUp(cardAddModal);
});


initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  getCardView(cardData);
  cardListElement.append(cardElement);
});
