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

const singleSellerCatalog = async (req, res) => {
  res.status(200).json({ message: "singleSellerCatalog works" });
};

const createOrder = async (req, res) => {
  res.status(200).json({ message: "createOrder works" });
};

module.exports = { listOfSellers, singleSellerCatalog, createOrder };
