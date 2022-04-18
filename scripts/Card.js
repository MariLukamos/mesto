import { popupImageTitle, popupImagePicture, popupImage, openModalWindow } from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
  }

  _getCardTemplate() {
    this._view = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo-grid__item')
      .cloneNode(true)
  }

  renderCard(container) {
    this._getCardTemplate()
    this._setEventListeners()
    this._cardImage = this._view.querySelector('.photo-grid__image')
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._view.querySelector('.photo-grid__name').textContent = this._name
    container.append(this._view)
  }

  _setEventListeners() {
    this._view
    .querySelector('.photo-grid__button-like')
    .addEventListener('click', () => {
      this._handleLikeCard()
    })

    this._view
    .querySelector('.photo-grid__remove-button')
    .addEventListener('click', () => {
      this._handleRemoveCard()
    })

    this._view
    .querySelector('.photo-grid__image')
    .addEventListener('click', () => {
      this._handleOpenPopupWithImage()
    })
  }

  _handleLikeCard() {
    this._view
    .querySelector('.photo-grid__button-like').
    classList.
    toggle('photo-grid__button-like_activated');
  }

  _handleRemoveCard() {
    this._view
    .closest('.photo-grid__item')
    .remove()
  }

  _handleOpenPopupWithImage() {
    popupImagePicture.src = this._link
    popupImageTitle.textContent = this._name
    openModalWindow(popupImage);
  }
}
