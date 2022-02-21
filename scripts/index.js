const editProfilePopup = document.querySelector(".popup-profile");
const profileTitle = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileForm = document.querySelector(".popup__user-form-edit");
const nameInput = document.querySelector(".popup__input_type_username");
const aboutInput = document.querySelector(".popup__input_type_about");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = editProfilePopup.querySelector(".popup__close-button");

function openPopup(popup) {
    popup.classList.add("popup_opened");
}
  
function closePopup(popup) {
    popup.classList.remove("popup_opened");
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
    nameInput.value = "";
    aboutInput.value = "";
    closePopup(editProfilePopup);
  
}

profileEditButton.addEventListener("click", editProfile);
profileCloseButton.addEventListener("click", () => closePopup(editProfilePopup));
profileForm.addEventListener("submit", saveRedactorProfile);