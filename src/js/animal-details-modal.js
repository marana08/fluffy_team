import spriteUrl from '../img/sprite.svg';
import { getLastFocusedElement } from './focus';
import { refs } from './refs';
import { loadFromLS } from './storage';

refs.animalDetailsBackdrop.addEventListener('click', handleBackdropClick);
let animalId = null;

export function getAnimalId() {
  return animalId;
}

export function openAnimalModal(id) {
  const allAnimals = loadFromLS('animals');
  const animal = allAnimals.find(animal => animal._id === id);
  if (!animal) return;

  renderModal(animal);
  refs.animalDetailsBackdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  const modal = document.querySelector('.animal-modal');
  trapFocus(modal);
  const closeBtn = document.querySelector('.details-modal-close-btn');
  window.addEventListener('keydown', handleEscPress);
  closeBtn.addEventListener('click', handleCloseModalBtn);

  const adoptBtn = document.querySelector('.modal-adopt-btn');
  if (adoptBtn) {
    adoptBtn.addEventListener('click', () => {
      window.dispatchEvent(
        new CustomEvent('open-order-modal', {
          detail: { animalId: animal._id },
        })
      );
    });
  }
}

function renderModal({
  _id,
  name,
  image,
  species,
  age,
  gender,
  description,
  healthStatus,
  behavior,
}) {
  const markup = `
    <div class="animal-modal" data-id="${_id}" tabindex="-1" role="dialog">
    <button
      class="details-modal-close-btn"
      type="button"
      aria-label="Закрити модальне вікно"
    >
      <svg class="details-modal-close-btn-icon" width="24" height="24">
        <use href="${spriteUrl}#icon-close"></use>
      </svg>
    </button>
    <div class="animal-modal-content">
      <div class="animal-modal-img-wrapper">
        <img class="animal-modal-img" src="${image}" alt="${name}-${species}" />
      </div>
      <div class="animal-modal-info">
        <p class="animal-species">${species}</p>
        <h2 class="animal-name">${name}</h2>
        <div class="age-gender-wrapper">
          <p class="animal-age">${age}</p>
          <p class="animal-gender">${gender}</p>
        </div>
        <div class="desc-wrapper">
        <div class="description-section">
          <h3 class="descriprion-title">Опис:</h3>
          <p class="descriprion-text">${description}</p>
        </div>
        <div class="description-section">
          <h3 class="descriprion-title">Здоров'я:</h3>
          <p class="descriprion-text">${healthStatus}</p>
        </div>
        <div class="description-section last">
          <h3 class="descriprion-title">Поведінка:</h3>
          <p class="descriprion-text">${behavior}</p>
        </div>
        <button class="modal-adopt-btn" type="button">Взяти додому</button>
      </div>
        </div>
    </div>
  </div>
  `;
  refs.animalDetailsBackdrop.innerHTML = markup;
}
function handleCloseModalBtn() {
  refs.animalDetailsBackdrop.classList.remove('is-open');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', handleEscPress);

  const lastFocused = getLastFocusedElement();
  if (lastFocused) lastFocused.focus();
}
export function handleEscPress(e) {
  if (e.key === 'Escape') {
    handleCloseModalBtn();
  }
}
function handleBackdropClick(e) {
  if (e.currentTarget !== e.target) return;
  handleCloseModalBtn();
}

export function trapFocus(modal) {
  modal.focus();
  const focusableSelectors = `
    a[href],
    button:not([disabled]),
    textarea,
    input,
    select,
    [tabindex]:not([tabindex="-1"])
  `;

  const focusableElements = modal.querySelectorAll(focusableSelectors);
  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  modal.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    }
    if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  });
}
