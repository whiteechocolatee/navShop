const express = require("express");
const {
  getCallbacks,
  getSingleCallback,
  updateCallbackData,
} = require("../controllers/formControllers");
const {
  createItem,
  updateItems,
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
  .post("/item/createItem", createItem)
  .post("/item/edit", protection, updateItems)
  .get("/orders", protection, getOrders)
  .get("/callbacks", protection, getCallbacks)
  .get("/callbacks/:id", protection, getSingleCallback)
  .put("/callback/edit", protection, updateCallbackData)
  .get("/users", protection, getUsers);

module.exports = router;
