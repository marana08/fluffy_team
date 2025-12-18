import { refs } from "./refs";
import spriteUrl from "../img/sprite.svg";

refs.animalDetailsBackdrop.addEventListener('click', handleBackdropClick);


export function handleOpenModal(e, allAnimals) {
  if (e.target.nodeName !== 'BUTTON') return;
    const card = e.target.closest('li');
    const animalId = card.dataset.id;
    const animal = allAnimals.find(animal => animal._id === animalId);
  if (!animal) return;
    renderModal(animal);
    refs.animalDetailsBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscPress);
    const closeBtn = document.querySelector('.details-modal-close-btn');
    closeBtn.addEventListener('click', handleCloseModalBtn);
  //ставимо клік на кнопку і передаємо id для модального вікна з формою
    const adoptBtn = document.querySelector('.modal-adopt-btn');
    adoptBtn.addEventListener('click', e => handleAdoptBtnClick(e, animal._id));
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
    <div class="animal-modal" data-id="${_id}">
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
        <div class="description-section">
          <h3 class="descriprion-title">Опис:</h3>
          <p class="descriprion-text">${description}</p>
        </div>
        <div class="description-section">
          <h3 class="descriprion-title">Здоров"я:</h3>
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
  `;
  refs.animalDetailsBackdrop.innerHTML = markup;
}
function handleCloseModalBtn() {
  refs.animalDetailsBackdrop.classList.remove('is-open');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', handleEscPress);
}
function handleEscPress(e) {
  if (e.code === 'Escape') {
    handleCloseModalBtn();
  }
}
function handleBackdropClick(e) {
  if (e.currentTarget !== e.target) return;
  handleCloseModalBtn();
}
