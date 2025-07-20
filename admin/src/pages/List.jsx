import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Your currency formatting function, adjust or import as needed
const currency = (amount) => `₹${amount.toFixed(2)}`;

const List = ({ token }) => {
  const [listProducts, setListProducts] = useState([]);

  const fetchListProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/product/list`);
      if (response.data.success) {
        setListProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_LINK}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchListProducts(); // refresh list after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product");
    }
  };

  useEffect(() => {
    fetchListProducts();
  }, []);

  return (
    <div className="pt-16 max-w-5xl mx-auto px-4">
      {/* Desktop Table Header */}
      <div className="hidden md:grid grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.2fr] items-center py-2 px-4 bg-gray-200 font-semibold text-sm text-gray-700 border rounded-t-md">
        {/* <span>Image</span> */}
        <span>Name</span>
        <span>Description</span>
        <span>Category</span>
        <span>Subcategory</span>
        <span>Price</span>
        <span>Action</span>
      </div>

      {listProducts.length === 0 && (
        <p className="text-center py-6 text-gray-600">No products found.</p>
      )}

      {listProducts.map((item) => (
        <div
          key={item._id}
          className="grid md:grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.2fr] grid-cols-1 md:items-center gap-4 md:gap-2 py-4 px-4 border-b bg-white rounded md:rounded-none shadow-sm md:shadow-none"
        >
          {/* Mobile version */}
          <div className="md:hidden space-y-2">
            {/* Uncomment and use if you want to show image */}
            {/* <img
              src={`${backendUrl}/uploads/${item.image[0]}`}
              alt="Product"
              className="w-24 h-24 object-cover rounded border"
            /> */}
            <div>
              <p className="font-semibold text-lg truncate">{item.name}</p>
              <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
              <p className="text-sm text-gray-500">
                <b>Category:</b> {item.category}
              </p>
              <p className="text-sm text-gray-500">
                <b>Subcategory:</b> {item.subCategory}
              </p>
              <p className="text-sm font-semibold">{currency(item.price)}</p>
              <button
                onClick={() => removeProduct(item._id)}
                className="mt-3 w-full px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Desktop version */}
          {/* <img src={`${backendUrl}/uploads/${item.image[0]}`} alt={item.name}
            className="w-12 h-12 object-cover rounded hidden md:block"
          /> */}
          <p className="hidden md:block text-left truncate">{item.name}</p>
          <p className="hidden md:block text-left text-ellipsis overflow-hidden line-clamp-2">
            {item.description}
          </p>
          <p className="hidden md:block">{item.category}</p>
          <p className="hidden md:block">{item.subCategory}</p>
          <p className="hidden md:block font-semibold">{currency(item.price)}</p>
          <button
            onClick={() => removeProduct(item._id)}
            className="hidden md:block text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            aria-label={`Delete ${item.name}`}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
