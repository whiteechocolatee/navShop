const express = require("express");
const {
  createOrder,
  userOrders,
} = require("../controllers/orderController");
const protection = require("../utils/authMiddleware");

const router = express.Router();

router
  .post("/", protection, createOrder)
  .get("/", protection, userOrders);

module.exports = router;
