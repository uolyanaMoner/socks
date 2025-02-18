// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema(
//   {
//     image: String,
//     title: String,
//     description: String,
//     category: String,
//     brand: String,
//     price: Number,
//     salePrice: Number,
//     totalStock: Number,
//     averageReview: Number,
//     color: String,
//     additionalDetails: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", ProductSchema);

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    color: String,
    size: String,
    additionalDetails: String,
    // إضافة حقل quantityPrices
    quantityPrices: [
      {
        quantity: { type: Number},  // الكمية
        price: { type: Number },     // السعر المرتبط بالكمية
        discountedPrice: { type: Number }, // سعر الخصم (اختياري، وإذا لم يُحدد يكون null)

      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
