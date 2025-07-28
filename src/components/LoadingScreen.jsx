import React from 'react';
import { motion } from 'framer-motion';
import TokyoScene from '@/components/TokyoScene';

const LoadingScreen = () => {
  const fullText = 'Selamat datang di Portfolio Awan Berlian...';

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.5 } },
  };

  const charVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
    >
      <div className="absolute inset-0 z-0">
        <TokyoScene />
      </div>
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      <div className="text-center z-20 relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
        >
          <i className="fas fa-cloud cloud-icon"></i>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Awan Berlian
          </h1>
          <motion.div
            className="text-xl text-white"
            style={{ minHeight: '30px' }}
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {fullText.split('').map((char, index) => (
              <motion.span key={index} variants={charVariants} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-indigo-300 mt-4">Memuat portfolio...</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;