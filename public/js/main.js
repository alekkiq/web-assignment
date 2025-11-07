import { getAllRestaurants, getRestaurant } from './api/fetchRestaurants.js';
import { initRestaurantList } from './restaurantList.js';
import { drawMapMarkers, initMap } from './map.js';
import { getClientCoords } from "./utils.js";

document.addEventListener('DOMContentLoaded', async () => {
  const clientCoords = await getClientCoords();
  const restaurants = await getAllRestaurants();

  console.log(clientCoords);

  const map = initMap('map', clientCoords)
  drawMapMarkers(map, restaurants);

  const restaurantList = document.getElementById('restaurants');

  initRestaurantList(restaurants, restaurantList, clientCoords, map);
});
