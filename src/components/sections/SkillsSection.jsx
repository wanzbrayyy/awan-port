import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'C++', icon: 'devicon-cplusplus-plain' },
  { name: 'Vue.js', icon: 'devicon-vuejs-plain' },
  { name: 'React', icon: 'devicon-react-original' },
  { name: 'Figma', icon: 'devicon-figma-plain' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain' },
  { name: 'HTML5', icon: 'devicon-html5-plain' },
  { name: 'Golang', icon: 'devicon-go-original-wordmark' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain' },
  { name: 'TailwindCSS', icon: 'devicon-tailwindcss-plain' },
  { name: 'Three.js', icon: 'devicon-threejs-original' },
  { name: 'Python', icon: 'devicon-python-plain' },
  { name: 'Docker', icon: 'devicon-docker-plain' },
];

const SkillsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-6">Keahlian & Teknologi</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Teknologi yang saya kuasai untuk membangun aplikasi modern dan berperforma tinggi.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center justify-center p-6 glass-effect rounded-2xl"
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: '0px 10px 30px rgba(99, 102, 241, 0.3)',
                transition: { type: 'spring', stiffness: 300 },
              }}
            >
              <i className={`${skill.icon} text-6xl mb-4 gradient-text`}></i>
              <h3 className="text-lg font-semibold">{skill.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;