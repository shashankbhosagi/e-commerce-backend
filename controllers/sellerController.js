const Catalog = require("../models/Catalog");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

/*
 * @breif - Creates catalog for a seller, and each seller can have only one catalog
 * @type - POST
 * @params - sellerId and products array from the body of api call
 * @returns - confirmation on successful creation of catalog
 * @api - /api/seller/create-catalog
 */
const createCatalog = async (req, res) => {
  try {
    const { sellerId, products } = req.body;

    const existUser = await User.findOne({ _id: sellerId });
    if (!existUser) {
      return res
        .status(400)
        .json({ message: `Seller with id ${sellerId} does not exist` });
    }

    const existingCatalog = await Catalog.findOne({ seller: sellerId });
    if (existingCatalog) {
      return res
        .status(400)
        .json({ message: "Seller can only have one catalog" });
    }

    const productList = [];

    for (const productData of products) {
      const newProduct = new Product({
        name: productData.name,
        price: productData.price,
      });
      await newProduct.save();
      productList.push(newProduct._id);
    }

    const newCatalog = new Catalog({
      seller: sellerId,
      products: productList,
    });

    await newCatalog.save();
    res.status(201).json({ message: "Catalog created successfully" });
  } catch (error) {
    console.log("error: ", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

/*
 * @breif - gives all the current orders that are places with the seller with the products in it which have been ordered
 * @type - GET
 * @params - takes in the seller id from the auth token that have been sent during login, for now for testing reciving it in authorizationHeader
 * @returns - list of current orders associated with that seller
 * @api - /api/seller/orders
 */
const currentOrders = async (req, res) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    const seller = authorizationHeader.replace("Bearer ", "").trim();

    const existUser = await User.findOne({ _id: seller });
    if (existUser.userType === "buyer") {
      res.status(400).json({ message: "Not for buyers" });
    }

    const orders = await Order.find({ seller: seller });
    if (!orders) {
      res.status(404).json({ message: `No Orders for seller id : ${seller}` });
    }
    const orderList = orders.map((order) => {
      return {
        buyer: order.buyer,
        seller: order.seller,
        products: order.products,
      };
    });

    res.status(200).json({ data: orderList });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createCatalog, currentOrders };
