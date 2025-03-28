const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    fullName:String,
    address: String,
    // city: String,
    phone: String,
    notes: String,
    email: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
