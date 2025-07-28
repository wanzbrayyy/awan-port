
    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    import { motion } from 'framer-motion';
    import { LogOut, LayoutDashboard } from 'lucide-react';
    import AiTrainer from '@/components/admin/AiTrainer';

    function AdminDashboard() {
        const navigate = useNavigate();
        const { toast } = useToast();

        const handleLogout = () => {
            localStorage.removeItem('auth-token');
            toast({
                title: "Berhasil!",
                description: "Anda telah keluar.",
            });
            navigate('/admin/awan');
        };

        const handleFeatureClick = () => {
            toast({
                title: "🚧 Fitur Belum Tersedia 🚀",
                description: "Fitur ini belum diimplementasikan. Anda bisa memintanya di prompt berikutnya!",
                variant: "destructive"
            });
        };

        return (
            <>
                <Helmet>
                    <title>Admin Dashboard | Awan Berlian</title>
                    <meta name="description" content="Kelola portofolio Awan Berlian dari sini." />
                </Helmet>
                <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-between items-center mb-10"
                    >
                        <div className="flex items-center space-x-3">
                            <LayoutDashboard className="h-8 w-8 text-purple-400" />
                            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                        </div>
                        <Button onClick={handleLogout} variant="destructive" className="bg-red-500 hover:bg-red-600">
                            <LogOut className="mr-2 h-4 w-4" /> Keluar
                        </Button>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {['Unggah Proyek', 'Kelola Sertifikat', 'Atur Widget', 'Unggah File'].map((feature, index) => (
                            <motion.div
                                key={feature}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(192, 132, 252, 0.3)' }}
                                className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer border border-purple-500/30"
                                onClick={handleFeatureClick}
                            >
                                <h2 className="text-xl font-semibold text-purple-300 mb-3">{feature}</h2>
                                <p className="text-gray-400">Kelola dan perbarui konten untuk bagian {feature.toLowerCase()}.</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8">
                      <AiTrainer />
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="text-center text-gray-500 mt-12"
                    >
                        Selamat datang, wanz! Gunakan panel ini untuk mengelola portofolio Anda.
                    </motion.p>
                </div>
            </>
        );
    }

    export default AdminDashboard;
  