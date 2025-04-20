const { mongoose } = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connect Database..."))
  .catch((err) => console.error("Error : ", err));
