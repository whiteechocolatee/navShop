import axios from "axios";

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
    "/api/users/login",
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
const userRegister = async ({ name, email, password }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await axios.post(
    "/api/users/",
    { name, email, password },
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
    "/api/users/profile",
    config,
  );

  return data;
};

const updateProfile = async ({name,email,password}) => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    "/api/users/profile",
    {name,email,password},
    config,
  );

  return data;
};

const userServices = {
  userLogin,
  userRegister,
  userProfile,
  updateProfile,
};

export default userServices;
