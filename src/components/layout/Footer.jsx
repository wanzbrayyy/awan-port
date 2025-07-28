import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="py-8 border-t border-gray-800/50 relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <span className="text-2xl font-bold gradient-text">Awan Berlian</span>
        </div>
        <p className="text-gray-400 mb-2">
          © {new Date().getFullYear()} Awan Berlian. Semua hak dilindungi.
        </p>
        <p className="text-sm text-gray-500">
          Dibuat dengan ❤️ menggunakan React, Three.js, dan Framer Motion
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;