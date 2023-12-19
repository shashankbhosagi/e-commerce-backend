const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { userName, password, userType } = req.body;

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ error: "username already exists" });
    }

    const newUser = new User({ userName, password, userType });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  res.status(200).json({ message: "Login works" });
};
module.exports = { register, login };
