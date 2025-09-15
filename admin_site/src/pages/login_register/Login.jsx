import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [phonenumber, setphonenumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phonenumber, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        setPassword("");
        setphonenumber("");
        return;
      }

      // ✅ login success
      navigate("/supply-chain-overview-dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error, try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-lg border border-gray-200 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-5xl text-center mb-6"
        >
          🌱
        </motion.div>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* phonenumber */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="phonenumber">
              Phone number
            </label>
            <input
              type="text"
              id="phonenumber"
              value={phonenumber}
              onChange={(e) => setphonenumber(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Login
          </motion.button>
        </form>

        {/* Extra */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Forgot your password?{" "}
          <span className="text-green-600 hover:underline cursor-pointer">
            Reset
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
