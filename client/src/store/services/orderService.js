import axios from "axios";

const createOrder = async ({
  orderItems,
  shippingAddress,
  totalPrice,
  customerData,
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
    {
      orderItems,
      shippingAddress,
      totalPrice,
      customerData,
    },
    config,
  );

  return response.data;
};

const orderService = {
  createOrder,
};

export default orderService;
