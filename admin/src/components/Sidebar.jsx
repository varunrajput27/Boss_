import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const navLinks = [
    {
      to: "/add",
      label: "Add Items",
      icon: assets.add_icon,
    },
    {
      to: "/list",
      label: "List Items",
      icon: assets.parcel_icon,
    },
    {
      to: "/orders",
      label: "View Orders",
      icon: assets.order_icon,
    },
  ];

  return (
    <aside className="w-[18%] min-h-screen border-r bg-white p-4 hidden md:block">
      <div className="flex flex-col gap-4 pt-16 text-sm">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-black text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <img className="w-5 h-5" src={link.icon} alt={link.label} />
            <span className="text-base font-medium hidden lg:block">
              {link.label}
            </span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
