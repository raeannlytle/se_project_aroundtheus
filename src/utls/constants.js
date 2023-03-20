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

const profileEditButton = document.querySelector('#profile-edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal'); 
const profileCloseButton = document.querySelector('#modal-close-button');
const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector ('#profile-description-input');

const cardAddModal = document.querySelector("#card-add-modal");
const cardAddButton = document.querySelector("#profile-add-button");

const cardCloseButton = cardAddModal.querySelector('#card-add-close');

const profileEditForm = profileEditModal.querySelector('#profile-edit-form');
const cardListElement = document.querySelector('.cards__list');

const cardAddForm = cardAddModal.querySelector("#card-add-form");

const cardImageModal = document.querySelector("#card-image-modal");
const cardImageModalClose = document.querySelector("#card-image-close");

const modals = document.querySelectorAll('.modal');

const cardSelector = "#card-template";