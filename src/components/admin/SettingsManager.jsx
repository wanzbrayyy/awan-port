
    import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast';
    import { useData } from '@/contexts/DataContext';
    import { Palette, Share2, Mail, Save } from 'lucide-react';

    const SettingsManager = () => {
      const { toast } = useToast();
      const { settings, saveSettings } = useData();
      const [formData, setFormData] = useState(settings);

      const handleSocialChange = (platform, value) => {
        setFormData(prev => ({
          ...prev,
          socialMedia: {
            ...prev.socialMedia,
            [platform]: value
          }
        }));
      };

      const handleContactChange = (field, value) => {
        setFormData(prev => ({
          ...prev,
          contact: {
            ...prev.contact,
            [field]: value
          }
        }));
      };

      const handleEmailJsChange = (field, value) => {
        setFormData(prev => ({
          ...prev,
          emailJs: {
            ...prev.emailJs,
            [field]: value
          }
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        saveSettings(formData);
        toast({
          title: "Pengaturan Disimpan! ✨",
          description: "Pengaturan situs Anda telah berhasil diperbarui."
        });
      };

      return (
        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            className="admin-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold gradient-text mb-4 flex items-center">
              <Share2 className="mr-3" /> Tautan Media Sosial
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(formData.socialMedia).map(platform => (
                <div key={platform}>
                  <label className="block text-sm font-medium mb-2 capitalize">
                    <i className={`fab fa-${platform} mr-2`}></i> {platform}
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia[platform]}
                    onChange={(e) => handleSocialChange(platform, e.target.value)}
                    placeholder={`https://...`}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="admin-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold gradient-text mb-4 flex items-center">
              <Mail className="mr-3" /> Informasi Kontak & EmailJS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-300">Detail Kontak</h4>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telepon</label>
                  <input
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Lokasi</label>
                  <input
                    type="text"
                    value={formData.contact.location}
                    onChange={(e) => handleContactChange('location', e.target.value)}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-300">Konfigurasi EmailJS</h4>
                <div>
                  <label className="block text-sm font-medium mb-2">Service ID</label>
                  <input
                    type="text"
                    value={formData.emailJs.serviceId}
                    onChange={(e) => handleEmailJsChange('serviceId', e.target.value)}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Template ID</label>
                  <input
                    type="text"
                    value={formData.emailJs.templateId}
                    onChange={(e) => handleEmailJsChange('templateId', e.target.value)}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Public Key</label>
                  <input
                    type="text"
                    value={formData.emailJs.publicKey}
                    onChange={(e) => handleEmailJsChange('publicKey', e.target.value)}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="admin-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold gradient-text mb-4 flex items-center">
              <Palette className="mr-3" /> Preferensi Tema
            </h3>
            <p className="text-gray-400 mb-4">Kustomisasi tampilan dan nuansa portofolio Anda.</p>
            <button
              type="button"
              onClick={() => toast({ title: "🚧 Fitur ini belum diimplementasikan", description: "Jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀" })}
              className="btn btn-outline-primary"
            >
              Kustomisasi Tema
            </button>
          </motion.div>

          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              type="submit"
              className="btn-gradient px-8 py-3"
            >
              <Save className="mr-2" />
              Simpan Semua Pengaturan
            </button>
          </motion.div>
        </form>
      );
    };

    export default SettingsManager;
  