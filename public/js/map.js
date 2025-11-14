/**
 * Initiate a Leaflet map instance.
 * @param {String} targetId the ID of the map target element
 * @returns {*} the newly created leaflet map
 */
export const initMap = (targetId = 'map') => {
  const map = L.map(targetId, {
    zoomControl: false,
  }).setView([65, 26], 4); // approx center of finland

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  L.control.zoom({
    position: 'bottomleft',
  }).addTo(map);

  return map;
}

/**
 * Draws a map marker for each of the restaurants given.
 * @param map the Leaflet map instance
 * @param {Array<Object>} restaurants locations to add a marker for
 */
export const drawMapMarkers = (map, restaurants) => {
    if (!restaurants || !restaurants.length) return;

    restaurants.forEach(r => {
        const [long, lat] = r.location.coordinates;
        const marker = L.marker([lat, long]).addTo(map);

        marker.bindPopup(`
          <h4>${r.name}</h4>
          <p>${r.address}, ${r.postalCode}, ${r.city}</p>
        `);
    });
}

/**
 * Sets **map**'s view to the desired coordinates (**lat**, **long**)
 * @param map the Leaflet map instance
 * @param {Number} lat target latitude
 * @param {Number} long target longitude
 */
export const mapMoveTo = (map, lat, long) => {
  map.flyTo([lat, long], 14, {animate: true, duration: 2});
}
