const User = require("../models/User");
const getToken = require("../utils/helper");

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
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!user || !password) {
      res.status(401).json({ error: "Invalid Username or Password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }

    const token = await getToken(user);
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;

    return res.status(200).json({ userToReturn });
  } catch (error) {
    console.log("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { register, login };
