document.addEventListener('DOMContentLoaded', function () {
const aboutSwiper = new Swiper('.about-slider-wrapper', {
    slidesPerView: 1,
    spaceBetween: 16, // відстань між слайдами

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
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
});

document.querySelector('.swiper-pagination').style.position = 'static';