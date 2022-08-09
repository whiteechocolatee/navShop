const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phoneNumber: {
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
  favorites: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Item",
      },
    },
  ],
  addresses: [
    {
      area: {
        type: String,
      },
      city: {
        type: String,
      },
      department: {
        type: String,
      },
      street: {
        type: String,
      },
      index: {
        type: String,
      },
      main: {
        type: String,
      },
    },
  ],
});

userModel.set("timestamps", true);

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

/* This is a pre-save hook that is being added to the userModel. It is a function that is run before
the userModel is saved to the database. It checks to see if the password has been modified. If it
has not been modified, it will run the next function. If it has been modified, it will generate a
salt and hash the password. */
userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(7);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userModel);
