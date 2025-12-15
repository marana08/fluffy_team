import axios from "axios";
import iziToast from "izitoast";
import { ENDPOINTS, server } from "./server-api";
import { refs } from "./refs";

let limit = getLimitByScreen();
let page = 1;
let totalItems;
let categoryId;

document.addEventListener('DOMContentLoaded', handleContentLoad);
refs.petsLoadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);
refs.categoryList.addEventListener('click', handleCategoryBtnClick);


function getLimitByScreen() {
  const width = window.innerWidth;

  if (width >= 1440) return 9;     
  return 8;                      
}


// --------------- handlers -------------------

async function handleContentLoad(e) {
    showLoader();
    
    try {
        const categories = await fetchAllCategories();
        const animals = await fetchAllAnimals();   
        
        renderCategories(categories);
        renderAnimals(animals);

        checkLoadMoreBtnStatus();
    } catch (error) {
       console.log(error);
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
    showLoader();

    const allButtons = refs.categoryList.querySelectorAll('.category-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('current');
    });

    e.target.classList.add('current');

    try {
        let animals = await fetchAllAnimals();
        if (categoryName !== 'Всі') {
            animals = await fetchCategoryById(categoryId, page);
        }
        renderAnimals(animals);    
        checkLoadMoreBtnStatus(); 
    } catch (error) {
        iziToast.error({
            title: 'Помилка',
            message: 'Щось пішло не так',
            position: 'topRight',
        })
        throw error;
    } finally {
        hideLoader();
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
        throw error;
    } finally {
        hideLoader(); 
        refs.loader.classList.remove('loader-center');
    }  
}


// ----------------- API -----------------

async function fetchAllCategories(page) {
    try {
    const response = await server.get(`${ENDPOINTS.categories}`);   
    return response.data;
    } catch (error) {
        iziToast.error({
            title: 'Помилка',
            message: 'Щось пішло не так',
            position: 'topRight',
        })
        throw error;
    }
}

async function fetchAllAnimals() {
    try {
        const response = await server.get(`${ENDPOINTS.animals}`, {
            params: {
                limit: limit,
                page: page
            }
        });

        totalItems = response.data.totalItems;
        return response.data.animals; 
        
    } catch (error) {
        iziToast.error({
            title: 'Помилка',
            message: 'Щось пішло не так',
            position: 'topRight',
        })
        throw error;
    }   
}

async function fetchCategoryById(id, page) {
    try {
        const response = await server.get(`${ENDPOINTS.animals}?categoryId=${id}`, {
            params: {
            limit: limit,
            page: page
            }
        });
        totalItems = response.data.totalItems;
        return response.data.animals;
        
    } catch (error) {
            iziToast.error({
            title: 'Помилка',
            message: 'Щось пішло не так',
            position: 'topRight',
        })
        throw error;
    }
}



// ----------------- render -----------------

function categoryTemplate(category) {
    return `
     <li class="category-item" data-id="${category._id}">
        <button class="category-btn" type="button">${category.name}</button>
      </li>`
}

function categoriesTemplate(categories) {
    return categories.reverse().map(categoryTemplate).join('');
}

function renderCategories(categories) {
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
        <img class="pets-img" src="${image}" alt="${name} - ${species}" />
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
    const totalPages = Math.ceil(totalItems / limit);
      if (page >= totalPages) {
        hideLoadBtn();
    } else {
        showLoadBtn();
    }
}


