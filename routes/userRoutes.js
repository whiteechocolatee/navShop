const express = require("express");
const {
  userLogin,
  userProfile,
  userRegistration,
  updateProfile,
  userAddAddress,
} = require("../controllers/userControllers");
const protection = require("../utils/authMiddleware");

const router = express.Router();

router.post("/", userRegistration);
router.post("/login", userLogin);
router.get("/profile", protection, userProfile);
router.put("/profile", protection, updateProfile);
router.put("/profile/address", protection, userAddAddress);

module.exports = router;
