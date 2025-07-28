
    import React, { createContext, useContext, useState, useEffect } from 'react';

    const DataContext = createContext();

    export const useData = () => {
      const context = useContext(DataContext);
      if (!context) {
        throw new Error('useData must be used within a DataProvider');
      }
      return context;
    };

    const DataProvider = ({ children }) => {
      const [projects, setProjects] = useState([]);
      const [certificates, setCertificates] = useState([]);
      const [files, setFiles] = useState([]);
      const [aboutMe, setAboutMe] = useState({
        name: 'Awan Berlian',
        title: 'Full Stack Developer & UI/UX Designer',
        description: 'Passionate developer dengan pengalaman 5+ tahun dalam menciptakan solusi digital yang inovatif dan user-friendly.',
        skills: ['C++', 'Vue', 'React', 'Figma', 'JavaScript', 'HTML', 'Golang'],
        experience: '5+ Years',
        projectsCompleted: '50+',
        clientsSatisfied: '30+'
      });
      const [settings, setSettings] = useState({
        socialMedia: {
          github: '',
          linkedin: '',
          twitter: '',
          instagram: ''
        },
        contact: {
          email: 'awan.berlian@email.com',
          phone: '+62 812-3456-7890',
          location: 'Jakarta, Indonesia'
        },
        emailJs: {
          serviceId: '',
          templateId: '',
          publicKey: ''
        },
        widgets: {
          hero: { name: 'Hero Section', active: true },
          about: { name: 'About Me', active: true },
          skills: { name: 'Skills Section', active: true },
          projects: { name: 'Projects Page', active: true },
          certificates: { name: 'Certificates Page', active: true },
          files: { name: 'Files Page', active: true },
          contact: { name: 'Contact Form', active: true },
          spline: { name: '3D Spline/GLB', active: true },
        },
        theme: {
          primaryColor: '#6D28D9',
          secondaryColor: '#D946EF',
        },
      });
      const [aiKnowledge, setAiKnowledge] = useState('');

      useEffect(() => {
        loadData();
      }, []);

      const loadData = () => {
        const savedProjects = localStorage.getItem('portfolioProjects');
        const savedCertificates = localStorage.getItem('portfolioCertificates');
        const savedFiles = localStorage.getItem('portfolioFiles');
        const savedAboutMe = localStorage.getItem('portfolioAboutMe');
        const savedSettings = localStorage.getItem('portfolioSettings');
        const savedAiKnowledge = localStorage.getItem('portfolioAiKnowledge');

        if (savedProjects) setProjects(JSON.parse(savedProjects));
        if (savedCertificates) setCertificates(JSON.parse(savedCertificates));
        if (savedFiles) setFiles(JSON.parse(savedFiles));
        if (savedAboutMe) setAboutMe(JSON.parse(savedAboutMe));
        if (savedSettings) setSettings(JSON.parse(savedSettings));
        if (savedAiKnowledge) setAiKnowledge(savedAiKnowledge);
      };

      const saveData = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
      };

      const saveProjects = (newProjects) => {
        setProjects(newProjects);
        saveData('portfolioProjects', newProjects);
      };

      const saveCertificates = (newCertificates) => {
        setCertificates(newCertificates);
        saveData('portfolioCertificates', newCertificates);
      };

      const saveFiles = (newFiles) => {
        setFiles(newFiles);
        saveData('portfolioFiles', newFiles);
      };

      const saveAboutMe = (newAboutMe) => {
        setAboutMe(newAboutMe);
        saveData('portfolioAboutMe', newAboutMe);
      };

      const saveSettings = (newSettings) => {
        setSettings(newSettings);
        saveData('portfolioSettings', newSettings);
      };

      const saveAiKnowledge = (newKnowledge) => {
        setAiKnowledge(newKnowledge);
        localStorage.setItem('portfolioAiKnowledge', newKnowledge);
      };

      const addProject = (project) => {
        const newProject = { ...project, id: Date.now().toString(), createdAt: new Date().toISOString() };
        saveProjects([...projects, newProject]);
      };

      const updateProject = (id, updatedProject) => {
        saveProjects(projects.map(p => (p.id === id ? { ...p, ...updatedProject } : p)));
      };

      const deleteProject = (id) => {
        saveProjects(projects.filter(p => p.id !== id));
      };

      const addCertificate = (certificate) => {
        const newCertificate = { ...certificate, id: Date.now().toString(), createdAt: new Date().toISOString() };
        saveCertificates([...certificates, newCertificate]);
      };

      const updateCertificate = (id, updatedCertificate) => {
        saveCertificates(certificates.map(c => (c.id === id ? { ...c, ...updatedCertificate } : c)));
      };

      const deleteCertificate = (id) => {
        saveCertificates(certificates.filter(c => c.id !== id));
      };

      const addFile = (file) => {
        const newFile = { ...file, id: Date.now().toString(), createdAt: new Date().toISOString() };
        saveFiles([...files, newFile]);
      };

      const updateFile = (id, updatedFile) => {
        saveFiles(files.map(f => (f.id === id ? { ...f, ...updatedFile } : f)));
      };

      const deleteFile = (id) => {
        saveFiles(files.filter(f => f.id !== id));
      };

      const value = {
        projects, certificates, files, aboutMe, settings, aiKnowledge,
        addProject, updateProject, deleteProject,
        addCertificate, updateCertificate, deleteCertificate,
        addFile, updateFile, deleteFile,
        saveAboutMe, saveSettings, saveAiKnowledge
      };

      return (
        <DataContext.Provider value={value}>
          {children}
        </DataContext.Provider>
      );
    };

    export default DataProvider;
  