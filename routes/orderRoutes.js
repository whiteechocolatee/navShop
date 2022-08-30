const express = require("express");
const {
  createOrder,
  createOrderUnregisteredUser,
  userOrders,
  singleOrder,
  markAsDelivered,
} = require("../controllers/orderController");
const protection = require("../utils/authMiddleware");

const router = express.Router();

router
  .post("/unregistered-user", createOrderUnregisteredUser)
  .post("/", protection, createOrder)
  .get("/", protection, userOrders)
  .get("/:id", protection, singleOrder)
  .put("/delivered/:id", protection, markAsDelivered);

module.exports = router;
