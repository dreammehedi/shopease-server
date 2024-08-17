const getAllProductsBrandCategoryNames = require("../helper/allProductsBrandCategory");
const AllProducts = require("../model/productModel");

// get all products
const getAllProducts = async (req, res, next) => {
  try {
    // brand name
    const findBrand = req.query.brandName || "";

    // category name
    const findCategory = req.query.categoryName || "";

    // price range
    const findPriceRange = req.query.priceRange
      ? JSON.parse(req.query.priceRange)
      : [0, 5000];

    // sorted by
    const sortedBy = req.query.sortedBy || "";

    // search products
    const searchProduct = req.query.searchProduct || "";

    // current page
    const currentPage = Number(req.query.currentPage) || 1;

    // filter data
    const filter = {
      productName: { $regex: searchProduct, $options: "i" },
      brandName: { $regex: findBrand, $options: "i" },
      categoryName: { $regex: findCategory, $options: "i" },
      price: { $gte: findPriceRange[0], $lte: findPriceRange[1] },
    };

    // sorted products
    let sortedCriteria = {};
    if (sortedBy === "priceAsc") {
      sortedCriteria = { price: 1 };
    } else if (sortedBy === "priceDesc") {
      sortedCriteria = { price: -1 };
    } else if (sortedBy === "dateAdded") {
      sortedCriteria = { createdAt: -1 };
    }

    // get all products
    const allProducts = await AllProducts.find(filter)
      .sort(sortedCriteria)
      .skip((currentPage - 1) * 6)
      .limit(6);
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
