/**
 * Javascript required for creating elements, e.g. restaurants
 * fetched from the API.
 */

import {errorMessage, scrollToElementCenter, calculateDistance, getClientCoords} from './utils.js';
import { mapMoveTo } from "./map.js";

const restaurantMenuDialog = document.getElementById('restaurant-menu');
const dailyMenuTarget = restaurantMenuDialog.querySelector('#daily-menu');
const weeklyMenuTarget = restaurantMenuDialog.querySelector('#weekly-menu');

/**
 * Creates a restaurant element and appends it to the target container.
 * @param restaurant restaurant object fetched from the API
 * @param target target container element where to append the created restaurant element
 * @param mapInstance Leaflet map instance
 */
const createRestaurant = (restaurant, target, mapInstance) => {
  const element = document.createElement('details');
  element.classList.add('restaurant');
  element.name = 'restaurant';
  element.id = `restaurant-${restaurant._id}`;

  const [long, lat] = restaurant.location.coordinates;
  // const distance = calculateDistance(clientCoords, {lat: lat, long: long});

  element.innerHTML = `
    <summary class="wrapper">
      <h3 class="wrapper">${restaurant.name}</h3>
      <img class="icon icon-small" src="../img/icons/chevron-down.svg" alt="Chevron down" aria-hidden="true">
    </summary>
    <div class="restaurant-info">
      <p class="address">${restaurant.address}, ${restaurant.postalCode}, ${restaurant.city}</p>
      <p class="phone">${restaurant.phone}</p>
      <p class="company">${restaurant.company}</p>
      <div class="restaurant-buttons wrapper">
        <button class="button button-primary show-menus" data-open-dialog="restaurant-menu">Show Menu</button>
        <button class="button button-secondary button-only-icon show-on-map" aria-label="Show on map" title="Show on map">
          <img class="icon" src="../img/icons/map-pin.svg" alt="Map with a marker" aria-hidden="true">
        </button>
        <button class="button button-secondary button-only-icon favorite-restaurant" aria-label="Mark restaurant as favorite" title="Mark as favorite">
          <img class="icon" src="../img/icons/star.svg" alt="A star" aria-hidden="true">
        </button>
      </div>
    </div>
  `;

  target.appendChild(element);

  // Event listeners for the generated buttons
  element.querySelector('button.show-on-map').addEventListener('click', (e) => {
    e.preventDefault();

    scrollToElementCenter('map')
    mapMoveTo(mapInstance, lat, long);
  });

  element.querySelector('button.favorite-restaurant').addEventListener('click', async (e) => {
    e.preventDefault();

    // TODO - fetch with put to update current users user.favoriteRestaurant as restaurant id

  });

  element.querySelector('button.show-menus').addEventListener('click', (e) => {
    e.preventDefault();

    const dailyMenu = {
      "courses": [
        {
          "name": "Traditional frankfurter sauce",
          "price": "2,95€",
          "diets": [
            "A",
            "L",
            "M"
          ]
        },
        {
          "name": "Mashed potatoes",
          "price": "2,95€",
          "diets": [
            "*",
            "A",
            "G",
            "ILM",
            "L"
          ]
        },
        {
          "name": "Asian fish soup\n",
          "price": "5,60€",
          "diets": [
            "*",
            "A",
            "G",
            "ILM",
            "L",
            "M"
          ]
        },
        {
          "name": "Cheese and vegetable purée soup",
          "price": "5,60€",
          "diets": [
            "*",
            "A",
            "G",
            "ILM",
            "L"
          ]
        }
      ]
    }

    const weeklyMenu = {"days":[{"date":"Saturday 15 November","courses":[{"name":"Lohilasagnettea ja lämpimiä kasviksia","diets":"L"},{"name":"Härkis-nuudeliwokkia ja lämpimiä kasviksia","diets":"M"},{"name":"Tacoja jauheliha-kasvistäytteellä, jalapenoja ja valkosipulikermaviiliä","diets":"G, L"},{"name":"Herkkusienikeittoa","diets":"L"}]},{"date":"Saturday 15 November","courses":[{"name":"Kasvis-herkkusienigratiinia","diets":"L"},{"name":"Marokkolaiset kikhernepihvit, paprikasalsaa, lämpimiä kasviksia ja täysjyväriisiä","diets":"G, M"},{"name":"Broileria hapan-imeläkastikkeessa ja täysjyväriisiä","diets":"G, M"},{"name":"Kalaseljanka","diets":"G, M"}]},{"date":"Saturday 15 November","courses":[{"name":"Koskenlaskijan silakat, lämpimiä kasviksia ja keitettyä perunaa","diets":"L"},{"name":"Falafelpyörykät tomaattikastikkeessa ja moniviljalisuketta","diets":"M"},{"name":"Pippurista härkäpataa, lämpimiä kasviksia ja moniviljalisuketta","diets":"L"},{"name":"Juuressosekeittoa","diets":"G, L"}]},{"date":"Saturday 15 November","courses":[{"name":"Broileria paprikakastikkeessa, lämpimiä kasviksia ja täysjyväriisiä","diets":"L"},{"name":"Luomutofu-pinaattipastakastiketta","diets":"VL"},{"name":"Kasvis-soijarisottoa ja ananas-chilisalsaa","diets":"G, M"},{"name":"Kirkasta kalkkuna-vihanneskeittoa","diets":"G, M"}]},{"date":"Saturday 15 November","courses":[{"name":"Kalkkuna-kasviswokkia ja lämpimiä kasviksia","diets":"M"},{"name":"Quornia keltaisessa kasviskastikkeessa, lämpimiä kasviksia ja täysjyväriisiä","diets":"G, L"},{"name":"Kala-katkarapupaellaa ja valkosipuliaiolia","diets":"G, M"},{"name":"Tomaattista kikhernekeittoa luomukikherneillä","diets":"G, M"}]}]}

    // TODO - fetch stuff from api, replace the hardcoded objects above
    createRestaurantDailyMenu(dailyMenu);
    createRestaurantWeeklyMenu(weeklyMenu); // TODO - pass weekly menu object
  });
}

