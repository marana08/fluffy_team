import { refs } from "../refs";
import { loadFromLS } from "../storage";
import { getLimitByScreen } from "./utils";
import { createHandlers } from "./handlers";

let page = loadFromLS('page') || 1;
let totalItems = 0;
let categoryId = loadFromLS('categoryId') ?? null;
const limit = getLimitByScreen();

const state = {
    get page() { return page; },
    get categoryId() { return categoryId; },
    get totalItems() { return totalItems; },
    get limit() { return limit; },
    setPage(value) { page = value; },
    setCategoryId(value) { categoryId = value; },
    setTotalItems(value) { totalItems = value; }
};

const handlers = createHandlers(state);

document.addEventListener('DOMContentLoaded', handlers.handleContentLoad);
refs.petsLoadMoreBtn.addEventListener('click', handlers.handleLoadMoreBtnClick);
refs.categoryList.addEventListener('click', handlers.handleCategoryBtnClick);
refs.petsListPagination.addEventListener('click', handlers.handlePaginationClick);
