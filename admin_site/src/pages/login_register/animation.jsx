// App.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Login from "./Login";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); // 2.6 sec
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl font-bold mb-4">🌱 Welcome to AgriTrack</h1>
          <motion.div
            className="w-48 h-2 bg-green-700 rounded-full mx-auto overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "12rem" }}
            transition={{ duration: 2.6 }}
          >
            <motion.div
              className="h-2 bg-white"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.6 }}
            />
          </motion.div>
          <p className="mt-4 text-sm">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return <Login />;
}