/**
 * Creates the daily menu content inside the restaurant menu dialog.
 * @param dailyMenu the daily menu object of the selected restaurant fetched from the API
 */
const createRestaurantDailyMenu = (dailyMenu) => {
  dailyMenuTarget.innerHTML = ''; // clear previous content

  if (dailyMenu.courses.length === 0 || !dailyMenu.courses) {
    dailyMenuTarget.appendChild(errorMessage('No menu available for today.'));
    return;
  }

  dailyMenu.courses.forEach((course) => {
    const courseElement = document.createElement('p');
    courseElement.insertAdjacentHTML('beforeend', course.name);

    if (course.diets && course.diets.length) {
      courseElement.insertAdjacentHTML('beforeend', `;<br>(${course.diets.join(', ')})`);
    }

    if (course.price) {
      courseElement.insertAdjacentHTML('beforeend', ` / <strong>${course.price}</strong>`);
    }

    dailyMenuTarget.appendChild(courseElement);
  });
}

const createRestaurantWeeklyMenu = (weeklyMenu) => {
  weeklyMenuTarget.innerHTML = ''; // clear previous content

  if (weeklyMenu.days.length === 0 || !weeklyMenu.days) {
    weeklyMenuTarget.appendChild(errorMessage('No weekly menu available.'));
    return;
  }

  weeklyMenu.days.forEach((day) => {
    const dayContainer = document.createElement('div');

  });
}

/**
 * Initializes the restaurant list with filtering and sorting capabilities.
 * @param {Array<Object>} restaurants the array of restaurant objects fetched from the API
 * @param {HTMLElement} rootElement the root element containing the restaurant list and controls
 * @param {*} mapInstance the Leaflet map instance
 */
export const initRestaurantList = (restaurants, rootElement, mapInstance) => {
  const initialArray = Array.isArray(restaurants) ? restaurants : [];

  const controls = {
    search: rootElement.querySelector('#filter-search'),
    city: rootElement.querySelector('#filter-city'),
    sort: rootElement.querySelector('#sort-by'),
    container: rootElement.querySelector('#restaurants-list') || rootElement
  }

  let clientCoords = null;

  // populate the city <select> filter
  const cities = new Set();
  initialArray.forEach(restaurant => {
    if (restaurant.city) cities.add(restaurant.city.trim());
  });
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    controls.city.appendChild(option);
  });

  const filterAndSort = () => {
    const query = (controls.search.value || '').trim().toLowerCase();
    const city = controls.city.value;
    const sortBy = controls.sort.value;

    let results = initialArray.filter(restaurant => {
      if (!query && !city) return true;

      const fields = [restaurant.name, restaurant.address, restaurant.city, restaurant.company].filter(Boolean).join(' ').toLowerCase();
      const matchesQuery = query ? fields.includes(query) : true;
      const matchesCity = city ? (restaurant.city && restaurant.city.trim() === city) : true;
      return matchesQuery && matchesCity;
    });

    if (sortBy === 'name-asc' || sortBy === 'name-desc') {
      results.sort((a, b) => a.name.localeCompare(b.name));
      if (sortBy === 'name-desc') results.reverse();
    } else if (sortBy === 'nearest' && clientCoords) {
      results = results
      .map(restaurant => {
        const [long, lat] = restaurant.location.coordinates;
        const distance = calculateDistance(clientCoords, {lat: lat, long: long});
        return {restaurant, distance}
      })
      .sort((a, b) => a.distance - b.distance)
      .map(x => x.restaurant);
    }

    return results;
  }

  const renderList = () => {
    const results = filterAndSort();
    controls.container.innerHTML = '';
    if (!results.length) {
      controls.container.appendChild(errorMessage('No restaurants match the filters.'));
      return;
    }

    results.forEach(restaurant => createRestaurant(restaurant, controls.container, mapInstance));
  }

  // listeners for sort/filtering
  controls.search.addEventListener('input', renderList);
  controls.city.addEventListener('change', renderList);
  controls.sort.addEventListener('change', (event) => {
    console.log(event.target.value);
    renderList();
  });

  renderList();
}