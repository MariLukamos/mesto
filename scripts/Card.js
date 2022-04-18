import { popupImageTitle, popupImagePicture, popupImage, openModalWindow } from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
  }

  //Методы

    //Получение карточки
  _getCardTemplate() {
    this._view = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo-grid__item')
      .cloneNode(true)
  }

    //Публичный метод отрисовки карточки
  renderCard(container) {
    this._getCardTemplate()
    this._setEventListeners()
    this._cardImage = this._view.querySelector('.photo-grid__image')
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._view.querySelector('.photo-grid__name').textContent = this._name
    container.append(this._view)
  }

    //Слушатели событий
  _setEventListeners() {
    //Лайк
    this._view
    .querySelector('.photo-grid__button-like')
    .addEventListener('click', () => {
      this._handleLikeCard()
    })

    //Удаление
    this._view
    .querySelector('.photo-grid__remove-button')
    .addEventListener('click', () => {
      this._handleRemoveCard()
    })

    //Открытие попапа с изображением
    this._view
    .querySelector('.photo-grid__image')
    .addEventListener('click', () => {
      this._handleOpenPopupWithImage()
    })
  }

  //Лайк
  _handleLikeCard() {
    this._view
    .querySelector('.photo-grid__button-like').
    classList.
    toggle('photo-grid__button-like_activated');
  }

  //Удаление
  _handleRemoveCard() {
    this._view
    .closest('.photo-grid__item')
    .remove()
  }

    //Открытие попапа с изображением
  _handleOpenPopupWithImage() {
    popupImagePicture.src = this._link
    popupImageTitle.textContent = this._name
    openModalWindow(popupImage);
  }
}
