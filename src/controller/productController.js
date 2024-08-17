const getAllProductsBrandCategoryNames = require("../helper/allProductsBrandCategory");
const AllProducts = require("../model/productModel");

// get all products
const getAllProducts = async (req, res, next) => {
  try {
    const findBrand = req.query.brandName || "";
    const findCategory = req.query.categoryName || "";
    const findPriceRange = req.query.priceRange
      ? JSON.parse(req.query.priceRange)
      : [0, 5000];
    const sortedBy = req.query.sortedBy || "";
    const searchProduct = req.query.searchProduct || "";
    const currentPage = Number(req.query.currentPage) || 1;

    const filter = {
      productName: { $regex: searchProduct, $options: "i" },
      brandName: { $regex: findBrand, $options: "i" },
      categoryName: { $regex: findCategory, $options: "i" },
      price: { $gte: findPriceRange[0], $lte: findPriceRange[1] },
    };

    let sortedCriteria = {};
    if (sortedBy === "priceAsc") {
      sortedCriteria = { price: 1 };
    } else if (sortedBy === "priceDesc") {
      sortedCriteria = { price: -1 };
    } else if (sortedBy === "dateAdded") {
      sortedCriteria = { createdAt: -1 };
    }

    // Parallelize multiple database queries
    const [allProducts, allProductsCount, allProductsData, maxPrice] =
      await Promise.all([
        AllProducts.find(filter)
          .sort(sortedCriteria)
          .skip((currentPage - 1) * 6)
          .limit(6),
        AllProducts.countDocuments(filter),
        AllProducts.find(), // Might be optimized to avoid fetching all documents
        AllProducts.aggregate([
          { $group: { _id: null, maxPrice: { $max: "$price" } } },
        ]),
      ]);

    const uniqueBrandNames = getAllProductsBrandCategoryNames(
      allProductsData,
      "brandName"
    );
    const uniqueCategory = getAllProductsBrandCategoryNames(
      allProductsData,
      "categoryName"
    );

    res.send({
      success: true,
      message: "All Products retrieved successfully.",
      totalProductsCount: allProductsCount,
      currentProductShowingCount: allProducts.length,
      allProductsMaxPrice: maxPrice[0]?.maxPrice || 0,
      uniqueBrandNames: uniqueBrandNames,
      uniqueCategory: uniqueCategory,
      payload: allProducts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllProducts };
