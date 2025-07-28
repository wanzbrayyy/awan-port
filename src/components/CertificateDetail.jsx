import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const CertificateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { certificates } = useData();
  
  const certificate = certificates.find(c => c.id === id);

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-6xl text-yellow-500 mb-4"></i>
          <h1 className="text-2xl font-bold mb-4">Certificate Not Found</h1>
          <button
            onClick={() => navigate('/certificates')}
            className="btn-gradient"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Certificates
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
          <title>{certificate.title} - Awan Berlian Portfolio</title>
          <meta name="description" content={`Sertifikat ${certificate.title} dari ${certificate.issuer}`} />
        </Helmet>

        <div className="container mx-auto px-4">
          <motion.button
            onClick={() => navigate('/certificates')}
            className="mb-8 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Halaman Sertifikat
          </motion.button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {certificate.image ? (
                <div className="relative">
                  <img 
                    src={certificate.image} 
                    alt={certificate.title}
                    className="w-full rounded-2xl shadow-2xl"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    <i className="fas fa-certificate mr-1"></i>
                    Verified
                  </div>
                </div>
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
                  <i className="fas fa-certificate text-6xl text-gray-400"></i>
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
                <h1 className="text-4xl font-bold gradient-text mb-4">{certificate.title}</h1>
                <div className="flex items-center mb-4">
                  <i className="fas fa-building text-indigo-400 mr-3"></i>
                  <span className="text-xl text-gray-300">{certificate.issuer}</span>
                </div>
                <div className="flex items-center mb-6">
                  <i className="fas fa-calendar text-green-400 mr-3"></i>
                  <span className="text-lg text-gray-300">
                    Issued on {new Date(certificate.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                {certificate.description && (
                  <p className="text-lg text-gray-300 leading-relaxed">{certificate.description}</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CertificateDetail;