const Order = require("../models/orderModel");

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } =
      req.body;
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

module.exports = { createOrder };
