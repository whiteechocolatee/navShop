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

userModel.set('timestamps', true);

/* This is a method that is being added to the userModel. It is a function that takes in an entered
password and compares it to the password that is stored in the database. */
userModel.methods.matchPassword = async function (
  enteredPassword,
) {
  return await bcrypt.compare(
    enteredPassword,
    this.password,
  );
};

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(7);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userModel);
