import express from "express";
import upload from "../middleware/multer.js";
import { addProduct } from "../controllers/productController.js";
import Product from '../models/productModel.js';


const router = express.Router();

router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

router.get("/list", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error in /list:", error);  // <-- is line se pata chalega error
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/remove', async (req, res) => {
  const { id } = req.body;
  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product removed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


export default router;
