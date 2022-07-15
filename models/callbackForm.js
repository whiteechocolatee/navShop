const mongoose = require("mongoose");

const CallbackModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isCalled: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Callback", CallbackModel);
