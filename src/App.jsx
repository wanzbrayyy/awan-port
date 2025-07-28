
    import React, { useState, useEffect } from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Helmet } from 'react-helmet';
    import { Toaster } from '@/components/ui/toaster';
    import LoadingScreen from '@/components/LoadingScreen';
    import LandingPage from '@/pages/LandingPage';
    import ProjectsPage from '@/pages/ProjectsPage';
    import CertificatesPage from '@/pages/CertificatesPage';
    import FilesPage from '@/pages/FilesPage';
    import AdminLogin from '@/components/admin/AdminLogin';
    import AdminDashboard from '@/components/admin/AdminDashboard';
    import ProjectDetail from '@/components/ProjectDetail';
    import CertificateDetail from '@/components/CertificateDetail';
    import FileDetail from '@/components/FileDetail';
import { ThemeProvider } from '@/components/ThemeProvider';
    import AuthProvider, { useAuth } from '@/contexts/AuthContext';
    import DataProvider from '@/contexts/DataContext';
    import ChatWidget from '@/components/ChatWidget';

    const PrivateRoute = ({ children }) => {
      const { isAuthenticated, isLoading } = useAuth();
      if (isLoading) {
        return <LoadingScreen />;
      }
      return isAuthenticated ? children : <Navigate to="/admin/awan" />;
    };

    function App() {
      const [isAppLoading, setIsAppLoading] = useState(true);

      useEffect(() => {
        const timer = setTimeout(() => {
          setIsAppLoading(false);
        }, 4000);

        return () => clearTimeout(timer);
      }, []);

      return (
        <ThemeProvider>
          <AuthProvider>
            <DataProvider>
              <Router>
                <Helmet>
                  <title>Awan Berlian - Portfolio Profesional</title>
                  <meta name="description" content="Portfolio profesional Awan Berlian - Web Developer & Designer dengan pengalaman dalam teknologi modern" />
                  <meta name="keywords" content="portfolio, web developer, designer, awan berlian, react, javascript, threejs" />
                  <meta name="author" content="Awan Berlian" />
                  <meta property="og:title" content="Awan Berlian - Portfolio Profesional" />
                  <meta property="og:description" content="Portfolio profesional Awan Berlian - Web Developer & Designer" />
                  <meta property="og:type" content="website" />
                </Helmet>

                <AnimatePresence mode="wait">
                  {isAppLoading ? (
                    <motion.div key="loading">
                      <LoadingScreen />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/certificates" element={<CertificatesPage />} />
                        <Route path="/files" element={<FilesPage />} />
                        <Route path="/admin/awan" element={<AdminLogin />} />
                        <Route
                          path="/admin/dashboard"
                          element={
                            <PrivateRoute>
                              <AdminDashboard />
                            </PrivateRoute>
                          }
                        />
                        <Route path="/project/:id" element={<ProjectDetail />} />
                        <Route path="/certificate/:id" element={<CertificateDetail />} />
                        <Route path="/file/:id" element={<FileDetail />} />
                      </Routes>
                      <ChatWidget />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Toaster />
              </Router>
            </DataProvider>
          </AuthProvider>
        </ThemeProvider>
      );
    }

    export default App;
  