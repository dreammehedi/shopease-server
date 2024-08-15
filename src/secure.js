require("dotenv").config();
const currentPort = process.env.PORT || 5000;
const mongoDbURI = process.env.MONGODB_URI;
module.exports = { currentPort, mongoDbURI };
