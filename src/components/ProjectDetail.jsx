import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useData();
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-6xl text-yellow-500 mb-4"></i>
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/projects')}
            className="btn-gradient"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen py-20 pt-32">
        <Helmet>
          <title>{project.title} - Awan Berlian Portfolio</title>
          <meta name="description" content={project.description} />
        </Helmet>

        <div className="container mx-auto px-4">
          <motion.button
            onClick={() => navigate('/projects')}
            className="mb-8 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Halaman Proyek
          </motion.button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <i className="fas fa-image text-6xl text-gray-400"></i>
                </div>
              )}
            </motion.div>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-4">{project.title}</h1>
                <p className="text-xl text-gray-300 leading-relaxed">{project.description}</p>
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    <i className="fas fa-code mr-2 text-indigo-400"></i>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 rounded-full border border-indigo-500/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetail;