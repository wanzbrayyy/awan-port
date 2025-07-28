import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';

const FilesSection = () => {
  const { files } = useData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="files" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-6">File & Dokumen</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Kumpulan file, dokumen, dan resource yang dapat diunduh
          </p>
        </motion.div>

        <motion.div
          className="file-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {files.length > 0 ? (
            files.map((file) => (
              <motion.div
                key={file.id}
                className="glass-effect p-6 card-hover rounded-2xl"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="text-center mb-4">
                  <i className="fas fa-file-alt text-4xl text-indigo-500 mb-3"></i>
                  <h3 className="text-xl font-bold gradient-text mb-2">{file.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{file.description}</p>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/file/${file.id}`}
                    className="btn btn-outline-primary flex-1 text-center"
                  >
                    <i className="fas fa-eye mr-2"></i>
                    Detail
                  </Link>
                  {file.downloadUrl && (
                    <a
                      href={file.downloadUrl}
                      download
                      className="btn-gradient px-4 py-2 rounded-full"
                    >
                      <i className="fas fa-download"></i>
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div className="col-span-full text-center py-20" variants={itemVariants}>
              <i className="fas fa-file text-6xl text-gray-400 mb-4"></i>
              <p className="text-xl text-gray-400">Belum ada file yang ditambahkan</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FilesSection;