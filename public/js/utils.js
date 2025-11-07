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
export const getClientCoords = async () => {
  let position = { // default -> metropolia myllypuro
    lat: 60.2315,
    long: 25.0694
  };

  if (!navigator.geolocation) return position;

  await navigator.geolocation.getCurrentPosition((pos) => {
      console.log(`Geolocation position fetched succesfully: ${pos}`)
      position = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      };
    }, (error) => {
      console.warn(`Geolocation error: ${error}`);
      return position;
    }, {enableHighAccuracy: false, timeout: 7500});

  return position;
}

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
