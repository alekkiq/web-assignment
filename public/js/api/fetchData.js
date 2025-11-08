export const fetchData = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

    console.log('response', res)

    if (!res.ok) throw new Error(`Fetch failed, status ${res.status}\n${res}`);

    const data = await res.json();

    console.log('data', data)

    return data;
  } catch (err) {
    return null;
    return {
      status: err.status,
      message: err.message,
      displayedMessage: "Fetching failed."
    }
  }
}