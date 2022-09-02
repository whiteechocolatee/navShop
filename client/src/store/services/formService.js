import axios from "axios";
import { URL } from "../../App";


const createCallbackRequest = async (formData) => {
  const res = await axios.post(
    `${URL}/api/items/createCallback`,
    formData,
  );

  return res.data;
};

/**
 * It gets the callbacks from the database
 * @returns An array of callbacks
 */
const getCallbacks = async () => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(
    `${URL}/api/admin/callbacks`,
    config,
  );

  return res.data;
};

const getSingleCallback = async (id) => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(
    `${URL}/api/admin/callbacks/${id}`,
    config,
  );

  return res.data;
};

const updateSingleCallback = async (data) => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(
    `${URL}/api/admin/callback/edit`,
    data,
    config,
  );

  return res.data;
};

const formService = {
  createCallbackRequest,
  getCallbacks,
  getSingleCallback,
  updateSingleCallback,
};

export default formService;
