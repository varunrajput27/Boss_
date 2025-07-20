import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRoutes from './routes/orderRoute.js';

//
import path from 'path';
import { fileURLToPath } from 'url';
//

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(cors());  // 

app.use('/api', orderRoutes);



const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Route setup
app.use("/api/user", userRouter);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRouter);
app.use('/api', orderRoutes);


app.listen(port, () => console.log(`Server running on port: ${port}`));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));  // for serving images
app.use("/api/product", productRouter);

app.use("/api/product/add", productRouter);
///


app.use('/uploads', express.static('uploads'));
