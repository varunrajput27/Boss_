import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setToken }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className=" fixed top-0 left-0 z-50 w-full bg-white shadow-md">
        <div className="flex items-center justify-between py-4 px-6 md:px-12">
          {/* Brand Name */}
          <Link to="/" className="text-2xl font-extrabold text-gray-800 tracking-wide">
            Boss <span className="text-black">Expert</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            
            <button
              onClick={() => setToken("")}
              className="ml-6 px-6 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-200"
            >
              Logout
            </button>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <div className="flex flex-col p-6 space-y-6">
          <Link
            to="/list"
            onClick={() => setIsOpen(false)}
            className="text-gray-800 hover:text-black text-lg font-semibold"
          >
            List
          </Link>
          <Link
            to="/add"
            onClick={() => setIsOpen(false)}
            className="text-gray-800 hover:text-black text-lg font-semibold"
          >
            Add
          </Link>
          <Link
            to="/orders"
            onClick={() => setIsOpen(false)}
            className="text-gray-800 hover:text-black text-lg font-semibold"
          >
            Orders
          </Link>

          <button
            onClick={() => {
              setToken("");
              setIsOpen(false);
            }}
            className="mt-auto px-6 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
