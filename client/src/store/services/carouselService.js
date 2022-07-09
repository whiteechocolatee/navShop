import axios from "axios";

/**
 * GetNewItems is an async function that uses axios to make a GET request to the /api/items/ route,
 * and returns the data from the response
 * @returns An array of objects
 */
const getNewItems = async () => {
  let res = await axios.get("/api/items/limit/lastAdded");
  return res.data;
};

const getItemsByCategory = async (category) => {
  let res = await axios.get(
    `/api/items/limit/existingItems/${category}`,
  );

  return res.data;
};

const carouselService = {
  getNewItems,
  getItemsByCategory,
};

export default carouselService;
