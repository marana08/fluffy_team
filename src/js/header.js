const menuButton = document.querySelector('.header-burger-menu');
const modal = document.querySelector('.header-modal');
const closeButton = document.querySelector('.modal-close-button');
const link = document.querySelector('.modal-navigation-item');
const nav = document.querySelector('.modal-navigation-list');
const takeButton = document.querySelector('.modal-button');

function closeModal(event) {
  modal.classList.remove('is-open');
  document.body.classList.remove("is-modal-open");
  document.removeEventListener("keydown", handleEscape);
  menuButton.blur()
}

function handleEscape(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

takeButton.addEventListener('click', closeModal);

menuButton.addEventListener('click', event => {
  event.preventDefault();
  modal.classList.add('is-open');
  document.body.classList.add("is-modal-open");
  document.addEventListener("keydown", handleEscape);
});

closeButton.addEventListener('click', closeModal);
nav.addEventListener('click', event => {
  if (event.target.classList.contains('modal-navigation-link')) {
    closeModal();
  }
});
