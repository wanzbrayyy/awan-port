
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import Swal from 'sweetalert2';

const CertificateManager = () => {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useData();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    description: '',
    credentialId: '',
    credentialUrl: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCertificate) {
      updateCertificate(editingCertificate.id, formData);
      toast({
        title: "Certificate Updated! ✨",
        description: "Sertifikat berhasil diperbarui!"
      });
    } else {
      addCertificate(formData);
      toast({
        title: "Certificate Added! 🎉",
        description: "Sertifikat baru berhasil ditambahkan!"
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      issuer: '',
      date: '',
      description: '',
      credentialId: '',
      credentialUrl: '',
      image: ''
    });
    setShowForm(false);
    setEditingCertificate(null);
  };

  const handleEdit = (certificate) => {
    setEditingCertificate(certificate);
    setFormData(certificate);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus sertifikat ini?')) {
      deleteCertificate(id);
      toast({
        title: "Certificate Deleted! 🗑️",
        description: "Sertifikat berhasil dihapus!"
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
      const response = await fetch('http://localhost:3001/api/upload', {
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
          <h3 className="text-2xl font-bold gradient-text">Certificate Management</h3>
          <p className="text-gray-400">Kelola sertifikat dan penghargaan Anda</p>
        </div>
        <motion.button
          onClick={() => setShowForm(true)}
          className="btn-gradient px-6 py-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-plus mr-2"></i>
          Add Certificate
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
                  {editingCertificate ? 'Edit Certificate' : 'Add New Certificate'}
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
                    <i className="fas fa-certificate mr-2"></i>
                    Certificate Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <i className="fas fa-building mr-2"></i>
                      Issuer
                    </label>
                    <input
                      type="text"
                      value={formData.issuer}
                      onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                      className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <i className="fas fa-calendar mr-2"></i>
                      Date Issued
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                    rows="3"
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <i className="fas fa-id-card mr-2"></i>
                      Credential ID
                    </label>
                    <input
                      type="text"
                      value={formData.credentialId}
                      onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                      className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Credential URL
                    </label>
                    <input
                      type="url"
                      value={formData.credentialUrl}
                      onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                      className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <i className="fas fa-image mr-2"></i>
                    Certificate Image (PNG/JPG/JPEG)
                  </label>
                  <div className="upload-zone">
                    <input
                      type="file"
                      accept="image/png,image/jpg,image/jpeg"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="certificate-image"
                    />
                    <label htmlFor="certificate-image" className="cursor-pointer">
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-40 object-cover rounded-lg mb-2" />
                      ) : (
                        <div className="text-center">
                          <i className="fas fa-cloud-upload-alt text-4xl text-indigo-500 mb-2"></i>
                          <p>Click to upload certificate image</p>
                          <p className="text-sm text-gray-400">PNG, JPG, JPEG only</p>
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
                    {editingCertificate ? 'Update Certificate' : 'Add Certificate'}
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

      {/* Certificates List */}
      <div className="certificate-grid">
        {certificates.length > 0 ? (
          certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              className="admin-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {certificate.image && (
                <img 
                  src={certificate.image} 
                  alt={certificate.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              )}
              <h4 className="text-lg font-bold gradient-text mb-2">{certificate.title}</h4>
              <p className="text-gray-300 mb-1">{certificate.issuer}</p>
              <p className="text-sm text-gray-400 mb-3">{certificate.date}</p>
              
              {certificate.credentialId && (
                <p className="text-xs text-gray-500 mb-3">
                  ID: {certificate.credentialId}
                </p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(certificate)}
                  className="btn btn-outline-primary flex-1"
                >
                  <i className="fas fa-edit mr-2"></i>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(certificate.id)}
                  className="btn btn-outline-danger px-4"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <i className="fas fa-certificate text-6xl text-gray-400 mb-4"></i>
            <p className="text-xl text-gray-400 mb-4">Belum ada sertifikat</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-gradient"
            >
              <i className="fas fa-plus mr-2"></i>
              Add First Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateManager;
