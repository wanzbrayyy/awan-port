
    import React, { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from '@/contexts/AuthContext';
    import { useToast } from '@/components/ui/use-toast';
    import { Helmet } from 'react-helmet';
    import ProjectManager from '@/components/admin/ProjectManager';
    import CertificateManager from '@/components/admin/CertificateManager';
    import FileManager from '@/components/admin/FileManager';
    import AboutManager from '@/components/admin/AboutManager';
    import DashboardStats from '@/components/admin/DashboardStats';
    import WidgetManager from '@/components/admin/WidgetManager';
    import SettingsManager from '@/components/admin/SettingsManager';
    import AiTrainer from '@/components/admin/AiTrainer';
    import TokyoScene from '@/components/TokyoScene';

    const AdminDashboard = () => {
      const [activeTab, setActiveTab] = useState('dashboard');
      const { isAuthenticated, logout } = useAuth();
      const { toast } = useToast();
      const navigate = useNavigate();

      useEffect(() => {
        if (!isAuthenticated) {
          navigate('/admin/awan');
        }
      }, [isAuthenticated, navigate]);

      const handleLogout = () => {
        logout();
        toast({
          title: "Logout Berhasil! 👋",
          description: "Sampai jumpa lagi!"
        });
        navigate('/');
      };

      const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { id: 'projects', label: 'Projects', icon: 'fas fa-project-diagram' },
        { id: 'certificates', label: 'Certificates', icon: 'fas fa-certificate' },
        { id: 'files', label: 'Files', icon: 'fas fa-file-alt' },
        { id: 'about', label: 'About Me', icon: 'fas fa-user' },
        { id: 'widgets', label: 'Widgets', icon: 'fas fa-puzzle-piece' },
        { id: 'ai-trainer', label: 'AI Trainer', icon: 'fas fa-robot' },
        { id: 'settings', label: 'Settings', icon: 'fas fa-cog' },
      ];

      const renderContent = () => {
        switch (activeTab) {
          case 'dashboard': return <DashboardStats />;
          case 'projects': return <ProjectManager />;
          case 'certificates': return <CertificateManager />;
          case 'files': return <FileManager />;
          case 'about': return <AboutManager />;
          case 'widgets': return <WidgetManager />;
          case 'ai-trainer': return <AiTrainer />;
          case 'settings': return <SettingsManager />;
          default: return <DashboardStats />;
        }
      };

      if (!isAuthenticated) {
        return null;
      }

      return (
        <div className="min-h-screen bg-dark-bg flex relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <TokyoScene />
          </div>
          <Helmet>
            <title>Admin Dashboard - Awan Berlian Portfolio</title>
            <meta name="description" content="Dashboard admin untuk mengelola portfolio Awan Berlian" />
          </Helmet>
            <motion.div
              className="admin-sidebar w-64 min-h-screen p-6 flex flex-col z-10"
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="mb-8">
                <h1 className="text-2xl font-bold gradient-text mb-2">Admin Panel</h1>
                <p className="text-gray-400 text-sm">Awan Berlian Portfolio</p>
              </div>

              <nav className="space-y-2 flex-grow">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i className={`${tab.icon} mr-3 w-5 text-center`}></i>
                    {tab.label}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto pt-8">
                <button
                  onClick={() => navigate('/')}
                  className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all mb-2"
                >
                  <i className="fas fa-home mr-3"></i>
                  Homepage
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-red-300 hover:bg-red-900 hover:text-white rounded-lg transition-all"
                >
                  <i className="fas fa-sign-out-alt mr-3"></i>
                  Logout
                </button>
              </div>
            </motion.div>
          <div className="flex-1 p-8 overflow-y-auto z-10">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold gradient-text mb-2">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
                <p className="text-gray-400">
                  Kelola konten portfolio Anda dengan mudah
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
        </div>
      );
    };

    export default AdminDashboard;
  