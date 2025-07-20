import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-20 px-6 md:px-12 bg-gradient-to-b from-white via-gray-50 to-white py-12 rounded-3xl shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 opacity-25 blur-3xl -z-10" />

      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          <span className="text-gray-900">Best</span>{' '}
          <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Seller
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-gray-700 text-base sm:text-lg font-medium tracking-wide">
          ✨ Discover the most loved products by our community — hand-picked for quality, style, and satisfaction.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {bestSeller.map((item, index) => (
          <motion.div
            key={item._id || index}
            whileHover={{ scale: 1.07, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white rounded-2xl p-5 cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-300"
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              showPrice={false}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BestSeller;
