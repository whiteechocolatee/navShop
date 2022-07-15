const express = require("express");
const {
  userLogin,
  userProfile,
  userRegistration,
} = require("../controllers/userControllers");
const protection = require("../utils/authMiddleware");

const router = express.Router();

router.post("/", userRegistration);
router.post("/login", userLogin);
router.get("/profile", protection, userProfile);

module.exports = router;
