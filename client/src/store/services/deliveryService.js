import axios from "axios";

const api = "https://api.novaposhta.ua/v2.0/json/";
const apiKey = "d6a9f94157b12fe4993a41f31d276bef";

const getAreas = async () => {
  let config = {
    apiKey: apiKey,
    modelName: "Address",
    calledMethod: "getAreas",
  };

  let response = await axios.post(api, config);

  const { data } = response.data;

  return data;
};

const getAllDepartments = async () => {
  const config = {
    apiKey: apiKey,
    modelName: "Address",
    calledMethod: "getWarehouses",
  };

  let response = await axios.post(api, config);

  const { data } = response.data;

  return data;
};

const deliveryService = {
  getAreas,
  getAllDepartments,
};

export default deliveryService;
