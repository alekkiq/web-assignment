import { getAllRestaurants, getRestaurant } from './api/fetchRestaurants.js';
import { initRestaurantList } from './restaurantList.js';
import { initMap } from './map.js';

document.addEventListener('DOMContentLoaded', async () => {
  initMap();

  const restaurants = await getAllRestaurants();
  const restaurantList = document.getElementById('restaurants');

  initRestaurantList(restaurants, restaurantList);
})