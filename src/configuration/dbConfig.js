const mongoose = require("mongoose");
const { mongoDbURI } = require("../secure");

const connectDb = async (options = {}) => {
  try {
    await mongoose.connect(mongoDbURI, options);
    console.log("Connected to MongoDB server.");

    mongoose.connection.on("error", () => {
      console.error("MongoDB connection error: ", error);
    });
  } catch (error) {
    console.error(`Could not connect mongoDB server: ${error.message}`);
  }
};

module.exports = connectDb;
