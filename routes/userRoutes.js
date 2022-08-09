const express = require("express");
const {
  userLogin,
  userProfile,
  userRegistration,
  updateProfile,
  addAddress,
  addToFavorite,
  removeFromFavorite,
} = require("../controllers/userControllers");
const protection = require("../utils/authMiddleware");

const router = express.Router();

router.post("/", userRegistration);
router.post("/login", userLogin);
router.get("/profile", protection, userProfile);
router.put("/profile", protection, updateProfile);
router.put("/profile/address", protection, addAddress);
router.put("/profile/favorite", protection, addToFavorite);
router.put(
  "/profile/favorite/remove",
  protection,
  removeFromFavorite,
);

module.exports = router;
