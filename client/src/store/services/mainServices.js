import axios from "axios";
import { URL } from "../../App";

/**
 * GetNewItems is an async function that uses axios to make a GET request to the /api/items/ route,
 * and returns the data from the response
 * @returns An array of objects
 */
const getItems = async () => {
  let res = await axios.get(`${URL}/api/items/`);
  return res.data;
};

/**
 * It takes a category as an argument, and returns an array of items that belong to that category
 * @param category - the category of the item you want to get
 * @returns An array of objects.
 */
const getItemsByCategory = async (category) => {
  let res = await axios.get(
    `${URL}/api/items/existingItems/${category}`,
  );
  return res.data;
};

/**
 * GetItem is an async function that returns the result of an axios get request to the url /
 * @param id - the id of the item you want to get
 * @returns a promise.
 */
const getItem = async (id) => {
  let res = await axios.get(`${URL}/api/items/${id}`);
  return res.data;
};

const updateItem = async (item) => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let { data } = await axios.post(
    `${URL}/api/admin/item/edit`,
    item,
    config,
  );

  return data;
};

const createItem = async (item) => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let { data } = await axios.post(
    `${URL}/api/admin/item/createItem`,
    item,
    config,
  );

  return data;
};

const deleteProductById = async (id) => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let { data } = await axios.delete(
    `${URL}/api/admin/item/delete/${id}`,
    config,
  );

  return data;
};

const mainService = {
  getItems,
  getItemsByCategory,
  getItem,
  updateItem,
  createItem,
  deleteProductById,
};

export default mainService;
