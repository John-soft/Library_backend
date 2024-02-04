const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB connection successful");
  } catch (error) {
    console.log("Database Error");
  }
};

module.exports = connectDB;
