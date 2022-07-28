import axios from "axios";

const createOrder = async ({
  orderItems,
  shippingAddress,
  totalPrice,
}) => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let response = await axios.post(
    "/api/order",
    { orderItems, shippingAddress, totalPrice },
    config,
  );

  return response.data;
};

const orderService = {
  createOrder,
};

export default orderService;
