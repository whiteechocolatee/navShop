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
  adminCommentary: {
    type: String,
  },
});

CallbackModel.set("timestamps", true);

module.exports = mongoose.model("Callback", CallbackModel);
