import axios from "axios";

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
    "userInfo",
    JSON.stringify(res.data),
  );

  return res.data;
};

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
    "userInfo",
    JSON.stringify(res.data),
  );

  return res.data;
};

const userServices = { userLogin, userRegister };

export default userServices;
