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
    // Валідація параметрів
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


