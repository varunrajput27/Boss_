import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const latest = products
      .filter((item) => !item.bestseller)
      
      .slice(0, 10);
    setLatestProducts(latest);
  }, [products]);

  return (
    <div className="my-20 px-6 sm:px-12 md:px-20 bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-lg">
      <div className="py-10 text-center">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="max-w-xl mx-auto text-gray-700 text-base sm:text-lg mt-3 font-medium tracking-wide">
          Step into a world of style with our newest collections – curated just for you.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8"
      >
        {latestProducts.map((item, index) => (
          <motion.div
            key={item._id || index}
            whileHover={{ scale: 1.08, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-white rounded-xl p-4 cursor-pointer shadow-md hover:shadow-xl transform transition-transform duration-300"
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

export default LatestCollection;
