
    import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast';
    import { useData } from '@/contexts/DataContext';
    import emailjs from '@emailjs/browser';

    const ContactSection = () => {
      const { toast } = useToast();
      const { settings } = useData();
      const [formData, setFormData] = useState({ name: '', email: '', message: '' });
      const [isSending, setIsSending] = useState(false);

      const handleFormSubmit = (e) => {
        e.preventDefault();
        const { serviceId, templateId, publicKey } = settings.emailJs;

        if (!serviceId || !templateId || !publicKey) {
          toast({
            title: "Konfigurasi EmailJS Tidak Lengkap 🚧",
            description: "Admin perlu mengatur Service ID, Template ID, dan Public Key di panel admin.",
            variant: "destructive"
          });
          return;
        }

        setIsSending(true);

        emailjs.send(serviceId, templateId, formData, publicKey)
          .then((result) => {
            toast({
              title: "Pesan Terkirim! ✅",
              description: "Terima kasih telah menghubungi saya. Saya akan segera membalasnya."
            });
            setFormData({ name: '', email: '', message: '' });
          }, (error) => {
            toast({
              title: "Gagal Mengirim Pesan ❌",
              description: "Terjadi kesalahan. Silakan coba lagi nanti.",
              variant: "destructive"
            });
          })
          .finally(() => {
            setIsSending(false);
          });
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      };

      return (
        <section id="contact" className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold gradient-text mb-6">Mari Berkolaborasi</h2>
              <p className="text-xl max-w-3xl mx-auto">
                Siap untuk memulai proyek baru? Mari diskusikan ide Anda!
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.2 }}
              >
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-bold mb-6">Hubungi Saya</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <i className="fas fa-envelope text-indigo-500 text-xl mr-4"></i>
                      <span>{settings.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-phone text-indigo-500 text-xl mr-4"></i>
                      <span>{settings.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt text-indigo-500 text-xl mr-4"></i>
                      <span>{settings.contact.location}</span>
                    </div>
                  </div>
                  <div className="social-links">
                    {Object.entries(settings.socialMedia).map(([platform, url]) => url && (
                      <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                        <i className={`fab fa-${platform}`}></i>
                      </a>
                    ))}
                  </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <form className="contact-form" onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nama Anda"
                        className="w-full p-4 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Anda"
                        className="w-full p-4 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <textarea
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Pesan Anda"
                        className="w-full p-4 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn-gradient w-full" disabled={isSending}>
                      {isSending ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane mr-2"></i>
                          Kirim Pesan
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      );
    };

    export default ContactSection;
  