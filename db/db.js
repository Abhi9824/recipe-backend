const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGODB;

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI);
    if (connection) {
      console.log("Connected Successfully");
    } else {
      console.error("Database connection Error");
    }
  } catch (error) {
    throw new Error("Connection Failed");
  }
};

module.exports = { initializeDatabase };
