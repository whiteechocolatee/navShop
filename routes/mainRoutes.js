const express = require("express");
const {
  createCallback,
} = require("../controllers/formControllers");
const {
  getItems,
  getItem,
  getItemsByCategory,
  createItem,
} = require("../controllers/itemControllers");

const router = express.Router();

router
  .get("/", getItems)
  .get("/:id", getItem)
  .get("/existingItems/:category", getItemsByCategory)
  .post("/createCallback", createCallback)

  

module.exports = router;
