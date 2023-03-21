export const initialCards = [
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

export const profileEditButton = document.querySelector('#profile-edit-button');
export const profileEditModal = document.querySelector('#profile-edit-modal'); 
export const profileCloseButton = document.querySelector('#modal-close-button');
export const profileTitleInput = document.querySelector('#profile-title-input');
export const profileDescriptionInput = document.querySelector ('#profile-description-input');

export const cardAddModal = document.querySelector("#card-add-modal");
export const cardAddButton = document.querySelector("#profile-add-button");

export const cardCloseButton = cardAddModal.querySelector('#card-add-close');

export const profileEditForm = profileEditModal.querySelector('#profile-edit-form');
export const cardListElement = document.querySelector('.cards__list');

export const cardAddForm = cardAddModal.querySelector("#card-add-form");

export const cardImageModal = document.querySelector("#card-image-modal");
export const cardImageModalClose = document.querySelector("#card-image-close");

export const modals = document.querySelectorAll('.modal');

export const cardSelector = "#card-template";