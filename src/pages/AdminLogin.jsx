
    import React, { useState } from 'react';
    import { Helmet } from 'react-helmet';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';
    import { KeyRound, User, Loader2, Cloud } from 'lucide-react';

    function AdminLogin() {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const navigate = useNavigate();
        const { toast } = useToast();

        const handleLogin = (e) => {
            e.preventDefault();
            setIsLoading(true);

            setTimeout(() => {
                if (username === 'wanz' && password === '2') {
                    toast({
                        title: "Login Berhasil!",
                        description: "Selamat datang kembali, wanz!",
                    });
                    localStorage.setItem('auth-token', 'wanz:2');
                    navigate('/admin/dashboard');
                } else {
                    toast({
                        title: "Login Gagal",
                        description: "Username atau password salah.",
                        variant: "destructive",
                    });
                    setIsLoading(false);
                }
            }, 1500);
        };

        return (
            <>
                <Helmet>
                    <title>Admin Login | Awan Berlian</title>
                    <meta name="description" content="Halaman login untuk admin Awan Berlian." />
                </Helmet>
                <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4 font-sans">
                    <motion.div
                        className="w-full max-w-md p-8 space-y-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20"
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                                className="inline-block p-4 bg-purple-500/20 rounded-full mb-4"
                            >
                                <Cloud className="h-12 w-12 text-purple-300" />
                            </motion.div>
                            <h1 className="text-3xl font-bold tracking-tight">Admin Awan Berlian</h1>
                            <p className="text-gray-400 mt-2">Masuk untuk mengelola portofolio.</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="wanz"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="pl-10 bg-gray-700/50 border-gray-600 focus:border-purple-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10 bg-gray-700/50 border-gray-600 focus:border-purple-500"
                                    />
                                </div>
                            </div>
                            <motion.button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    "Masuk"
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </>
        );
    }
    export default AdminLogin;
  