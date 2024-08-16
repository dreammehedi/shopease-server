const AllProducts = require("../model/productModel");

// get all products
const getAllProducts = async (req, res) => {
  const currentPage = Number(req.query.currentPage);
  console.log(currentPage);

  const allProducts = await AllProducts.find()
    .skip(currentPage * 6)
    .limit(6);
  const allProductsCount = await AllProducts.estimatedDocumentCount();

  res.send({
    success: true,
    message: "All Products Geted Successfully.",
    totalProductsCount: allProductsCount,
    currentProductShowingCount: allProducts.length,
    payload: allProducts,
  });
};

module.exports = { getAllProducts };
