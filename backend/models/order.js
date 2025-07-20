import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  deliveryDetails: {
    fullName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    mobile: String,
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'razorpay', 'cod'],
    default: 'cod',
  },
  status: {
    type: String,
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
