import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, user } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const isCartEmpty = cartData.length === 0;

 const {loadingUser } = useContext(ShopContext);

const handleCheckout = () => {
  if (loadingUser) return;  // wait until user is loaded

  if (!user) {
    navigate('/login?redirect=/place-order');
  } else {
    navigate('/place-order');
  }
};


  return (
    <div className="border-t pt-14 px-4 sm:px-8 lg:px-16 bg-white min-h-screen">
      <div className="mb-10 text-center">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartData.map((item, index) => {
          const product = products.find((p) => p._id === item._id);
          if (!product) return null;

          return (
            <div
              key={index}
              className="grid items-center gap-4 border border-gray-200 rounded-lg p-4 grid-cols-[2fr_1fr_auto] sm:grid-cols-[3fr_1fr_auto] shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-20 h-20 object-cover rounded-lg border"
                  src={product.image[0]}
                  alt={product.name}
                />
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{currency} {product.price.toFixed(2)}</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs">
                      Size: {item.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="text-center">
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > 0) updateQuantity(item._id, item.size, val);
                  }}
                  className="w-16 sm:w-20 px-3 py-1 border rounded-md text-center focus:outline-none"
                />
              </div>

              {/* Remove Icon */}
              <div className="text-right">
                <img
                  src={assets.bin_icon}
                  alt="Remove"
                  className="w-5 cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          );
        })}

        {/* Empty Cart Message */}
        {isCartEmpty && (
          <p className="text-center text-gray-500 text-lg py-20">Your cart is currently empty.</p>
        )}
      </div>

      {/* Cart Summary and Checkout */}
      {!isCartEmpty && (
        <div className="flex justify-end mt-16">
          <div className="w-full sm:w-[400px] space-y-6">
            <CartTotal />

            <button
              onClick={handleCheckout}
              disabled={isCartEmpty}
              className={`w-full px-6 py-3 bg-yellow-500 text-black font-bold rounded-full shadow-md hover:bg-yellow-600 transition-all duration-300 ${
                isCartEmpty ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
