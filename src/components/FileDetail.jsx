import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const FileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { files } = useData();
  
  const file = files.find(f => f.id === id);

  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) return 'fas fa-file-pdf text-red-500';
    if (fileType?.includes('word') || fileType?.includes('doc')) return 'fas fa-file-word text-blue-500';
    if (fileType?.includes('excel') || fileType?.includes('sheet')) return 'fas fa-file-excel text-green-500';
    if (fileType?.includes('powerpoint') || fileType?.includes('presentation')) return 'fas fa-file-powerpoint text-orange-500';
    if (fileType?.includes('image')) return 'fas fa-file-image text-purple-500';
    if (fileType?.includes('video')) return 'fas fa-file-video text-pink-500';
    if (fileType?.includes('audio')) return 'fas fa-file-audio text-yellow-500';
    if (fileType?.includes('zip') || fileType?.includes('rar')) return 'fas fa-file-archive text-gray-500';
    return 'fas fa-file text-gray-400';
  };

  if (!file) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-6xl text-yellow-500 mb-4"></i>
          <h1 className="text-2xl font-bold mb-4">File Not Found</h1>
          <button
            onClick={() => navigate('/files')}
            className="btn-gradient"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Files
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
          <title>{file.title} - Awan Berlian Portfolio</title>
          <meta name="description" content={file.description} />
        </Helmet>
        <div className="container mx-auto px-4">
          <motion.button
            onClick={() => navigate('/files')}
            className="mb-8 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Halaman File
          </motion.button>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="glass-effect p-8 rounded-2xl text-center">
                  <i className={`${getFileIcon(file.fileType)} text-8xl mb-6`}></i>
                  <h3 className="text-xl font-bold gradient-text mb-2">{file.title}</h3>
                  <p className="text-gray-400 mb-4">{file.category}</p>
                  
                  {file.fileSize && (
                    <div className="flex justify-center items-center mb-4">
                      <i className="fas fa-weight text-gray-400 mr-2"></i>
                      <span className="text-sm text-gray-400">{file.fileSize}</span>
                    </div>
                  )}

                  {file.downloadUrl && (
                    <motion.a
                      href={file.downloadUrl}
                      download
                      className="btn-gradient w-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-download mr-2"></i>
                      Download File
                    </motion.a>
                  )}
                </div>
              </motion.div>
              <motion.div
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div>
                  <h1 className="text-4xl font-bold gradient-text mb-4">{file.title}</h1>
                  <p className="text-xl text-gray-300 leading-relaxed">{file.description}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FileDetail;