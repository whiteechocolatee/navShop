import axios from "axios";

export const createCallbackRequest = async (formData) => {
  const res = await axios.post(
    "/api/items/createCallback",
    formData,
  );

  return res.data;
};

const formService = {
  createCallbackRequest,
};

export default formService;
