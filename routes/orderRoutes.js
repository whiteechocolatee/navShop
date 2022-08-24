const express = require("express");
const {
  createOrder,
  userOrders,
  singleOrder,
} = require("../controllers/orderController");
const protection = require("../utils/authMiddleware");

const router = express.Router();

router
  .post("/", protection, createOrder)
  .get("/", protection, userOrders)
  .get("/:id", protection, singleOrder);

module.exports = router;
