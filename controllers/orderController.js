const Order = require("../models/orderModel");

/**
 * It finds all orders that have the same user id as the user that's logged in and sorts them by the
 * most recent order
 * @param req - The request object.
 * @param res - The response object.
 */
const userOrders = async (req, res) => {
  try {
    const order = await Order.find({
      user: req.user._id,
    }).sort({ _id: -1 });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера, зверніться пізніше.",
    });
  }
};

/**
 * It creates an order
 * @param req - The request object.
 * @param res - The response object.
 * @returns The order is being returned.
 */
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      totalPrice,
      customerData,
      paymentMethod,
      commentary,
    } = req.body;
    const user = req.user._id;

    if (orderItems && orderItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Корзина пуста!" });
    } else {
      const createOrder = await Order.create({
        orderItems,
        shippingAddress,
        totalPrice,
        customerData,
        paymentMethod,
        commentary,
        user,
      });

      console.log(createOrder);

      return res.status(201).json(createOrder);
    }
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера, зверніться пізніше.",
    });
  }
};

module.exports = { createOrder, userOrders };
