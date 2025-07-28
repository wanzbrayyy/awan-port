import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import TokyoScene from '@/components/TokyoScene';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { aboutMe } = useData();
  const { toast } = useToast();

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      toast({
        title: "🚧 Fitur ini belum diimplementasikan",
        description: "Jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀"
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <TokyoScene />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          className="text-6xl lg:text-8xl font-bold gradient-text mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {aboutMe.name}
        </motion.h1>
        <motion.h2
          className="text-2xl lg:text-3xl font-semibold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {aboutMe.title}
        </motion.h2>
        <motion.p
          className="text-lg lg:text-xl mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {aboutMe.description}
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Link
            to="/projects"
            className="btn-gradient"
          >
            <i className="fas fa-eye mr-2"></i>
            Jelajahi Proyek
          </Link>
          <button
            onClick={handleContactClick}
            className="btn btn-outline-primary px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
          >
            <i className="fas fa-envelope mr-2"></i>
            Hubungi Saya
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;