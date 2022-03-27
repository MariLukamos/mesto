const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
const checkInputValidity = (formElement, inputElement, config) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else
    hideInputError(formElement, inputElement, config);
};
const setListeners = (formElement, {inputSelector, submitButtonSelector, ...config}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleSubmitButton(inputList, buttonElement, config);
    });
  });
};
const enableValidation = ({formSelector, ...config}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const formListListener = Array.from(document.querySelectorAll(formSelector));
    formListListener.forEach(function (fieldset) {
      setListeners(fieldset, config);
    });
  });
};
const hasInvalidInput = (inputList) => {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
};

const toggleSubmitButton = (inputList, buttonElement, {inactiveButtonClass}) => {
  if (hasInvalidInput(inputList)) {
    setButtonState(buttonElement, inactiveButtonClass, true);
  } else {
    setButtonState(buttonElement, inactiveButtonClass, false);
  }
};

const setButtonState = (buttonElement, inactiveButtonClass, state) => {
  if (state === true) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});