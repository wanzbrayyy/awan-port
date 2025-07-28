import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const WidgetManager = () => {
    const { toast } = useToast();

    const handleFeatureClick = () => {
        toast({
            title: "🚧 Fitur ini belum diimplementasikan",
            description: "Jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀"
        });
    };
    
    const widgets = [
        { name: "Hero Section", icon: "fas fa-desktop", status: "Active" },
        { name: "About Me", icon: "fas fa-user", status: "Active" },
        { name: "Skills Section", icon: "fas fa-cogs", status: "Active" },
        { name: "Projects Page", icon: "fas fa-project-diagram", status: "Active" },
        { name: "Certificates Page", icon: "fas fa-certificate", status: "Active" },
        { name: "Files Page", icon: "fas fa-file-alt", status: "Active" },
        { name: "Contact Form", icon: "fas fa-envelope", status: "Active" },
        { name: "3D Spline/GLB", icon: "fas fa-cube", status: "Active" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-bold gradient-text">Widget Management</h3>
                    <p className="text-gray-400">Atur widget dan komponen di halaman Anda</p>
                </div>
                <motion.button
                    onClick={handleFeatureClick}
                    className="btn-gradient px-6 py-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <i className="fas fa-plus mr-2"></i>
                    Add New Widget
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {widgets.map((widget, index) => (
                    <motion.div
                        key={widget.name}
                        className="admin-card p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <i className={`${widget.icon} text-3xl gradient-text mb-3`}></i>
                                <h4 className="text-lg font-bold">{widget.name}</h4>
                            </div>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${widget.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {widget.status}
                            </span>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button onClick={handleFeatureClick} className="btn btn-outline-primary flex-1 text-sm">
                                <i className="fas fa-cog mr-2"></i>
                                Configure
                            </button>
                            <button onClick={handleFeatureClick} className="btn btn-outline-secondary px-3">
                                <i className="fas fa-toggle-on"></i>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default WidgetManager;