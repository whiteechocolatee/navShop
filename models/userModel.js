const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    require: true,
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
