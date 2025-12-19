import axios from "axios";
import { storiesParams } from './refs';

export const BASE_URL = 'https://paw-hut.b.goit.study/api';
export const ENDPOINTS = {
    animals: '/animals',
    categories: '/categories',
    orders: '/orders',
    feedbacks: '/feedbacks',
};

export const server = axios.create({
    baseURL: BASE_URL,
})

export async function getStories(page = storiesParams.page) {
  try {
    const validLimit = typeof storiesParams.limit === 'number' && storiesParams.limit > 0 
      ? storiesParams.limit 
      : 6;
    const validPage = typeof page === 'number' && page >= 1 
      ? page 
      : 1;

    const response = await server.get(`${ENDPOINTS.feedbacks}`, {
      params: {
        limit: validLimit,
        page: validPage,
      },
    });
    return response.data.feedbacks;
  } catch (error) {
    return null;
  }
}

export async function fetchAllCategories() {
    const response = await server.get(`${ENDPOINTS.categories}`);   
    return response.data;
}

export async function fetchAllAnimals(page, limit) {
    const response = await server.get(`${ENDPOINTS.animals}`, {
        params: {
            limit: limit,
            page: page
        }
    });
    return {
        animals: response.data.animals,
        totalItems: response.data.totalItems
    };
}

export async function fetchCategoryById(id, page, limit) {
    const response = await server.get(`${ENDPOINTS.animals}?categoryId=${id}`, {
        params: {
            limit: limit,
            page: page
        }
    });
    return {
        animals: response.data.animals,
        totalItems: response.data.totalItems
    };
}


