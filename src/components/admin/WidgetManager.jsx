import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, ToggleLeft, ToggleRight } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';

const WidgetManager = () => {
  const { settings, saveSettings } = useData();
  const { toast } = useToast();

  // Initialize default widgets if they don't exist
  const widgets = settings.widgets || {
    hero: { name: 'Hero Section', active: true },
    about: { name: 'About Me', active: true },
    skills: { name: 'Skills Section', active: true },
    projects: { name: 'Projects Page', active: true },
    certificates: { name: 'Certificates Page', active: true },
    files: { name: 'Files Page', active: true },
    contact: { name: 'Contact Form', active: true },
    spline: { name: '3D Spline/GLB', active: true },
  };

  const toggleWidget = (widgetName) => {
    const updatedWidgets = {
      ...widgets,
      [widgetName]: {
        ...widgets[widgetName],
        active: !widgets[widgetName].active,
      },
    };
    saveSettings({ ...settings, widgets: updatedWidgets });
    toast({
      title: "Widget Diperbarui! ✨",
      description: `${widgets[widgetName].name} telah ${!widgets[widgetName].active ? 'diaktifkan' : 'dinonaktifkan'}.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold gradient-text">Widget Management</h3>
          <p className="text-gray-400">Atur widget dan komponen di halaman Anda.</p>
        </div>
      </div>

      <motion.div
        className="admin-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-4">
          <LayoutGrid className="w-8 h-8 mr-3 text-purple-400" />
          <h4 className="text-xl font-bold">Atur Widget</h4>
        </div>
        <div className="space-y-4">
          {Object.entries(widgets).map(([key, widget]) => (
            <div
              key={key}
              className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
            >
              <span className="font-semibold">{widget.name}</span>
              <button onClick={() => toggleWidget(key)} className="focus:outline-none">
                {widget.active ? (
                  <ToggleRight className="w-10 h-10 text-green-400" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-gray-500" />
                )}
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WidgetManager;