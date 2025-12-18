import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// Ініціалізація Swiper:
const swiper = new Swiper('.mySwiper', {
    // 1. ПІДКЛЮЧЕННЯ МОДУЛІВ
    modules: [Navigation, Pagination],

    // 2. НАЛАШТУВАННЯ КІЛЬКОСТІ СЛАЙДІВ
    slidesPerView: 1,
    wrapperClass: 'about-swiper-wrapper',
    slideClass: 'about-swiper-slide',

    // 3. АКТИВАЦІЯ НАВІГАЦІЇ (СТРІЛОЧКИ)
    navigation: {
        nextEl: '.about-swiper-button-next',
        prevEl: '.about-swiper-button-prev',
    },

    // 4. АКТИВАЦІЯ ПАГІНАЦІЇ (КРАПКИ)
    pagination: { el: '.about-swiper-pagination', clickable: true },

    // 5. ДОДАТКОВІ НАЛАШТУВАННЯ
    spaceBetween: 0,
    loop: false,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
    },
});