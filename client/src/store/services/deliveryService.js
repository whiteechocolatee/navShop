import axios from "axios";

const getCities = async () => {
  let config = {
    apiKey: "d6a9f94157b12fe4993a41f31d276bef",
    modelName: "Address",
    calledMethod: "getWarehouses",
  };

  let response = await axios.post(
    "https://api.novaposhta.ua/v2.0/json/",
    config,
  );

  const { data } = response.data;

  return data;
};

const deliveryService = {
  getCities,
};

export default deliveryService;
