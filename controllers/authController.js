const register = async (req, res) => {
  res.status(200).json({ message: "Register works" });
};

const login = async (req, res) => {
  res.status(200).json({ message: "Login works" });
};
module.exports = { register, login };
