import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';

const ThemeManager = () => {
  const { settings, saveSettings } = useData();
  const { toast } = useToast();
  const theme = settings.theme || {
    primaryColor: '#6D28D9',
    secondaryColor: '#D946EF',
  };

  const handleColorChange = (color, type) => {
    const updatedTheme = { ...theme, [type]: color };
    saveSettings({ ...settings, theme: updatedTheme });
  };

  const handleSaveTheme = () => {
    toast({
      title: 'Tema Disimpan! 🎨',
      description: 'Tampilan portofolio Anda telah diperbarui.',
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold gradient-text">Preferensi Tema</h3>
          <p className="text-gray-400">Sesuaikan tampilan portofolio Anda.</p>
        </div>
      </div>
      <motion.div
        className="admin-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-4">
          <Palette className="w-8 h-8 mr-3 text-pink-400" />
          <h4 className="text-xl font-bold">Atur Warna</h4>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="primaryColor" className="font-semibold">Warna Primer</label>
            <input
              type="color"
              id="primaryColor"
              value={theme.primaryColor}
              onChange={(e) => handleColorChange(e.target.value, 'primaryColor')}
              className="w-12 h-12 p-1 bg-gray-800 rounded-lg"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="secondaryColor" className="font-semibold">Warna Sekunder</label>
            <input
              type="color"
              id="secondaryColor"
              value={theme.secondaryColor}
              onChange={(e) => handleColorChange(e.target.value, 'secondaryColor')}
              className="w-12 h-12 p-1 bg-gray-800 rounded-lg"
            />
          </div>
        </div>
        <div className="mt-6">
            <button onClick={handleSaveTheme} className="btn-gradient w-full">
                Simpan Tema
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeManager;
