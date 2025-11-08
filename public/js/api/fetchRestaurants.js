import { BASE_URL } from './config.js';
import { fetchData } from './fetchData.js';

export const getAllRestaurants = async () => {
  const url = `${BASE_URL}/restaurants`;
  const data = await fetchData(url);
  return data;
}

export const getRestaurant = async (id) => {
  const url = `${BASE_URL}/restaurants/${id}`;
  const data = await fetchData(url);
  return data;
}

export const getDailyMenu = async (id) => {
  const url = `${BASE_URL}/restaurants/daily/${id}/en`;
  const data = await fetchData(url);
  return data;
}

export const getWeeklyMenu = async (id) => {
  const url = `${BASE_URL}/restaurants/weekly/${id}/en`;
  const data = await fetchData(url);
  return data;
}