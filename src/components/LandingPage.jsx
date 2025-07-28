
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import ThreeScene from '@/components/ThreeScene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const { projects, certificates, files, aboutMe } = useData();
  const { toast } = useToast();
  const heroRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // GSAP Animations
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-subtitle',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-description',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' }
    );

    // Scroll animations
    gsap.utils.toArray('.animate-on-scroll').forEach((element, index) => {
      gsap.fromTo(element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  const handleContactClick = () => {
    toast({
      title: "🚧 Fitur ini belum diimplementasikan",
      description: "Jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀"
    });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Three.js Background */}
      <ThreeScene />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect p-4">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            Awan Berlian
          </motion.div>
          
          <div className="flex items-center space-x-6">
            <a href="#home" className="nav-link hover:text-indigo-400 transition-colors">Home</a>
            <a href="#about" className="nav-link hover:text-indigo-400 transition-colors">About</a>
            <a href="#projects" className="nav-link hover:text-indigo-400 transition-colors">Projects</a>
            <a href="#certificates" className="nav-link hover:text-indigo-400 transition-colors">Certificates</a>
            <a href="#files" className="nav-link hover:text-indigo-400 transition-colors">Files</a>
            
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full glass-effect hover:bg-indigo-500/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
            </motion.button>
          </div>
        </div>
      </nav>

      {settings.widgets?.hero?.active && (
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-20" ref={heroRef}>
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.h1
                className="hero-title text-6xl lg:text-8xl font-bold gradient-text mb-6"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                {aboutMe.name}
              </motion.h1>

              <motion.h2
                className="hero-subtitle text-2xl lg:text-3xl font-semibold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {aboutMe.title}
              </motion.h2>

              <motion.p
                className="hero-description text-lg lg:text-xl mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {aboutMe.description}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <button
                  onClick={handleContactClick}
                  className="btn-gradient"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  Hubungi Saya
                </button>
                <a
                  href="#projects"
                  className="btn btn-outline-primary px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
                >
                  <i className="fas fa-eye mr-2"></i>
                  Lihat Portfolio
                </a>
              </motion.div>
            </div>

            <div className="relative">
              <div className="spline-container floating-animation">
                <img
                  className="w-full h-full object-cover rounded-3xl shadow-2xl pulse-glow"
                  alt="Awan Berlian Profile"
                 src="https://images.unsplash.com/photo-1489506020498-e6c1cc350f10" />
              </div>
            </div>
          </div>
        </section>
      )}

      {settings.widgets?.about?.active && (
        <section id="about" className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16 animate-on-scroll"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold gradient-text mb-6">Tentang Saya</h2>
              <p className="text-xl max-w-3xl mx-auto">
                Seorang developer passionate yang selalu berinovasi dalam menciptakan solusi digital terdepan
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <motion.div
                className="stats-card animate-on-scroll"
                whileHover={{ scale: 1.05 }}
              >
                <i className="fas fa-code text-4xl text-indigo-500 mb-4"></i>
                <h3 className="text-3xl font-bold gradient-text">{aboutMe.experience}</h3>
                <p className="text-lg">Pengalaman</p>
              </motion.div>

              <motion.div
                className="stats-card animate-on-scroll"
                whileHover={{ scale: 1.05 }}
              >
                <i className="fas fa-project-diagram text-4xl text-purple-500 mb-4"></i>
                <h3 className="text-3xl font-bold gradient-text">{aboutMe.projectsCompleted}</h3>
                <p className="text-lg">Proyek Selesai</p>
              </motion.div>

              <motion.div
                className="stats-card animate-on-scroll"
                whileHover={{ scale: 1.05 }}
              >
                <i className="fas fa-users text-4xl text-cyan-500 mb-4"></i>
                <h3 className="text-3xl font-bold gradient-text">{aboutMe.clientsSatisfied}</h3>
                <p className="text-lg">Klien Puas</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h3 className="text-3xl font-bold mb-6">Keahlian Saya</h3>
                {aboutMe.skills.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{skill}</span>
                      <span>90%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: '90%' }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="animate-on-scroll">
                <img
                  className="w-full rounded-3xl shadow-2xl"
                  alt="Developer workspace"
                 src="https://images.unsplash.com/photo-1698919585695-546e4a31fc8f" />
              </div>
            </div>
          </div>
        </section>
      )}

      {settings.widgets?.projects?.active && (
        <section id="projects" className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16 animate-on-scroll"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold gradient-text mb-6">Proyek Terbaru</h2>
              <p className="text-xl max-w-3xl mx-auto">
                Koleksi proyek-proyek terbaik yang telah saya kerjakan dengan teknologi modern
              </p>
            </motion.div>

            <div className="project-grid">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="glass-effect p-6 card-hover animate-on-scroll"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-2xl font-bold gradient-text mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Link
                        to={`/project/${project.id}`}
                        className="btn-gradient flex-1 text-center"
                      >
                        <i className="fas fa-eye mr-2"></i>
                        Detail
                      </Link>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary px-4 py-2 rounded-full"
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <i className="fas fa-folder-open text-6xl text-gray-400 mb-4"></i>
                  <p className="text-xl text-gray-400">Belum ada proyek yang ditambahkan</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {settings.widgets?.certificates?.active && (
        <section id="certificates" className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16 animate-on-scroll"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold gradient-text mb-6">Sertifikat</h2>
              <p className="text-xl max-w-3xl mx-auto">
                Sertifikat dan penghargaan yang telah saya raih dalam perjalanan karir
              </p>
            </motion.div>

            <div className="certificate-grid">
              {certificates.length > 0 ? (
                certificates.map((certificate, index) => (
                  <motion.div
                    key={certificate.id}
                    className="glass-effect p-6 card-hover animate-on-scroll"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
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
                    <p className="text-sm text-gray-400 mb-4">{certificate.date}</p>
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
                <div className="col-span-full text-center py-20">
                  <i className="fas fa-certificate text-6xl text-gray-400 mb-4"></i>
                  <p className="text-xl text-gray-400">Belum ada sertifikat yang ditambahkan</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {settings.widgets?.files?.active && (
        <section id="files" className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16 animate-on-scroll"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold gradient-text mb-6">File & Dokumen</h2>
              <p className="text-xl max-w-3xl mx-auto">
                Kumpulan file, dokumen, dan resource yang dapat diunduh
              </p>
            </motion.div>

            <div className="file-grid">
              {files.length > 0 ? (
                files.map((file, index) => (
                  <motion.div
                    key={file.id}
                    className="glass-effect p-6 card-hover animate-on-scroll"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
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
                <div className="col-span-full text-center py-20">
                  <i className="fas fa-file text-6xl text-gray-400 mb-4"></i>
                  <p className="text-xl text-gray-400">Belum ada file yang ditambahkan</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {settings.widgets?.contact?.active && (
        <section id="contact" className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16 animate-on-scroll"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold gradient-text mb-6">Mari Berkolaborasi</h2>
              <p className="text-xl max-w-3xl mx-auto">
                Siap untuk memulai proyek baru? Mari diskusikan ide Anda!
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="animate-on-scroll">
                  <h3 className="text-2xl font-bold mb-6">Hubungi Saya</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <i className="fas fa-envelope text-indigo-500 text-xl mr-4"></i>
                      <span>awan.berlian@email.com</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-phone text-indigo-500 text-xl mr-4"></i>
                      <span>+62 812-3456-7890</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt text-indigo-500 text-xl mr-4"></i>
                      <span>Jakarta, Indonesia</span>
                    </div>
                  </div>

                  <div className="social-links">
                    <a href="#" onClick={handleContactClick}><i className="fab fa-github"></i></a>
                    <a href="#" onClick={handleContactClick}><i className="fab fa-linkedin"></i></a>
                    <a href="#" onClick={handleContactClick}><i className="fab fa-twitter"></i></a>
                    <a href="#" onClick={handleContactClick}><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
                
                <div className="animate-on-scroll">
                  <form className="contact-form" onSubmit={(e) => { e.preventDefault(); handleContactClick(); }}>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Nama Anda"
                        className="w-full p-4 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="email"
                        placeholder="Email Anda"
                        className="w-full p-4 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="mb-6">
                      <textarea
                        rows="5"
                        placeholder="Pesan Anda"
                        className="w-full p-4 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn-gradient w-full">
                      <i className="fas fa-paper-plane mr-2"></i>
                      Kirim Pesan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="text-2xl font-bold gradient-text">Awan Berlian</span>
          </div>
          <p className="text-gray-400 mb-4">
            © 2024 Awan Berlian. Semua hak dilindungi.
          </p>
          <p className="text-sm text-gray-500">
            Dibuat dengan ❤️ menggunakan React, Three.js, dan GSAP
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
