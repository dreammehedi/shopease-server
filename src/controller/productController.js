const getAllProductsBrandCategoryNames = require("../helper/allProductsBrandCategory");
const AllProducts = require("../model/productModel");

// get all products
const getAllProducts = async (req, res, next) => {
  try {
    const searchProduct = req.query.searchProduct || "";

    const currentPage = Number(req.query.currentPage) || 1;
    const limit = 6;

    // filter data
    const filter = {
      productName: { $regex: searchProduct, $options: "i" },
    };

    // get all products
    const allProducts = await AllProducts.find(filter)
      .skip((currentPage - 1) * limit)
      .limit(limit);
    // console.log(allProducts, "all product");
    // get all products count
    const allProductsCount = await AllProducts.estimatedDocumentCount();

    // get all products data
    const allProductsData = await AllProducts.find();

    // maximum price for project
    const maxPrice = await AllProducts.aggregate([
      {
        $group: {
          _id: null,
          maxPrice: { $max: "$price" },
        },
      },
    ]);

    // get brand names of all products
    const uniqueBrandNames = getAllProductsBrandCategoryNames(
      allProductsData,
      "brandName"
    );

    // get category of all products
    const uniqueCategory = getAllProductsBrandCategoryNames(
      allProductsData,
      "categoryName"
    );

    // send client side request data
    res.send({
      success: true,
      message: "All Products retrieved successfully.",
      totalProductsCount: allProductsCount,
      currentProductShowingCount: allProducts.length,
      allProductsMaxPrice: maxPrice[0].maxPrice,
      uniqueBrandNames: uniqueBrandNames,
      uniqueCategory: uniqueCategory,
      payload: allProducts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllProducts };
