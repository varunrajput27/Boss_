import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: [String], required: true }, // array of image URLs or filenames
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: [String], required: true },
  bestSeller: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
