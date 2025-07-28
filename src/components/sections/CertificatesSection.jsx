import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';

const CertificatesSection = () => {
  const { certificates } = useData();

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
    <section id="certificates" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-6">Sertifikat</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Sertifikat dan penghargaan yang telah saya raih dalam perjalanan karir
          </p>
        </motion.div>

        <motion.div
          className="certificate-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {certificates.length > 0 ? (
            certificates.map((certificate) => (
              <motion.div
                key={certificate.id}
                className="glass-effect p-6 card-hover rounded-2xl"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                {certificate.image && (
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-bold gradient-text mb-2">{certificate.title}</h3>
                <p className="text-gray-300 mb-3">{certificate.issuer}</p>
                <p className="text-sm text-gray-400 mb-4">{new Date(certificate.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</p>
                <Link
                  to={`/certificate/${certificate.id}`}
                  className="btn-gradient w-full text-center"
                >
                  <i className="fas fa-certificate mr-2"></i>
                  Lihat Detail
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div className="col-span-full text-center py-20" variants={itemVariants}>
              <i className="fas fa-certificate text-6xl text-gray-400 mb-4"></i>
              <p className="text-xl text-gray-400">Belum ada sertifikat yang ditambahkan</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificatesSection;