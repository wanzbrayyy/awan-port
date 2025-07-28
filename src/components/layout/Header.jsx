import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Menu, X, Sun, Moon, Home, Briefcase, Award, FileText, User } from 'lucide-react';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase size={20} /> },
    { name: 'Certificates', path: '/certificates', icon: <Award size={20} /> },
    { name: 'Files', path: '/files', icon: <FileText size={20} /> },
  ];

  const sidebarVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { x: '100%', transition: { duration: 0.3 } },
  };

  const navLinkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.2 + i * 0.1 },
    }),
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <motion.div
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              Awan Berlian
            </motion.div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink 
                key={item.name} 
                to={item.path} 
                className={({ isActive }) => 
                  `nav-link transition-colors ${isActive ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full glass-effect hover:bg-indigo-500/20 transition-all"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setSidebarOpen(true)} className="p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-[99]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-64 glass-effect z-[100] p-6 flex flex-col"
            >
              <button onClick={() => setSidebarOpen(false)} className="self-end mb-8 p-2">
                <X size={24} />
              </button>
              <nav className="flex flex-col space-y-6">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    variants={navLinkVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 text-lg transition-colors ${
                          isActive ? 'text-indigo-400 font-bold' : 'hover:text-indigo-400'
                        }`
                      }
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto">
                <motion.button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center space-x-3 p-3 rounded-lg glass-effect hover:bg-indigo-500/20 transition-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  <span>Switch to {isDark ? 'Light' : 'Dark'} Mode</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;