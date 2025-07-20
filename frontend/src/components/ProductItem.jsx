import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, image, price, showPrice = true }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover rounded-t-lg"
        />
        <div className="p-3">
          <h2 className="text-sm font-medium">{name}</h2>
          {showPrice && <p className="text-sm text-gray-700">${price}</p>}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
