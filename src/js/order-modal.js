import axios from 'axios';

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
    const { name, phone, comments } = event.target.elements;
    const formData = {
        name: name.value,
        phone: phone.value,
        animalId: "667ad1b8e4b01a2b3c4d5e55",
        comment: comments.value,
    };

    try {
        const response = await axios.post(
            'https://paw-hut.b.goit.study/api/orders',
            formData
        );

        const orderData = response.data;
        console.log('Form submitted successfully:', orderData);
        event.target.reset();
        closeModalOrder();
        return orderData;
    }
    catch (error) {
        console.error('Error submitting form:', error);
    }
});