import axios from "axios";
import iziToast from "izitoast";
import { ENDPOINTS, server } from "./server-api";
import { refs } from "./refs";
import { loadFromLS, saveToLS } from "./storage";
import spriteUrl from '/img/sprite.svg';
import { handleOpenModal } from "./animal-details-modal";



let limit = getLimitByScreen();
let page = loadFromLS('page');
let totalItems;
let categoryId = loadFromLS('categoryId') ?? null;

document.addEventListener('DOMContentLoaded', handleContentLoad);
refs.petsLoadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);
refs.categoryList.addEventListener('click', handleCategoryBtnClick);
refs.petsListPagination.addEventListener('click', handlePaginationClick);


function getLimitByScreen() {
  const width = window.innerWidth;

  if (width >= 1440) return 9;     
  return 8;                      
}

function getTotalPages() {
  return Math.ceil(totalItems / limit);
}


// --------------- handlers -------------------

async function handleContentLoad(e) {
  showLoader();
  page = 1;                
  categoryId = null;        
  saveToLS('page', 1);
  saveToLS('categoryId', null);
  try {
    const categories = await fetchAllCategories();
    const animals = await fetchAllAnimals(); 
    renderCategories(categories);
    renderAnimals(animals);
    renderPagination();
    checkLoadMoreBtnStatus();
    refs.petsList.addEventListener('click', (e) => handleOpenModal(e, animals));
  } catch (error) {
      iziToast.error({
          title: 'Помилка',
          message: 'Щось пішло не так',
          position: 'topRight',
      })
  } finally {
      hideLoader();
  }
}

async function handleCategoryBtnClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  const categoryName = e.target.textContent;
  const categoryLi = e.target.closest('li');
  categoryId = categoryLi.dataset.id; 
  page = 1;
  let animals;
  showLoader();

  const allButtons = refs.categoryList.querySelectorAll('.category-btn');
  allButtons.forEach(btn => {
    btn.classList.remove('current');
  });
  
  e.target.classList.add('current');

  try {
    if (categoryName !== 'Всі') {
      animals = await fetchCategoryById(categoryId, page);
    } else {
      animals = await fetchAllAnimals();
    }
    renderAnimals(animals);    
    checkLoadMoreBtnStatus(); 
    renderPagination();
    
    refs.petsList.addEventListener('click', (e) => handleOpenModal(e, animals));

  } catch (error) {
      iziToast.error({
          title: 'Помилка',
          message: 'Щось пішло не так',
          position: 'topRight',
      })
  } finally {
      hideLoader();
      saveToLS('categoryId', categoryId);
      saveToLS('page', page);
  }
}


async function handleLoadMoreBtnClick() {
    page += 1;

    refs.loader.classList.add('loader-center');
    showLoader();

    try {
        if (!categoryId) {
            checkLoadMoreBtnStatus();
            const animals = await fetchAllAnimals(page);
            const markup = animalsTemplate(animals);
            refs.petsList.insertAdjacentHTML('beforeend', markup);
        } else {
            checkLoadMoreBtnStatus();
            const animals = await fetchCategoryById(categoryId, page);
            const markup = animalsTemplate(animals);
            refs.petsList.insertAdjacentHTML('beforeend', markup);
        }

        const firstCard = refs.petsList.querySelector('li');
        if (firstCard) {
            const cardRect = firstCard.getBoundingClientRect();
            window.scrollBy({
                top: cardRect.height, 
                behavior: 'smooth',
            });
        }
    } catch (error) {
        iziToast.error({
            title: 'Помилка',
            message: 'Щось пішло не так',
            position: 'topRight',
        })
    } finally {
        hideLoader();
        saveToLS('page', page);
        refs.loader.classList.remove('loader-center');
    }  
}

