import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import FilesSection from '@/components/sections/FilesSection';
import Footer from '@/components/layout/Footer';

const FilesPage = () => {
  return (
    <>
      <Helmet>
        <title>File & Dokumen | Awan Berlian Portfolio</title>
        <meta name="description" content="Unduh file, dokumen, dan resource yang dibagikan oleh Awan Berlian." />
      </Helmet>
      <div className="min-h-screen overflow-x-hidden pt-20">
        <Header />
        <main>
          <div className="relative bg-dark-bg z-10">
            <FilesSection />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FilesPage;