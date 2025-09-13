import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Routes from "./Routes"; // or Login

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-green-900">
      {" "}
      {/* Always keep green background */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="flex items-center justify-center h-full"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl font-bold mb-4">
                🌱 Welcome to AgriTrack
              </h1>

              {/* Progress Bar */}
              <div className="w-48 h-2 bg-green-700 rounded-full mx-auto overflow-hidden">
                <motion.div
                  className="h-2 bg-white"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 3, ease: "linear" }}
                />
              </div>

              <p className="mt-4 text-sm">Loading dashboard...</p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full"
          >
            <Routes /> {/* or <Login /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
