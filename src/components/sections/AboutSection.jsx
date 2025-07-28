import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';

const AboutSection = () => {
  const { aboutMe } = useData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-5xl font-bold gradient-text mb-6">Tentang Saya</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Seorang developer passionate yang selalu berinovasi dalam menciptakan solusi digital terdepan
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="stats-card" variants={itemVariants}>
            <i className="fas fa-code text-4xl text-indigo-500 mb-4"></i>
            <h3 className="text-3xl font-bold gradient-text">{aboutMe.experience}</h3>
            <p className="text-lg">Pengalaman</p>
          </motion.div>
          <motion.div className="stats-card" variants={itemVariants}>
            <i className="fas fa-project-diagram text-4xl text-purple-500 mb-4"></i>
            <h3 className="text-3xl font-bold gradient-text">{aboutMe.projectsCompleted}</h3>
            <p className="text-lg">Proyek Selesai</p>
          </motion.div>
          <motion.div className="stats-card" variants={itemVariants}>
            <i className="fas fa-users text-4xl text-cyan-500 mb-4"></i>
            <h3 className="text-3xl font-bold gradient-text">{aboutMe.clientsSatisfied}</h3>
            <p className="text-lg">Klien Puas</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-6">Keahlian Saya</h3>
            {aboutMe.skills.map((skill, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{skill}</span>
                  <span>90%</span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-progress"
                    initial={{ width: 0 }}
                    whileInView={{ width: '90%' }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div variants={itemVariants}>
            <img 
              className="w-full rounded-3xl shadow-2xl"
              alt="Developer workspace with code on screen"
             src="https://images.unsplash.com/photo-1507146815454-9faa99d579aa" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;