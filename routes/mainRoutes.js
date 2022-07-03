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
  .post("/", createItem);

module.exports = router;
