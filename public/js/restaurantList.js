/**
 * Javascript required for creating elements, e.g. restaurants
 * fetched from the API.
 */

import { errorMessage, scrollToElementCenter } from "./utils.js";
import { mapMoveTo } from "./map.js";

// haversine formula for calculating distances between 2 coordinate points
const calculateDistance = (from, to) => {
  const toRad = (deg) => {
    return deg * Math.PI / 180;
  }
  const R = 6371 // earth radius

  const lat1 = toRad(from.lat);
  const lon1 = toRad(from.long);
  const lat2 = toRad(to.lat);
  const lon2 = toRad(to.long);

  const {sin, cos, sqrt, atan2} = Math;

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a = sin(dLat / 2) * sin(dLat / 2)
                  + cos(lat1) * cos(lat2)
                  * sin(dLon / 2) * sin(dLon / 2)
  const c = 2 * atan2(sqrt(a), sqrt(1 - a));
  const d = R * c;

  return d.toFixed(2);
}

const createRestaurant = (restaurant, target, clientCoords, mapInstance) => {
  const element = document.createElement('details');
  element.classList.add('restaurant');
  element.name = 'restaurant';
  element.id = restaurant._id;

  const [long, lat] = restaurant.location.coordinates;
  const distance = calculateDistance(clientCoords, {lat: lat, long: long});

  element.innerHTML = `
    <summary class="wrapper">
      <h3 class="wrapper">${restaurant.name}</h3>
      <img class="icon icon-small" src="../img/icons/chevron-down.svg" alt="Chevron down" aria-hidden="true">
    </summary>
    <div class="restaurant-info">
      <p class="address">${restaurant.address}, ${restaurant.postalCode}, ${restaurant.city} - ${distance}km</p>
      <p class="phone">${restaurant.phone}</p>
      <p class="company">${restaurant.company}</p>
      <div class="restaurant-buttons wrapper">
        <button class="button button-primary show-menus">Show Menu</button>
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
}

export const initRestaurantList = (restaurants, rootElement, position, mapInstance) => {
  const initialArray = Array.isArray(restaurants) ? restaurants : [];

  const controls = {
    search: rootElement.querySelector('#filter-search'),
    city: rootElement.querySelector('#filter-city'),
    sort: rootElement.querySelector('#sort-by'),
    container: rootElement.querySelector('#restaurants-list') || rootElement
  }

  let clientCoords = position;

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

    results.forEach(restaurant => createRestaurant(restaurant, controls.container, clientCoords, mapInstance));
  }

  // listeners for sort/filtering
  controls.search.addEventListener('input', renderList);
  controls.city.addEventListener('change', renderList);
  controls.sort.addEventListener('change', renderList);

  renderList();
}
