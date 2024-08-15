const express = require("express");
const { getAllProducts } = require("../controller/productController");
const productRouter = express.Router();

productRouter.get("/products", getAllProducts);

module.exports = productRouter;
