const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const auth = require("./routes/auth");
const buyer = require("./routes/buyer");
const seller = require("./routes/seller");
const cors = require("cors");
const connectDB = require("./db/connect");

//middelware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", auth); //* Done *//
app.use("/api/buyer", buyer);
app.use("/api/seller", seller);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
