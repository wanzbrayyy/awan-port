
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import Swal from 'sweetalert2';

const ProjectManager = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    demoUrl: '',
    githubUrl: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
    };

    if (editingProject) {
      updateProject(editingProject.id, projectData);
      toast({
        title: "Project Updated! ✨",
        description: "Project berhasil diperbarui!"
      });
    } else {
      addProject(projectData);
      toast({
        title: "Project Added! 🎉",
        description: "Project baru berhasil ditambahkan!"
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      demoUrl: '',
      githubUrl: '',
      image: ''
    });
    setShowForm(false);
    setEditingProject(null);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      technologies: project.technologies?.join(', ') || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus project ini?')) {
      deleteProject(id);
      toast({
        title: "Project Deleted! 🗑️",
        description: "Project berhasil dihapus!"
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait while the file is being uploaded.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setFormData(prev => ({ ...prev, image: data.url }));

      Swal.fire({
        title: 'Success!',
        text: 'File uploaded successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'File upload failed. Please try again.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold gradient-text">Project Management</h3>
          <p className="text-gray-400">Kelola project portfolio Anda</p>
        </div>
        <motion.button
          onClick={() => setShowForm(true)}
          className="btn-gradient px-6 py-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-plus mr-2"></i>
          Add Project
        </motion.button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="admin-card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold gradient-text">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h4>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <i className="fas fa-heading mr-2"></i>
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                    required
                  />
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
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Demo URL
                    </label>
                    <input
                      type="url"
                      value={formData.demoUrl}
                      onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                      className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <i className="fab fa-github mr-2"></i>
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <i className="fas fa-image mr-2"></i>
                    Project Image
                  </label>
                  <div className="upload-zone">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="project-image"
                    />
                    <label htmlFor="project-image" className="cursor-pointer">
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-40 object-cover rounded-lg mb-2" />
                      ) : (
                        <div className="text-center">
                          <i className="fas fa-cloud-upload-alt text-4xl text-indigo-500 mb-2"></i>
                          <p>Click to upload image</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="btn-gradient flex-1"
                  >
                    <i className="fas fa-save mr-2"></i>
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-outline-secondary px-6 py-3 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects List */}
      <div className="project-grid">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="admin-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h4 className="text-xl font-bold gradient-text mb-2">{project.title}</h4>
              <p className="text-gray-300 mb-3 line-clamp-2">{project.description}</p>
              
              {project.technologies && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="btn btn-outline-primary flex-1"
                >
                  <i className="fas fa-edit mr-2"></i>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="btn btn-outline-danger px-4"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <i className="fas fa-project-diagram text-6xl text-gray-400 mb-4"></i>
            <p className="text-xl text-gray-400 mb-4">Belum ada project</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-gradient"
            >
              <i className="fas fa-plus mr-2"></i>
              Add First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
