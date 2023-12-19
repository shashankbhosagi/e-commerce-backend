const listOfSellers = async (req, res) => {
  res.status(200).json({ message: "listOfSellers works" });
};

const singleSellerCatalog = async (req, res) => {
  res.status(200).json({ message: "singleSellerCatalog works" });
};

const createOrder = async (req, res) => {
  res.status(200).json({ message: "createOrder works" });
};

module.exports = { listOfSellers, singleSellerCatalog, createOrder };
