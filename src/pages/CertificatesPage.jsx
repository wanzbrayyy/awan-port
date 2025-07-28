import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import CertificatesSection from '@/components/sections/CertificatesSection';
import Footer from '@/components/layout/Footer';

const CertificatesPage = () => {
  return (
    <>
      <Helmet>
        <title>Sertifikat | Awan Berlian Portfolio</title>
        <meta name="description" content="Lihat semua sertifikat dan penghargaan yang dimiliki oleh Awan Berlian." />
      </Helmet>
      <div className="min-h-screen overflow-x-hidden pt-20">
        <Header />
        <main>
          <div className="relative bg-dark-bg z-10">
            <CertificatesSection />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CertificatesPage;