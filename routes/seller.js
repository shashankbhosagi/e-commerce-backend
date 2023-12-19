const express = require("express");
const router = express.Router();
const {
  createCatalog,
  currentOrders,
} = require("../controllers/sellerController");

router.route("/create-catalog").post(createCatalog);
router.route("/orders").get(currentOrders);
module.exports = router;
