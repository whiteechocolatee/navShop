const express = require("express");
const {
  getItems,
  getItem,
  createItem,
} = require("../controllers/itemControllers");
const router = express.Router();

router
  .get("/", getItems)
  .get("/:id", getItem)

  /* 
    admin routes
  */

  /* Creating a new item. */
  .post("/", createItem);

module.exports = router;
