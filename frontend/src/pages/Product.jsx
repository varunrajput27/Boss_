// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';

// const Product = () => {
//     useEffect(() => {
//       window.scrollTo(0, 0);
//     }, []);
  
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [size, setSize] = useState('');
//   const [latestProducts, setLatestProducts] = useState([]);

//   useEffect(() => {
//     const foundProduct = products.find((item) => item._id === productId);
//     if (foundProduct) {
//       setProductData(foundProduct);
//       setImage(foundProduct.image?.[0] || '');
//     }
//   }, [productId, products]);

//   useEffect(() => {
//     setLatestProducts(products.slice(0, 10));
//   }, [products]);

//   if (!productData) {
//     return <div className="p-10 text-center text-gray-400">Loading product...</div>;
//   }

//   return (
//     <div className="pt-10 border-t-2 transition-opacity duration-500 ease-in">
//       {/* Product Section */}
//       <div className="flex flex-col gap-12 sm:flex-row">
//         {/* Images */}
//         <div className="flex flex-col-reverse sm:flex-row flex-1 gap-3">
//           {/* Thumbnails */}
//           <div
//             className="flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-auto sm:w-[18%] w-full"
//             style={{ scrollbarWidth: 'thin', scrollbarColor: '#f59e0b transparent' }}
//           >
//             {productData.image?.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 onClick={() => setImage(img)}
//                 className={`cursor-pointer rounded-md border p-1 sm:mb-2 w-[24%] sm:w-full transition-all ${
//                   image === img ? 'border-orange-500' : 'border-gray-300'
//                 }`}
//                 alt={`Thumbnail ${index + 1}`}
//               />
//             ))}
//           </div>

//           {/* Main Image */}
//           <div className="w-full sm:w-[82%]">
//             <img src={image} className="w-full h-auto rounded-lg shadow" alt="Main product" />
//           </div>
//         </div>

//         {/* Info */}
//         <div className="flex-1">
//           <h1 className="text-2xl font-semibold mb-2">{productData.name}</h1>

//           {/* Ratings */}
//           <div className="flex items-center gap-1 mb-4">
//             {[...Array(4)].map((_, i) => (
//               <img key={i} src={assets.star_icon} alt="★" className="w-4" />
//             ))}
//             <img src={assets.star_dull_icon} alt="☆" className="w-4" />
//             <p className="text-sm text-gray-500 pl-2">(122)</p>
//           </div>

//           {/* Price */}
//           <p className="text-3xl font-medium text-black">{currency}{productData.price}</p>

//           {/* Description */}
//           <p className="mt-4 text-gray-600 md:w-4/5 leading-relaxed">{productData.description}</p>

//           {/* Size Selection */}
//           <div className="my-8">
//             <p className="mb-2 font-medium">Select Size:</p>
//             <div className="flex gap-2 flex-wrap">
//               {productData.sizes?.map((s, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSize(s)}
//                   className={`border px-4 py-2 rounded-md transition-all ${
//                     s === size
//                       ? 'bg-orange-500 text-white border-orange-500'
//                       : 'bg-gray-100 text-gray-700'
//                   }`}
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Add to Cart */}
//           <button
//             onClick={() => addToCart(productData._id, size)}
//             className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm rounded transition"
//           >
//             ADD TO CART
//           </button>

//           {/* Offers */}
//           <hr className="mt-8 sm:w-4/5" />
//           <ul className="mt-5 text-sm text-gray-500 space-y-1">
//             <li>✅ Guaranteed 100% Authentic – Shop with Confidence!</li>
//             <li>💰 Cash on Delivery – Pay at Your Doorstep!</li>
//             <li>🔁 Hassle-Free Returns – 10 Days, No Questions Asked!</li>
//           </ul>
//         </div>
//       </div>

//       {/* Description + Reviews */}
//       <div className="mt-20">
//         <div className="flex border-b text-sm">
//           <b className="px-5 py-3 border-t border-l border-r bg-gray-100">Description</b>
//           <p className="px-5 py-3 border-t border-r text-gray-600">Reviews (122)</p>
//         </div>
//         <div className="p-6 text-sm text-gray-600 border">
//           <p className="mb-4">
//             Elevate your style with our meticulously crafted Trendify products. Designed for elegance and comfort, made from premium materials ensuring durability.
//           </p>
//           <p>
//             Perfect for both daily wear and special occasions, this versatile piece will upgrade any wardrobe. Its timeless appeal and flawless fit make it a must-have.
//           </p>
//         </div>
//       </div>

//       {/* Related Products */}
//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image?.[0] || '');
    }
  }, [productId, products]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  if (!productData) {
    return <div className="p-10 text-center text-gray-400">Loading product...</div>;
  }

  return (
    <div className="pt-10 border-t-2 transition-opacity duration-500 ease-in">
      {/* Product Section */}
      <div className="flex flex-col gap-12 sm:flex-row">
        {/* Images */}
        <div className="flex flex-col-reverse sm:flex-row flex-1 gap-3">
          {/* Thumbnails */}
          <div
            className="flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-auto sm:w-[18%] w-full"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#f59e0b transparent' }}
          >
            {productData.image?.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setImage(img)}
                className={`cursor-pointer rounded-md border p-1 sm:mb-2 w-[24%] sm:w-full transition-all ${
                  image === img ? 'border-orange-500' : 'border-gray-300'
                }`}
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[82%]">
            <img src={image} className="w-full h-auto rounded-lg shadow" alt="Main product" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-2">{productData.name}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="★" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="☆" className="w-4" />
            <p className="text-sm text-gray-500 pl-2">(122)</p>
          </div>

          {/* Price */}
          <p className="text-3xl font-medium text-black">{currency}{productData.price}</p>

          {/* Description */}
          <p className="mt-4 text-gray-600 md:w-4/5 leading-relaxed">{productData.description}</p>

          {/* Size Selection */}
          <div className="my-8">
            <p className="mb-2 font-medium">Select Size:</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes?.map((s, index) => (
                <button
                  key={index}
                  onClick={() => setSize(s)}
                  className={`border px-4 py-2 rounded-md transition-all ${
                    s === size
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6 flex items-center gap-4">
            <p className="font-medium">Quantity:</p>
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200"
              >
                –
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            disabled={!size}
            onClick={() => addToCart(productData._id, size, quantity)}
            className={`px-8 py-3 text-sm rounded transition text-white ${
              size ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            ADD TO CART
          </button>

          {/* Offers */}
          <hr className="mt-8 sm:w-4/5" />
          <ul className="mt-5 text-sm text-gray-500 space-y-1">
            <li>✅ Guaranteed 100% Authentic – Shop with Confidence!</li>
            <li>💰 Cash on Delivery – Pay at Your Doorstep!</li>
            <li>🔁 Hassle-Free Returns – 10 Days, No Questions Asked!</li>
          </ul>
        </div>
      </div>

      {/* Description + Reviews */}
      <div className="mt-20">
        <div className="flex border-b text-sm">
          <b className="px-5 py-3 border-t border-l border-r bg-gray-100">Description</b>
          <p className="px-5 py-3 border-t border-r text-gray-600">Reviews (122)</p>
        </div>
        <div className="p-6 text-sm text-gray-600 border">
          <p className="mb-4">
            Elevate your style with our meticulously crafted Trendify products. Designed for elegance and comfort, made from premium materials ensuring durability.
          </p>
          <p>
            Perfect for both daily wear and special occasions, this versatile piece will upgrade any wardrobe. Its timeless appeal and flawless fit make it a must-have.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;

