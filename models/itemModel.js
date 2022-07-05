const mongoose = require("mongoose");

const reviewModel = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

const itemModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
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
  reviews: [reviewModel],
  numReviews: {
    type: Number,
    require: true,
    default: 0,
  },
  rating: {
    type: Number,
    require: true,
    default: 0,
  },
});

module.exports = mongoose.model("Item", itemModel);
