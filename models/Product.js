const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: [true, "Must provide name of product"],
  },
  price: {
    type: Number,
    required: [true, "Must provide price of product"],
  },
});

module.exports = mongoose.model("Product", productSchema);
