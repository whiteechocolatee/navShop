const mongoose = require("mongoose");

const itemModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  itemImage: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  characteristics: [
    {
      name: {
        type: String,
        required: true,
      },
      description: [{ type: String, required: true }],
    },
  ],
  count: {
    type: Number,
    default: 1,
    require: true,
  },
  totalPrice: {
    type: Number,
    require: true,
  },
  color: {
    type: String,
  },
  company: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  memory: {
    type: Number,
  },
});

module.exports = mongoose.model("Item", itemModel);
