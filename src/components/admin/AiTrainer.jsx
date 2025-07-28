
    import React, { useState, useCallback } from 'react';
    import { motion } from 'framer-motion';
    import { useData } from '@/contexts/DataContext';
    import { useToast } from '@/components/ui/use-toast';
    import { Bot, UploadCloud, FileText, BrainCircuit } from 'lucide-react';

    const AiTrainer = () => {
      const { aiKnowledge, saveAiKnowledge } = useData();
      const [knowledge, setKnowledge] = useState(aiKnowledge);
      const { toast } = useToast();

      const handleFileRead = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'text/plain') {
          const reader = new FileReader();
          reader.onload = (event) => {
            const content = event.target.result;
            setKnowledge((prev) => prev + '\n' + content);
            toast({
              title: "File diunggah! 📄",
              description: "Konten dari file .txt telah ditambahkan."
            });
          };
          reader.readAsText(file);
        } else {
          toast({
            title: "File tidak valid! ❌",
            description: "Harap unggah file dengan format .txt.",
            variant: "destructive"
          });
        }
      };

      const handleSave = () => {
        saveAiKnowledge(knowledge);
        toast({
          title: "Pengetahuan AI Disimpan! 🧠",
          description: "Asisten AI Anda telah diperbarui."
        });
      };

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold gradient-text">AI Trainer</h3>
              <p className="text-gray-400">Latih Asisten AI Anda dengan mengunggah atau menulis data.</p>
            </div>
          </div>

          <motion.div
            className="admin-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <BrainCircuit className="w-8 h-8 mr-3 text-indigo-400" />
              <h4 className="text-xl font-bold">Knowledge Base</h4>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Konten di bawah ini akan digunakan oleh Asisten AI untuk menjawab pertanyaan pengunjung. Anda bisa menambahkan data dari file .txt atau mengetiknya langsung.
            </p>
            <textarea
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
              rows="15"
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none resize-y"
              placeholder="Contoh: 'Kalo mau ngobrolin kerjaan, jam kerjaku dari jam 9 pagi sampe 5 sore ya. Kalo soal skill, jagoan gue di C++, Vue, sama React. Udah pernah bikin 50+ proyek, jadi santai aja kalo mau nanya-nanya.'"
            />
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <label
                htmlFor="file-upload"
                className="btn btn-outline-primary flex-1 cursor-pointer flex items-center justify-center"
              >
                <UploadCloud className="mr-2" />
                Unggah File .txt
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".txt"
                className="hidden"
                onChange={handleFileRead}
              />
              <motion.button
                onClick={handleSave}
                className="btn-gradient flex-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bot className="mr-2" />
                Simpan & Latih AI
              </motion.button>
            </div>
          </motion.div>
        </div>
      );
    };

    export default AiTrainer;
  