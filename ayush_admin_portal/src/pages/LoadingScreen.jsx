import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ayushLogo from "../assets/ayushLogo.png";

const LoadingScreen = () => {
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState("Ministry of Ayush");

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    const textAnimation = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading") return "Loading.";
        if (prev === "Loading.") return "Loading..";
        if (prev === "Loading..") return "Loading...";
        return "Loading";
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(textAnimation);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <img
            src={ayushLogo}
            alt="Ministry of Ayush Logo"
            className="w-45 mx-auto mb-6 object-contain"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl font-bold text-gray-800 mb-4"
        >
          {loadingText}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl text-gray-600 mb-8"
        >
          Administrative Portal
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex justify-center"
        >
          <div className="flex space-x-1">
            {[0, 1, 2]?.map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-orange-500 rounded-full"
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
