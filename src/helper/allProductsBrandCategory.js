const getAllProductsBrandCategoryNames = (allProductsData, findData) => {
  // find all products brand and category names
  const allProductsBrandCategoryNames = allProductsData.map(
    (findDataNames) => findDataNames[findData]
  );
  // unique brand and category names
  const uniqueBrandCategoryNames = [...new Set(allProductsBrandCategoryNames)];
  return uniqueBrandCategoryNames;
};

module.exports = getAllProductsBrandCategoryNames;
