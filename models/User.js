const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Must provide username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Must provide password"],
  },
  userType: {
    type: String,
    enum: ["buyer", "seller"],
    required: [true, "Type must be either buyer or seller"],
  },
});

module.exports = mongoose.model("User", userSchema);
