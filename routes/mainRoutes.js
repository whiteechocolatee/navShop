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

  /* 
    admin routes
  */

  /* Creating a new item. */
  .post("/createCallback", createCallback)
  .post("/createItem", createItem);

module.exports = router;
