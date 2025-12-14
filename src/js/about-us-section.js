const aboutSwiper = new Swiper('.about-slider-wrapper', {
    slidesPerView: 1,
    spaceBetween: 16, // відстань між слайдами

    navigation: {
        nextEl: '.swiper-button-next', // кнопка вперед
        prevEl: '.swiper-button-prev', // кнопка назад
    },

    pagination: {
        el: '.swiper-pagination', // пагінація
        clickable: true,
    },

    breakpoints: {
        768: {
            spaceBetween: 24, // для планшетів
        },
        1440: {
            spaceBetween: 32, // для десктопів
        }
    }
});
