import mongoose from "mongoose";

const productScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  tags: {
    type: [String],
    default: [],
  },
});

const Product = mongoose.model("Product", productScheme);

export default Product;
