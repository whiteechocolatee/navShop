import axios from "axios";

const createCallbackRequest = async (formData) => {
  const res = await axios.post(
    "/api/items/createCallback",
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
    "/api/admin/callbacks",
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
    `/api/admin/callbacks/${id}`,
    config,
  );

  return res.data;
};

const formService = {
  createCallbackRequest,
  getCallbacks,
  getSingleCallback,
};

export default formService;
