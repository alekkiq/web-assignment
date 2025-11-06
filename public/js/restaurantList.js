/**
 * Javascript required for creating elements, e.g. restaurants
 * fetched from the API.
 */

const errorMessage = (text) => {
  const p = document.createElement('p');
  p.classList.add('error-message');
  p.textContent = text;
  return p;
}

const getClientCoords = () => {
  if (!navigator.geolocation) return null;

  navigator.geolocation.getCurrentPosition((pos) => {
    return {lat: pos.coords.latitude, lng: pos.coords.longitude};
  }, (error) => {
    console.warn(`Geolocation error: ${error}`);
  }, {enableHighAccuracy: true, timeout: 5000});
}

const createRestaurant = (restaurant, target) => {
  const element = document.createElement('details');
  element.classList.add('restaurant');
  element.id = restaurant._id;

  element.innerHTML = `
    <summary class="wrapper">
      <h3 class="wrapper">${restaurant.name}</h3>
      <img class="icon icon-small" src="../img/icons/chevron-down.svg" alt="Chevron down" aria-hidden="true">
    </summary>
    <div class="restaurant-info">
      <p class="address">${restaurant.address}, ${restaurant.postalCode}, ${restaurant.city}</p>
      <p class="phone">${restaurant.phone}</p>
      <p class="company">${restaurant.company}</p>
    </div>
    <a href="#map" class="show-on-map">
      <span>Show on map</span>
      <img class="icon icon-small" src="../img/icons/arrow-up-right.svg" alt="" aria-hidden="true">
    </a>
    <div class="wrapper">
      <button class="show-menus">Show Menu</button>
      <button class="favorite-restaurant">Favorite</button>
    </div>
  `;

  target.appendChild(element);
}

export const initRestaurantList = (restaurants, rootElement) => {
  const initialArray = Array.isArray(restaurants) ? restaurants : [];

  const controls = {
    search: rootElement.querySelector('#filter-search'),
    city: rootElement.querySelector('#filter-city'),
    sort: rootElement.querySelector('#sort-by'),
    useLocation: rootElement.querySelector('#use-location'),
    container: rootElement.querySelector('#restaurants-list') || rootElement
  }

  let clientCoords = getClientCoords();

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
    } else if (sortBy === 'nearest' && clientCoords) {
      results = results
      .map(restaurant => {
        const [long, lat] = restaurant.location.coordinates;
        const distance = Math.sqrt((clientCoords.lat - lat)**2 + (clientCoords.long - long)**2);
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

    results.forEach(restaurant => createRestaurant(restaurant, controls.container));
  }

  // listeners for sort/filtering
  controls.search.addEventListener('input', renderList);
  controls.city.addEventListener('change', renderList);
  controls.sort.addEventListener('change', renderList);
  controls.useLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
      controls.useLocation.textContent = 'Geolocation unavailable';
      return;
    }

    controls.useLocation.textContent = 'Locating...';
    navigator.geolocation.getCurrentPosition((pos) => {
      clientCoords = {lat: pos.coords.latitude, lng: pos.coords.longitude};
      controls.useLocation.textContent = 'Use my location';
      renderList();
    }, (error) => {
      controls.useLocation.textContent = 'Use my location';
      console.warn(`Geolocation error: ${error}`);
    }, {enableHighAccuracy: true, timeout: 5000});
  });

  renderList();
}