const jwt = require("jsonwebtoken");
require("dotenv").config();

const getToken = (user) => {
  const token = jwt.sign({ identifier: user._id }, process.env.TOKEN_SECRET);
  return token;
};

module.exports = getToken;
