import Swiper from 'swiper';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

let aboutUsSwiper = null;

function updateNavigationState(swiper) {
  let prevBtn = null;
  let nextBtn = null;

  const navPrev = swiper?.navigation?.prevEl;
  const navNext = swiper?.navigation?.nextEl;
  if (navPrev) prevBtn = Array.isArray(navPrev) ? navPrev[0] : navPrev;
  if (navNext) nextBtn = Array.isArray(navNext) ? navNext[0] : navNext;

  const root = swiper?.el || swiper?.$el || null;
  if (root) {
    const parent = root.closest('.about-swiper-parent');
    if (parent) {
      prevBtn = prevBtn || parent.querySelector('.about-swiper-button-prev');
      nextBtn = nextBtn || parent.querySelector('.about-swiper-button-next');
    }
  }

  if (prevBtn) {
    const disabled = !!swiper?.isBeginning;
    prevBtn.disabled = disabled;
    prevBtn.classList.toggle('swiper-button-disabled', disabled);
    prevBtn.setAttribute('aria-disabled', disabled ? 'true' : 'false');
  }
  if (nextBtn) {
    const disabled = !!swiper?.isEnd;
    nextBtn.disabled = disabled;
    nextBtn.classList.toggle('swiper-button-disabled', disabled);
    nextBtn.setAttribute('aria-disabled', disabled ? 'true' : 'false');
  }
}

function initAboutUsSwiper() {
  const container = document.querySelector('.mySwiper');
  if (!container) return null;
  if (container.swiper) {
    try {
      container.swiper.destroy(true, true);
    } catch (e) {}
  }

  const parent = container.closest('.about-swiper-parent');
  if (!parent) return null;
  const nextBtnEl = parent.querySelector('.about-swiper-button-next');
  const prevBtnEl = parent.querySelector('.about-swiper-button-prev');
  const paginationEl = parent.querySelector('.about-swiper-pagination');

  const swiper = new Swiper(container, {
    modules: [Navigation, Pagination],
    loop: false,
    wrapperClass: 'about-swiper-wrapper',
    slideClass: 'about-swiper-slide',
    pagination: {
      el: paginationEl,
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
    },
    on: {
      init(s) {
        updateNavigationState(s);
      },
      slideChange() {
        updateNavigationState(swiper);
      },
    },
  });

  const addNavHandler = (btnEl, handlerName, fn) => {
    if (!btnEl) return;

    const prev = btnEl[handlerName];
    if (prev) {
      try {
        btnEl.removeEventListener('click', prev);
      } catch (e) {}
    }
    btnEl[handlerName] = fn;
    btnEl.addEventListener('click', fn);
  };

  addNavHandler(nextBtnEl, '_aboutUsNext', e => {
    e.preventDefault();
    swiper.slideNext();
    updateNavigationState(swiper);
  });

  addNavHandler(prevBtnEl, '_aboutUsPrev', e => {
    e.preventDefault();
    swiper.slidePrev();
    updateNavigationState(swiper);
  });

  updateNavigationState(swiper);
  return swiper;
}

function runInit() {
  if (aboutUsSwiper) {
    try {
      aboutUsSwiper.destroy(true, true);
    } catch (e) {}
    aboutUsSwiper = null;
  }

  aboutUsSwiper = initAboutUsSwiper();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInit);
} else {
  runInit();
}
