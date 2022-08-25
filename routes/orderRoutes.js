const express = require("express");
const {
  createOrder,
  userOrders,
  singleOrder,
  markAsDelivered,
} = require("../controllers/orderController");
const protection = require("../utils/authMiddleware");

const router = express.Router();

router
  .post("/", protection, createOrder)
  .get("/", protection, userOrders)
  .get("/:id", protection, singleOrder)
  .put("/delivered/:id", protection, markAsDelivered);

module.exports = router;
