import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Filter shoes separately for shoes section
  const shoesProducts = products.filter((item) => item.category === "Shoes");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-white text-yellow-900">
      {/* Filter Options */}
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 my-2 text-xl cursor-pointer select-none text-yellow-900"
          >
            FILTERS
            <img
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
              src={assets.dropdown_icon}
              alt="Dropdown"
            />
          </p>

          <div
            className={`border border-yellow-500 bg-white pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block rounded-md shadow-sm`}
          >
            <p className="mb-3 text-sm font-semibold text-yellow-900">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-yellow-900">
              {["Men", "Women", "Kids"].map((cat) => (
                <label
                  key={cat}
                  className="flex gap-2 cursor-pointer hover:text-yellow-500 transition-colors"
                >
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                    checked={category.includes(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div
            className={`border border-yellow-500 bg-white pl-5 py-3 my-5 ${
              showFilter ? "" : "hidden"
            } sm:block rounded-md shadow-sm`}
          >
            <p className="mb-3 text-sm font-semibold text-yellow-900">TYPES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-yellow-900">
              {["Topwear", "Bottomwear", "Winterwear"].map((subCat) => (
                <label
                  key={subCat}
                  className="flex gap-2 cursor-pointer hover:text-yellow-500 transition-colors"
                >
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    value={subCat}
                    onChange={toggleSubCategory}
                    checked={subCategory.includes(subCat)}
                  />
                  {subCat}
                </label>
              ))}
            </div>
          </div>

          <button
            className={`px-4 py-2 mt-1 text-white bg-yellow-500 rounded hover:bg-yellow-900 transition-colors ${
              showFilter ? "block" : "hidden"
            } sm:block w-full`}
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        {/* Products Section */}
        <div className="flex-1 text-black">
          <div className="flex justify-between items-center mb-6 text-2xl font-semibold">
            <Title text1={"ALL"} text2={"COLLECTIONS"} />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="px-3 py-2 text-base border border-yellow-500 rounded text-yellow-900"
              defaultValue="relevant"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-8">
            {filterProducts.length === 0 && (
              <p className="text-center text-gray-500 col-span-full">
                No products found.
              </p>
            )}
            {filterProducts.map((item, index) => (
              <div
                key={item._id || index}
                className="cursor-pointer hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105 transition-transform duration-300 rounded"
              >
                <ProductItem
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              </div>
            ))}
          </div>

          {/* Shoes Section */}
          {shoesProducts.length > 0 && (
            <div className="mt-16">
              <Title text1={"SHOES"} text2={"COLLECTION"} />
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-8 mt-6">
                {shoesProducts.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="cursor-pointer hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105 transition-transform duration-300 rounded"
                  >
                    <ProductItem
                      id={item._id}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
