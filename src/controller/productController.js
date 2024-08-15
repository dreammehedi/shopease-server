const AllProducts = require("../model/productModel");

// get all products
const getAllProducts = async (req, res) => {
  const allProducts = await AllProducts.find();
  res.send(allProducts);
};

module.exports = { getAllProducts };
