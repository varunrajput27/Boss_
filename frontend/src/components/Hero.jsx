import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/collection');  // 👈 Navigate to collection page
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row bg-white min-h-[85vh]">
      {/* Left Side - Text */}
      <div className="flex flex-col justify-center items-start w-full sm:w-1/2 px-6 sm:px-12 py-12 text-black">
        <div className="mb-4 flex items-center gap-3">
          <div className="w-10 h-[2px] bg-yellow-900"></div>
          <span className="text-sm font-medium text-yellow-500 tracking-wide">
            OUR BEST SELLERS
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Discover the <span className="text-yellow-900">Latest Arrivals</span>
        </h1>

        <p className="text-black/70 text-sm md:text-base mb-8 max-w-md">
          Handpicked styles from our premium collection. Elevate your wardrobe with bold, refined looks only at <span className="font-semibold text-black">Boss Expert</span>.
        </p>

        <button
          onClick={handleShopNowClick}
          className="bg-yellow-500 hover:bg-yellow-900 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md"
        >
          Shop Now
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="w-full sm:w-1/2">
        <img
          src="https://img.freepik.com/premium-photo/abstract-portrait-background-with-black-male-model-dressed-black-yellow-clothing-fashion-banner_948175-325.jpg"
          alt="Latest Collection"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
