import Card from './Card.js';
import { FormValidator, selectors } from './FormValidator.js';
import { popupImageTitle, popupImagePicture, popupImage, openModalWindow } from './utils.js';

const editProfilePopup = document.querySelector('.popup-profile');
const profileTitle = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('.popup__input_type_username');
const aboutInput = document.querySelector('.popup__input_type_about');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = editProfilePopup.querySelector('.popup__close-button');
const addCardPopup = document.querySelector('.popup-place');
const addCardForm = addCardPopup.querySelector('.popup__photo-add-form');
const submitButtonAddCard = addCardPopup.querySelector('.popup__submit-button');
const showAddCardPopup = document.querySelector('.profile__add-button');
const cardCloseButton = addCardPopup.querySelector('.popup__close-button');
const placeInput = document.querySelector('.popup__input_place_name');
const linkInput = document.querySelector('.popup__input_place_url');
const imageCloseButton = popupImage.querySelector('.popup__close-button');
const cardContainer = document.querySelector('.photo-grid__list');
const modalWindowForm = document.querySelector('.popup__form');
const profileForm = document.querySelector('.popup__user-form-edit');

const initialCards = [
  {
    name: "Озеро Тургояк",
    link: "https://images.unsplash.com/photo-1608411404585-6bbd9c6cec96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80",
  },
  {
    name: "Озеро Зюраткуль",
    link: "https://images.unsplash.com/photo-1637073247480-99b12c71d56a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Таганай",
    link: "https://images.unsplash.com/photo-1610738918169-3df48c0a231c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
  },
  {
    name: "Сад...",
    link: "https://images.unsplash.com/photo-1510942752400-ebce99a8a2c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80",
  },
  {
    name: "Сосновый лес",
    link: "https://images.unsplash.com/photo-1635417006446-a99b4e952c2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80",
  },
  {
    name: "Миасс",
    link: "https://images.unsplash.com/photo-1514400492509-eb84a50d38d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80",
  },
];

export const closeModalWindow = (modalWindow) => {
 modalWindow.classList.remove('popup_opened')
 document.removeEventListener('keydown', handleEscPress)
}

export const handleEscPress = (e) => {
  if (e.key === 'Escape') {
    const modalOpened = document.querySelector('.popup_opened')
    closeModalWindow(modalOpened)
  }
}

const formValidProfile = new FormValidator(selectors, profileForm);
const formValidCard = new FormValidator(selectors, addCardForm);

const handleClickOverlay = (e) => {
  if (e.target.classList.contains('popup_opened')) {
    closeModalWindow(e.target)
  }
}

function clearInput() {
  const inputErrorList = Array.from(document.querySelectorAll('.popup__input-error_active, .popup__input_type_error'));
  inputErrorList.forEach(function (item) {
    item.classList.remove('popup__input-error_active');
    item.classList.remove('popup__input_type_error');
  });
}

formValidProfile.enableValidation();
formValidCard.enableValidation();

editProfilePopup.addEventListener('click', handleClickOverlay)
addCardPopup.addEventListener('click', handleClickOverlay)

function handleProfileEditForm (e) {
  e.preventDefault()
  profileTitle.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeModalWindow(editProfilePopup)
}

function handleProfileInputValue () {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileAbout.textContent;
}

//const handleAddFormButtonState = () => {
  //formValidCard.disableSubmitButton();
//}

profileEditButton.addEventListener('click', function () {
  handleProfileInputValue()
  formValidProfile.enableSubmitButton()
  formValidProfile.clearInput();
  openModalWindow(editProfilePopup)
})
profileCloseButton.addEventListener('click', () => closeModalWindow(editProfilePopup))
modalWindowForm.addEventListener('submit', handleProfileEditForm)
showAddCardPopup.addEventListener('click', () => {
  formValidCard.disableSubmitButton();
  formValidCard.clearInput();
  addCardForm.reset();
  openModalWindow(addCardPopup)
})
cardCloseButton.addEventListener('click', () => closeModalWindow(addCardPopup))
function addCard (e) {
  e.preventDefault()
  const newValues = {
    name: placeInput.value,
    link: linkInput.value
  }

  handleAddCard(newValues)

  closeModalWindow(addCardPopup)
}
addCardForm.addEventListener('submit', addCard)
imageCloseButton.addEventListener('click', () => closeModalWindow(popupImage))
popupImage.addEventListener('click', handleClickOverlay)
const handleAddCard = (item) => {
  const newCard = new Card(item, '#photo-grid-template')
  cardContainer.prepend(newCard.createCard());
}
initialCards.reverse().forEach((item) => {
  handleAddCard(item)
})