const editProfilePopup = document.querySelector('.popup-profile');
const profileTitle = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileForm = document.querySelector('.popup__user-form-edit');
const nameInput = document.querySelector('.popup__input_type_username');
const aboutInput = document.querySelector('.popup__input_type_about');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = editProfilePopup.querySelector('.popup__close-button');
const addCardPopup = document.querySelector('.popup-place');
const showAddCardPopup = document.querySelector('.profile__add-button');
const cardCloseButton = addCardPopup.querySelector('.popup__close-button');
const formCard = document.querySelector('.popup__photo-add-form');
const placeInput = document.querySelector('.popup__input_place_name');
const linkInput = document.querySelector('.popup__input_place_url');
const imagePopup = document.querySelector('.popup-photo');
const popupImagePicture = imagePopup.querySelector('.popup__image');
const popupImageTitle = imagePopup.querySelector('.popup__caption');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');
const imageText = document.querySelector('.photo__caption');
const cardTemplate = document.querySelector('.photo-grid-template');
const cardContainer = document.querySelector('.photo-grid__list');

function initialCardsRender(initialCards) {
    cardContainer.prepend(createCard(initialCards.link, initialCards.name));
}
initialCards.map(initialCardsRender);
  
function addCard(evt) {
    evt.preventDefault();
    cardContainer.prepend(createCard(link.value, title.value));
    closePopup(popupAddCard);
}

function createCard(url, desc) {
    const newCard = cardTemplate.content.cloneNode(true);
      newCard.querySelector('.photo-grid__image').src = url;
      newCard.querySelector('.photo-grid__name').textContent = desc;
      newCard.querySelector('.photo-grid__image').alt = desc;
      newCard.querySelector('.photo-grid__remove-button').addEventListener('click', handlerCardDelete);
      newCard.querySelector('.photo-grid__button-like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('photo-grid__button-like_activated');
        });
      newCard.querySelector('.photo-grid__image').addEventListener('click', function() {
        openPopup(imagePopup);
        popupImagePicture.src = url;
        popupImageTitle.textContent = desc;
        popupImagePicture.alt = desc;
    })
    return newCard;
}

function handlerCardDelete(evt) {
    const elementDelete = evt.target.closest('.photo-grid__item');
    elementDelete.remove();
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}
  
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function editProfile(event) {
    event.preventDefault();
    openPopup(editProfilePopup);
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileAbout.textContent;
}

function saveRedactorProfile(event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    nameInput.value = '';
    aboutInput.value = '';
    closePopup(editProfilePopup);
}
imageCloseButton.addEventListener('click', ()=>{closePopup(imagePopup)});
cardCloseButton.addEventListener('click', ()=>{closePopup(addCardPopup)});
showAddCardPopup.addEventListener('click', ()=>{openPopup(addCardPopup)});
profileEditButton.addEventListener('click', editProfile);
profileCloseButton.addEventListener('click', () => closePopup(editProfilePopup));
profileForm.addEventListener('submit', saveRedactorProfile);
