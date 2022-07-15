const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userModel.methods.matchPassword = async function (
  enteredPassword,
) {
  return await bcrypt.compare(
    enteredPassword,
    this.password,
  );
};

module.exports = mongoose.model("User", userModel);
