import { API_URL, STRAPI_API_TOKEN } from "./urls";

const fetchDataFromStrapi = async (endpoint) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + STRAPI_API_TOKEN,
    },
  };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    if (!res.ok) {
      console.error(`Fetch failed with status ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
    return null;
  }
};

export default fetchDataFromStrapi;
