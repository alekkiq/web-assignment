/**
 * Common utility functions
 */

/**
 * Create a simple error message HTML element
 * @param text the text that displays on the element
 * @returns {HTMLParagraphElement} the generated element
 */
export const errorMessage = (text) => {
  const p = document.createElement('p');
  p.textContent = text;
  p.classList.add('error-message');
  return p;
}

/**
 * Fetches the current client's position from the navigator.geolocation API
 * @returns {Promise<{lat: number, long: number}>} Promise containing the navigator.geolocation position coordinates
 */
export const getClientCoords = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("Geolocation position fetched successfully:", pos);
        const coords = {
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        };
        resolve(coords);
      },
      (error) => {
        console.warn("Geolocation error:", error);
        // return fallback coordinates (Metropolia Myllypuro)
        resolve({
          lat: 60.2315,
          long: 25.0694
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 7500,
        maximumAge: 0
      }
    );
  });
};

/**
 * Scrolls the page to the center of **target**.
 * <br>Uses the `window.scrollTo` BOM method
 * @param {String} target target element's id
 */
export const scrollToElementCenter = (target) => {
  const element = document.querySelector(`#${target}`);
  const elRect = element.getBoundingClientRect();
  const elTop = elRect.top + window.scrollY;

  const centerY = elTop - (window.innerHeight / 2) + (elRect.height / 2);

  console.log(elTop, centerY)

  window.scrollTo({
    top: centerY,
    left: 0,
  });
}

/**
 * Haversine formula for calculating the distance between 2 points
 * @param {Object<lat: Number, long: Number>} from starting point coordinates
 * @param {Object<lat: Number, long: Number>} to destination point coordinates
 * @returns {string} calculated distance between `from` and `to`
 */
export const calculateDistance = (from, to) => {
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