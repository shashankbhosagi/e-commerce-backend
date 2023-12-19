const User = require("../models/User");
const Catalog = require("../models/Catalog");
const Order = require("../models/Order");

/*
 * @breif - gives list of seller in dataBase
 * @type - GET
 * @params
 * @returns - list of seller with thier _id && userName
 * @api - /api/buyer/list-of-sellers
 */
const listOfSellers = async (req, res) => {
  try {
    const sellers = await User.find({ userType: "seller" });
    const sellerList = sellers.map((seller) => {
      return {
        userId: seller._id,
        userName: seller.userName,
      };
    });

    res.status(201).json({ sellers: sellerList });
  } catch (error) {
    console.log("Error fetching list of sellers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/*
 * @breif - gives list of products that are available in sellers catalog
 * @type - GET
 * @params - takes seller_id as a param in api call
 * @returns - list of all the products in the seller's catalog
 * @api - /api/buyer/seller-catalog/:seller_id
 */
const singleSellerCatalog = async (req, res) => {
  try {
    const sellerId = req.params.seller_id;
    const existUser = await User.findOne({ _id: sellerId });
    if (!existUser) {
      return res
        .status(400)
        .json({ message: `Seller with id ${sellerId} does not exist` });
    }
    const catalog = await Catalog.findOne({ seller: sellerId }).populate(
      "products"
    );
    if (!catalog) {
      res.status(400).json({ message: "Catalog not found" });
    }

    res.status(200).json({ products: catalog.products });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error: ", error);
  }
};

/*
 * @breif - A usertype of buyer can create an order containing list of products that they want to buy from a particular seller's catalog only.
 * @type - POST
 * @params - takes seller_id in params of api and takes buyer, seller _id and products _id array in the body of api
 * @returns - confirmation on successfull creation of order
 * @api - /api/buyer/create-order/:seller_id
 */
const createOrder = async (req, res) => {
  try {
    const { buyer, seller, products } = req.body;

    const existUser = await User.findOne({ _id: buyer });
    if (!existUser) {
      return res
        .status(400)
        .json({ error: `Buyer with id ${buyer} does not exist` });
    }
    const existUserseller = await User.findOne({ _id: seller });
    if (!existUserseller) {
      return res
        .status(400)
        .json({ error: ` seller with id ${seller} does not exist` });
    }
    if (existUserseller.userType !== "seller") {
      return res
        .status(400)
        .json({ error: ` seller with id ${seller} does not exist` });
    }
    const sellerCatalog = await Catalog.findOne({ seller: seller });
    if (!sellerCatalog) {
      return res
        .status(400)
        .json({ error: `Catalog with seller id ${seller} does not exist` });
    }
    if (!products) {
      return res.status(400).json({ error: `Products must not be left empty` });
    }

    const isValidOrder = products.every((productId) =>
      sellerCatalog.products.includes(productId)
    );
    if (!isValidOrder) {
      return res.status(400).json({
        error: "Invalid order. Some products are not in the seller's catalog",
      });
    }

    const newOrder = new Order({
      buyer: buyer,
      seller: seller,
      products: products,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { listOfSellers, singleSellerCatalog, createOrder };
