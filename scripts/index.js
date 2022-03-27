const editProfilePopup = document.querySelector('.popup-profile');
const submitEditProfile = editProfilePopup.querySelector('.popup__submit-button')
const profileTitle = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileForm = document.querySelector('.popup__user-form-edit');
const nameInput = document.querySelector('.popup__input_type_username');
const nameInputError = document.querySelector('.username-input-error');
const aboutInput = document.querySelector('.popup__input_type_about');
const aboutInputError = document.querySelector('.userabout-input-error');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = editProfilePopup.querySelector('.popup__close-button');
const addCardPopup = document.querySelector('.popup-place');
const addCardForm = addCardPopup.querySelector('.popup__photo-add-form');
const submitButtonAddCard = addCardPopup.querySelector('.popup__submit-button');
const showAddCardPopup = document.querySelector('.profile__add-button');
const cardCloseButton = addCardPopup.querySelector('.popup__close-button');
const formCard = document.querySelector('.popup__photo-add-form');
const placeInput = document.querySelector('.popup__input_place_name');
const placeInputError = document.querySelector('.place_name-input-error');
const linkInput = document.querySelector('.popup__input_place_url');
const linkInputError = document.querySelector('.place_url-input-error');
const popupImage = document.querySelector('.popup_type_photo');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__caption');
const imageCloseButton = popupImage.querySelector('.popup__close-button');
const imageText = document.querySelector('.photo__caption');
const cardTemplate = document.querySelector('#photo-grid-template');
const cardContainer = document.querySelector('.photo-grid__list');

function createCard(linkValue, placeValue) {
    const newCard = cardTemplate.content.cloneNode(true);
    const cardImage = newCard.querySelector('.photo-grid__image');
        cardImage.src = linkValue;
        cardImage.alt = placeValue;
      newCard.querySelector('.photo-grid__name').textContent = placeValue;
      newCard.querySelector('.photo-grid__remove-button').addEventListener('click', handlerCardDelete);
      newCard.querySelector('.photo-grid__button-like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('photo-grid__button-like_activated');
        });
      newCard.querySelector('.photo-grid__image').addEventListener('click', function() {
        popupImagePicture.src = linkValue;
        popupImageTitle.textContent = placeValue;
        popupImagePicture.alt = placeValue;
        openPopup(popupImage);
    });
    return newCard;
}

function renderInitialCards(initialCards) {
    renderCard(initialCards.link, initialCards.name);
}
initialCards.forEach(renderInitialCards);
  
function addCard(evt) {
    evt.preventDefault();
    renderCard(linkInput.value, placeInput.value);
    closePopup(addCardPopup);
    placeInput.value = '';
    linkInput.value = '';
}

function renderCard(link, place) {
    cardContainer.prepend(createCard(link, place));
}

function handlerCardDelete(evt) {
    evt.target.closest('.photo-grid__item').remove();
}

function closePopupEsc(event) {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

function clearInput() {
    const inputErrorList = Array.from(document.querySelectorAll('.popup__input-error_active, .popup__input_type_error'));
    inputErrorList.forEach(function (item) {
      item.classList.remove('popup__input-error_active');
      item.classList.remove('popup__input_type_error');
    });
}
  
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

function editProfile(event) {
   event.preventDefault();
   openPopup(editProfilePopup);
   const buttonSubmit = profileForm.querySelector('.popup__submit-button');
   setButtonState(buttonSubmit, 'popup__submit-button_disabled', false);
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileAbout.textContent;
}

function saveRedactorProfile(event) {
   event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(editProfilePopup);
    nameInput.value = '';
    aboutInput.value = '';
}

function resetError(inputList) {
	inputList.forEach(function(item) {
		checkInputValidity(item, 'popup__input-error_active');
	});
}

function closePopupSuburb(event) { 
    if (event.target === event.currentTarget) {
      closePopup(event.target);
    }
}

imageCloseButton.addEventListener('click', ()=>{closePopup(popupImage)});
cardCloseButton.addEventListener('click', ()=>{closePopup(addCardPopup)});
showAddCardPopup.addEventListener('click', ()=>{
    openPopup(addCardPopup);
    clearInput();
    placeInput.value = '';
    linkInput.value = '';
    setButtonState(submitButtonAddCard, 'popup__submit-button_disabled', true);
});
profileEditButton.addEventListener('click', editProfile);
profileCloseButton.addEventListener('click', () => closePopup(editProfilePopup));
profileForm.addEventListener('submit', saveRedactorProfile);
editProfilePopup.addEventListener('click', closePopupSuburb);
addCardForm.addEventListener('submit', addCard);
addCardPopup.addEventListener('click', closePopupSuburb);
popupImage.addEventListener('click', closePopupSuburb);