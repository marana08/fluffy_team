import axios from 'axios';
import Swal from 'sweetalert2';

// Модальне вікно «Залишіть заявку»
const formOrder = document.getElementById('order-form');
const modalWindow = document.getElementById('modal-order');
const closeModalOrderBtn = modalWindow.querySelector('.modal-close-btn');
// Тут також потрібна кнопка відкриття модального вікна
const openModalOrderBtn = null;

function openModalOrder() {
  modalWindow.classList.remove('visually-hidden');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', onEscapePress);
}

function closeModalOrder() {
  modalWindow.classList.add('visually-hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onEscapePress);
}

function onEscapePress(event) {
  if (event.key === 'Escape') {
    closeModalOrder();
  }
}

function onModalClick(event) {
  if (event.target === modalWindow) {
    closeModalOrder();
  }
}

closeModalOrderBtn.addEventListener('click', closeModalOrder);
modalWindow.addEventListener('click', onModalClick);
// openModalOrderBtn.addEventListener('click', openModalOrder);

formOrder.addEventListener('submit', async event => {
  event.preventDefault();
  const {
    name: nameEl,
    phone: phoneEl,
    comments: commentsEl,
  } = event.target.elements;
  const name = nameEl.value.trim();
  let phone = phoneEl.value.trim();
  const comments = commentsEl.value.trim();

  // Очистка попередніх помилок
  const errorInputs = formOrder.querySelectorAll('.input-error');
  const errorTexts = formOrder.querySelectorAll('.error-text');
  errorInputs.forEach(input => input.classList.remove('input-error'));
  errorTexts.forEach(text => (text.textContent = ''));

  // Валідація форми
  if (name.length > 32) {
    const nameInput = formOrder.querySelector('.modal-form-input[type="text"]');
    nameInput.classList.add('input-error');
    nameInput.nextElementSibling.textContent =
      "Ім'я не повинно перевищувати 32 символи.";
    return;
  }

  const phonePattern = /^[0-9]{12}$/;
  if (phone[0] === '+') {
    phone = phone.slice(1);
  }
  if (phone.length !== 12) {
    const phoneInput = formOrder.querySelector('.modal-form-input[type="tel"]');
    phoneInput.classList.add('input-error');
    phoneInput.nextElementSibling.textContent =
      'Телефон повинен містити 12 цифр.';
    return;
  }
  if (!phonePattern.test(phone)) {
    const phoneInput = formOrder.querySelector('.modal-form-input[type="tel"]');
    phoneInput.classList.add('input-error');
    phoneInput.nextElementSibling.textContent =
      'Телефон повинен містити лише цифри.';
    return;
  }

  if (comments.length > 255) {
    const commentsInput = formOrder.querySelector('.modal-form-textarea');
    commentsInput.classList.add('input-error');
    commentsInput.nextElementSibling.textContent =
      'Коментар не повинен перевищувати 255 символів.';
    return;
  }

  const formData = {
    name: name,
    phone: phone,
    animalId: '667ad1b8e4b01a2b3c4d5e55', // Тут має бути реальний ID тварини
    comment: comments.length > 0 ? comments : 'Без коментарів',
  };

  try {
    const response = await axios.post(
      'https://paw-hut.b.goit.study/api/orders',
      formData
    );

    const orderData = response.data;
    Swal.fire({
      title: 'Дякуємо за вашу заявку!',
      text: `Ваш номер замовлення: ${orderData._id}`,
      icon: 'success',
      confirmButtonText: 'Закрити',
    });
    event.target.reset();
    closeModalOrder();
    return orderData;
  } catch (error) {
    Swal.fire({
      title: 'Помилка!',
      text: 'Сталася помилка при надсиланні заявки. Спробуйте ще раз пізніше.',
      icon: 'error',
      confirmButtonText: 'Закрити',
    });
    console.error('Error submitting order:', error);
  }
});
