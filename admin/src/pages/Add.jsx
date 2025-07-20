import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      images.forEach((img, i) => img && formData.append(`image${i + 1}`, img));
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestSeller", bestSeller);

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const resetForm = () => {
    setImages([null, null, null, null]);
    setName("");
    setDescription("");
    setCategory("");
    setSubCategory("");
    setPrice("");
    setSizes([]);
    setBestSeller(false);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-4xl mx-auto p-4 sm:p-6 flex flex-col gap-6"
    >
      <div className="pt-16">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Upload Product Images</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <label key={idx} htmlFor={`image${idx}`}>
              <img
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt="Upload"
                className="w-full h-24 sm:h-28 object-cover border-2 border-dashed border-gray-400 rounded cursor-pointer"
              />
              <input
                type="file"
                id={`image${idx}`}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(idx, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2">Product Name</label>
        <input
          type="text"
          value={name}
          required
          placeholder="Enter product name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded text-base sm:text-lg"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2">Product Description</label>
        <textarea
          value={description}
          required
          placeholder="Enter product description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded min-h-[100px] text-base sm:text-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded text-base sm:text-lg"
            required
          >
            <option value="">Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2">Sub Category</label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded text-base sm:text-lg"
            required
          >
            <option value="">Select</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2">Price (₹)</label>
          <input
            type="number"
            value={price}
            required
            placeholder="Enter price"
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded text-base sm:text-lg"
          />
        </div>
      </div>

      <div>
        <p className="mb-3 text-lg font-semibold">Available Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              className={`px-4 py-1 rounded border cursor-pointer select-none ${
                sizes.includes(size)
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          id="bestSeller"
          checked={bestSeller}
          onChange={() => setBestSeller((prev) => !prev)}
          className="w-4 h-4 cursor-pointer"
        />
        <label htmlFor="bestSeller" className="text-sm select-none cursor-pointer">
          Mark as Best Seller
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Add Product
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Add;
