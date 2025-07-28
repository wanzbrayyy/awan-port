
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';

const FileManager = () => {
  const { files, addFile, updateFile, deleteFile } = useData();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    downloadUrl: '',
    fileSize: '',
    fileType: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingFile) {
      updateFile(editingFile.id, formData);
      toast({
        title: "File Updated! ✨",
        description: "File berhasil diperbarui!"
      });
    } else {
      addFile(formData);
      toast({
        title: "File Added! 🎉",
        description: "File baru berhasil ditambahkan!"
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      downloadUrl: '',
      fileSize: '',
      fileType: ''
    });
    setShowForm(false);
    setEditingFile(null);
  };

  const handleEdit = (file) => {
    setEditingFile(file);
    setFormData(file);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus file ini?')) {
      deleteFile(id);
      toast({
        title: "File Deleted! 🗑️",
        description: "File berhasil dihapus!"
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ 
        ...formData, 
        downloadUrl: url,
        fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        fileType: file.type || file.name.split('.').pop()
      });
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) return 'fas fa-file-pdf text-red-500';
    if (fileType?.includes('word') || fileType?.includes('doc')) return 'fas fa-file-word text-blue-500';
    if (fileType?.includes('excel') || fileType?.includes('sheet')) return 'fas fa-file-excel text-green-500';
    if (fileType?.includes('powerpoint') || fileType?.includes('presentation')) return 'fas fa-file-powerpoint text-orange-500';
    if (fileType?.includes('image')) return 'fas fa-file-image text-purple-500';
    if (fileType?.includes('video')) return 'fas fa-file-video text-pink-500';
    if (fileType?.includes('audio')) return 'fas fa-file-audio text-yellow-500';
    if (fileType?.includes('zip') || fileType?.includes('rar')) return 'fas fa-file-archive text-gray-500';
    return 'fas fa-file text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold gradient-text">File Management</h3>
          <p className="text-gray-400">Kelola file dan dokumen untuk diunduh</p>
        </div>
        <motion.button
          onClick={() => setShowForm(true)}
          className="btn-gradient px-6 py-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-plus mr-2"></i>
          Add File
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
                  {editingFile ? 'Edit File' : 'Add New File'}
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
                    File Title
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
                    rows="3"
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <i className="fas fa-tags mr-2"></i>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Resume">Resume</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Document">Document</option>
                    <option value="Template">Template</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <i className="fas fa-upload mr-2"></i>
                    Upload File
                  </label>
                  <div className="upload-zone">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      {formData.downloadUrl ? (
                        <div className="text-center">
                          <i className={`${getFileIcon(formData.fileType)} text-4xl mb-2`}></i>
                          <p className="font-semibold">{formData.title || 'File uploaded'}</p>
                          <p className="text-sm text-gray-400">{formData.fileSize}</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <i className="fas fa-cloud-upload-alt text-4xl text-indigo-500 mb-2"></i>
                          <p>Click to upload file</p>
                          <p className="text-sm text-gray-400">Any file type supported</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {formData.downloadUrl && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">File Size</label>
                      <input
                        type="text"
                        value={formData.fileSize}
                        onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                        className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">File Type</label>
                      <input
                        type="text"
                        value={formData.fileType}
                        onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
                        className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="btn-gradient flex-1"
                  >
                    <i className="fas fa-save mr-2"></i>
                    {editingFile ? 'Update File' : 'Add File'}
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

      {/* Files List */}
      <div className="file-grid">
        {files.length > 0 ? (
          files.map((file, index) => (
            <motion.div
              key={file.id}
              className="admin-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-center mb-4">
                <i className={`${getFileIcon(file.fileType)} text-4xl mb-3`}></i>
                <h4 className="text-lg font-bold gradient-text mb-2">{file.title}</h4>
                <p className="text-gray-300 text-sm mb-2">{file.description}</p>
                <div className="flex justify-center gap-4 text-xs text-gray-400">
                  <span><i className="fas fa-tag mr-1"></i>{file.category}</span>
                  {file.fileSize && <span><i className="fas fa-weight mr-1"></i>{file.fileSize}</span>}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(file)}
                  className="btn btn-outline-primary flex-1"
                >
                  <i className="fas fa-edit mr-2"></i>
                  Edit
                </button>
                {file.downloadUrl && (
                  <a
                    href={file.downloadUrl}
                    download
                    className="btn btn-outline-success px-4"
                  >
                    <i className="fas fa-download"></i>
                  </a>
                )}
                <button
                  onClick={() => handleDelete(file.id)}
                  className="btn btn-outline-danger px-4"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <i className="fas fa-file text-6xl text-gray-400 mb-4"></i>
            <p className="text-xl text-gray-400 mb-4">Belum ada file</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-gradient"
            >
              <i className="fas fa-plus mr-2"></i>
              Add First File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManager;
