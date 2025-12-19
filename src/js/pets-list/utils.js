import { refs } from "../refs";

export function getLimitByScreen() {
  const width = window.innerWidth;
  if (width >= 1440) return 9;     
  return 8;                      
}

export function getTotalPages(totalItems, limit) {
  return Math.ceil(totalItems / limit);
}

export function showLoader() {
    refs.loader.classList.remove('loader-hidden');
}

export function hideLoader() {
    refs.loader.classList.add('loader-hidden');
}

export function showLoadBtn() {
    refs.petsLoadMoreBtn.classList.remove('pets-load-more-btn-hidden')
}

export function hideLoadBtn() {
    refs.petsLoadMoreBtn.classList.add('pets-load-more-btn-hidden')
}

export function checkLoadMoreBtnStatus(page, totalPages) {
    if (page >= totalPages) {
        hideLoadBtn();
    } else {
        showLoadBtn();
    }
}
