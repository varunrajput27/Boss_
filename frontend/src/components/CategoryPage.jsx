import React from "react";

const categories = [
  {
    name: "Men Shoes",
    image: "https://plus.unsplash.com/premium_photo-1670984281009-863453504c52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVuJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Women Shoes",
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Watches",
    image: "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2F0Y2hlc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Purses",
    image: "https://images.unsplash.com/photo-1705909237050-7a7625b47fac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHB1cnNlfGVufDB8fDB8fHww",
  },
  {
    name: "Headphones",
    image: "https://plus.unsplash.com/premium_photo-1679513691641-9aedddc94f96?q=80&w=813&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Men Undergarments",
    image: "https://images.unsplash.com/photo-1640765937555-6f413ed1d936?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwdW5kZXJ3ZWFyfGVufDB8fDB8fHww",
  },
  {
    name: "Birthday Special",
    image: "https://media.istockphoto.com/id/1892128639/photo/open-gifts-box-present-with-balloons-and-confetti-3d-render.webp?a=1&b=1&s=612x612&w=0&k=20&c=kQEgP4Ut4IBVrvcJwpiQw9gh6v9r1kRBgv6alyp7sYA=",
  },
  {
    name: "Unique Collection",
    image: "https://images.unsplash.com/photo-1646489471015-352148a0e419?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVuaXF1ZSUyMGNvbGVsY3Rpb24lMjBjbG90aGVzfGVufDB8fDB8fHww",
  },
];

const CategoryPage = () => {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white min-h-screen py-14 px-6 md:px-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 tracking-tight">
        <span className="text-gray-900">Shop by</span>{' '}
        <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          Category
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-56 sm:h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 text-center">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
