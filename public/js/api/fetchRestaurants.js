const BASE_URL = "https://media2.edu.metropolia.fi/restaurant/api/v1";

const fetchData = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error(`Fetch failed, status ${res.status}\n${res}`);

    const data = await res.json();
    return data;
  } catch (err) {
    return {
      status: err.status,
      message: err.message,
      displayedMessage: "Fetching failed."
    }
  }
}

export const getAllRestaurants = async () => {
  const url = `${BASE_URL}/restaurants`;
  const data = await fetchData(url);
  console.log(data)
  return data;
}

export const getRestaurant = async (id) => {
  const url = `${BASE_URL}/restaurants/${id}`;
  const data = await fetchData(url);
  return data;
}

export const getDailyMenu = async (id) => {
  const url = `${BASE_URL}/restaurants/daily/${id}/en`;
  const data = await fetchData(url);
  return data;
}

export const getWeeklyMenu = async (id) => {
  const url = `${BASE_URL}/restaurants/weekly/${id}/en`;
  const data = await fetchData(url);
  return data;
}