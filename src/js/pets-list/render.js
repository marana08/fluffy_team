import { refs } from "../refs";
import spriteUrl from '/img/sprite.svg';
import { observeNewElements } from "../scroll-utils";

export function categoryTemplate(category, index) {
    const delayClass = index < 5 ? `animate-delay-${index + 1}` : '';
    return `
     <li class="category-item animate-slide-up ${delayClass}" data-id="${category._id}">
        <button class="category-btn" type="button">${category.name}</button>
      </li>`
}

export function categoriesTemplate(categories) {
    return categories.reverse().map((category, index) => categoryTemplate(category, index)).join('');
}

export function renderCategories(categories, categoryId) {
    const markup =` <li class="category-item animate-slide-up">
        <button class="category-btn current" type="button">Всі</button>
      </li>${categoriesTemplate(categories)}`;

    refs.categoryList.innerHTML = markup;
    observeNewElements(refs.categoryList);
}

export function animalTemplate({ _id, name, image, species, age, gender, categories, description }) {
    const categoriesMarkup = categories
        .map(category => `<li class="pets-category-item">${category.name}</li>`)
        .join('');
    
    return `
     <li class="pets-item animate-scale-in" data-id="${_id}">
     <div class="pets-img-wrapper"><img class="pets-img" src="${image}" alt="${name} - ${species}" loading="lazy" /></div>
        <div class="pets-list-wrapper">
          <p class="pets-category">${species}</p>
          <h3 class="pets-name">${name}</h3>
          <ul class="pets-category-list">${categoriesMarkup}</ul>
          <div class="descriprion-wrapper">
            <ul class="descriprion-list">
              <li class="descriprion-item">${age}</li>
              <li class="descriprion-item">${gender}</li>
            </ul>
            <p class="pets-descriprion">${description}</p>
            <button class="pets-button" type="button">Дізнатись більше</button>
          </div>
        </div>
      </li>`
}

export function animalsTemplate(animals) {
    return animals.map(animalTemplate).join('');
}

export function renderAnimals(animals) {
    const markup = animalsTemplate(animals);
    refs.petsList.innerHTML = markup;
}

export function renderPagination(page, totalPages) {
  if (totalPages <= 1) return;

  let markup = '';

  markup += `<li>
      <button class="pagination-btn-arrow" data-action="prev" aria-label="Попередня сторінка" ${page === 1 ? 'disabled' : ''}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${spriteUrl}#icon-arrow-back"></use>
        </svg>
      </button>
    </li>`;

  if (page === 1) {
    for (let i = 1; i <= Math.min(3, totalPages); i += 1) {
      markup += pageButton(i, page);
    }
      if (totalPages > 3) {
      markup += `<li class="dots">…</li>`;
      markup += pageButton(totalPages, page);
    }
  } else {
      markup += pageButton(1, page);

    if (page > 3) {
      markup += `<li class="dots">…</li>`;
    }

    for (let i = page - 1; i <= page + 1; i += 1) {
      if (i > 1 && i < totalPages) {
        markup += pageButton(i, page);
      }
    }

    if (page < totalPages - 2) {
      markup += `<li class="dots">…</li>`;
    }

    if (totalPages > 1) {
      markup += pageButton(totalPages, page);
    }
  }

  markup += `<li>
      <button class="pagination-btn-arrow" data-action="next" aria-label="Наступна сторінка" ${page === totalPages ? 'disabled' : ''}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${spriteUrl}#icon-arrow-forward"></use>
        </svg>
      </button>
    </li>`;

  refs.petsListPagination.innerHTML = markup;
  observeNewElements(refs.petsListPagination);
}

function pageButton(pageNumber, currentPage) {
  return `
    <li>
      <button
        class="pagination-btn ${currentPage === pageNumber ? 'current' : ''}"
        aria-label="Сторінка ${pageNumber}"
        data-page="${pageNumber}">
        ${pageNumber}
      </button>
    </li>
  `;
}
