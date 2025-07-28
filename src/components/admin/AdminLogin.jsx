import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      
      if (success) {
        toast({
          title: "Login Berhasil! 🎉",
          description: "Selamat datang di Admin Dashboard!"
        });
        navigate('/admin/dashboard', { replace: true });
      } else {
        toast({
          title: "Login Gagal! ❌",
          description: "Username atau password salah. Coba lagi!"
        });
        setIsLoading(false);
      }
      
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Helmet>
        <title>Admin Login - Awan Berlian Portfolio</title>
        <meta name="description" content="Admin login page untuk mengelola portfolio Awan Berlian" />
      </Helmet>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <motion.div
        className="glass-effect p-8 rounded-3xl w-full max-w-md mx-4 relative z-10"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <i className="fas fa-shield-alt text-5xl text-indigo-500 mb-4"></i>
          </motion.div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Admin Login</h1>
          <p className="text-gray-400">Masuk ke dashboard admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <label className="block text-sm font-medium mb-2">
              <i className="fas fa-user mr-2"></i>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none transition-all"
              placeholder="Masukkan username"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <label className="block text-sm font-medium mb-2">
              <i className="fas fa-lock mr-2"></i>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none transition-all"
              placeholder="Masukkan password"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full btn-gradient py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Memproses...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2"></i>
                Masuk
              </>
            )}
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-sm text-gray-400">
            Hint: username = wanz, password = 2
          </p>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <button
            onClick={() => navigate('/')}
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Homepage
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;