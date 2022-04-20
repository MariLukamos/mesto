export const popupImage = document.querySelector('.popup_type_photo');
export const popupImagePicture = popupImage.querySelector('.popup__image');
export const popupImageTitle = popupImage.querySelector('.popup__caption');

export const openModalWindow = (modalWindow) => {
    modalWindow.classList.add('popup_opened')
    document.addEventListener('keydown', handleEscPress)
} 

export const handleEscPress = (e) => {
    if (e.key === 'Escape') {
      const modalOpened = document.querySelector('.popup_opened')
      closeModalWindow(modalOpened)
    }
  }