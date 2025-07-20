import express from 'express';
import Order from '../models/order.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Place order
router.post('/place', async (req, res) => {
  try {
    const { userId, items, totalAmount, deliveryDetails, paymentMethod } = req.body;
    if (!userId || !items || !totalAmount || !deliveryDetails || !paymentMethod) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const newOrder = new Order({ userId, items, totalAmount, deliveryDetails, paymentMethod });
    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ success: false, message: "Order failed" });
  }
});

// Get my orders
// admin-only route to fetch all orders
router.get('/allorders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // latest orders pehle
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch all orders' });
  }
});

// Get orders of logged-in user
router.get('/myorders', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;  // authMiddleware me user info aani chahiye
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching my orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch your orders' });
  }
});



export default router;
