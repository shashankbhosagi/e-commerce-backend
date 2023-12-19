const createCatalog = async (req, res) => {
  res.status(200).json({ message: "createCatalog works" });
};

const currentOrders = async (req, res) => {
  res.status(200).json({ message: "currentOrders works" });
};

module.exports = { createCatalog, currentOrders };
