const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Must provide seller ID"],
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Catalog", catalogSchema);
