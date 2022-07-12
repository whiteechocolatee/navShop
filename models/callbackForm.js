const mongoose = require("mongoose");

const CallbackModel = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  isCalled: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Callback", CallbackModel);
