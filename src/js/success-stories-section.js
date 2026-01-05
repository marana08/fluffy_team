import Swiper from 'swiper';
import 'swiper/css';

import { getStories } from './server-api';
import { renderStories } from './success-stories-rndr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const loader = document.querySelector('.stories-loader');
const controls = document.querySelector('.swiper-controls');

export function showError(error) {
  iziToast.info({
    message: error,
    position: 'topRight',
    color: '#f2aaaaff',
    icon: false,
    progressBar: false,
    messageColor: 'black',
  });
}

function hideLoader() {
  loader.classList.remove('loader');
}

function showLoader() {
  loader.classList.add('loader');
}

function hideControls() {
  controls.classList.add('visually-hidden');
}

function showControls() {
  controls.classList.remove('visually-hidden');
}

window.addEventListener('DOMContentLoaded', async () => {
  showLoader();
  try {
    let storiesList = await getStories();

    if (storiesList === null) {
      showError('Не вдалося завантажити історії. Спробуйте пізніше');
      hideLoader();
      const wrapper = document.querySelector('.swiper-wrapper');
      if (wrapper) {
        wrapper.innerHTML = '<p class="error-swiper">Не вдалося завантажити історії</p>';
      }
      return;
    }

    if (storiesList.length === 0) {
      showError('Нажаль, історії зараз недоступні');
      hideLoader();
      const wrapper = document.querySelector('.swiper-wrapper');
      if (wrapper) {
        wrapper.innerHTML = '<p class="error-swiper">Нажаль, історії зараз недоступні</p>';
      }
      return;
    }

    renderStories(storiesList);

    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      grabCursor: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      loop: false,
      speed: 400,
      spaceBetween: 32,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
    });

    showControls();
    hideLoader();
  } catch (err) {
    showError('Cталась помилка. Спробуйте пізніше');
    const wrapper = document.querySelector('.swiper-wrapper');
    if (wrapper) {
      wrapper.innerHTML = '<p class="error-swiper">Нажаль, історії зараз недоступні</p>';
    }
    hideLoader();
  }
});
