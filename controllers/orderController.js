const Order = require("../models/orderModel");
const User = require("../models/userModel");

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
      discount,
    } = req.body;
    const user = req.user._id;

    if (orderItems && orderItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Кошик пустий!" });
    } else {
      const createOrder = await Order.create({
        orderItems,
        shippingAddress,
        totalPrice,
        customerData,
        paymentMethod,
        commentary,
        user,
        discount,
      });

      return res.status(201).json(createOrder);
    }
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера, зверніться пізніше.",
    });
  }
};

/**
 * It gets all orders from the database
 * @param req - The request object.
 * @param res - The response object.
 * @returns an array of orders.
 */
const getOrders = async (req, res) => {
  try {
    const user = req.user._id;

    const { isAdmin } = await User.findById(user);

    if (isAdmin) {
      const orders = await Order.find().sort({ _id: -1 });

      return res.status(200).json(orders);
    } else {
      return res.status(404).json({
        message: "Помилка! Такого запита не існує.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера, зверніться пізніше.",
    });
  }
};

/**
 * It gets a single order by id.
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
const singleOrder = async (req, res) => {
  try {
    const user = req.user._id;
    const id = req.params.id;

    const { isAdmin } = await User.findById(user);

    if (isAdmin) {
      const order = await Order.findById(id);

      res.status(200).json(order);
    } else {
      const order = await Order.find({ user: user });

      let singleOrder = order.filter(
        (single) => single._id.toString() === id.toString(),
      );

      res.status(200).json(singleOrder);
    }
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера, зверніться пізніше.",
    });
  }
};

/**
 * It marks an order as delivered
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const markAsDelivered = async (req, res) => {
  try {
    const user = req.user._id;
    const id = req.params.id;

    const { isAdmin } = await User.findById(user);

    if (isAdmin) {
      const order = await Order.findById(id);

      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      return res.status(201).json(updatedOrder);
    } else {
      return res
        .status(404)
        .json({ message: "Такого запиту не існує!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера, зверніться пізніше.",
    });
  }
};

module.exports = {
  createOrder,
  userOrders,
  getOrders,
  singleOrder,
  markAsDelivered,
};
