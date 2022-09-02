import axios from "axios";
import { URL } from "../../App";

/**
 * It sends a POST request to the /api/users/login endpoint with the email and password as the body,
 * password and email verification, after that user authorization
 * and then stores the response in localStorage
 * @returns The user's information.
 */
const userLogin = async ({ email, password }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await axios.post(
    `${URL}/api/users/login`,
    { email, password },
    config,
  );

  localStorage.setItem(
    "token",
    JSON.stringify(res.data.token),
  );

  return res.data;
};

/**
 * It sends a POST request to the /api/users/ endpoint with the name, email, and password of the user , creating user in database ,
 * and then stores the response in localStorage
 * @returns The user's information.
 */
const userRegister = async ({
  name,
  surname,
  phoneNumber,
  email,
  password,
}) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await axios.post(
    `${URL}/api/users/`,
    { name, surname, phoneNumber, email, password },
    config,
  );

  localStorage.setItem(
    "token",
    JSON.stringify(res.data.token),
  );

  return res.data;
};

/**
 * It gets the token from local storage, adds it to the header, and then sends a GET request to the
 * server
 * @returns The userServices object is being returned.
 */
const userProfile = async () => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(
    `${URL}/api/users/profile`,
    config,
  );

  return data;
};

/**
 * It updates the user's profile
 * @returns The data object is being returned.
 */
const updateProfile = async ({
  name,
  surname,
  phoneNumber,
  email,
  password,
}) => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    `${URL}/api/users/profile`,
    { name, surname, phoneNumber, email, password },
    config,
  );

  return data;
};

const saveAddress = async (address) => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    `${URL}/api/users/profile/address`,
    address,
    config,
  );

  return data;
};

/**
 * It takes a favorite object as an argument, gets the token from local storage, adds the token to the
 * config object, and then makes a PUT request to the /api/users/profile/favorite endpoint with the
 * favorite object and the config object as arguments
 * @param favorite - the object that we want to add to the user's favorite list.
 * @returns The data is being returned.
 */
const addToFavorite = async (favorite) => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    `${URL}/api/users/profile/favorite`,
    favorite,
    config,
  );

  return data;
};

const removeFromFavorites = async (favorite) => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    `${URL}/api/users/profile/favorite/remove`,
    favorite,
    config,
  );

  return data;
};

const getUsers = async () => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(
    `${URL}/api/admin/users`,
    config,
  );

  return data;
};

const userServices = {
  userLogin,
  userRegister,
  userProfile,
  updateProfile,
  saveAddress,
  addToFavorite,
  removeFromFavorites,
  getUsers,
};

export default userServices;
