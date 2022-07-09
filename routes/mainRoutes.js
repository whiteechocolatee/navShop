const express = require("express");
const {
  getItems,
  getItem,
  getLimitedItemsByCategory,
  getLimitedNewItems,
  createItem,
} = require("../controllers/itemControllers");
const {
  postTestItems,
  postTestUsers,
} = require("../insertData/insertDataControllers");
const router = express.Router();

router
  .get("/", getItems)
  .get("/:id", getItem)
  .get("/limit/lastAdded", getLimitedNewItems)
  .get("/limit/existingItems/:category", getLimitedItemsByCategory)

  /*
    testing posts
  */

  .post("/postTestItems", postTestItems)
  .post("/postTestUsers", postTestUsers)
  /* 
    admin routes
  */

  /* Creating a new item. */
  .post("/createItem", createItem);

module.exports = router;
