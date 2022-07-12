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

const {
  postTestUsers,
} = require("../insertData/insertDataControllers");

const router = express.Router();

router
  .get("/", getItems)
  .get("/:id", getItem)
  .get("/existingItems/:category", getItemsByCategory)

  /*
    testing posts
  */
  .post("/postTestUsers", postTestUsers)
  /* 
    admin routes
  */

  /* Creating a new item. */
  .post("/createCallback", createCallback)
  .post("/createItem", createItem);

module.exports = router;
