import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Awan Berlian | Portofolio Profesional</title>
        <meta name="description" content="Selamat datang di portofolio profesional Awan Berlian. Jelajahi proyek, sertifikat, dan lainnya." />
      </Helmet>
      <div className="min-h-screen overflow-x-hidden">
        <Header />
        <main>
          <HeroSection />
          <div className="relative bg-dark-bg z-10">
            <AboutSection />
            <SkillsSection />
            <ContactSection />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;