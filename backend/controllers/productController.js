import productModel from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const images = [];
    ["image1", "image2", "image3", "image4"].forEach((field) => {
      if (req.files[field]) {
        images.push(req.files[field][0].filename);
      }
    });

    const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];

    const newProduct = new productModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      image: images,
      category: req.body.category,
      subCategory: req.body.subCategory,
      sizes: sizes,
      bestSeller: req.body.bestSeller === 'true',
      date: Date.now(),
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};
export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("List Products Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Remove Product Error:", error);
    res.status(500).json({ success: false, message: "Failed to remove product" });
  }
};
