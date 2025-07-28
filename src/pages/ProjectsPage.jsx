import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import ProjectsSection from '@/components/sections/ProjectsSection';
import Footer from '@/components/layout/Footer';

const ProjectsPage = () => {
  return (
    <>
      <Helmet>
        <title>Proyek | Awan Berlian Portfolio</title>
        <meta name="description" content="Jelajahi semua proyek yang telah dikerjakan oleh Awan Berlian." />
      </Helmet>
      <div className="min-h-screen overflow-x-hidden pt-20">
        <Header />
        <main>
          <div className="relative bg-dark-bg z-10">
            <ProjectsSection />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProjectsPage;