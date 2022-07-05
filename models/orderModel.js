const mongoose = require("mongoose");

const orderModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  orderItems: [
    {
      name: {
        type: String,
        require: true,
      },
      image: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Item",
      },
    },
  ],
  shippingAddress: {
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    postalCode: {
      type: String,
      require: true,
    },
  },
  totalPrice: {
    type: Number,
    require: true,
    default: 0.0,
  },
  isDelivered: {
    type: Boolean,
    require: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Order", orderModel);
