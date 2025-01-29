// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   userId: String,
//   cartId: String,
//   cartItems: [
//     {
//       productId: String,
//       title: String,
//       image: String,
//       price: String,
//       quantity: Number,
//       color: String,
//       additionalDetails: String,
//     },
//   ],
//   addressInfo: {
//     addressId: String,
//     address: String,
//     city: String,
//     phone: String,
//     notes: String,
//   },
//   orderStatus: String,
//   paymentMethod: String,
//   paymentStatus: String,
//   totalAmount: Number,
//   shippingCost:Number,
//   orderDate: Date,
//   orderUpdateDate: Date,
//   paymentId: String || Number,
//   payerId: String || Number,
//   orderId: String || Number,
// });

// module.exports = mongoose.model("Order", OrderSchema);



const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.Mixed, // يسمح بتخزين ObjectId أو String
    required: true,
  },
  cartId: {
    type: String, // حفظ معرف السلة
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
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  shippingCost: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: mongoose.Schema.Types.Mixed, // يقبل String أو Number
  payerId: mongoose.Schema.Types.Mixed, // يقبل String أو Number
  orderId: mongoose.Schema.Types.Mixed, // يقبل String أو Number
});

module.exports = mongoose.model("Order", OrderSchema);
