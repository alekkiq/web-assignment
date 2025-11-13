import { getAllRestaurants } from './api/fetchRestaurants.js';
import { initRestaurantList } from './restaurantList.js';
import { drawMapMarkers, initMap} from './map.js';
import { getClientCoords } from "./utils.js";
import { initDialogs } from './dialogs.js';
import { initForms } from './forms.js';
import { getUserByToken, isUserLoggedIn, logoutUser } from './api/auth.js';

const toggleLoggedInContent = (isLoggedIn) => {
  const hide = Array.from(document.querySelectorAll('.hide-logged-in'));
  const show = Array.from(document.querySelectorAll('.show-logged-in'));
  console.log(isLoggedIn);

  hide.forEach(el => {
    console.log(el)
    el.style.display = isLoggedIn ? 'none' : '';
  });

  show.forEach(el => {
    el.style.display = !isLoggedIn ? 'none' : '';
  })
}

document.addEventListener('DOMContentLoaded', async () => {
  // check user auth
  const isLoggedIn = await isUserLoggedIn();
  toggleLoggedInContent(isLoggedIn);

  const userInfo = await getUserByToken(localStorage.getItem('auth-token'));
  console.log(userInfo);

  // get restaurants and initialize the map
  const restaurants = await getAllRestaurants();
  const map = initMap('map');
  drawMapMarkers(map, restaurants);

  // const clientCoords = await getClientCoords();
  const restaurantList = document.getElementById('restaurants');

  // initialize the rest
  initRestaurantList(restaurants, restaurantList, map);
  initDialogs();
  initForms();

  document.getElementById('logout').addEventListener('click', logoutUser);

  console.log('User logged in:', isLoggedIn);
});
