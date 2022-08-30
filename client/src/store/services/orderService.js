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

  if (token) {
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
  } else {
    let response = await axios.post(
      "/api/order/unregistered-user",
      {
        orderItems,
        shippingAddress,
        totalPrice,
        customerData,
        paymentMethod,
        commentary,
      },
    );

    return response.data;
  }
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

/**
 * It gets a single order from the database
 * @param id - The id of the order you want to get.
 * @returns The data is being returned.
 */
const getSingleOrder = async (id) => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let { data } = await axios.get(
    `/api/order/${id}`,
    config,
  );

  return data;
};

/**
 * It takes an order id, gets the token from local storage, and then makes a PUT request to the server
 * to mark the order as delivered
 * @param id - The id of the order you want to mark as delivered.
 * @returns The data is being returned.
 */
const markAsDelivered = async (id) => {
  const token = JSON.parse(
    window.localStorage.getItem("token"),
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let { data } = await axios.put(
    `/api/order/delivered/${id}`,
    {},
    config,
  );

  return data;
};

const orderService = {
  createOrder,
  userOrders,
  getOrders,
  getSingleOrder,
  markAsDelivered,
};

export default orderService;
