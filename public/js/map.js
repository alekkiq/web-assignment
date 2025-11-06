/**
 * Javascript for the leaflet map setup
 */

export const initMap = (startingCoords = {lat: 0, long: 0}, targetId = 'map') => {
  const map = L.map(targetId).setView([startingCoords.lat, startingCoords.long], 11);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  return map;
}