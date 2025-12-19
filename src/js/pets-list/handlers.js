import iziToast from "izitoast";
import { refs } from "../refs";
import { loadFromLS, saveToLS } from "../storage";
import { handleOpenModal } from "../animal-details-modal";
import { observeNewElements } from "../scroll-utils";
import { fetchAllCategories, fetchAllAnimals, fetchCategoryById } from "../server-api";
import { showLoader, hideLoader, checkLoadMoreBtnStatus } from "./utils";
import { renderCategories, renderAnimals, renderPagination } from "./render";
import { getTotalPages } from "./utils";

export function createHandlers(state) {
    const { page, categoryId, limit, totalItems, setPage, setCategoryId, setTotalItems } = state;

    async function handleContentLoad() {
        showLoader();
        setPage(1);
        setCategoryId(null);
        saveToLS('page', 1);
        saveToLS('categoryId', null);
        try {
            const categories = await fetchAllCategories();
            const { animals, totalItems: total } = await fetchAllAnimals(1, limit);
            setTotalItems(total);
            renderCategories(categories, null);
            renderAnimals(animals);
            renderPagination(1, getTotalPages(total, limit), observeNewElements);
            checkLoadMoreBtnStatus(1, getTotalPages(total, limit));
            refs.petsList.addEventListener('click', (e) => handleOpenModal(e, animals));
            observeNewElements(refs.petsList);
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
        const newCategoryId = categoryLi.dataset.id; 
        setPage(1);
        setCategoryId(newCategoryId);
        let animals;
        showLoader();

        const allButtons = refs.categoryList.querySelectorAll('.category-btn');
        allButtons.forEach(btn => {
            btn.classList.remove('current');
        });
        
        e.target.classList.add('current');

        try {
            let result;
            if (categoryName !== 'Всі') {
                result = await fetchCategoryById(newCategoryId, 1, limit);
            } else {
                result = await fetchAllAnimals(1, limit);
            }
            setTotalItems(result.totalItems);
            animals = result.animals;
            const totalPages = getTotalPages(result.totalItems, limit);
            renderAnimals(animals);    
            checkLoadMoreBtnStatus(1, totalPages); 
            renderPagination(1, totalPages);
            
            refs.petsList.addEventListener('click', (e) => handleOpenModal(e, animals));
            observeNewElements(refs.petsList);

        } catch (error) {
            iziToast.error({
                title: 'Помилка',
                message: 'Щось пішло не так',
                position: 'topRight',
            })
        } finally {
            hideLoader();
            saveToLS('categoryId', newCategoryId);
            saveToLS('page', 1);
        }
    }

    async function handleLoadMoreBtnClick() {
        const newPage = page + 1;
        setPage(newPage);

        refs.loader.classList.add('loader-center');
        showLoader();

        try {
            let result;
            if (!categoryId) {
                result = await fetchAllAnimals(newPage, limit);
            } else {
                result = await fetchCategoryById(categoryId, newPage, limit);
            }
            checkLoadMoreBtnStatus(newPage, getTotalPages(result.totalItems, limit));
            const markup = result.animals.map(animal => {
                const categoriesMarkup = animal.categories
                    .map(category => `<li class="pets-category-item">${category.name}</li>`)
                    .join('');
                return `
                    <li class="pets-item animate-scale-in" data-id="${animal._id}">
                        <div class="pets-img-wrapper"><img class="pets-img" src="${animal.image}" alt="${animal.name} - ${animal.species}" loading="lazy" /></div>
                        <div class="pets-list-wrapper">
                            <p class="pets-category">${animal.species}</p>
                            <h3 class="pets-name">${animal.name}</h3>
                            <ul class="pets-category-list">${categoriesMarkup}</ul>
                            <div class="descriprion-wrapper">
                                <ul class="descriprion-list">
                                    <li class="descriprion-item">${animal.age}</li>
                                    <li class="descriprion-item">${animal.gender}</li>
                                </ul>
                                <p class="pets-descriprion">${animal.description}</p>
                                <button class="pets-button" type="button">Дізнатись більше</button>
                            </div>
                        </div>
                    </li>`;
            }).join('');
            
            refs.petsList.insertAdjacentHTML('beforeend', markup);
            observeNewElements(refs.petsList);

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
            saveToLS('page', newPage);
            refs.loader.classList.remove('loader-center');
        }  
    }

    async function handlePaginationClick(e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        let newPage = page;
        const totalPages = getTotalPages(totalItems, limit);

        if (btn.dataset.action === 'prev' && page > 1) {
            newPage = page - 1;
        }

        if (btn.dataset.action === 'next' && page < totalPages) {
            newPage = page + 1;
        }

        if (btn.dataset.page) {
            newPage = Number(btn.dataset.page);
        }

        setPage(newPage);
        showLoader();
        try {
            let result;
            if (categoryId) {
                result = await fetchCategoryById(categoryId, newPage, limit);
            } else {
                result = await fetchAllAnimals(newPage, limit);
            }   

            renderAnimals(result.animals);
            renderPagination(newPage, getTotalPages(result.totalItems, limit));
            observeNewElements(refs.petsList);
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
            saveToLS('page', newPage);
        }
    }

    return {
        handleContentLoad,
        handleCategoryBtnClick,
        handleLoadMoreBtnClick,
        handlePaginationClick
    };
}
