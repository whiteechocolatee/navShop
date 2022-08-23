import axios from "axios";

const userOrders = async () => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let { data } = await axios.get("/api/order", config);

  return data;
};

/**
 * It sends a POST request to the server with the order details, and returns the response
 * @returns The response.data is being returned.
 */
const createOrder = async ({
  orderItems,
  shippingAddress,
  totalPrice,
  customerData,
  paymentMethod,
  commentary,
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
      paymentMethod,
      commentary,
    },
    config,
  );

  return response.data;
};

/**
 * It gets all the orders from the database
 * @returns An array of objects.
 */
const getOrders = async () => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let { data } = await axios.get(
    "/api/admin/orders",
    config,
  );

  return data;
};

const orderService = {
  createOrder,
  userOrders,
  getOrders,
};

export default orderService;
