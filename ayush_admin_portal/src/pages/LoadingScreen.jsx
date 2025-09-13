import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState('Ministry of Ayush');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    const textAnimation = setInterval(() => {
      setLoadingText(prev => {
        if (prev === 'Ministry of Ayush') return 'Ministry of Ayush.';
        if (prev === 'Ministry of Ayush.') return 'Ministry of Ayush..';
        if (prev === 'Ministry of Ayush..') return 'Ministry of Ayush...';
        return 'Ministry of Ayush';
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
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-orange-500 to-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-4xl font-bold">MoA</span>
          </div>
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