const express = require("express");
const router = express.Router();
const {
  listOfSellers,
  singleSellerCatalog,
  createOrder,
} = require("../controllers/buyerController");

router.route("/list-of-sellers").get(listOfSellers);
router.route("/seller-catalog/:seller_id").get(singleSellerCatalog);
router.route("/create-order/:seller_id").post(createOrder);
module.exports = router;
