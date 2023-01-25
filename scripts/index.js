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

const cardImageModal = document.querySelector("#card-image-modal");

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

function deleteCard(e) {
	e.target.closest(".card").remove();
}

function openImageModal(cardData) {
	const modalImage = document.querySelector("#card-image-modal");
	modalImage.src = data.link;
	modalImage.alt = data.name;
	const modalTitle = document.querySelector("#card-modal-title");
	modalTitle.textContent = data.name;
	openPopUp(cardImageModal);
	const cardImageButton = cardElement.querySelector('#card-image-button');
	cardImageButton.addEventListener('click', () => {
	  openPopUp(cardImageModal);
	})
}

function getCardView(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
  likeButton.classList.toggle("card__like-button_active");
	});

const deleteButton = cardElement.querySelector('#card-delete-button');
  deleteButton.addEventListener('click', deleteCard);


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

function deleteCard(e) {
	e.target.closest(".card").remove();
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

cardDeleteButton.addEventListener('click', () => {
	closePopUp(cardListElement);
})
});

cardAddForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;	
const cardView = getCardView({name, link});
  renderCard(cardView, cardListElement);
  closePopUp(cardAddModal);
});


initialCards.forEach((cardData) => {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListElement);
});



