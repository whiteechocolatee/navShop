const express = require("express");
const {
  createOrder,
} = require("../controllers/orderController");
const protection = require("../utils/authMiddleware");

const router = express.Router();

router.post("/", protection, createOrder);

module.exports = router;
