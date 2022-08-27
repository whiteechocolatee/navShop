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
  calledAt: {
    type: Date,
  },
  adminCommentary: [
    {
      comment: { type: String },
      date: { type: Date },
    },
  ],
});

CallbackModel.set("timestamps", true);

module.exports = mongoose.model("Callback", CallbackModel);
