const mongoose = require("mongoose");

const orderModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Item",
      },
    },
  ],
  customerData: {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  shippingAddress: {
    region: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
});

orderModel.set("timestamps", true);

module.exports = mongoose.model("Order", orderModel);
