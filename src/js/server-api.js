import axios from "axios";

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


