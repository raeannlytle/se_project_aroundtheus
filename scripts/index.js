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
	},
];
/* Elements */

const profileEditButton = document.querySelector('#profile-edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal'); 
const profileCloseButton = document.querySelector('#modal-close-button');
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector ('#profile-description-input');

const profileEditForm = profileEditModal.querySelector('.modal__form');
const cardListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

/* Functions */

function closePopUp() {
	profileEditModal.classList.remove('modal_opened');
}
/* Event Handler */

function handleProfileEditSubmit(e) {
	e.preventDefault();
	profileTitle.textContent = profileTitleInput.value;
	profileDescription.textContent = profileDescriptionInput.value;
	closePopUp();
}

/* Event Listener */ 

profileEditButton.addEventListener('click',() => {
	profileTitleInput.value = "Jacques Cousteau";
	profileDescriptionInput.value = "Explorer";
	profileEditModal.classList.add('modal_opened');})

profileCloseButton.addEventListener('click', closePopUp);

profileEditForm.addEventListener('submit', handleProfileEditSubmit);

initialCards.forEach((cardData) => {
	const cardElement = cardTemplate.cloneNode(true);
	const cardImageEl = cardElement.querySelector('.card__image');
	const cardTitleEl = cardElement.querySelector('.card__title');
	
	cardtitleEl.textContent = cardData.name;
	return cardElement;
cardListEL.append(cardElement);
})