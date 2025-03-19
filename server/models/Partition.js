const mongoose = require("mongoose");

const partitionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // صورة الخلفية
});

module.exports = mongoose.model("Partition", partitionSchema);
