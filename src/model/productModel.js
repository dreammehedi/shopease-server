const { Schema, model } = require("mongoose");
const productSchema = new Schema({}, { timestamps: true });

const AllProducts = model("AllProducts", productSchema);

module.exports = AllProducts;
