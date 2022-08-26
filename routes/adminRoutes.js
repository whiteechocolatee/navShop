const express = require("express");
const {
  getCallbacks,
} = require("../controllers/formControllers");
const {
  createItem,
} = require("../controllers/itemControllers");
const {
  getOrders,
} = require("../controllers/orderController");
const {
  getUsers,
} = require("../controllers/userControllers");

const protection = require("../utils/authMiddleware");

const router = express.Router();

router
  .post("/createItem", createItem)
  .get("/orders", protection, getOrders)
  .get("/callbacks", protection, getCallbacks)
  .get("/users", protection, getUsers);

module.exports = router;
