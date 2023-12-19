const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Must provide buyer ID"],
  },
  seller: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Must provide seller ID"],
  },
  products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Order", orderSchema);
