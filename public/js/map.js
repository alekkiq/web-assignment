/**
 * Javascript for the leaflet map setup
 */

import { errorMessage, getClientCoords } from "./utils.js";

export const initMap = (targetId = 'map', startingCoords) => {
  const map = L.map(targetId).setView([startingCoords.lat, startingCoords.long], 14);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  return map;
}

/**
 * Draws a map marker for each of the restaurants given.
 * @param map the Leaflet map instance
 * @param restaurants locations to add a marker for
 */
export const drawMapMarkers = (map, restaurants) => {
  if (!restaurants.length) return;

  restaurants.forEach((r) => {
    if (r.location.coordinates) {
      const [long, lat] = r.location.coordinates;
      L.marker([lat, long]).addTo(map);
    }
  });
}

/**
 * Sets **map**'s view to the desired coordinates (**lat**, **long**)
 * @param map the Leaflet map instance
 * @param {Number} lat target latitude
 * @param {Number} long target longitude
 */
export const mapMoveTo = (map, lat, long) => {
  map.flyTo([lat, long], 15, {animate: true, duration: 2});
}
