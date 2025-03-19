const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.Mixed, 
    required: true,
  },
  cartId: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
      color: String,
      size: String,
      additionalDetails: String,
    },
  ],
  addressInfo: {
    fullName:String,
    addressId: String,
    address: String,
    city: String,
    phone: String,
    notes: String,
    email: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  totalPrice: Number,
  shippingCost: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  orderTime:  String, 
  paymentId: mongoose.Schema.Types.Mixed, 
  payerId: mongoose.Schema.Types.Mixed, 
  orderId: mongoose.Schema.Types.Mixed, 
});

module.exports = mongoose.model("Order", OrderSchema);
