import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const url = currentState === "Login" ? "login" : "register";
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/user/${url}`, formData);
      alert(res.data.message || "Success");

      if (currentState === "Sign Up") {
        setCurrentState("Login");
        setFormData({ name: "", email: "", password: "" });
      } else {
        if (res.data.token) {
          const userData = {
            _id: res.data.user?._id || "",
            name: res.data.user?.name || "",
            email: res.data.user?.email || "",
          };

          login(userData, res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(userData));
          localStorage.setItem("token", res.data.token);
           navigate(redirectPath || "/");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-16">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl flex flex-col gap-6 relative -mt-12"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 transition-all duration-300">
          {currentState === "Login" ? "Welcome Back!" : "Create Account"}
        </h2>

        {currentState === "Sign Up" && (
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        )}

        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <p className="hover:underline cursor-pointer">Forgot password?</p>
          <p
            onClick={() => {
              setCurrentState(currentState === "Login" ? "Sign Up" : "Login");
              setFormData({ name: "", email: "", password: "" });
            }}
            className="hover:underline cursor-pointer font-medium transition"
          >
            {currentState === "Login" ? "Create account" : "Login here"}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 mt-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition flex justify-center items-center gap-2"
        >
          {loading ? (
            <svg
              className="w-5 h-5 animate-spin text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"
              />
            </svg>
          ) : currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
