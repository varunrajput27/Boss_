import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PlaceOrder = () => {
  const { token, user } = useAuth(); 
  const navigate = useNavigate();
  const { cartItems, food_list, getTotalCartAmount, clearCart } = useContext(ShopContext);
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  const [fullName, setFullName] = useState(userInfo.name || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [mobile, setMobile] = useState('');
  const [method, setMethod] = useState('cod');

  // Refs for enter key navigation
  const emailRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const countryRef = useRef();
  const mobileRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter' && nextRef.current) {
      e.preventDefault();
      nextRef.current.focus();
    }
  };

  const handlePlaceOrder = async () => {
    if (!fullName || !email || !street || !city || !state || !zip || !country || !mobile) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    const orderItems = [];
    for (const itemId in cartItems) {
      const sizes = cartItems[itemId];
      for (const size in sizes) {
        const quantity = sizes[size];
        if (quantity > 0) {
          const product = food_list.find(p => String(p._id) === String(itemId));
          if (product) {
            orderItems.push({
              productId: itemId,
              name: product.name,
              price: product.price,
              quantity,
              image: product.image?.[0] || '',
            });
          }
        }
      }
    }

    const totalAmount = getTotalCartAmount();

    const orderData = {
      userId: userInfo._id,
      items: orderItems,
      totalAmount,
      deliveryDetails: {
        fullName,
        email,
        street,
        city,
        state,
        zip,
        country,
        mobile,
      },
      paymentMethod: method,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/order/place`, orderData);
      if (response.data.success) {
        clearCart();
        alert("Order placed successfully!");
        navigate('/orders');
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Order failed!");
    }
  };

  return (
    <div className='flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col w-full gap-4 sm:max-w-[480px]'>
        <div className='my-3 text-xl sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <input
          className='w-full px-4 py-2 border border-gray-300 rounded'
          type="text"
          placeholder='Full Name'
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, emailRef)}
        />
        <input
          ref={emailRef}
          className='w-full px-4 py-2 border border-gray-300 rounded'
          type="email"
          placeholder='Email Address'
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, streetRef)}
        />
        <input
          ref={streetRef}
          className='w-full px-4 py-2 border border-gray-300 rounded'
          type="text"
          placeholder='Street'
          value={street}
          onChange={e => setStreet(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, cityRef)}
        />
        <div className='flex gap-3'>
          <input
            ref={cityRef}
            className='w-full px-4 py-2 border border-gray-300 rounded'
            type="text"
            placeholder='City'
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, stateRef)}
          />
          <input
            ref={stateRef}
            className='w-full px-4 py-2 border border-gray-300 rounded'
            type="text"
            placeholder='State'
            value={state}
            onChange={e => setState(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, zipRef)}
          />
        </div>
        <div className='flex gap-3'>
          <input
            ref={zipRef}
            className='w-full px-4 py-2 border border-gray-300 rounded'
            type="number"
            placeholder='Zip Code'
            value={zip}
            onChange={e => setZip(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, countryRef)}
          />
          <input
            ref={countryRef}
            className='w-full px-4 py-2 border border-gray-300 rounded'
            type="text"
            placeholder='Country'
            value={country}
            onChange={e => setCountry(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, mobileRef)}
          />
        </div>
        <input
          ref={mobileRef}
          className='w-full px-4 py-2 border border-gray-300 rounded'
          type="text"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          maxLength={10}
          placeholder="Enter 10-digit Mobile Number"
        />
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHODS'} />
          <div className='flex flex-col gap-3 lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-600' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-600' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="RazorPay" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-600' : ''}`}></p>
              <p className='mx-4 text-sm font-medium text-gray-500'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full mt-8 text-center px-4 sm:px-0 pb-10'>
  <button
    onClick={handlePlaceOrder}
    className='w-full sm:w-auto px-8 py-3 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-all duration-200'
  >
    PLACE ORDER
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
