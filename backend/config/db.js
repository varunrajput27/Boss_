import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Local MongoDB
// const MONGODB_URL_LOCAL = "mongodb://127.0.0.1:27017/BossExpert";

// MongoDB Atlas 
const mongURL = process.env.MONGODB_URL;

mongoose.connect(mongURL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const db = mongoose.connection;

db.on('disconnected', () => {
  console.log("MongoDB is disconnected");
});

db.on('error', () => {
  console.log("Error with MongoDB");
});

export default db;
