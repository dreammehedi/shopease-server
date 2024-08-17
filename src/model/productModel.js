const { Schema, model } = require("mongoose");
const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    productImage: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    brandName: { type: String, required: true },
    categoryName: { type: String, required: true },
    ratings: { type: Number, required: true }, 
    color: { type: String, required: true },
    stockAvailability: { type: Boolean, required: true, default: true }, 
    warranty: { type: String, required: true },
    createdAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

const AllProducts = model("AllProducts", productSchema);

module.exports = AllProducts;
