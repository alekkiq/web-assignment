/**
 * Minimal js for html&css WIP demo version of the project.
 */

import { getAllRestaurants } from './api/fetchRestaurants.js';
import { initRestaurantList } from './restaurantList.js';
import { initMap, drawMapMarkers } from './map.js';

document.addEventListener('DOMContentLoaded', async () => {
  const restaurants = await getAllRestaurants();
  const map = initMap('map');
  drawMapMarkers(map, restaurants);

  const restaurantList = document.getElementById('restaurants');
  initRestaurantList(restaurants, restaurantList, map);
});