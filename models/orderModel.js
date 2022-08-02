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
      count: {
        type: Number,
        required: true,
      },
      totalPrice: {
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
    email: {
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
    shippingMethod: {
      type: String,
      required: true,
    },
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
    index: {
      type: String,
      required: false,
    },
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  commentary: {
    type: String,
    required: false,
  },
  isDelivered: {
    type: String,
    required: true,
    default: "В процессі",
  },
  deliveredAt: {
    type: Date,
  },
});

orderModel.set("timestamps", true);

module.exports = mongoose.model("Order", orderModel);
