export const modalImage = document.querySelector("#card-modal-image");
export const modalCaption = document.querySelector("#card-modal-caption");
export const cardImageModal = document.querySelector("#card-image-modal");

export function closePopUp(popUp) {
    document.removeEventListener('keydown', closeByEscape);
    popUp.classList.remove('modal_opened');
}
    
export function openPopUp (popUp) {
    document.addEventListener('keydown', closeByEscape);
    popUp.classList.add('modal_opened');
}
   
export function closeByEscape(e) {
  if(e.key === "Escape"){
    const modalOpened = document.querySelector('.modal_opened');
    closePopUp(modalOpened);
  }
}