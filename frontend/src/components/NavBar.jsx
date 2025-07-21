import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const { openDrawerAfterLogin, setOpenDrawerAfterLogin } = useAuth();

  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const { getCartCount } = useContext(ShopContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(() => {
    const stored = localStorage.getItem('drawerVisible');
    return stored ? JSON.parse(stored) : false;
  });

  const loginMenuRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('drawerVisible', JSON.stringify(visible));
  }, [visible]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const openDrawer = query.get("openDrawer") === "true";

    if (openDrawer && user) {
      setDrawerOpen(true);
      localStorage.removeItem("drawerClosed"); 
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, user, navigate, location.pathname]);
  useEffect(() => {
    if (openDrawerAfterLogin) {
      setDrawerOpen(true);  // Drawer open karo
      setOpenDrawerAfterLogin(false); // Flag reset karo taaki next baar na chale
    }
  }, [openDrawerAfterLogin, setOpenDrawerAfterLogin]);

  // Click outside handler for login menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (loginMenuRef.current && !loginMenuRef.current.contains(event.target)) {
        setShowLoginMenu(false);
      }
    }

    if (showLoginMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginMenu]);

  const handleLogout = () => {
    setLoadingLogout(true);
    setTimeout(() => {
      logout();
      setDrawerOpen(false);
      navigate("/login?from=profile");
      setLoadingLogout(false);
    }, 2000);
  };

  return (
    <>
      {/* Promo Bar */}
      <div className="fixed top-0 left-0 w-full h-[40px] bg-[#2b2b2b] text-yellow-400 z-50 flex justify-between items-center px-4 text-[12px] font-medium">
        <p className="truncate">
          Welcome to <span className="font-bold">Boss Expert</span> – Your Online Shop!
        </p>
        <p className="truncate cursor-pointer">
          <span className="font-bold">📞+91-558-669-447</span>
        </p>
      </div>

      {/* Main Navbar */}
      <div className="fixed top-[40px] left-0 w-full z-40 bg-white bg-opacity-95 text-yellow-600 shadow-md px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-yellow-600">
          <span className="text-yellow-500">Boss</span>{' '}
          <span className="text-yellow-700">Expert</span>
        </Link>

        <ul className="hidden sm:flex gap-6 text-sm font-medium">
          {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
            <NavLink
              key={item}
              to={`/${item === 'HOME' ? '' : item.toLowerCase()}`}
              className={({ isActive }) =>
                `hover:text-yellow-900 transition-colors duration-300 ${isActive ? 'text-yellow-900 font-semibold' : ''}`
              }
            >
              {item}
            </NavLink>
          ))}
        </ul>

        <div className="flex items-center gap-6 relative">
          <div className="relative flex items-center">
            {!user ? (
              <>
                <button
                  onClick={() => setShowLoginMenu(prev => !prev)}
                  aria-label="User Login Menu"
                  className="focus:outline-none"
                >
                  <svg className="w-7 h-7 hover:text-yellow-900 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </button>
                {showLoginMenu && (
  <div
    className="absolute right-0 z-10 w-36 bg-yellow-50 rounded shadow-md text-sm text-gray-800"
    style={{ top: '40px' }}  // icon height ke niche thoda space dena
  >
    <Link
      to="/login"
      onClick={() => setShowLoginMenu(false)}
      className="block px-4 py-2 hover:text-red-600"
    >
      User Login
    </Link>

   <a
  href={import.meta.env.VITE_ADMIN_URL}  // Or whatever your admin panel's login page is
  target="_blank"
  rel="noopener noreferrer"
  className="block px-4 py-2 hover:text-red-600"
  onClick={() => setShowLoginMenu(false)}
>
  Admin Login
</a>

  </div>
)}
              </>
            ) : (
              <button
                onClick={() => setDrawerOpen(true)}
                aria-label="Open Profile Drawer"
                className="hover:text-yellow-900 transition-colors duration-300"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </button>
            )}
          </div>

          <Link to="/cart" className="relative flex items-center" aria-label="Shopping Cart">
            <svg className="w-7 h-7 hover:text-yellow-900 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45c-.16.29-.25.62-.25.96 0 1.11.89 2 2 2h9v-2h-9l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.3.12-.47 0-.55-.45-1-1-1h-15.59l-.94-2zm-2 16c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2zm14 0c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2z" />
            </svg>
            <span className="absolute -right-2 -bottom-2 w-4 h-4 bg-yellow-400 text-black text-[10px] rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </Link>

          {/* Hamburger for mobile */}
          <button
            onClick={() => setVisible(true)}
            className="sm:hidden relative z-50 focus:outline-none"
            aria-label="Open Mobile Menu"
          >
            <svg
              className="w-7 h-7 hover:text-yellow-900 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>


      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 bottom-0 bg-white bg-opacity-95 z-50 transition-all duration-300 ${visible ? 'w-full' : 'w-0 overflow-hidden'}`}>
        <div className="flex flex-col text-yellow-600 pt-16 px-6">
          <div onClick={() => setVisible(false)} className="flex items-center gap-3 cursor-pointer mb-4">
            <svg className="w-4 h-4 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.707 14.707a1 1 0 01-1.414 0L4.586 11l3.707-3.707a1 1 0 011.414 1.414L7.414 11l2.293 2.293a1 1 0 010 1.414z" />
            </svg>
            <p>Back</p>
          </div>
 {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
  <NavLink
    key={item}
    to={`/${item === 'HOME' ? '' : item.toLowerCase()}`}
    onClick={() => setVisible(false)}
    className={({ isActive }) =>
      `block w-full py-3 px-4 border-b border-yellow-400 font-medium ${
        isActive
          ? 'bg-yellow-100 text-yellow-900' // 🔥 Active tab ka background yellow-ish
          : 'bg-transparent text-yellow-600'
      } hover:bg-yellow-200`
    }
  >
    {item}
  </NavLink>
))}



        </div>
      </div>

      {/* Drawer - Right Side Profile Panel */}
      {drawerOpen && (
       <div
  className={`fixed top-6 right-0 w-72 bg-white shadow-lg z-50 p-4 transition-transform duration-300 transform
    ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
  style={{ height: 'calc(100vh - 3rem)', borderRadius: '10px 0 0 10px' }}
>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Welcome</h3>
            <button
              onClick={() => {
                setDrawerOpen(false);
                localStorage.setItem("drawerClosed", "true");
                setVisible(false);
              }}
              aria-label="Close Profile Drawer"
              className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-bold text-xl"
            >
              ❌
            </button>
          </div>
          <p className="text-sm font-semibold text-gray-700">{user?.name || user?.fullname || 'No Name Found'}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>

          <div className="mt-4 space-y-3">
            <Link to="/orders" onClick={() => setDrawerOpen(false)} className="block px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 font-medium">
              My Orders
            </Link>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-semibold"
            >
              {loadingLogout ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      )}

      {/* Placeholder for Navbar height */}
      <div className="h-[108px] sm:h-[112px]"></div>
    </>
  );
};

export default NavBar;


