
import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashboardStats = () => {
  const { projects, certificates, files } = useData();

  const stats = [
    {
      title: 'Total Projects',
      value: projects.length,
      icon: 'fas fa-project-diagram',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'Certificates',
      value: certificates.length,
      icon: 'fas fa-certificate',
      color: 'text-green-500',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Files',
      value: files.length,
      icon: 'fas fa-file-alt',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20'
    },
    {
      title: 'Total Items',
      value: projects.length + certificates.length + files.length,
      icon: 'fas fa-chart-bar',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/20'
    }
  ];

  const barData = {
    labels: ['Projects', 'Certificates', 'Files'],
    datasets: [
      {
        label: 'Count',
        data: [projects.length, certificates.length, files.length],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(168, 85, 247, 1)'
        ],
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  const doughnutData = {
    labels: ['Projects', 'Certificates', 'Files'],
    datasets: [
      {
        data: [projects.length, certificates.length, files.length],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(168, 85, 247, 1)'
        ],
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff'
        }
      },
      title: {
        display: true,
        text: 'Portfolio Statistics',
        color: '#ffffff'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff'
        }
      },
      title: {
        display: true,
        text: 'Content Distribution',
        color: '#ffffff'
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="admin-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-full ${stat.bgColor}`}>
                <i className={`${stat.icon} text-2xl ${stat.color}`}></i>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="admin-card p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Bar data={barData} options={chartOptions} />
        </motion.div>

        <motion.div
          className="admin-card p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        className="admin-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-xl font-bold gradient-text mb-4">
          <i className="fas fa-clock mr-2"></i>
          Recent Activity
        </h3>
        <div className="space-y-4">
          {projects.slice(0, 3).map((project, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-800/50 rounded-lg">
              <i className="fas fa-project-diagram text-blue-500 mr-3"></i>
              <div className="flex-1">
                <p className="font-semibold">{project.title}</p>
                <p className="text-sm text-gray-400">Project added</p>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
          {certificates.slice(0, 2).map((cert, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-800/50 rounded-lg">
              <i className="fas fa-certificate text-green-500 mr-3"></i>
              <div className="flex-1">
                <p className="font-semibold">{cert.title}</p>
                <p className="text-sm text-gray-400">Certificate added</p>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(cert.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
          {projects.length === 0 && certificates.length === 0 && files.length === 0 && (
            <div className="text-center py-8">
              <i className="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-400">Belum ada aktivitas</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="admin-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <h3 className="text-xl font-bold gradient-text mb-4">
          <i className="fas fa-bolt mr-2"></i>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-gradient p-4 rounded-lg text-center">
            <i className="fas fa-plus mb-2 block text-xl"></i>
            Add New Project
          </button>
          <button className="btn-gradient p-4 rounded-lg text-center">
            <i className="fas fa-certificate mb-2 block text-xl"></i>
            Add Certificate
          </button>
          <button className="btn-gradient p-4 rounded-lg text-center">
            <i className="fas fa-file-upload mb-2 block text-xl"></i>
            Upload File
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardStats;