async function handlePaginationClick(e) {
  const btn = e.target.closest('button');
  if (!btn) return;

  let animals;
  
  refs.loader.classList.add('loader-center');
  showLoader();

  const totalPages = getTotalPages();

  if (btn.dataset.action === 'prev' && page > 1) {
      page -= 1;
  }

  if (btn.dataset.action === 'next' && page < totalPages) {
      page += 1;
  }

  if (btn.dataset.page) {
      page = Number(btn.dataset.page);
  }

  try {
      if (categoryId) {
          animals = await fetchCategoryById(categoryId, page);
      } else {
        animals = await fetchAllAnimals(page);
      }   

      renderAnimals(animals);
      renderPagination();
      window.scrollTo({
          top: refs.petsList.offsetTop - 80,
          behavior: 'smooth',
      });
  } catch (error) {
      iziToast.error({
          title: 'Помилка',
          message: 'Щось пішло не так',
          position: 'topRight',
      })
  } finally {
    hideLoader();
    refs.loader.classList.remove('loader-center');
    saveToLS('page', page);
  }
}


// ----------------- API -----------------

async function fetchAllCategories(page) {
    const response = await server.get(`${ENDPOINTS.categories}`);   
    return response.data;
}

async function fetchAllAnimals(page) {
    const response = await server.get(`${ENDPOINTS.animals}`, {
        params: {
            limit: limit,
            page: page
        }
    });

    totalItems = response.data.totalItems;
    return response.data.animals; 
}

async function fetchCategoryById(id, page) {
    const response = await server.get(`${ENDPOINTS.animals}?categoryId=${id}`, {
        params: {
        limit: limit,
        page: page
        }
    });
    totalItems = response.data.totalItems;
    return response.data.animals;
}



// ----------------- render -----------------

function categoryTemplate(category) {
    return `
     <li class="category-item" data-id="${category._id}">
        <button class="category-btn" data-text="${category.name}" type="button">${category.name}</button>
      </li>`
}

function categoriesTemplate(categories) {
    return categories.reverse().map(categoryTemplate).join('');
}

function renderCategories(categories) {
    const isAllActive = !categoryId;
    const markup =` <li class="category-item">
        <button class="category-btn current" type="button">Всі</button>
      </li>${categoriesTemplate(categories)}`;

    refs.categoryList.innerHTML = markup;  
}

function animalTemplate({ _id, name, image, species, age, gender, categories, description }) {
    const categoriesMarkup = categories
        .map(category => `<li class="pets-category-item">${category.name}</li>`)
        .join('');
    
    return `
     <li class="pets-item" data-id="${_id}">
     <div class="pets-img-wrapper"><img class="pets-img" src="${image}" alt="${name} - ${species}" /></div>
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

function animalsTemplate(animals) {
    return animals.map(animalTemplate).join('');
}

function renderAnimals(animals) {
    const markup = animalsTemplate(animals);
    refs.petsList.innerHTML = markup;
}

function renderPagination() {
  const totalPages = getTotalPages();
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
      markup += pageButton(i);
    }
      if (totalPages > 3) {
      markup += `<li class="dots">…</li>`;
      markup += pageButton(totalPages);
    }
  } else {
      markup += pageButton(1);

    if (page > 3) {
      markup += `<li class="dots">…</li>`;
    }

    for (let i = page - 1; i <= page + 1; i += 1) {
      if (i > 1 && i < totalPages) {
        markup += pageButton(i);
      }
    }

    if (page < totalPages - 2) {
      markup += `<li class="dots">…</li>`;
    }

    if (totalPages > 1) {
      markup += pageButton(totalPages);
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
}

function pageButton(pageNumber) {
  return `
    <li>
      <button
        class="pagination-btn ${page === pageNumber ? 'current' : ''}"
        aria-label="Сторінка ${pageNumber}"
        data-page="${pageNumber}">
        ${pageNumber}
      </button>
    </li>
  `;
}

// --------------- loader ---------------

function showLoader() {
    refs.loader.classList.remove('loader-hidden');
}

function hideLoader() {
    refs.loader.classList.add('loader-hidden');
}


// --------------- load more btn ---------------

function showLoadBtn() {
    refs.petsLoadMoreBtn.classList.remove('pets-load-more-btn-hidden')
}

function hideLoadBtn() {
    refs.petsLoadMoreBtn.classList.add('pets-load-more-btn-hidden')
}

function checkLoadMoreBtnStatus() {
    const totalPages = getTotalPages();
      if (page >= totalPages) {
        hideLoadBtn();
    } else {
        showLoadBtn();
    }
}


