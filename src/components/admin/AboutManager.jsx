
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';

const AboutManager = () => {
  const { aboutMe, saveAboutMe } = useData();
  const { toast } = useToast();
  const [formData, setFormData] = useState(aboutMe);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedData = {
      ...formData,
      skills: typeof formData.skills === 'string' 
        ? formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
        : formData.skills
    };

    saveAboutMe(updatedData);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated! ✨",
      description: "Informasi profil berhasil diperbarui!"
    });
  };

  const handleSkillsChange = (e) => {
    setFormData({ 
      ...formData, 
      skills: e.target.value 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold gradient-text">About Me Management</h3>
          <p className="text-gray-400">Kelola informasi profil dan tentang diri Anda</p>
        </div>
        <motion.button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            isEditing ? 'btn btn-outline-secondary' : 'btn-gradient'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className={`fas ${isEditing ? 'fa-times' : 'fa-edit'} mr-2`}></i>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </motion.button>
      </div>

      {/* Profile Form/Display */}
      <motion.div
        className="admin-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <i className="fas fa-user mr-2"></i>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <i className="fas fa-briefcase mr-2"></i>
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <i className="fas fa-align-left mr-2"></i>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <i className="fas fa-code mr-2"></i>
                Skills (comma separated)
              </label>
              <input
                type="text"
                value={Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills}
                onChange={handleSkillsChange}
                className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                placeholder="React, Node.js, Python, UI/UX Design"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <i className="fas fa-calendar mr-2"></i>
                  Experience
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="5+ Years"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <i className="fas fa-project-diagram mr-2"></i>
                  Projects Completed
                </label>
                <input
                  type="text"
                  value={formData.projectsCompleted}
                  onChange={(e) => setFormData({ ...formData, projectsCompleted: e.target.value })}
                  className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="50+"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <i className="fas fa-users mr-2"></i>
                  Clients Satisfied
                </label>
                <input
                  type="text"
                  value={formData.clientsSatisfied}
                  onChange={(e) => setFormData({ ...formData, clientsSatisfied: e.target.value })}
                  className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="30+"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="btn-gradient flex-1"
              >
                <i className="fas fa-save mr-2"></i>
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(aboutMe);
                  setIsEditing(false);
                }}
                className="btn btn-outline-secondary px-8"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Profile Display */}
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-user text-4xl text-white"></i>
              </div>
              <h2 className="text-3xl font-bold gradient-text mb-2">{aboutMe.name}</h2>
              <p className="text-xl text-gray-300 mb-4">{aboutMe.title}</p>
              <p className="text-gray-400 max-w-2xl mx-auto">{aboutMe.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30">
                <i className="fas fa-calendar text-3xl text-blue-400 mb-3"></i>
                <h3 className="text-2xl font-bold gradient-text">{aboutMe.experience}</h3>
                <p className="text-gray-300">Experience</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg border border-green-500/30">
                <i className="fas fa-project-diagram text-3xl text-green-400 mb-3"></i>
                <h3 className="text-2xl font-bold gradient-text">{aboutMe.projectsCompleted}</h3>
                <p className="text-gray-300">Projects Completed</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30">
                <i className="fas fa-users text-3xl text-purple-400 mb-3"></i>
                <h3 className="text-2xl font-bold gradient-text">{aboutMe.clientsSatisfied}</h3>
                <p className="text-gray-300">Clients Satisfied</p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-bold gradient-text mb-4">
                <i className="fas fa-code mr-2"></i>
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {(Array.isArray(aboutMe.skills) ? aboutMe.skills : []).map((skill, index) => (
                  <motion.span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 rounded-full border border-indigo-500/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Additional Settings */}
      <motion.div
        className="admin-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-xl font-bold gradient-text mb-4">
          <i className="fas fa-cog mr-2"></i>
          Profile Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="font-semibold mb-2">
              <i className="fas fa-palette mr-2 text-indigo-400"></i>
              Theme Preferences
            </h4>
            <p className="text-sm text-gray-400 mb-3">Customize the appearance of your portfolio</p>
            <button 
              onClick={() => toast({ title: "🚧 Fitur ini belum diimplementasikan", description: "Jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀" })}
              className="btn btn-outline-primary"
            >
              Customize Theme
            </button>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="font-semibold mb-2">
              <i className="fas fa-share-alt mr-2 text-green-400"></i>
              Social Media Links
            </h4>
            <p className="text-sm text-gray-400 mb-3">Manage your social media presence</p>
            <button 
              onClick={() => toast({ title: "🚧 Fitur ini belum diimplementasikan", description: "Jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀" })}
              className="btn btn-outline-primary"
            >
              Manage Links
            </button>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="font-semibold mb-2">
              <i className="fas fa-envelope mr-2 text-purple-400"></i>
              Contact Information
            </h4>
            <p className="text-sm text-gray-400 mb-3">Update your contact details</p>
            <button 
              onClick={() => toast({ title: "🚧 Fitur ini belum diimplementasikan", description: "Jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀" })}
              className="btn btn-outline-primary"
            >
              Update Contact
            </button>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="font-semibold mb-2">
              <i className="fas fa-download mr-2 text-cyan-400"></i>
              Export Portfolio
            </h4>
            <p className="text-sm text-gray-400 mb-3">Download your portfolio data</p>
            <button 
              onClick={() => toast({ title: "🚧 Fitur ini belum diimplementasikan", description: "Jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀" })}
              className="btn btn-outline-primary"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutManager;
