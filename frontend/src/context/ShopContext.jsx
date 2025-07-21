// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import { food_list } from '../assets/assets';

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const [search, setSearch] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [user, setUser] = useState(null);  // user state
//   const [loadingUser, setLoadingUser] = useState(true); // loading flag for user

//   const navigate = useNavigate();

//   const currency = "₹";
//   const delivery_fee = 10;

//   const clearCart = () => {
//     setCartItems({});
//   };

//   const [products, setProducts] = useState(food_list);

//   // Load cart and user from localStorage on mount
//   useEffect(() => {
//     const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
//     if (storedCartItems) {
//       setCartItems(storedCartItems);
//     }

//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//     setLoadingUser(false);  // user loading done
//   }, []);

//   // Save cartItems to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Save or remove user to/from localStorage
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

// const addToCart = (productId, size, quantity = 1) => {
//     if (!size) {
//       toast.error("Please Select a Size");
//       return;
//     } else {
//       toast.success("Item Added To The Cart");
//     }

//     let cartData = structuredClone(cartItems);

//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }

//     setCartItems(cartData);
//   };

//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const items in cartItems) {
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) {
//             totalCount += cartItems[items][item];
//           }
//         } catch (error) {}
//       }
//     }
//     return totalCount;
//   };

//   const updateQuantity = async (itemId, size, quantity) => {
//     if (quantity === 0) {
//       toast.success("Item Removed From The Cart");
//     }

//     let cartData = structuredClone(cartItems);

//     if (cartData[itemId]) {
//       cartData[itemId][size] = quantity;
//       // If quantity for all sizes becomes zero, remove the product key completely
//       const allSizesZero = Object.values(cartData[itemId]).every(qty => qty === 0);
//       if (allSizesZero) {
//         delete cartData[itemId];
//       }
//     }

//     setCartItems(cartData);
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const items in cartItems) {
//       let itemInfo = products.find((product) => product._id === items);
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) {
//             totalAmount += itemInfo.price * cartItems[items][item];
//           }
//         } catch (error) {}
//       }
//     }
//     return totalAmount;
//   };

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     search,
//     clearCart,
//     setSearch,
//     showSearch,
//     food_list: products,
//     setShowSearch,
//     cartItems,
//     addToCart,
//     getCartCount,
//     updateQuantity,
//     getTotalCartAmount,
//     user,
//     setUser,
//     loadingUser,  // provide loadingUser flag here
//     navigate,
//   };

//   return (
//     <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { food_list } from '../assets/assets';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(null);  // user state
  const [loadingUser, setLoadingUser] = useState(true); // loading flag for user

  const navigate = useNavigate();

  const currency = "₹";
  const delivery_fee = 10;

  const clearCart = () => {
    setCartItems({});
  };

  const [products, setProducts] = useState(food_list);

  // Load cart and user from localStorage on mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoadingUser(false);  // user loading done
  }, []);

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save or remove user to/from localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Fixed addToCart function
  const addToCart = (productId, size, quantity = 1) => {
    if (!size) {
      toast.error("Please Select a Size");
      return;
    } else {
      toast.success("Item Added To The Cart");
    }

    let cartData = structuredClone(cartItems);

    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += quantity;
      } else {
        cartData[productId][size] = quantity;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = quantity;
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        try {
          if (cartItems[items][size] > 0) {
            totalCount += cartItems[items][size];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId, size, quantity) => {
    if (quantity === 0) {
      toast.success("Item Removed From The Cart");
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
      // If quantity for all sizes becomes zero, remove the product key completely
      const allSizesZero = Object.values(cartData[itemId]).every(qty => qty === 0);
      if (allSizesZero) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const size in cartItems[items]) {
        try {
          if (cartItems[items][size] > 0) {
            totalAmount += itemInfo.price * cartItems[items][size];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    clearCart,
    setSearch,
    showSearch,
    food_list: products,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getTotalCartAmount,
    user,
    setUser,
    loadingUser,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
