const express = require("express");
const {
  getCallbacks,
} = require("../controllers/formControllers");
const {
  createItem,
} = require("../controllers/itemControllers");
const {
  getOrders,
  markAsDelivered,
} = require("../controllers/orderController");
const protection = require("../utils/authMiddleware");

const router = express.Router();

router
  .post("/createItem", createItem)
  .get("/orders", protection, getOrders)
  .get("/callbacks", protection, getCallbacks)
  .put("/delivered/:id", protection, markAsDelivered);

module.exports = router;
